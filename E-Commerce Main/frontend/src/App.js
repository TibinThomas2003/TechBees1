// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Orders from "./Pages/Orders";
import CustomPC from "./Pages/CustomPC";
import Signup from "./Pages/Signup";
import ViewProduct from "./Pages/ViewProduct";
import ViewCategory from "./Pages/ViewCategory";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminAddProduct from "./Admin/AdminAddProduct";
import AdminViewAllUsers from "./Admin/AdminViewAllUsers";
import AdminViewAllProduct from "./Admin/AdminViewAllProducts";
import AdminUpdateProduct from "./Admin/AdminUpdateProduct";
import AdminManageHome from "./Admin/AdminManageHome";
import PlaceOrder from "./Pages/PlaceOrder";
import PlaceOrderCart from "./Pages/PlaceOrderCart";
import { AdminViewOrders } from "./Admin/AdminViewOrders";
import ProfilePage from "./Pages/Profile";
import { Contact } from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./Components/Navbar/Footer";
import PlaceOrderCustomPC from "./Pages/PlaceOrderCustomPC";
import  CustomOrders  from "./Pages/CustomOrders";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null); // Add state for user ID

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      const user = JSON.parse(userSession);
      setIsLoggedIn(true);
      setUserEmail(user.email);
      setUserId(user.id); // Set the user ID from the session
    }
  }, []);

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = (user) => {
    // Set user session in localStorage
    localStorage.setItem("userSession", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserEmail(user.email);
    setUserId(user.id);
  };

  const handleLogout = () => {
    const logoutConfirmed = window.confirm("Are you sure you want to log out?");

    if (logoutConfirmed) {
      // Clear user session from localStorage and sessionStorage
      localStorage.removeItem("userSession");
      localStorage.clear();
      sessionStorage.clear();
      setIsLoggedIn(false);
      setUserEmail("");
      setUserId(null); // Reset the user ID
      window.location.href = '/login';
    } else {
      alert("Logout canceled. You are still logged in.");
    }
  };

  // Check if the secret key and token key are present in the session storage
  const isAdminLoggedIn = localStorage.getItem("userEmail");

  return (
    <Router>
      <div>
        <Navbar
          cartItemCount={getCartItemCount()}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/home" element={<Home />} />
          {/* Pass cartItems and setCartItems as props */}
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} setuserId={userId} />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/custom" element={<CustomPC />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} userId={userId} />
          <Route path="/viewcategory/:category" element={<ViewCategory />} />
          <Route path="/placeorder/:id" element={<PlaceOrder />} />
          <Route path="/placeordercart" element={<PlaceOrderCart />} />
          <Route path="custom/placeordercustompc" element={<PlaceOrderCustomPC />} />
          <Route path="/customorder" element={<CustomOrders />} />


          {/* Protected admin routes */}
          {isAdminLoggedIn === "admin@gmail.com" && (
            <>
              <Route
                path="/admindashboard"
                element={<AdminDashboard handleLogout={handleLogout} />}
              />
              <Route
                path="/adminaddproduct"
                element={<AdminAddProduct />}
              />
              <Route
                path="/adminviewallusers"
                element={<AdminViewAllUsers />}
              />
              <Route
                path="/adminviewallproduct"
                element={<AdminViewAllProduct />}
              />
              <Route
                path="/adminupdateproduct/:productId"
                element={<AdminUpdateProduct />}
              />
              <Route
                path="/adminvieworders"
                element={<AdminViewOrders />}
              />
              <Route
                path="/adminmanagehome"
                element={<AdminManageHome />}
              />
            </>
          )}
          <Route
            path="*"
            element={!isAdminLoggedIn ? <Navigate to="/login" /> : null}
          />
        </Routes>
      </div>
      &nbsp;&nbsp;
      {isAdminLoggedIn !== "admin@gmail.com" && <Footer />}
    </Router>
  );

}

export default App;
