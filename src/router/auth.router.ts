import {Router} from "express";
import {logout, refresh, signIn} from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post('/sign-in', signIn)
authRouter.post('/logout', logout)
authRouter.post('/refresh', refresh)

export default authRouter