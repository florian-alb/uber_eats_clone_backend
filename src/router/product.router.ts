import {Router} from "express";
import {createProduct, archiveProduct, getAllProducts, getProductById, updateProduct} from "../controllers/product.controller";

const productRouter = Router()

productRouter.get('/', getAllProducts)
productRouter.get("/:id", getProductById)
productRouter.post('/', createProduct)
productRouter.put("/:id", updateProduct)
productRouter.patch("/:id/archive", archiveProduct)

export default productRouter