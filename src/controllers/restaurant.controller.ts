import {PrismaClient} from "@prisma/client";

const restaurantClient = new PrismaClient().restaurant

// getAllRestaurants
export const getAllRestaurants = async (req: any, res: any) => {
    try {
        const allRestaurant = await restaurantClient.findMany({
            include : {
                reviews: true,
                address: true,
                products: true,
            }
        })
        res.status(200).json({data: allRestaurant})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the restaurants"})
    }
}

// getRestaurantById
export const getRestaurantById = async (req: any, res: any) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurantClient.findUnique({
            where: {
                id: restaurantId,
            },
            include : {
                reviews: true,
                address: true,
                products: true,
                User: true,
                orders: true
            }
        })
        if (restaurant) {
            res.status(200).json({data: restaurant});
        } else {
            res.status(404).json({message: `The restaurant with ID ${restaurantId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the restaurant with ID ${req.params.id}`});
    }
};

// createRestaurant
export const createRestaurant = async (req: any, res: any) => {
    try {
        const restaurantData = req.body
        const restaurant = await restaurantClient.create({
            data: restaurantData,
        })
        res.status(201).json({data: restaurant})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new restaurant"})
    }
}

// updateRestaurant
export const updateRestaurant = async (req: any, res: any) => {
    try {
        const restaurantId = req.params.id
        const restaurantData = req.body
        const restaurant = await restaurantClient.update({
            where: {
                id: restaurantId,
            },
            data: restaurantData,
        })
        res.status(200).json({data: restaurant})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the restaurant"})
    }
}

// deleteRestaurant
export const deleteRestaurant = async (req: any, res: any) => {
    try {
        const restaurantId = req.params.id
        await restaurantClient.delete({
            where: {
                id: restaurantId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the restaurant"})
    }
}