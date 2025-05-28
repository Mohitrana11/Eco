import mongoose, { NumberExpression, Schema } from "mongoose";

interface iProduct extends Document {
  name: string;
  photo: string;
  price: Number;
  stock: Number;
  description: string;
  category: string;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: [
      {
        public_id: {
          type: String,
          required: [true, "Please enter Public ID"],
        },
        url: {
          type: String,
          required: [true, "Please enter URL"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    description: {
      type: String,
      required: [true, "Please enter discription"],
    },
    category: {
      type: String,
      required: [true, "Please engter product category"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<iProduct>("productdb", productSchema);
export default Product;
