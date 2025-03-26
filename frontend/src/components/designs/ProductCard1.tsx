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

const server: string = "asfasfrease";

function ProductCard1({
  productId,
  name,
  price,
  stock,
  photo,
  handler,
}: productProps) {
  return (
    <>
      <div className="ml-4 w-[270px] h-[350px] bg-white rounded-lg shadow-lg overflow-hidden ">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A man wearing a blue printed cotton blend straight kurta"
          className="w-full"
        />
        <div className="p-3 relative">
          <h2 className="text-lg font-bold">FUBAR</h2>
          <p className="text-gray-600 text-[15px]">
            Men Printed Cotton Blend Straight Kurta
          </p>
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold text-black">₹ 399</span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹ 1499
            </span>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              <CiStar className="text-[19px] " />
              <CiStar className="text-[19px] " />
              <CiStar className="text-[19px] " />
              <CiStar className="text-[19px] " />
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
          <div className="flex justify-end mt-0 absolute right-5 bottom-[26px]">
            <button className=" cursor-pointer hover:scale-105 hover:duration-100 bg-blue-500 text-white rounded-full p-2">
              <FaCartShopping className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard1;
