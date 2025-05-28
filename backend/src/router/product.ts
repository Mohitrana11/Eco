import express from "express";

import {
  createProduct,
  deleteProduct,
  getAdminProduct,
  // getAllProduct,
  getCategoryProduct,
  getLatestProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/product";

import { singleUpload } from "../middlewares/multer";
import { adminOnly, isAuthorize } from "../middlewares/auth";

const router = express.Router();

router.post("/new", isAuthorize, singleUpload, createProduct);
router.get("/latest", isAuthorize, getLatestProduct);
router.get("/category", isAuthorize, getCategoryProduct);
router.get("/admin-product", isAuthorize, adminOnly, getAdminProduct);
router.get("/:id", isAuthorize, getSingleProduct);
router.put("/update/:id", isAuthorize, adminOnly, updateProduct);
router.delete("/delete/:id", isAuthorize, deleteProduct); // TODO: make this route admin router:
// router.get("/", isAuthorize, getAllProduct);

export default router;
