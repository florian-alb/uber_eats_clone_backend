import type {Request, Response} from "express";
import {prisma} from "../../prisma/db";
import {
    generateAccessToken,
    generateRefreshToken,
    isRefreshTokenExpiredOrInvalid,
    validatePassword,
} from "../utils/auth";
import {getUserByEmail} from "../services/user.services";

export const signIn = async (req: Request, res: Response) => {
    const {email, password} = req.body

    try {
        // check if user exist
        const existingUser = await getUserByEmail(email);

        if (!existingUser) return res.status(400).json({message: "Email or incorrect password"});

        const isPasswordValid = await validatePassword(password, existingUser.password)

        if (!isPasswordValid) return res.status(400).json({message: "Email or incorrect password"});

        const tokens = await setTokens(existingUser.id, res)

        return res.status(200).json(tokens)
    } catch (e) {
        throw new Error(e)
    }
}

const setTokens = async (id: string, res: Response): Promise<{ accessToken: string, refreshToken: string }> => {
    const accessToken = await generateAccessToken(id)
    const refreshToken = await generateRefreshToken(id)

    res.cookie('Authorization', `Bearer ${accessToken}`, {
        httpOnly: true,
        maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME) * 1000
    });
    res.cookie('Refresh', refreshToken, {
        httpOnly: true,
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME) * 1000
    });

    return {accessToken, refreshToken}
}

export const logout = async (res: Response) => {

    console.log(res)
    res.clearCookie('Authorization');
    res.clearCookie('Refresh');
    return res.status(200).redirect('/login');
}

export const refresh = async (req: Request, res: Response) => {
    let refreshToken = req.cookies['Refresh']

    const refreshPayload = await isRefreshTokenExpiredOrInvalid(refreshToken);

    if (!refreshToken || !refreshPayload) {
        res.clearCookie('Authorization');
        res.clearCookie('Refresh');
        return res.sendStatus(403);
    }

    res.clearCookie('Authorization');
    res.clearCookie('Refresh');

    const tokens = await setTokens(refreshPayload.id, res)

    return res.status(200).json({tokens})
}