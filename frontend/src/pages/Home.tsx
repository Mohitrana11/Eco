import React from "react";
import ProductCard1 from "../components/designs/ProductCard1";
import ProductCard2 from "../components/designs/ProductCard2";

function Home() {
  return (
    <>
      <div>
        <div>Home Page</div>
        <div className="w-full h-full md:mx-[4%]">
          <ProductCard1 />
          <ProductCard2 />
        </div>
      </div>
    </>
  );
}

export default Home;
