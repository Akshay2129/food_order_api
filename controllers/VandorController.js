const { Findvandor } = require("./AdminController");
const { GenerateSignature, ValidatePassword } = require("../utility/PasswordUtiliyt");
const { Food } = require("../model/food");

// Vandor Login
const VandorLogin = async (req, res, next) => {
    const { email, password } = req.body;

    const existingVandor = await Findvandor('', email.toString());

    if (existingVandor !== null) {
        // Validate password
        const validation = await ValidatePassword(password.toString(), existingVandor.password, existingVandor.salt);

        if (validation) {
            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodtype: existingVandor.foodtype,
                name: existingVandor.name,
            });
            return res.json(signature);
        } else {
            return res.json({ "message": "Password is not valid" });
        }
    }

    return res.json({ "message": "Login credentials are not valid" });
};

// Get Vandor Profile
const GetVandorProfile = async (req, res, next) => {
    const user = req.user;

    if (user) {
        const existingVandor = await Findvandor(user._id.toString());
        return res.json(existingVandor);
    }

    return res.json({ "message": "Vandor information not found" });
};

// Update Vandor Profile
const UpdateVandorProfile = async (req, res, next) => {
    const { address, name, foodtype, phone } = req.body;
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
        return res.json(existingVandor);
    }

    return res.json({ "message": "Vandor information not found" });
};

// Update Vandor Service Availability
const UpdateVandorService = async (req, res, next) => {
    const user = req.user;

    if (user) {
        const existingVandor = await Findvandor(user._id.toString());
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const saveResult = await existingVandor.save();
            return res.json(saveResult);
        }
        return res.json(existingVandor);
    }

    return res.json({ "message": "Vandor information not found" });
};

// Add Food
const AddFood = async (req, res, next) => {
    const user = req.user;

    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;

        const vandor = await Findvandor(user._id.toString());

        if (vandor != null) {
            const createFood = await Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images: ["asdsad"],
                rating: 0
            });
            vandor.foods.push(createFood);
            const saveVandor = await vandor.save();
            return res.json(saveVandor);
        }
    }

    return res.json({ "message": "Something went wrong with adding food" });
};

// Get All Foods
const GetFoods = async (req, res, next) => {
    const foods = await Food.find();
    if (foods != null) {
        return res.json(foods);
    }
    return res.json({ "message": "Foods data not available" });
};

module.exports = {
    VandorLogin,
    GetVandorProfile,
    UpdateVandorProfile,
    UpdateVandorService,
    AddFood,
    GetFoods
};
