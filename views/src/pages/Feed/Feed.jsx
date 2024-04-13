import React, {
    useState,
    useEffect,
    // useRef,
    useCallback,
} from "react";
// import openSocket from 'socket.io-client';

import {
    Box,
    Grid,
    Typography,
    CircularProgress,
    Pagination,
} from "@mui/material";

import Post from "../../components/Feed/Post";
import Button from "../../components/Button";
import FeedEdit from "../../components/Feed/FeedEdit";
import Input from "../../components/Form/Input/Input";
import ErrorHandler from "../../components/ErrorHandler";

import axios from "axios";

const Feed = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [editPost, setEditPost] = useState(null);
    const [status, setStatus] = useState("");
    const [postPage, setPostPage] = useState(1);
    const [postsLoading, setPostsLoading] = useState(true);
    const [editLoading, setEditLoading] = useState(false);
    const [error, setError] = useState(null);

    //   const socket = useRef();

    const addPost = useCallback((post) => {
        setPosts((prevState) => {
            const updatedPosts = [...prevState];
            if (
                !updatedPosts.some(
                    (existingPost) => existingPost._id === post._id
                )
            ) {
                updatedPosts.unshift(post);
                if (updatedPosts.length > 2) {
                    updatedPosts.pop();
                }
            }
            return updatedPosts;
        });

        setTotalPosts((prevTotalPosts) => prevTotalPosts + 1);
    }, []);

    axios.defaults.headers.common["Authorization"] = "Bearer " + props.token;

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(
                    "https://mern-social-api-s7k2op5jka-lm.a.run.app/auth/status"
                );
                setStatus(res.data.status);
            } catch (error) {
                catchError(error);
            }
        };

        const loadPosts = async () => {
            try {
                const res = await axios.get(
                    "https://mern-social-api-s7k2op5jka-lm.a.run.app/feed/posts?page=" +
                        postPage
                );
                setPosts(res.data.posts);
                setTotalPosts(res.data.totalItems);
                setPostsLoading(false);
            } catch (error) {
                catchError(error);
            }
        };

        fetchStatus();
        loadPosts();
        // socket.current = openSocket(
        //   'https://mern-social-api-s7k2op5jka-lm.a.run.app'
        // );
        // socket.current.on('posts', (data) => {
        //   if (data.action === 'create') {
        //     addPost(data.post);
        //   } else if (data.action === 'update') {
        //     updatePost(data.post);
        //   } else if (data.action === 'delete') {
        //     loadPosts();
        //   }
        // });
    }, [props.token, postPage, addPost]);

    const updatePost = (post) => {
        setPosts((prevState) => {
            const updatedPosts = [...prevState];
            const updatedPostIndex = updatedPosts.findIndex(
                (p) => p._id === post._id
            );
            if (updatedPostIndex > -1) {
                updatedPosts[updatedPostIndex] = post;
            }
            return updatedPosts;
        });
    };

    const loadPosts = async (direction) => {
        if (direction) {
            setPostsLoading(true);
            setPosts([]);
        }
        let page = postPage;
        if (direction === "next") {
            page++;
            setPostPage(page);
        }
        if (direction === "previous") {
            page--;
            setPostPage(page);
        }
        try {
            const res = await axios.get(
                "https://mern-social-api-s7k2op5jka-lm.a.run.app/feed/posts?page=" +
                    page,
                {
                    validateStatus: function (status) {
                        return true; // I control the error!
                    },
                }
            );

            if (res.status !== 200) {
                throw new Error("Failed to fetch posts.");
            }

            setPosts(
                res.data.posts.map((post) => {
                    return {
                        ...post,
                        imagePath: post.imageUrl,
                    };
                })
            );
            setTotalPosts(res.data.totalItems);
            setPostsLoading(false);
        } catch (err) {
            catchError(err);
        }
    };

    const statusUpdateHandler = (event) => {
        event.preventDefault();
        axios
            .patch(
                "https://mern-social-api-s7k2op5jka-lm.a.run.app/auth/status",
                {
                    status: status,
                }
            )
            .then((res) => {
                console.log(res.data);
            })
            .catch(catchError);
    };

    const newPostHandler = () => {
        setIsEditing(true);
    };

    const startEditPostHandler = (postId) => {
        const loadedPost = { ...posts.find((p) => p._id === postId) };
        setIsEditing(true);
        setEditPost(loadedPost);
    };

    const cancelEditHandler = () => {
        setIsEditing(false);
        setEditPost(null);
    };

    const finishEditHandler = async (postData) => {
        setEditLoading(true);
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("content", postData.content);
        formData.append("image", postData.image);
        let url = "https://mern-social-api-s7k2op5jka-lm.a.run.app/feed/post";
        let method = "POST";
        if (editPost) {
            url =
                "https://mern-social-api-s7k2op5jka-lm.a.run.app/feed/post/" +
                editPost._id; //for editing
            method = "PUT";
        }

        try {
            const res = await axios({
                url: url,
                method: method,
                data: formData,
                validateStatus: function (status) {
                    return true; // I control the error!
                },
            });

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Creating or editing a post failed!");
            }

            console.log(res.data);
            setIsEditing(false);
            setEditPost(null);
            setEditLoading(false);
        } catch (err) {
            setIsEditing(false);
            setEditPost(null);
            setEditLoading(false);
            setError(err);
        }
    };

    const statusInputChangeHandler = (input, value) => {
        setStatus(value);
    };

    const deletePostHandler = async (postId) => {
        setPostsLoading(true);
        try {
            const res = await axios.delete(
                "https://mern-social-api-s7k2op5jka-lm.a.run.app/feed/post/" +
                    postId
            );
            console.log(res.data);
            loadPosts();
        } catch (err) {
            console.log(err);
            setPostsLoading(false);
        }
    };

    const errorHandler = () => {
        setError(null);
    };

    const catchError = (error) => {
        setError(error);
    };

    return (
        <>
            <ErrorHandler error={error} onHandle={errorHandler} />
            <FeedEdit
                editing={isEditing}
                selectedPost={editPost}
                loading={editLoading}
                onCancelEdit={cancelEditHandler}
                onFinishEdit={finishEditHandler}
            />
            <Box
                sx={{
                    width: "90%",
                    margin: "1rem auto",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                }}
            >
                <form onSubmit={statusUpdateHandler}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Input
                                type="text"
                                placeholder="Your status"
                                control="input"
                                onChange={statusInputChangeHandler}
                                value={status}
                            />
                        </Grid>
                        <Grid item>
                            <Button mode="flat" type="submit">
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box textAlign="center">
                <Button mode="raised" design="accent" onClick={newPostHandler}>
                    New Post
                </Button>
            </Box>
            <section>
                {postsLoading && (
                    <Box textAlign="center" marginTop="2rem">
                        <CircularProgress />
                    </Box>
                )}
                {posts.length <= 0 && !postsLoading ? (
                    <Typography align="center">No posts found.</Typography>
                ) : null}
                {!postsLoading && (
                    <>
                        {posts.map((post) => (
                            <Post
                                key={post._id}
                                id={post._id}
                                author={post.creator.name}
                                date={new Date(
                                    post.createdAt
                                ).toLocaleDateString("en-US")}
                                title={post.title}
                                image={post.imageUrl}
                                content={post.content}
                                onStartEdit={() =>
                                    startEditPostHandler(post._id)
                                }
                                onDelete={() => deletePostHandler(post._id)}
                            />
                        ))}
                        <Box display="flex" justifyContent="center">
                            <Pagination
                                count={Math.ceil(totalPosts / 2)}
                                page={postPage}
                                onChange={(event, page) => {
                                    if (page < postPage) {
                                        loadPosts("previous");
                                    } else if (page > postPage) {
                                        loadPosts("next");
                                    }
                                }}
                            />
                        </Box>
                    </>
                )}
            </section>
        </>
    );
};

export default Feed;
