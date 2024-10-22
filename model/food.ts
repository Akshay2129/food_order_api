import mongoose, { Schema, Document, model } from "mongoose";

interface FoodDoc extends Document {
    vandorId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string]
}

const foodSchema = new Schema<FoodDoc>({

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
    timestamps: true,
});

const Food = model<FoodDoc>('food', foodSchema);

export { Food };