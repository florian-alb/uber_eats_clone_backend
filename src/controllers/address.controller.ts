import {PrismaClient} from "@prisma/client";

const addressClient = new PrismaClient().address

// getAllAddresses
export const getAllAddresses = async (req: any, res: any) => {
    try {
        const allAddress = await addressClient.findMany()
        res.status(200).json({data: allAddress})
    } catch (e) {
        res.status(501).json({error: e, message: "error during getting the addresss"})
    }
}

// getAddressById
export const getAddressById = async (req: any, res: any) => {
    try {
        const addressId = req.params.id;
        const address = await addressClient.findUnique({
            where: {
                id: addressId,
            }
        })
        if (address) {
            res.status(200).json({data: address});
        } else {
            res.status(404).json({message: `The address with ID ${addressId} does not exist`});
        }
    } catch (e) {
        res.status(500).json({error: e, message: `An error occurred while fetching the address with ID ${req.params.id}`});
    }
};

// createAddress
export const createAddress = async (req: any, res: any) => {
    try {
        const addressData = req.body
        const address = await addressClient.create({
            data: addressData,
        })
        res.status(201).json({data: address})
    } catch (e) {
        res.status(501).json({error: e, message: "error while creating a new address"})
    }
}

// updateAddress
export const updateAddress = async (req: any, res: any) => {
    try {
        const addressId = req.params.id
        const addressData = req.body
        const address = await addressClient.update({
            where: {
                id: addressId,
            },
            data: addressData,
        })
        res.status(200).json({data: address})
    } catch (e) {
        res.status(501).json({error: e, message: "error while updating the address"})
    }
}

// deleteAddress
export const deleteAddress = async (req: any, res: any) => {
    try {
        const addressId = req.params.id
        await addressClient.delete({
            where: {
                id: addressId,
            }
        })
        res.status(200).json({})
    } catch (e) {
        res.status(501).json({error: e, message: "error while deleting the address"})
    }
}