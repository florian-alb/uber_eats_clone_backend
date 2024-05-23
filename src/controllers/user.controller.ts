import {prisma} from "../../prisma/db";
import {Request, Response} from "express";
import {getUserByEmail} from "../services/user.services";
import bcrypt from "bcrypt";

// getAllUsers
export const getAllUsers = async (req: any, res: any) => {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                orders: true
            }
        })
        res.status(200).json({data: allUsers})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the users"})
    }
}

// getUserById
export const getUserById = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                addresses: true,
                orders: true,
                shop: true,
            }
        })
        delete user.password;
        if (user) {
            res.status(200).json({user});
        } else {
            res.status(404).json({message: `The user with ID ${userId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the user with ID ${req.params.id}`});
    }
};

// createUser
export const createUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body
    // check if the user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) return res.status(400).json({message: "User already exists"})

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
            }
        })
        delete user.password;
        res.status(201).json(user)
    } catch (e) {
        res.status(501).json({error: e, message: "Error while creating a new user"})
    }
}

// updateUser
export const updateUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id
        const userData = req.body
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: userData,
        })
        delete user.password
        res.status(200).json(user)
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the user"})
    }
}

// deleteUser
export const deleteUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id
        await prisma.user.delete({
            where: {
                id: userId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the user"})
    }
}