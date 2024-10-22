const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the schema for the Vandor model
const VandorSchema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodtype: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String], required: false },
    rating: { type: Number },
    foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "food" }]
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createAt;
            delete ret.updatedAt;
            return ret;
        },
    },
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Vandor model using the schema
const VandorModel = model('Vandor', VandorSchema);

module.exports = { VandorModel };
