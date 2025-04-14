import React, { useState } from "react";
import ProductCard3 from "../components/designs/ProductCard3";

function Search() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const isNextPage = page < 4;
  const isPrevPage = page > 1;
  return (
    <>
      <div className="bg-gray-100 pt-[70px]">
        <div className="container mx-auto p-4">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/4 p-4 bg-white shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Sort</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option>None</option>
                  <option>Price(low to high)</option>
                  <option>Price (high to low)</option>
                  <option>more</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Max Price: {maxPrice}
                </label>
                <input
                  className="w-full"
                  max="100000"
                  min="0"
                  type="range"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>All</option>
                  <option>All</option>
                  <option>All</option>
                </select>
              </div>
            </div>

            <div className="w-full lg:w-3/4 p-4">
              <h2 className="text-2xl font-semibold mb-4">PRODUCTS</h2>
              <div className="mb-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search by name"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 gap-y-1">
                <ProductCard3 />
                <ProductCard3 />
                <ProductCard3 />
              </div>
              <div className="flex items-center justify-center mt-[40px]">
                <button
                  disabled={!isPrevPage}
                  onClick={() => setPage((prev) => prev - 1)}
                  className="px-3 py-1 rounded-sm bg-green-300 cursor-pointer hover:scale-105 hover:duration-500 hover:delay-75 hover:bg-green-700 mr-4"
                >
                  Prev
                </button>
                <span>
                  {page} of {4}
                </span>
                <button
                  disabled={!isNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-3 py-1 rounded-sm bg-green-300 cursor-pointer hover:scale-105 hover:duration-500 hover:delay-75 hover:bg-green-700 ml-4"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
