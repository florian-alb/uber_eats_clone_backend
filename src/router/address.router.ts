import {Router} from "express";
import {createAddress, deleteAddress, getAddressById, updateAddress} from "../controllers/address.controller";

const addressRouter = Router()

addressRouter.get("/:id", getAddressById)
addressRouter.post('/', createAddress)
addressRouter.put("/:id", updateAddress)
addressRouter.delete("/:id", deleteAddress)

export default addressRouter