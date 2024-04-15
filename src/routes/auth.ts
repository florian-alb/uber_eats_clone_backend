import {Router} from "express";

const authRouter = Router();

authRouter.post('/register', (req, res) => {
    //TODO: implement the register logic
});

authRouter.post('/login', (req, res) => {
    //TODO: implement the login logic
});

authRouter.get('/account', (req, res) => {
    //TODO: only display the account page if the user is logged in
});

authRouter.get('/account/:id', (req, res) => {
    //TODO: get the account infos to display in the account page
});

export default authRouter;