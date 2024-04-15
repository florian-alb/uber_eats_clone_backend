import {PrismaClient} from "@prisma/client";

const shopClient = new PrismaClient().shop

// getAllShops
export const getAllShops = async (req: any, res: any) => {
    try {
        const allShop = await shopClient.findMany({
            include : {
                reviews: true,
                address: true,
                products: true,
            }
        })
        res.status(200).json({data: allShop})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the shops"})
    }
}

// getShopById
export const getShopById = async (req: any, res: any) => {
    try {
        const shopId = req.params.id;
        const shop = await shopClient.findUnique({
            where: {
                id: shopId,
            },
            include : {
                reviews: true,
                address: true,
                products: true,
                User: true,
                orders: true
            }
        })
        if (shop) {
            res.status(200).json({data: shop});
        } else {
            res.status(404).json({message: `The shop with ID ${shopId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the shop with ID ${req.params.id}`});
    }
};

// createShop
export const createShop = async (req: any, res: any) => {
    try {
        const data = req.body
        console.log(data)
        const shop = await shopClient.create({
            data
        })
        res.status(201).json({data: shop})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new shop"})
    }
}

// updateShop
export const updateShop = async (req: any, res: any) => {
    try {
        const shopId = req.params.id
        const shopData = req.body
        const shop = await shopClient.update({
            where: {
                id: shopId,
            },
            data: shopData,
        })
        res.status(200).json({data: shop})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the shop"})
    }
}

// deleteShop
export const deleteShop = async (req: any, res: any) => {
    try {
        const shopId = req.params.id
        await shopClient.delete({
            where: {
                id: shopId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the shop"})
    }
}