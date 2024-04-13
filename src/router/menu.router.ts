import {Router} from "express";
import {createMenu, deleteMenu, getAllMenus, getMenuById, updateMenu} from "../controllers/menu.controller";

const menuRouter = Router()

menuRouter.get('/', getAllMenus)
menuRouter.get("/:id", getMenuById)
menuRouter.post('/', createMenu)
menuRouter.put("/:id", updateMenu)
menuRouter.delete("/:id", deleteMenu)

export default menuRouter