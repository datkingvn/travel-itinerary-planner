import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import addressModel from "../models/address.model";
import personalInfoModel from "../models/personal-info.model";
import { roles } from "../config/role";

// Register user [POST]
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, address, personalInfo } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new address (if any)
    let newAddress;
    if (address) {
      newAddress = new addressModel(address);
      await newAddress.save();
    }

    // Create new personal information (if any)
    let newPersonalInfo;
    if (personalInfo) {
      newPersonalInfo = new personalInfoModel(personalInfo);
      await newPersonalInfo.save();
    }

    // Create new User
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      address: newAddress?._id,
      personalInfo: newPersonalInfo?._id,
      role: roles.USER,
    });

    await newUser.save();

    // Create Token
    const accessToken = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    // Remove roles and passwords from user object before returning
    const {
      role,
      password: omittedPassword,
      ...sanitizedUser
    } = newUser.toObject();

    res.status(201).json({ accessToken, user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng ký người dùng", error });
  }
};
