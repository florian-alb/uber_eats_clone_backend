import {PrismaClient} from "@prisma/client";

const userClient = new PrismaClient().user

// getAllUsers
export const getAllUsers = async (req: any, res: any) => {
    try {
        const allUsers = await userClient.findMany({
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
        const user = await userClient.findUnique({
            where: {
                id: userId,
            },
            include: {
                addresses: true,
                orders: true,
                shop: true,
            }
        })
        if (user) {
            res.status(200).json({data: user});
        } else {
            res.status(404).json({message: `The user with ID ${userId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the user with ID ${req.params.id}`});
    }
};


// createUser
export const createUser = async (req: any, res: any) => {
    try {
        const userData = req.body
        const user = await userClient.create({
            data: userData,
        })
        res.status(201).json({data: user})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new user"})
    }
}

// updateUser
export const updateUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id
        const userData = req.body
        const user = await userClient.update({
            where: {
                id: userId,
            },
            data: userData,
        })
        res.status(200).json({data: user})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the user"})
    }
}

// deleteUser
export const deleteUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id
        await userClient.delete({
            where: {
                id: userId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the user"})
    }
}