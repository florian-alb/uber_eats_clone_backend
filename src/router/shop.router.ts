import {Router} from "express";

import {getAllShops, createShop, deleteShop, updateShop, getShopById} from "../controllers/shop.controller";

const ShopRouter = Router()

ShopRouter.get('/', getAllShops)
ShopRouter.get("/:id", getShopById)
ShopRouter.post('/', createShop)
ShopRouter.put("/:id", updateShop)
ShopRouter.delete("/:id", deleteShop)

export default ShopRouter