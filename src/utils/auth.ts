import * as process from "process";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

export type Payload = {
    exp: number,
    id: string,
    iat: number
}

export const generateAccessToken = async (id: string) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
        id: id
    }, process.env.ACCESS_TOKEN_SECRET);
}

export const generateRefreshToken = async (id: string) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
        id: id
    }, process.env.REFRESH_TOKEN_SECRET);
}

export const validatePassword = async (inputPassword: string, password: string): Promise<boolean> => {
    return bcrypt.compare(inputPassword, password);
}


export const isRefreshTokenExpiredOrInvalid = async (token: string) => {
    try {
        const payload = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
        );
        return payload as Payload
    } catch (error) {
        return undefined;
    }
}

export const isAccessTokenExpiredOrInvalid = async (token: string) => {
    try {
        const payload = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        )
        return payload as Payload
    } catch (error) {
        return undefined;
    }
}