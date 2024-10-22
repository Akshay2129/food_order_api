const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the schema for the Food model
const foodSchema = new Schema({
    vandorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: false },
    foodType: { type: String, required: true },
    readyTime: { type: Number, required: false },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    images: { type: [String], required: false }
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret.createAt;
            delete ret.updatedAt;
            return ret;
        },
    },
    timestamps: true, // automatically adds createdAt and updatedAt fields
});

// Create the Food model using the schema
const Food = model('Food', foodSchema);

module.exports = { Food };
