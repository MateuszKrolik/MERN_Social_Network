exports.getPosts = (req, res, next) => {
  res.status(200).json({
    //200=success
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Mateusz',
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    //201=success, resource created
    message: 'Post created successfully!',
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
