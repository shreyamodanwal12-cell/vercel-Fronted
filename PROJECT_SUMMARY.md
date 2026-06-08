# iBid Project Summary

## Project Type

- React frontend only
- Built with Vite, Tailwind CSS, React Router, Swiper, Framer Motion
- No backend, no API, no database, no real authentication

## Main App Structure

- `src/App.jsx` handles routing and page layout
- `src/layouts/Layout.jsx` wraps pages with `Header` and `Footer`
- `src/components/layout/` contains shared layout UI
- `src/components/common/` contains reusable cards and controls
- `src/components/ui/Modal.jsx` handles popup messages
- `src/data/` contains static mock data for books, authors, categories, blogs, testimonials

## Pages Included

- `Home.jsx` - hero slider, featured books, categories, authors, testimonials, newsletter, gallery
- `Shop.jsx` - books listing page
- `BookDetails.jsx` - single book detail page with tabs and related products
- `Categories.jsx` - category listing page
- `Authors.jsx` - author listing page
- `SearchResults.jsx` - search result layout
- `Cart.jsx` - cart page with totals and coupon UI
- `Wishlist.jsx` - wishlist product view
- `Checkout.jsx` - checkout form and summary
- `Login.jsx` - login form with popup modal
- `Register.jsx` - register form with confirm-password validation and popup
- `Dashboard.jsx` - user dashboard UI
- `Blog.jsx` - blog listing page
- `BlogPost.jsx` - single blog post page
- `About.jsx` - about page
- `Contact.jsx` - contact page

## Important Behaviors

- All content comes from static data files
- `Login.jsx` and `Register.jsx` only simulate form submission
- `Register.jsx` now validates password and confirm password match
- `Home.jsx` newsletter form shows a thank-you popup on submit
- Input text visibility fixed for forms

## Build and Tooling

- Run `npm install`
- Use `npm run dev` for development
- Use `npm run build` for production build
- App currently builds successfully

## Notes for Learning

- Start by reading `src/App.jsx`
- Then review layout and header/footer files
- Next, inspect `src/pages/Home.jsx` and `src/pages/Login.jsx`
- Use `src/data/` to understand content sources
- Reusable UI components live in `src/components/common/`

## Stability

- No current route/import issues
- Build passes cleanly
- Safe to continue editing page styles and UI

---

This file is a short guide for understanding the app quickly. For full details, see `PROJECT_NOTES.md`.
