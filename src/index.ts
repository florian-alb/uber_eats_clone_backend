import express from "express";

// import userRouter from "./routes/user.router";
// import postRouter from "./routes/post.router";
// import commentRouter from "./routes/comment.router";
// import likeRouter from "./routes/like.router";

const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())

// app.use('/api/users', userRouter)
// app.use('/api/posts', postRouter)
// app.use('/api/comments', commentRouter)
// app.use('/api/likes', likeRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})