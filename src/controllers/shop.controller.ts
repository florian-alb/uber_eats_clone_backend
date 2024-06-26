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
                category: true,
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
    const data = req.body
    console.log("data", data)
    try {
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
    const {id} = req.params;
    const shopData = req.body;
    const {category} = req.body;

    try {
        const newCategory = await prisma.category.findUnique({
            where: {
                name: category,
            },
        });

        if (!newCategory) {
            return res.status(404).json({error: "Category not found"});
        }

        shopData.categoryId = newCategory.id;
        delete shopData.category;

        // Mettez à jour le shop avec les nouvelles données
        const updatedShop = await prisma.shop.update({
            where: {id},
            data: shopData,
        });

        // Retournez le shop mis à jour
        res.status(200).json(updatedShop);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: e.message, message: "Error while updating the shop"});
    }
};


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