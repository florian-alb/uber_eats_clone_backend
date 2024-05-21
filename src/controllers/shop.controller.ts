import {prisma} from "../../prisma/db";


export const getShops = async (req: any, res: any) => {
    const categoryId = req.query.categoryId;
    try {
        const shop = await prisma.shop.findMany({
            where: {
                categoryId: categoryId
            },
        });
        if (!shop) {
            res.status(404).json({message: `Not found`});
        }
        res.status(200).json(shop);
    } catch (e) {
        res.status(500).json({
            error: e,
            message: `An error occurred while fetching the shops for category ${categoryId}`
        });
    }
};


// getShopById
export const getShopById = async (req: any, res: any) => {
    const id = req.params.id;
    try {
        const shop = await prisma.shop.findUnique({
            where: {
                id,
            },
            include: {
                Category: true,
                products: true,
                orders: {
                    include: {
                        deliveryAddress: true,
                        customer: true,
                        orderProducts: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
        if (!shop) {
            res.status(404).json({message: `The shop with ID ${id} does not exist`});
        }
        res.status(200).json(shop);
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the shop with ID ${id}`});
    }
};


// createShop
export const createShop = async (req: any, res: any) => {
    try {
        const data = req.body
        const shop = await prisma.shop.create({
            data
        })
        res.status(201).json(shop)
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new shop"})
    }
}

// updateShop
export const updateShop = async (req: any, res: any) => {
    try {
        const shopId = req.params.id
        const shopData = req.body
        const shop = await prisma.shop.update({
            where: {
                id: shopId,
            },
            data: shopData,
        })
        res.status(200).json(shop)
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the shop"})
    }
}

// deleteShop
export const deleteShop = async (req: any, res: any) => {
    try {
        const shopId = req.params.id
        await prisma.shop.delete({
            where: {
                id: shopId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the shop"})
    }
}