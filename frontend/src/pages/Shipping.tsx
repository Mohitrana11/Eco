import React, { useState } from "react";

function Shipping() {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shipping Info Submitted: ", shippingInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 pt-[70px]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Shipping Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={shippingInfo.address}
              onChange={changeHandler}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={shippingInfo.city}
              onChange={changeHandler}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={shippingInfo.state}
              onChange={changeHandler}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={shippingInfo.country}
              onChange={changeHandler}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="pincode"
            >
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              id="pincode"
              value={shippingInfo.pincode}
              onChange={changeHandler}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
