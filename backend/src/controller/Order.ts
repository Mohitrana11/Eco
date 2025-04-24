import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/error";
import { Order } from "../models/order";
import { NewOrderRequestBody } from "../types/type";
import ErrorHandler from "../utils/ErrorHandler";
import { invalidateCache, reduceStock } from "../utils/feature";
import { myCache } from "../server";

const myOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: user } = req.query;
    let orders = [];
    const key = `my-order-${user}`;
    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
      orders = await Order.find({ user });
      myCache.set(key, JSON.stringify(orders));
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  }
);

const allOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const key = `all-orders`;
    let orders;
    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
      orders = await Order.find().populate("user", "name");
      myCache.set(key, JSON.stringify(orders));
    }
    return res.status(200).json({
      success: true,
      orders,
    });
  }
);

const getSingleProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const key = `order-${id}`;

    let orders;

    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
      orders = await Order.find({ id });
      if (!orders) {
        return next(new ErrorHandler("Order not found ", 404));
      }
      myCache.set(key, JSON.stringify(orders));
    }
    return res.status(200).json({
      success: true,
      orders,
    });
  }
);

const newOrder = catchAsyncError(
  async (
    req: Request<{}, {}, NewOrderRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      total,
      discount,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
      return next(new ErrorHandler("Please Enter All Fields", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await invalidateCache({
      product: true,
      order: true,
      admin: true,
      // userId: user,
      // productId: order.orderItems.map((i) => String(i.productId)),
    });

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  }
);

const processOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler("Order Not Found", 404));
    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;
      default:
        order.status = "Delivered";
        break;
    }

    await order.save();
    await invalidateCache({
      product: false,
      order: true,
      admin: true,
    });

    return res.status(200).json({
      success: true,
      order,
    });
  }
);

const deleteOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler("Order Not Found", 404));

    await order.deleteOne();

    await invalidateCache({
      product: false,
      order: true,
      admin: true,
    });

    return res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  }
);
// const orderPlace

export {
  newOrder,
  myOrders,
  allOrder,
  getSingleProduct,
  deleteOrder,
  processOrder,
};
