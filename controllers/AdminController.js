
const { VandorModel } = require("../model/vandor");
const { GeneratePassword, GenerateSalt } = require("../utility/PasswordUtiliyt");

const Findvandor = async (id, email) => {
    if (email) {
        return await VandorModel.findOne({ email: email });
    } else {
        return await VandorModel.findById(id);
    }
}

// Create a new Vandor
const CreateVandor = async (req, res, next) => {
    const { name, address, ownerName, email, password, foodtype, phone, pincode } = req.body;

    const existingVandor = await Findvandor("", email.toString());

    if (existingVandor != null) {
        return res.json({ "message": "A Vandor already exists with this email Id" });
    }

    // Generate a salt
    const salt = await GenerateSalt();
    const userpassword = await GeneratePassword(password.toString(), salt);

    // Create new Vandor with encrypted password
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
        foods: [],
    });

    return res.json(createVandor);
}

const GetVandors = async (req, res, next) => {
    const vandor = await VandorModel.find();
    if (vandor != null) {
        return res.json(vandor);
    }
    return res.json({ "message": "Vandors data not available" });
}

const GetVandorByID = async (req, res, next) => {
    const vandorId = req.params.id;
    const vandor = await Findvandor(vandorId);

    if (vandor != null) {
        return res.json(vandor);
    }
    return res.json({ "message": "Vandor data not available" });
}

module.exports = {
    Findvandor,
    CreateVandor,
    GetVandors,
    GetVandorByID
};
