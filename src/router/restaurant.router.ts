import {Router} from "express";

import {getAllRestaurants, createRestaurant, deleteRestaurant, updateRestaurant, getRestaurantById} from "../controllers/restaurant.controller";

const restaurantRouter = Router()

restaurantRouter.get('/', getAllRestaurants)
restaurantRouter.get("/:id", getRestaurantById)
restaurantRouter.post('/', createRestaurant)
restaurantRouter.put("/:id", updateRestaurant)
restaurantRouter.delete("/:id", deleteRestaurant)

export default restaurantRouter