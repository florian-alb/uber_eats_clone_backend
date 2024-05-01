import {Router} from "express";
import {logout, refresh, signIn} from "../controllers/auth.controller";
import multer from "multer";

const authRouter = Router()

authRouter.post('/sign-in',multer().none(), signIn)
authRouter.get('/logout', logout)
authRouter.post('/refresh', refresh)

export default authRouter