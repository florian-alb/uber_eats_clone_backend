import express from "express";

// import userRouter from "./routes/user.router";
// import postRouter from "./routes/post.router";
// import commentRouter from "./routes/comment.router";
// import likeRouter from "./routes/like.router";

const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    //TODO: implement the register logic
    return res.send('User registered successfully!');
});

app.post('/login', (req, res) => {
    //TODO: implement the login logic
    return res.send('User logged in successfully!');
})

app.get('/feed', (req, res) => {
    //TODO: get the feed
    return res.send('Feed fetched successfully!');
});

app.get('/store/:id', (req, res) => {
    //TODO: get the store of a specific id
    return res.send('Restaurant' + req.params.id + ' fetched successfully!');
});

app.get('/store/:id/plat', (req, res) => {
    //TODO: get the menu of a specific store
    return res.send('menu from the Restaurant!' + req.params.id + ' fetched successfully!');
});

app.get('/order/:id', (req, res) => {
    //TODO: get the order
    return res.send('Order number ' + req.params.id + ' fetched successfully!');
});

app.get('/account', (req, res) => {
  //TODO: only display the account page if the user is logged in
})

app.get('/account/:id', (req, res) => {
    //TODO: get the account infos to display in the account page
});




app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})