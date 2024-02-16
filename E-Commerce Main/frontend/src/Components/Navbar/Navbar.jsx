import React, { useState } from 'react';
import './Navbar.css';
import logo from "../Assets/logo.png";
import pflicon from "../Assets/profile_icon.jpg";
import cartIcon from "../Assets/cart_icon.png";
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ cartItemCount, isLoggedIn, handleLogout }) => {
  const [menu, setMenu] = useState('home');

  const activeLinkStyle = {
    color: '#ff0000',
  };

  const handleMenuClick = (page) => {
    setMenu(page);
  };

  // Retrieve userEmail from local storage
  const userEmail = localStorage.getItem('userEmail');

  // Condition to hide Navbar if userEmail is "admin@gmail.com"
  if (userEmail === "admin@gmail.com") {
    return null; // Return null to hide the Navbar
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>TechBees</p>
      </div>
      <ul className="nav-menu">
        {isLoggedIn && (
          <>
          <li onClick={() => handleMenuClick("home")}>
              <NavLink to="/home" style={menu === "home" ? activeLinkStyle : {}}>
                Home
              </NavLink>
            </li>
            <li onClick={() => handleMenuClick("orders")}>
              <NavLink to="/orders" style={menu === "orders" ? activeLinkStyle : {}}>
                Orders
              </NavLink>
            </li>
            <li onClick={() => handleMenuClick("custom")}>
              <NavLink to="/custom" style={menu === "custom" ? activeLinkStyle : {}}>
                Custom PC
              </NavLink>
            </li>
            <li onClick={() => handleMenuClick("contact")}>
              <NavLink to="/contact" style={menu === "contact" ? activeLinkStyle : {}}>
                Contact
              </NavLink>
            </li>
            <li onClick={() => handleMenuClick("about")}>
              <NavLink to="/about" style={menu === "about" ? activeLinkStyle : {}}>
                About
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            <div className="profile-icon" onClick={() => handleMenuClick("profile")}>
              <img src={pflicon} alt="" />
            </div>
            <Link to={"/"}>
              <button onClick={handleLogout}>Logout</button>
            </Link>
            <NavLink to="/cart">
              <img src={cartIcon} alt="" />
            </NavLink>
            <div className="nav-cart-count">{cartItemCount}</div>
          </>
        ) : (
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
