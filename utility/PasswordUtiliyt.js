const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { App_SECRET } = require("../config/config");

// Generate a salt for password hashing
const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

// Generate a hashed password using the provided password and salt
const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

// Validate the entered password against the stored hashed password
const ValidatePassword = async (enteredPassword, savePassword, salt) => {
    const hashedPassword = await GeneratePassword(enteredPassword, salt);
    return hashedPassword === savePassword;
}

// Generate a JWT signature for the given payload
const GenerateSignature = (payload) => {
    const signature = jwt.sign(payload, App_SECRET, { expiresIn: "30d" });
    return signature;
};

// Validate the JWT signature from the request
const ValidateSignature = async (req) => {
    const signature = req.get('authorization');

    if (signature) {
        try {
            const token = signature.split(' ')[1];
            const payload = jwt.verify(token, App_SECRET);
            req.user = payload; // Attach the payload to the request object
            return payload;
        } catch (error) {
            console.error("JWT verification error:", error);
            return false;
        }
    }
    return false;
};

module.exports = {
    GenerateSalt,
    GeneratePassword,
    ValidatePassword,
    GenerateSignature,
    ValidateSignature
};
