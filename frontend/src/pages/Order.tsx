import React from "react";

const orders = [
  {
    _id: "6546a0a722559f90da48b41f",
    amount: "165176",
    quantity: 1,
    discount: 0,
    status: "Processing",
  },
  // Additional orders can be added here
];

function Order() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-8">My Orders</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Discount</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.quantity}</td>
                <td className="py-2 px-4">{order.discount}</td>
                <td className="py-2 px-4">{order.amount}</td>
                <td className="py-2 px-4 text-red-500">{order.status}</td>
                <td className="py-2 px-4">
                  <button className="text-blue-500 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
