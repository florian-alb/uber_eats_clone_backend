import express from "express";
import authRouter from "./routes/auth";
import shopRouter from "./routes/shop";
import orderRouter from "./routes/order";


const app = express()
const port = process.env.PORT || 8080;

app.use(express.json())
app.use('/auth', authRouter);
app.use('/shop', shopRouter);
app.use('/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})