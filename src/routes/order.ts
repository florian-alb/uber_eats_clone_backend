import {Router} from "express";

const orderRouter = Router();

orderRouter.get('/', (req, res) => {
    //TODO: get all the orders
});

orderRouter.get('/:id', (req, res) => {
    //TODO: get a specific id
});

export default orderRouter;
