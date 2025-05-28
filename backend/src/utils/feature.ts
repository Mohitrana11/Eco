import mongoose from "mongoose";
import { invalidateCacheType, OrderItemType } from "../types/type";
import { myCache } from "../server";
import Product from "../models/product";
const dbConnect = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/dbTest")
    .then(() => {
      console.log("connected with data base");
    })
    .catch((err) => {
      console.log("connect connect with database due to issue ", err);
    });
};

const invalidateCache = async ({
  product,
  order,
  userId,
  orderId,
}: invalidateCacheType) => {
  if (product) {
    // const productKeys = ["latest-products", "categories", "all-products"];
    // const product = await Product.find({}).select("id");
    // product.forEach((i) => {
    //   const ids = i._id;
    //   productKeys.push(`product-${i.id}`);
    // });
    // myCache.del(productKeys);
    myCache.flushAll();
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    // product.stock-= order.quantity;
    // product.stock-= order.quantity;
    await product.save();
  }
};

export { dbConnect, invalidateCache };
