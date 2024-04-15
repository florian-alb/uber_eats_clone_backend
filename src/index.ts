import express from "express";
import addressRouter from "./router/address.router";
import categoryRouter from "./router/category.router";
import menuRouter from "./router/menu.router";
import orderRouter from "./routes/order";
import productRouter from "./router/product.router";
import restaurantRouter from "./router/restaurant.router";
import reviewRouter from "./router/review.router";
import userRouter from "./router/user.router";


const app = express()
const port = process.env.PORT || 8080;

// import Page
app.use(express.json())
app.use('/address/', addressRouter)
app.use('/category/', categoryRouter)
app.use('/menu/', menuRouter)
app.use('/order/', orderRouter)
app.use('/product/', productRouter)
app.use('/shop/', restaurantRouter)
app.use('/review/', reviewRouter)
app.use('/user/', userRouter)

app.get('/', (req, res) => {
    res.send('Test API')
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`)
})