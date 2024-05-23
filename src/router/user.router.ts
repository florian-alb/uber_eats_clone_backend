import {Router} from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user.controller";
import multer from "multer";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get("/:id", getUserById)
userRouter.post('/', multer().none(), createUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter