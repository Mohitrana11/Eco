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
    const { name, email, dob, gender, photo } = req.body;
    if (!name || !email || !dob || !gender || !photo) {
      return next(new ErrorHandler("Please provide all details", 400));
    }
    // const isEmail = await User.find({ email });
    // if (isEmail) {
    //   next(
    //     new ErrorHandler(
    //       "This user email already exist so use different Email",
    //       400
    //     )
    //   );
    // }

    const user = await User.create({
      name,
      email,
      dob: new Date(dob),
      gender,
      photo,
    });
    res.status(201).json({
      success: true,
      message: `Welcome,${user.name}`,
    });
  }
);

const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Please provide you email", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Please user not found", 400));
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
  const users = await User.find({});

  res.status(200).json({
    success: true,
    // count: users.length,
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
