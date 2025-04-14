import mongoose, { NumberExpression, Schema } from "mongoose";

interface iProduct extends Document {}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter name"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter name"],
    },
    discription: {
      type: String,
      required: [true, "Please enter discription"],
    },
    category: {
      type: String,
      required: [true, "Please engter product category"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("productdb", productSchema);
export default Product;
