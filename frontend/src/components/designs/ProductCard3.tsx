import React from "react";
import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
type productProps = {
  productId: string;
  price: number;
  stock: number;
  name: string;
  photo: string;
  handler: () => void;
};
import "../../style/ProductCard.css";
const server: string = "asfasfrease";

function ProductCard3({
  productId,
  name,
  price,
  stock,
  photo,
  handler,
}: productProps) {
  return (
    <>
      <div className="relative product-container ml-4 w-[220px] h-[260px] bg-white rounded-lg shadow-lg  ">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A man wearing a blue printed cotton blend straight kurta"
          className="w-full h-[68%]"
        />
        <div className="p-3 relative">
          <h2 className="text-lg font-bold">FUBAR</h2>
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold text-black">₹ 399</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹ 1499
            </span>
          </div>
        </div>

        <div className=" to-indigo-100 justify-end mt-0 absolute w-full h-full product-order-slide ">
          <button className=" cursor-pointer hover:scale-105 hover:duration-100 bg-blue-500 text-white rounded-full p-2">
            <FaCartShopping className="cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard3;
