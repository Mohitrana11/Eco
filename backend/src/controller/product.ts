import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middlewares/error";
import Product from "../models/product";
import ErrorHandler from "../utils/ErrorHandler";
import {
  baseQueryType,
  newProductRequestBody,
  searchRequestQuery,
} from "../types/type";
import { myCache } from "../server";
import { invalidateCache } from "../utils/feature";

const createProduct = catchAsyncError(
  async (
    req: Request<{}, {}, newProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, description, category } = req.body;
    const photo = req.file;
    if (!name || !price || !stock || !description || !category) {
      // rm(photo.path!, () => {
      //   console.log("photo deleted");
      // });
      return next(new ErrorHandler("All are required ", 404));
    }
    const product = await Product.create({
      name,
      photo: photo?.path || "abc",
      price,
      stock,
      description,
      category: category.toLowerCase(),
    });
    await invalidateCache({ product: true }); // Node-cache
    return res.status(201).json({
      success: true,
      message: "New product is created",
      product,
    });
  }
);

// Revalidate on New update and delete : node-cache:
const getLatestProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let products;
    if (myCache.has("latest-product")) {
      products = JSON.parse(myCache.get("latest-product") as string);
    } else {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
      myCache.set("latest-product", JSON.stringify(products)); //
    }

    return res.status(201).json({
      success: true,
      message: "New products",
    });
  }
);

const getCategoryProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let categories;
    if (myCache.has("categories")) {
      categories = JSON.parse(myCache.get("categories") as string);
    } else {
      categories = await Product.distinct("category");
      myCache.set("category", JSON.stringify(categories));
    }

    return res.status(201).json({
      success: true,
      categories,
    });
  }
);

const getAdminProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let categories;
    if (myCache.has("all-products")) {
      categories = JSON.parse(myCache.get("all-products") as string);
    } else {
      categories = await Product.distinct("category");
      myCache.set("all-products", JSON.stringify(categories));
    }

    return res.status(201).json({
      success: true,
      categories,
    });
  }
);

const getSingleProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    let product;

    if (myCache.has(`product-${id}`)) {
      product = JSON.parse(myCache.get(`product-${id}`) as string);
    } else {
      product = await Product.findById(id);
      if (!product) {
        next(new ErrorHandler("Product not found", 404));
      }
      myCache.set(`product-${id}`, JSON.stringify(product));
    }

    return res.status(201).json({
      success: true,
      product,
    });
  }
);

const updateProduct = catchAsyncError(
  async (
    req: Request<{}, {}, newProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params;
    const { name, price, stock, category, description } = req.body;
    // const photos = req.files as Express.Multer.File[] | undefined;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (description) product.description = description;

    await product.save();
    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
  }
);

const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      next(new ErrorHandler("Product not found", 404));
    }
    await Product.deleteOne();
    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  }
);

const getAllProduct = catchAsyncError(
  async (req: Request<{}, {}, {}, searchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PAR_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: baseQueryType = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };

    if (category) baseQuery.category = category;

    const [products, filteredOnlyProduct] = await Promise.all([
      await Product.find(baseQuery)
        .sort(sort && { price: sort == "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      await Product.find({ baseQuery }),
    ]);

    // const product = await Product.find(baseQuery)
    //   .sort(sort && { price: sort == "asc" ? 1 : -1 })
    //   .limit(limit)
    //   .skip(skip);

    // const filterProduct= await Product.find({baseQuery})
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);

export {
  createProduct,
  getLatestProduct,
  getCategoryProduct,
  getSingleProduct,
  getAdminProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
};
