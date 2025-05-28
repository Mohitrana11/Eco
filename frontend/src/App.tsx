import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";

const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            {/* Login user Routes:   */}
            <Route>
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:details" element={<OrderDetails />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
