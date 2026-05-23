import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // ✅ Admin pages pe footer nahi dikhega
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Outlet />
      {!isAdminPage && <Footer />} {/* ✅ Admin pe hide */}
    </>
  );
};

export default Layout;