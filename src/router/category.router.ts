import {Router} from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategory,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller";

const categoryRouter = Router()

categoryRouter.get('/', getAllCategory)
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post('/', createCategory)
categoryRouter.put("/:id", updateCategory)
categoryRouter.delete("/:id", deleteCategory)

export default categoryRouter