import { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface SinglePostProps {
    token: string;
}

const SinglePost = (props: SinglePostProps) => {
    const [post, setPost] = useState({
        title: "",
        author: "",
        date: "",
        image: "",
        content: "",
    });

    const { postId } = useParams();

    useEffect(() => {
        fetch("https://mkrolik-social-api-de4b456-s7k2op5jka-ew.a.run.app/feed/post/" + postId, {
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error("Failed to fetch status");
                }
                return res.json();
            })
            .then((resData) => {
                setPost({
                    title: resData.post.title,
                    author: resData.post.creator.name,
                    image: resData.post.imageUrl,
                    date: new Date(resData.post.createdAt).toLocaleDateString(
                        "en-US"
                    ),
                    content: resData.post.content,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [postId, props.token]);

    return (
        <Card
            style={{ maxWidth: 500, margin: "auto", border: "1px solid #000" }}
        >
            <Typography variant="h5" component="h2">
                {post.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                Created by {post.author} on {post.date}
            </Typography>
            <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "auto" }}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SinglePost;
