// components/layout/AuthLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarousel";
import NavBar from "./NavBar";

function AuthLayout() {
  const location = useLocation();

  // show carousel only on home ("/"), not on /login or /register
  const showCarousel = location.pathname === "/";

  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Carousel only on "/" */}
      {showCarousel && (
        <header>
          <ImageCarousel />          
        </header>
      )}

      {/* This is where Login / Register will render */}
      <main className="">         
         <Outlet />   
      </main>
    </div>
  );
}

export default AuthLayout;
