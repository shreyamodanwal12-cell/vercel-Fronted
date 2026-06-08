import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layouts & Components
import Layout from "./layouts/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";

// Pages
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import BookDetailPage from "./pages/BookDetails";
import CategoriesPage from "./pages/Categories";
import AuthorsPage from "./pages/Authors";
import SearchResultsPage from "./pages/SearchResults";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import AdminPanelPage from "./pages/AdminPanel";
import BlogListingPage from "./pages/Blog";
import SingleBlogPage from "./pages/BlogPost";
import AboutUsPage from "./pages/About";
import ContactUsPage from "./pages/Contact";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/:id" element={<SingleBlogPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
