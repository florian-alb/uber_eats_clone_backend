import {prisma} from "../../prisma/db";

export const getUserByEmail = async (email:string) => {
    return prisma.user.findUnique(
        {
            where: {
                email: email,
            },
        }
    );
}