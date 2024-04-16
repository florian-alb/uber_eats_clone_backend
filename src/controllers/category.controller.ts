import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

// getAllCategory
export const getAllCategory = async (req: any, res: any) => {
    try {
        const allCategory = await prisma.category.findMany({
           select: {
               shop: true,
           }
        })
        res.status(200).json({data: allCategory})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the category"})
    }
}

// getCategoryById
export const getCategoryById = async (req: any, res: any) => {
    try {
        const categoryId = req.params.id;
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            select : {
                shop: true
            }
        })
        if (category) {
            res.status(200).json({data: category});
        } else {
            res.status(404).json({message: `The category with ID ${categoryId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the category with ID ${req.params.id}`});
    }
};

// createCategory
export const createCategory = async (req: any, res: any) => {
    try {
        const categoryData = req.body
        const category = await prisma.category.create({
            data: categoryData,
        })
        res.status(201).json({data: category})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new category"})
    }
}

// updateCategory
export const updateCategory = async (req: any, res: any) => {
    try {
        const categoryId = req.params.id
        const categoryData = req.body
        const category = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: categoryData,
        })
        res.status(200).json({data: category})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the category"})
    }
}

// deleteCategory
export const deleteCategory = async (req: any, res: any) => {
    try {
        const categoryId = req.params.id
        await prisma.category.delete({
            where: {
                id: categoryId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the category"})
    }
}