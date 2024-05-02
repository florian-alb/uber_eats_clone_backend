import {Router} from "express";
import {logout, refresh, signIn} from "../controllers/auth.controller";
import multer from "multer";

const authRouter = Router()

authRouter.post('/sign-in',multer().none(), signIn)
authRouter.post('/logout', logout)
authRouter.post('/refresh', refresh)

export default authRouter