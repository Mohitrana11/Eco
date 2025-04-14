import { NextFunction, Request, Response } from "express";

import { catchAsyncError } from "./error";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/user";

const adminOnly = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query;
    if (!id) {
      return next(new ErrorHandler("Login first", 404));
    }

    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("I dont know how you are ", 404));
    }

    if (user.role != "admin") {
      return next(new ErrorHandler("You are not allowed", 404));
    }
    next();
  }
);

const isAuthorizeUser = (req: Request, res: Response) => {
  // const token = req.body.token;
};
