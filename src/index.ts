import express from "express";
import cors from "cors";

import addressRouter from "./router/address.router";
import categoryRouter from "./router/category.router";
import menuRouter from "./router/menu.router";
import productRouter from "./router/product.router";
import shopRouter from "./router/shop.router";
import reviewRouter from "./router/review.router";
import userRouter from "./router/user.router";
import orderRouter from "./router/order.router";
import authRouter from "./router/auth.router";
import cookieParser from "cookie-parser";


const app = express()
const port = process.env.PORT || 8080;
app.use(cors())
app.use(cookieParser())

// import Page
app.use(express.json())
app.use('/address/', addressRouter)
app.use('/category/', categoryRouter)
app.use('/menu/', menuRouter)
app.use('/order/', orderRouter)
app.use('/product/', productRouter)
app.use('/shop/', shopRouter)
app.use('/review/', reviewRouter)
app.use('/user/', userRouter)
app.use('/auth/', authRouter)

app.get('/', (req, res) => {
    res.send('Test API')
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`)
})
