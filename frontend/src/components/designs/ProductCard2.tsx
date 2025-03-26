import React from "react";

function ProductCard2() {
  return (
    <>
      <div>
        <div className="card card-side w-[500px] bg-base-100 shadow-sm bg-gray-100 flex flex-row m-3 rounded-xl overflow-hidden">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              alt="Movie"
              className="w-[20vw] h-[200px]"
            />
          </figure>
          <div className="card-body m-4">
            <h2 className="text-[22px]">New movie is released!</h2>
            <p>
              Click the button to watch on Jetflix app. Lorem ipsum dolor sit
              amet c
            </p>
            <p className="my-3">
              <span>Price</span>: <span>₹34</span>
              <span className="text-md text-gray-500 line-through ml-2 ">
                ₹234234
              </span>
            </p>
            <div className="card-actions justify-end">
              <button className="border-none bg-green-200 hover:scale-105 hover:delay-150 hover:transform-view rounded-lg px-2 cursor-pointer py-1 ">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard2;
