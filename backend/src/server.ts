import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

import NodeCache from "node-cache";
export const myCache = new NodeCache();

import { dbConnect } from "./utils/feature";
dbConnect();

app.get("/", (req: Request, res: Response) => {
  res.send("send data to me");
  console.log("This is running!");
});

// Your routers go here
import userRouter from "./router/user";
app.use("/api/v1/user/", userRouter);

// Product Routers:
import productRouter from "./router/product";
app.use("/api/v1/product/", productRouter);

app.use("/uploads", express.static("uploads"));

import { errorMiddleware } from "./middlewares/error";
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
