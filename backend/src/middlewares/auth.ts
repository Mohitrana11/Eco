import { catchAsyncError } from "./error";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../models/user";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const isAuthorize = catchAsyncError(
  async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = await User.findById(decoded._id);
    if (req.user) {
      return next(new ErrorHandler("User  not found", 404));
    }

    next();
  }
);

const adminOnly = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler("Please Login First", 401));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User Doesn't found", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler("You can't access this resource", 403));

    next();
  }
);

export { isAuthorize, adminOnly };
