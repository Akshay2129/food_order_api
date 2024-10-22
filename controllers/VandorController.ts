import { Request, Response, NextFunction } from "express";
import { EditVandorInputs, VandorLoginInputs } from "../dto";
import { Findvandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { CreateFoodinputs } from "../dto/food.dto";
import { Food } from "../model";

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


export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const { name, description, category, foodType, readyTime, price, } = <CreateFoodinputs>req.body;

        const vandor = await Findvandor(user._id.toString());

        if(vandor !=null){
            const createFood=await Food.create({
                vandorId: vandor._id,
                name:name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images:["asdsad"],
                rating:0
            })
            vandor.foods.push(createFood);
            const saveVandor= await vandor.save();
            return res.json(saveVandor)
        }
 
    }

    return res.json({ "message": "something went worng with add food" });
};

// export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;

//     if (user) {
//             const foods= await Food.find({vandorId:user._id})
//             if(foods !=null){
//                 return res.json(foods);
//             }
//     }

//     return res.json({ "message": "Foods information Not Found" });
// };

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
   
    const foods = await Food.find();
    if (foods != null) {
        return res.json(foods);
    }
    return res.json({ "message": "foodss data not available" });
}
