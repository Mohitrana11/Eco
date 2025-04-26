import express from "express";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controller/payment";

const router = express.Router();

// // route - /api/v1/payment/create
router.post("/create", createPaymentIntent);

router.get("/discount", applyDiscount);

router.post("/coupon/new", newCoupon);

router.get("/coupon/all", allCoupons);

// // route - /api/v1/payment/coupon/:id
router.delete("/coupon/:id", deleteCoupon);
//   .route("/coupon/:id")
//   .get(adminOnly, getCoupon)
//   .put(adminOnly, updateCoupon)

export default router;
