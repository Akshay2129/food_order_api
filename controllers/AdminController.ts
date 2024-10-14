import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { VandorModel } from "../model";
import { GeneratePassword, GenerateSalt } from "../utility";


export const Findvandor = async (id: string | undefined, email?: string) => {

    if (email) {
        return await VandorModel.findOne({ email: email });

    } else {
        return await VandorModel.findById(id);

    }

}

//create a new Vandor
export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, ownerName, email, password, foodtype, phone, pincode } = <CreateVandorInput>req.body;

    const existingVandor = await Findvandor("", email.toString());

    if (existingVandor != null) {
        return res.json({ "message": "A Vandor is exist with this email Id" });
    }

    //generate a salt
    const salt = await GenerateSalt()
    const userpassword = await GeneratePassword(password.toString(), salt);


    //encrypted the password using the salt
    const createVandor = await VandorModel.create({
        name: name,
        address: address,
        pincode: pincode,
        foodtype: foodtype,
        email: email,
        password: userpassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],

    })
    return res.json(createVandor);

}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {

    const vandor = await VandorModel.find();
    if (vandor != null) {
        return res.json(vandor);
    }
    return res.json({ "message": "vandors data not available" });
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {

    const vandorId = req.params.id;
    const vandor = await Findvandor(vandorId);

    if (vandor != null) {
        return res.json(vandor);
    }
    return res.json({ "message": "vandors data not available" });

}