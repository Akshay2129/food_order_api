import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { VandorPayload } from "../dto";
import { App_SECRET } from "../config";
import { AuthPayload } from "../dto/Auth.dto";

export const GenerateSalt = async (): Promise<string> => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt);
}


export const ValidatePassword = async (enteredPassword: string, savePassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savePassword;
}

export const GenerateSignature = (payload: VandorPayload) => {
    const signature = jwt.sign(payload, App_SECRET, { expiresIn: "30d" });

    return signature;
};


export const ValidateSignature = async (req: Request): Promise<AuthPayload | false> => {
    const signature = req.get('authorization');

    if (signature) {
        try {
            const token = signature.split(' ')[1];

            const payload = jwt.verify(token, App_SECRET) as AuthPayload;
            req.user = payload;

            return payload;
        } catch (error) {
            console.error("JWT verification error:", error);
            return false;
        }
    }
    return false;
};