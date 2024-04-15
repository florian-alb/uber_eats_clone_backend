import {PrismaClient} from "@prisma/client";

const productClient = new PrismaClient().product

// getAllProducts
export const getAllProducts = async (req: any, res: any) => {
    try {
        const allProducts = await productClient.findMany({
        })
        res.status(200).json({data: allProducts})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the products"})
    }
}

// getProductById
export const getProductById = async (req: any, res: any) => {
    try {
        const productId = req.params.id;
        const product = await productClient.findUnique({
            where: {
                id: productId,
            },
        })
        if (product) {
            res.status(200).json({data: product});
        } else {
            res.status(404).json({message: `The product with ID ${productId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the product with ID ${req.params.id}`});
    }
};

// createProduct
export const createProduct = async (req: any, res: any) => {
    try {
        const productData = req.body
        const product = await productClient.create({
            data: productData,
        })
        res.status(201).json({data: product})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new product"})
    }
}

// updateProduct
export const updateProduct = async (req: any, res: any) => {
    try {
        const productId = req.params.id
        const productData = req.body
        const product = await productClient.update({
            where: {
                id: productId,
            },
            data: productData,
        })
        res.status(200).json({data: product})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the product"})
    }
}

// deleteProduct
export const deleteProduct = async (req: any, res: any) => {
    try {
        const productId = req.params.id
        await productClient.delete({
            where: {
                id: productId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the product"})
    }
}