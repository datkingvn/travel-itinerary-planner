import mongoose, { Document, Schema } from "mongoose";
import { roles } from "../config/role";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  googleId: string;
  facebookId: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: mongoose.Types.ObjectId; // Tham chiếu đến bảng Address
  personalInfo?: mongoose.Types.ObjectId; // Tham chiếu đến bảng Personal Info
  role: string;
  refreshToken?: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    facebookId: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "PersonalInfo" },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: roles.USER,
    }, // Sử dụng cấu hình roles
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
