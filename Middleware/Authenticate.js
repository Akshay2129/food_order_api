const { ValidateSignature } = require('../utility/PasswordUtiliyt'); // Adjust the import path as needed

const Authenticate = async (req, res, next) => {
    const validate = await ValidateSignature(req);

    if (validate) {
        next();
    } else {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { Authenticate };
