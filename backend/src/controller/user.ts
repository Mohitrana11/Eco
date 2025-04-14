import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { newUserRequestBody } from "../types/type";
import { catchAsyncError } from "../middlewares/error";
import ErrorHandler from "../utils/ErrorHandler";

const register = catchAsyncError(
  async (
    req: Request<{}, {}, newUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, dob, gender, photo, role, _id } = req.body;
    const user = await User.create({
      name,
      email,
      dob,
      gender,
      photo,
      role,
      _id,
    });
    res.status(201).json({
      success: true,
      message: `Welcome,${user.name}`,
    });
  }
);

const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, _id } = req.body;

    if (!email || !_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and ID",
      });
    }

    const user = await User.findOne({ email, _id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user,
    });
  }
);

const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", {
      httpOnly: true,
      expires: new Date(Date.now() - 1),
    });
    res.status(200).json({
      success: true,
      message: "logout Successful",
    });
  }
);

const getAllUsers = catchAsyncError(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

const getUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export { register, login, getAllUsers, logout, getUsers };
