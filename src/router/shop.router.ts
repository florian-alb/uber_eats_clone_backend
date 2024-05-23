import {Router} from "express";

import {
    createShop,
    deleteShop,
    updateShop,
    getShopById, getShops,
} from "../controllers/shop.controller";

const ShopRouter = Router()

ShopRouter.get('/', getShops)
ShopRouter.get("/:id", getShopById)
ShopRouter.post('/', createShop)
ShopRouter.put("/:id", updateShop)
ShopRouter.delete("/:id", deleteShop)

export default ShopRouter