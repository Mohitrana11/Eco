import React, { useEffect, useState } from "react";

const cartItems = [
  {
    id: 1,
    imgs: "https://imgs.search.brave.com/R_jjXxPaml07duJENbzbI3j_o1YX6LmRm5GijzTyPCc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXNraW5jYXJlLmNv/bS9jZG4vc2hvcC9m/aWxlcy9EQUlMWV9f/MV9hMDM5NzJlMi1j/NzgxLTRmOWYtYjdm/ZC0xZGI1OTZhMDBh/NzAuanBnP3Y9MTcx/MjI0MDU1MyZ3aWR0/aD0xODAw",
    name: "Cut-Out Sweater",
    gender: "Women's",
    color: "Grey",
    price: 46.0,
    quantity: 1,
  },
];

const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 0; // Assume free shipping
const total = subtotal + tax + shippingCharges;

function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setValidCouponCode] = useState(false);

  useEffect(() => {
    // Simple example: assuming any non-empty string is valid
    setValidCouponCode(couponCode.trim() !== "");
  }, [couponCode]);

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4 bg-gray-100">
      <div className="flex-grow bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Bag</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="border-b py-4 flex justify-between">
            <div>
              <img src={item.imgs} alt="product Image" />
              <p className="font-bold">{item.name}</p>
              <p>
                Gender: {item.gender}, Color: {item.color}
              </p>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <div className="quantity-control">
                <button className="decrease">-</button>
                <span className="quantity-display">1</span>
                <button className="increase">+</button>
              </div>
            </div>
            <p className="text-xl font-bold">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        <p className="text-lg font-semibold mt-4">
          Subtotal: ₹{subtotal.toFixed(2)}
        </p>
      </div>
      <div className="w-full md:w-1/3 bg-white p-6 rounded-md shadow-md mt-4 md:mt-0 md:ml-4">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p>Product Total: ₹{subtotal.toFixed(2)}</p>
        <p>Tax: ₹{tax}</p>
        <p>Shipping: FREE</p>
        <div className="border-t my-4"></div>
        <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>

        <h2 className="text-xl font-semibold mt-4">Promo Code</h2>
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        {isValidCouponCode && couponCode && (
          <span className="text-green-600">
            Applied: ₹{23} off using {couponCode}
          </span>
        )}
        <button className="mt-4 bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
          Checkout
        </button>
        <p className="mt-4 text-gray-500 text-sm">
          By placing your order, you agree to our Delivery Terms.
        </p>
      </div>
    </div>
  );
}

export default Cart;
