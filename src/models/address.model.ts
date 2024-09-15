import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

const addressSchema: Schema = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAddress>("Address", addressSchema);
