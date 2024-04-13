import {PrismaClient} from "@prisma/client";

const orderClient = new PrismaClient().order

// getAllOrders
export const getAllOrders = async (req: any, res: any) => {
    try {
        const allOrders = await orderClient.findMany({
            include : {
                products: true,
                restaurant: true,
                customer: true
            }
        })
        res.status(200).json({data: allOrders})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the orders"})
    }
}

// getOrderById
export const getOrderById = async (req: any, res: any) => {
    try {
        const orderId = req.params.id;
        const order = await orderClient.findUnique({
            where: {
                id: orderId,
            },
            include : {
                products: true,
                restaurant: true,
                customer: true
            }
        })
        if (order) {
            res.status(200).json({data: order});
        } else {
            res.status(404).json({message: `The order with ID ${orderId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the order with ID ${req.params.id}`});
    }
};

// createOrder
export const createOrder = async (req: any, res: any) => {
    try {
        const orderData = req.body
        const order = await orderClient.create({
            data: orderData,
        })
        res.status(201).json({data: order})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new order"})
    }
}

// updateOrder
export const updateOrder = async (req: any, res: any) => {
    try {
        const orderId = req.params.id
        const orderData = req.body
        const order = await orderClient.update({
            where: {
                id: orderId,
            },
            data: orderData,
        })
        res.status(200).json({data: order})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the order"})
    }
}

// deleteOrder
export const deleteOrder = async (req: any, res: any) => {
    try {
        const orderId = req.params.id
        await orderClient.delete({
            where: {
                id: orderId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the order"})
    }
}