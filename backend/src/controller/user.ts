import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { newUserRequestBody } from "../types/type";
import { catchAsyncError } from "../middlewares/error";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";

const register = catchAsyncError(
  async (
    req: Request<{}, {}, newUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, dob, gender, photo } = req.body;

    if (!name || !email || !dob || !password || !gender || !photo) {
      return next(new ErrorHandler("Please provide all details", 400));
    }

    const isEmail = await User.findOne({ email });

    if (isEmail) {
      return next(
        new ErrorHandler(
          "This email already exists. Please use a different email.",
          400
        )
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      dob: new Date(dob),
      gender,
      photo,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: 2 * 1000 * 60 * 24,
    });

    res
      .status(201)
      .cookie("token", token)
      .json({
        success: true,
        message: `Welcome, ${user.name}. Your registration was successful.`,
        userId: user._id,
      });
  }
);

const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide your email and password", 400)
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User  not found", 404));
    }

    const isPasswordValid = await user.compareHash(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Wrong password", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: 2 * 1000 * 60 * 24,
    });

    return res
      .status(200)
      .cookie("token", token)
      .json({
        success: true,
        message: `Welcome back, ${user.name}`,
        userId: user._id,
        token,
      });
  }
);

const logout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "", {
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
  const user = await User.find({});

  res.status(200).json({
    success: true,
    count: user.length,
    user,
  });
});

const getSingleUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export { register, login, getAllUsers, logout, getSingleUser };
