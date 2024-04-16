import express from "express";
import cors from "cors";

import addressRouter from "./router/address.router";
import categoryRouter from "./router/category.router";
import menuRouter from "./router/menu.router";
import orderRouter from "./routes/order";
import productRouter from "./router/product.router";
import shopRouter from "./router/shop.router";
import reviewRouter from "./router/review.router";
import userRouter from "./router/user.router";


const app = express()
const port = process.env.PORT || 8080;
app.use(cors())

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

app.get('/', (req, res) => {
    res.send('Test API')
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`)
})
