import mongoose from "mongoose";
import { invalidateCacheType } from "../types/type";
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
  admin,
}: invalidateCacheType) => {
  if (product) {
    const productKeys = ["latest-products", "categories", "all-products"];
    // const product = await Product.find({}).select('_id')
    const product = await Product.find({}).select("id");
    product.forEach((i) => {
      const ids = i.id;
      productKeys.push(`product-${i.id}`);
    });
    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};

export { dbConnect, invalidateCache };
