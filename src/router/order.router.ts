import {Router} from "express";
import {
    createOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getOrdersByShopId,
    updateOrder
} from "../controllers/order.controller";

const orderRouter = Router()

orderRouter.get('/', getAllOrders)
orderRouter.get("/:id", getOrderById)
orderRouter.get("shop/:id", getOrdersByShopId)
orderRouter.post('/', createOrder)
orderRouter.put("/:id", updateOrder)
orderRouter.delete("/:id", deleteOrder)


export default orderRouter