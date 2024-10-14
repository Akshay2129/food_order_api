import mongoose, { Schema, Document, model } from "mongoose";

// Define the interface for the Vandor document
interface VandorDoc extends Document {
    name: string;
    ownerName: string;
    foodtype: string[];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    // foods: any;
}

const VandorSchema = new Schema<VandorDoc>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodtype: { type: [String], },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, },
    coverImages: { type: [String], required: false },
    rating: { type: Number, },
    // foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Food" }]
}, {
    toJSON:{
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createAt;
            delete ret.updatedAt;
            return ret;
        },
    },
    timestamps: true,
});


const VandorModel = model<VandorDoc>('Vandor', VandorSchema);

export { VandorModel };
