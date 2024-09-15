import mongoose, { Schema, Document } from "mongoose";

export interface IPersonalInfo extends Document {
  dateOfBirth: Date;
  preferredLanguage: string;
}

const personalInfoSchema: Schema = new Schema(
  {
    dateOfBirth: { type: Date },
    preferredLanguage: { type: String, default: "en" },
  },
  { timestamps: true }
);

export default mongoose.model<IPersonalInfo>(
  "PersonalInfo",
  personalInfoSchema
);
