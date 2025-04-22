import express from "express";

import {
  createProduct,
  deleteProduct,
  getAdminProduct,
  getAllProduct,
  getCategoryProduct,
  getLatestProduct,
  getSingleProduct,
  updateProduct,
} from "../controller/product";
import { singleUpload } from "../middlewares/multer";
import { getEventListeners } from "events";

const router = express.Router();

router.post("/new", singleUpload, createProduct);
router.get("/latest", getLatestProduct);
router.get("/category", getCategoryProduct);
router.get("/admin-product", getAdminProduct);
router.get("/:id", getSingleProduct);
router.get("/update", updateProduct);
router.get("/delete", deleteProduct);
router.get("/all", getAllProduct);

export default router;
