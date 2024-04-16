import {} from "@prisma/client";
import {prisma} from "./db";

// getAllMenus
export const getAllMenus = async (req: any, res: any) => {
    try {
        const allMenus = await prisma.menu.findMany({
            include : {
                products: true
            }
        })
        res.status(200).json({data: allMenus})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the menus"})
    }
}

// getMenuById
export const getMenuById = async (req: any, res: any) => {
    try {
        const menuId = req.params.id;
        const menu = await prisma.menu.findUnique({
            where: {
                id: menuId,
            },
            include : {
                products: true
            }
        })
        if (menu) {
            res.status(200).json({data: menu});
        } else {
            res.status(404).json({message: `The menu with ID ${menuId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the menu with ID ${req.params.id}`});
    }
};

// createMenu
export const createMenu = async (req: any, res: any) => {
    try {
        const menuData = req.body
        const menu = await prisma.menu.create({
            data: menuData,
        })
        res.status(201).json({data: menu})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new menu"})
    }
}

// updateMenu
export const updateMenu = async (req: any, res: any) => {
    try {
        const menuId = req.params.id
        const menuData = req.body
        const menu = await prisma.menu.update({
            where: {
                id: menuId,
            },
            data: menuData,
        })
        res.status(200).json({data: menu})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the menu"})
    }
}

// deleteMenu
export const deleteMenu = async (req: any, res: any) => {
    try {
        const menuId = req.params.id
        await prisma.menu.delete({
            where: {
                id: menuId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the menu"})
    }
}