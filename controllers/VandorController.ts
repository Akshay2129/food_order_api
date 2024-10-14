import { Request, Response, NextFunction } from "express";
import { EditVandorInputs, VandorLoginInputs } from "../dto";
import { Findvandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <VandorLoginInputs>req.body;

    const existingVandor = await Findvandor('', email.toString());

    if (existingVandor !== null) {
        // validation and give access
        const validation = await ValidatePassword(password.toString(), existingVandor.password, existingVandor.salt);

        if (validation) {

            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodtype: existingVandor.foodtype,
                name: existingVandor.name,
            })

            return res.json(signature)
        } else {
            return res.json({ "message": "password is not valid" });

        }
    }

    return res.json({ "message": "Login Credentials not valid" });
};


export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const existingVandor = await Findvandor(user._id.toString());
        return res.json(existingVandor)
    }

    return res.json({ "message": "Vandor information Not Found" });


};
export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { address, name, foodtype, phone } = <EditVandorInputs>req.body;
    const user = req.user;

    if (user) {
        const existingVandor = await Findvandor(user._id.toString());
        if (existingVandor !== null) {
            existingVandor.name = name.toString();
            existingVandor.address = address.toString();
            existingVandor.foodtype = foodtype;
            existingVandor.phone = phone.toString();

            const saveResult = await existingVandor.save();
            return res.json(saveResult);
        }
        return res.json(existingVandor)
    }

    return res.json({ "message": "Vandor information Not Found" });


};

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVandor = await Findvandor(user._id.toString());
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const saveResult = await existingVandor.save();
            return res.json(saveResult);
        }
        return res.json(existingVandor)
    }

    return res.json({ "message": "Vandor information Not Found" });
};