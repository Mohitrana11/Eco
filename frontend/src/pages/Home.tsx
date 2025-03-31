import React from "react";
// import ProductCard1 from "../components/designs/ProductCard1";
// import ProductCard2 from "../components/designs/ProductCard2";
import ProductCard3 from "../components/designs/ProductCard3";

function Home() {
  return (
    <>
      <div>
        <div>Home Page</div>
        <div className="w-full h-full md:mx-[4%]">
          <ProductCard3 />
          {/* <ProductCard1 /> */}
          {/* <ProductCard2 /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
