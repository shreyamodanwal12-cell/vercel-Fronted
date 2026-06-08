# iBid React Frontend Project Notes

## Overview

This repository is a frontend-only React/Vite project that mimics a book marketplace UI similar to the provided reference site. It is built with:

- React 18+ / React 19
- Vite
- React Router DOM
- Tailwind CSS
- Swiper.js
- React Icons
- Framer Motion

All data is provided locally through static mock data files. There is no backend, no API integration, and no real authentication or database logic.

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── data/
├── layouts/
├── pages/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### Key folders

- `src/components/common/` - reusable UI cards and controls for products, categories, pagination, blogs, etc.
- `src/components/layout/` - page-level shared layout pieces such as `Header`, `Footer`, and `ScrollToTop`.
- `src/components/ui/` - reusable UI helpers such as the `Modal` component.
- `src/data/` - static mock content files like books, authors, categories, blogs, and testimonials.
- `src/layouts/` - the main app wrapper used by `App.jsx`.
- `src/pages/` - page screens used by React Router.

---

## Important Files

### `src/App.jsx`

This is the app router and the main page mapping file.
It imports all pages and sets up routes using `react-router-dom`.

Routes defined:

- `/` → Home
- `/shop` → Shop
- `/book/:id` → Book details
- `/categories` → Categories
- `/authors` → Authors
- `/search` → Search results
- `/cart` → Cart
- `/wishlist` → Wishlist
- `/checkout` → Checkout
- `/login` → Login
- `/register` → Register
- `/dashboard` → Dashboard
- `/blog` → Blog listing
- `/blog/:id` → Blog post
- `/about` → About Us
- `/contact` → Contact Us

`App.jsx` also wraps everything with `Layout` and `AnimatePresence` for page transitions.

### `src/layouts/Layout.jsx`

The shared layout wrapper:

- `Header`
- `main` content area
- `Footer`

It applies the base background and text theme.

### `src/components/ui/Modal.jsx`

Reusable popup modal component used by:

- Login page
- Register page
- Home newsletter subscribe section

It uses a backdrop and an overlay, and closes when the user clicks the close button or outside the modal.

---

## Pages Summary

### `src/pages/Home.jsx`

The homepage contains:

- hero slider using Swiper
- featured books section
- best sellers section
- category cards
- author spotlight section
- testimonials section
- newsletter subscription section
- gallery section

Special logic:

- `subscribeOpen` and `subscriber` state for the newsletter popup
- the newsletter form shows a modal after submit

### `src/pages/Shop.jsx`

This page should render the shop / books listing UI. It uses product grid and filters.

### `src/pages/BookDetails.jsx`

This page shows the book detail layout, including:

- image gallery
- book information
- author details
- price and ratings
- tabs for description, information, and reviews
- related books section

### `src/pages/Categories.jsx`

Lists categories and category detail layout.

### `src/pages/Authors.jsx`

Author listing page with author cards and books by each author.

### `src/pages/SearchResults.jsx`

Search results page with product grid and sidebar filters.

### `src/pages/Cart.jsx`

Cart page UI with:

- product summary rows
- quantity controls
- coupon section UI
- cart totals section

### `src/pages/Wishlist.jsx`

Wishlist page UI with wishlist product cards and actions.

### `src/pages/Checkout.jsx`

Checkout form page with billing/shipping fields and order summary.

### `src/pages/Login.jsx`

Login page behavior:

- email and password inputs
- popup modal on submit
- currently frontend-only login behavior

A UI validation bug was fixed so typed text is visible inside inputs by adding explicit Tailwind text classes.

### `src/pages/Register.jsx`

Register page behavior:

- name, email, password, confirm password fields
- confirm-password validation added
- inline error message when passwords don’t match
- popup modal on successful submit

### `src/pages/Dashboard.jsx`

User dashboard UI with sidebar navigation, profile details, orders, wishlist, and account settings.

### `src/pages/Blog.jsx`

Blog listing page with cards, categories, and recent posts.

### `src/pages/BlogPost.jsx`

Single blog post page with featured image, content, comments section, related posts.

### `src/pages/About.jsx`

About page with company introduction, mission, team members, and statistics.

### `src/pages/Contact.jsx`

Contact page with contact information, contact form, map placeholder, and FAQ section.

---

## Component Breakdown

### `src/components/layout/Header.jsx`

Header includes:

- top navigation
- mega menu styling
- mobile drawer support
- sign in / register links

### `src/components/layout/Footer.jsx`

Footer includes:

- newsletter CTA
- quick links
- policy links
- social icons

### `src/components/layout/ScrollToTop.jsx`

Scroll-to-top utility component that resets scroll position on route change.

### `src/components/common/`

Important reusable UI components likely present:

- `ProductCard.jsx`
- `CategoryCard.jsx`
- `AuthorCard.jsx`
- `BlogCard.jsx`
- `Pagination.jsx`

These are used across pages to keep UI consistent.

---

## Data Architecture

The static mock data files provide the content for the UI:

- `src/data/books.js` — product data for books/comics
- `src/data/authors.js` — author profiles
- `src/data/categories.js` — category cards and labels
- `src/data/blogs.js` — blog post cards/content
- `src/data/reviews.js` — review entries
- `src/data/banners.js` — homepage hero banners
- `src/data/testimonials.js` — customer testimonial cards
- `src/data/users.js` — mock user data if needed

All pages render from these local data files.

---

## Styling

- `src/index.css` contains Tailwind imports and global CSS.
- `src/App.css` is available for app-specific global styles.
- Tailwind utility classes are used throughout the JSX.
- The project uses responsive Tailwind classes like `sm:`, `md:`, `lg:` to adapt layouts.

Important global fix:

- `#root` was changed to `width: 100%` and `margin: 0` so there is no unwanted page side space.

---

## Build and Runtime

### `package.json`

Main scripts:

- `npm run dev` — start the development server
- `npm run build` — create the production build
- `npm run preview` — preview the build
- `npm run lint` — run ESLint

Dependencies include:

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`
- `swiper`
- `react-icons`

Dev dependencies include:

- `vite`
- `tailwindcss`
- `postcss`
- `eslint`
- `@vitejs/plugin-react`

### Current status

- The app builds successfully with `npm run build`
- No unresolved import errors remain
- Popup modals and form validation are working on login/register/newsletter

---

## Important Notes

- This is a frontend-only project.
- There is no backend authentication or database storage.
- Login and register forms currently validate on the client and show modals, but they do not actually create real accounts.
- If you want to make this production-ready with real auth later, you will need a backend API and proper authentication flows.

---

## Learning the Project

### Start here

1. `src/App.jsx` — routing and page structure.
2. `src/layouts/Layout.jsx` — shared layout wrapper.
3. `src/components/layout/Header.jsx` and `Footer.jsx` — main site chrome.
4. `src/pages/Home.jsx` — homepage layout and example Swiper usage.
5. `src/pages/Login.jsx` / `Register.jsx` — form handling and popup logic.

### Then review

- `src/data/*` files to understand how content is injected.
- `src/components/common/*` for reusable view components.
- `src/pages/**` for page-specific layout patterns.

---

## How to read it

- The pages are composed with reusable common components.
- The mock data files are the source of all text and images.
- The site uses Tailwind classes directly in JSX, so reading page files shows both content and layout style.

If you want, I can also create a second file named `PROJECT_SUMMARY.md` with shorter bullet points, or I can convert this note into a PDF using a tool if available later.
