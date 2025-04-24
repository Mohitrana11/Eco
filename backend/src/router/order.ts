import express from "express";
import {
  allOrder,
  deleteOrder,
  getSingleProduct,
  myOrders,
  newOrder,
  processOrder,
} from "../controller/Order";

const router = express.Router();

// route - /api/v1/order/new
router.post("/new", newOrder);

// route - /api/v1/order/my
router.get("/my", myOrders);

// route - /api/v1/order/my
router.get("/all", allOrder);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(processOrder)
  .delete(deleteOrder);

export default router;
