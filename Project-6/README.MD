# 🛍️ Sellzy — E-Commerce Website (Pure JavaScript)

Sellzy is a fully functional e-commerce front-end built using **HTML, CSS, and vanilla JavaScript** — no backend, no database, no frameworks. All product and cart data is managed on the client side using the browser's **localStorage**, making it a complete, self-contained demo of e-commerce CRUD operations, cart management, search, filter, and sorting.

---

## 🔗 Demo & Video

- 🎥 **Video Explanation:** [Watch here](https://drive.google.com/file/d/1NPT4JCXejnaHE6T0J1tV7sHrZL2v0zPL/view?usp=sharing)
- 🌐 **Live Site:** [Open live demo](https://drive.google.com/file/d/1CiqmQpW_yYqgj8SKVpfBZC0eGmUarF2U/view?usp=sharing)

> Replace the two URLs above with your actual links (e.g. YouTube link for the video, and your Netlify/Vercel/GitHub Pages link for the live site). Once replaced, both will be clickable directly from this README.

---

## 📄 Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with banners, categories, and featured products |
| Add Product | `add-product.html` | Form to add a new product or edit an existing one |
| View Product | `view-product.html` | Displays all products with search, filter, and sort options |
| Single Product | `single-product.html` | Detailed view of one product with quantity selector |
| Cart | `cart.html` | Shows cart items with quantity controls, subtotal, and total |

---

## ✨ Features

### Product Management (CRUD)
- ✅ **Add Product** — Add new products with name, category, price, stock, image, and description
- ✅ **View Product** — Browse all products in a responsive grid
- ✅ **Edit Product** — Update existing product details (reuses the Add Product form)
- ✅ **Delete Product** — Remove a product with a confirmation prompt
- ✅ **Single Product View** — See full product details on a dedicated page

### Cart Management
- ✅ **Add to Cart** — Add products to the cart from the grid, single product page, or homepage
- ✅ **Increase / Decrease Quantity** — Adjust item quantity directly from the cart
- ✅ **Subtotal** — Auto-calculated per line item (price × quantity)
- ✅ **Total** — Real-time cart total across all items
- ✅ **Remove Product** — Remove an item from the cart directly

### Discovery
- ✅ **Search** — Search products by name (available on the header and View Product page)
- ✅ **Filter** — Filter products by category
- ✅ **Sorting** — Sort by name (A–Z / Z–A), price (low–high / high–low), or stock

> Search, Filter, and Sort all work **together** on the same result set.

---

## 🛠️ Tech Stack

- **HTML5** — page structure
- **CSS3** — `style.css`, `shop.css` for custom styling
- **Vanilla JavaScript (ES6)** — all logic in `js/app.js` and page-specific inline scripts
- **localStorage** — client-side data persistence (no backend required)
- **jQuery plugins** — Slick Slider, Nice Select, WOW.js, Magnific Popup, Countdown (used for UI/animations on the homepage)

---

## 📁 Project Structure

```
sellzy/
├── index.html
├── add-product.html
├── view-product.html
├── single-product.html
├── cart.html
├── contact.html
├── css/
│   ├── style.css
│   ├── shop.css
│   └── ...
├── js/
│   ├── app.js              # Core logic: product & cart CRUD, storage helpers
│   ├── main.js              # UI/animation scripts
│   └── ...                  # jQuery plugin libraries
├── images/                  # Product & UI images
└── fonts/
```

---

## ⚙️ How It Works

All core data logic lives in **`js/app.js`**, organized into simple helper functions:

| Function | Purpose |
|---|---|
| `sellzyGetProducts()` / `sellzySaveProducts()` | Read/write product catalog |
| `sellzyAddProduct()` | Add a new product |
| `sellzyUpdateProduct()` | Edit an existing product |
| `sellzyDeleteProduct()` | Delete a product (also removes it from the cart) |
| `sellzyGetCart()` / `sellzySaveCart()` | Read/write cart data |
| `sellzyAddToCart()` | Add item to cart |
| `sellzyIncreaseQty()` / `sellzyDecreaseQty()` | Update item quantity |
| `sellzyRemoveFromCart()` | Remove item from cart |
| `sellzyCartTotal()` / `sellzyCartCount()` | Calculate cart total & item count |

Each page (`add-product.html`, `view-product.html`, `cart.html`, `single-product.html`) has its own small inline script that handles page-specific rendering and calls these shared functions.

---

## 🚀 Getting Started

No installation or build step needed — it's a static site.

1. Download / clone the project folder.
2. Open `index.html` directly in a browser, **or**
3. Serve it locally for the best experience (recommended, so relative paths always resolve correctly):

   ```bash
   # Using Python
   python3 -m http.server 8000

   # Then open
   http://localhost:8000
   ```

4. Browse products, add new ones, add to cart, and check out the Search/Filter/Sort on the **View Product** page.

> 💡 First-time load automatically seeds a few demo products into localStorage so the store isn't empty.

---

## 📌 Notes

- Since there's no backend, product/cart data is stored **per browser** via `localStorage`. Clearing browser storage will reset the data back to the default demo products.
- Built for demonstration/learning purposes — showcases full front-end CRUD, cart logic, and search/filter/sort implementation without any external database.

---
