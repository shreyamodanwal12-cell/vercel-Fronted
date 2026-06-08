import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
