import {prisma} from "../../prisma/db";


// getAllProducts
export const getAllProducts = async (req: any, res: any) => {
    try {
        const allProducts = await prisma.product.findMany({
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
        const product = await prisma.product.findUnique({
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
        const product = await prisma.product.create({
            data: productData,
        })
        res.status(201).json({data: product})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new product"})
    }
}

// updateProduct
export const updateProduct = async (req: any, res: any) => {
    const productId = req.params.id
    const productData = req.body
    try {
        const product = await prisma.product.update({
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

// archiveProduct
export const archiveProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { isPublished: !product.isPublished },
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while archiving the product' });
    }
};