import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children, isAuthenticated = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAuthenticated={isAuthenticated} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
