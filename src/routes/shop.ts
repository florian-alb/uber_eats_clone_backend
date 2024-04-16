import {Router} from "express";

const shopRouter = Router();

shopRouter.get('/', (req, res) => {
    //TODO: get the feed
});

shopRouter.get('/:id', (req, res) => {
    //TODO: get the store of a specific id
});

shopRouter.get('/:id/plat', (req, res) => {
    //TODO: get the menu of a specific store
});

export default shopRouter;