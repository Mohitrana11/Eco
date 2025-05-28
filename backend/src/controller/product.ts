import { NextFunction, Request, response, Response } from "express";
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
    const { name, price, stock, description, category, photo } = req.body;
    // const photo = req.files as Express.Multer.File[] | undefined;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

    if (photo.length < 1)
      return next(new ErrorHandler("Please add atleast one Photo", 400));

    if (photo.length > 5)
      return next(new ErrorHandler("You can only upload 5 Photos", 400));

    if (!name || !price || !stock || !description || !category) {
      return next(new ErrorHandler("All are required ", 404));
    }

    const product = await Product.create({
      name,
      photo: photo || "provide photo",
      price,
      stock,
      description,
      category: category.toLowerCase(),
    });

    await invalidateCache({ product: true });
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
      products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
      myCache.set("latest-product", JSON.stringify(products));
    }

    return res.status(201).json({
      success: true,
      message: "New products",
      productCount: products.length,
      products,
    });
  }
);

// Product By Category:
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

// get a single Product Details
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

// Update single Product
const updateProduct = catchAsyncError(
  async (
    req: Request<{}, {}, newProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params;
    const { name, price, stock, category, description, photo } = req.body;

    const product = await Product.findById(id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (description) product.description = description;
    if (photo) product.photo = photo;

    await product.save();
    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
  }
);

// Delete single Product
const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      next(new ErrorHandler("Product not found", 404));
    }
    const product_name = product?.name;
    console.log(product_name);

    await Product.deleteOne({ _id: id });
    await invalidateCache({ product: true });

    return res.status(200).json({
      success: true,
      message: `Product ${product_name} deleted Successfully`,
    });
  }
);

// Get ALl Product: TODO: right know this getAllProduct Not working not working -- fix this
// const getAllProduct = catchAsyncError(
//   async (
//     req: Request<{}, {}, searchRequestQuery>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { search, sort, category, price } = req.query;
//     const page = Number(req.query.page) || 1;

//     const limit = Number(process.env.PRODUCT_PAR_PAGE) || 8;
//     const skip = (page - 1) * limit;

//     const baseQuery: baseQueryType = {};

//     if (search) {
//       baseQuery.name = {
//         $regex: search,
//         $options: "i",
//       };
//     }

//     if (price) {
//       baseQuery.price = {
//         $lte: Number(price),
//       };
//     }

//     if (category) {
//       baseQuery.category = category;
//     }

//     const [products, filteredOnlyProduct] = await Promise.all([
//       Product.find(baseQuery)
//         .sort(sort && { price: sort === "asc" ? 1 : -1 })
//         .limit(limit)
//         .skip(skip),
//       Product.find(baseQuery),
//     ]);

//     const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
//     return res.status(200).json({
//       success: true,
//       products,
//       totalPage,
//     });
//   }
// );

export {
  createProduct,
  getLatestProduct,
  getCategoryProduct,
  getSingleProduct,
  getAdminProduct,
  updateProduct,
  deleteProduct,
  // getAllProduct,
};
