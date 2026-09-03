# E-Commerce REST API Backend 🛒

A robust, production-grade MERN e-commerce backend MVP built with Node.js, Express, and MongoDB. This API handles secure user authentication, product catalog management with cloud image storage, a relational shopping cart system, and secure checkout processing.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Authentication:** JSON Web Tokens (JWT) & bcrypt
* **File Storage:** Cloudinary & Multer
* **Architecture:** MVC (Model-View-Controller)

## ✨ Key Features

### 1. Security & Authentication
* Secure registration and login system.
* Password hashing using `bcrypt` (via Mongoose pre-save hooks).
* JWT-based authentication using both Access and Refresh tokens.
* Tokens are securely delivered via `httpOnly` cookies to prevent XSS attacks.
* Custom authentication middleware to protect private routes.

### 2. Product Catalog & Media Management
* Full CRUD operations for the product catalog.
* Pagination and sorting implemented natively via Mongoose.
* **Robust File Upload Pipeline:** 
  * Uses `multer` for multipart/form-data parsing.
  * Uploads images to `Cloudinary` for optimized cloud delivery.
  * Includes automatic local file cleanup (`fs.unlinkSync`) for both successful uploads and error fallbacks to prevent server storage bloat.

### 3. Relational Shopping Cart
* Dedicated `Cart` schema to keep the `User` document lean and fast.
* Seamlessly handles adding items, incrementing quantities for duplicates, and removing items using optimized array methods.
* Populates product data (name, price, image) dynamically on fetch.

### 4. Checkout & Order History
* Converts active carts into permanent `Order` documents.
* **Immutable Pricing:** Copies the product price at the exact moment of checkout to ensure historical receipt accuracy.
* Automatically empties the user's cart upon successful checkout.
* Fetches user order history sorted chronologically (newest first).

## 📂 Project Structure

```text
src/
├── controllers/    # Route logic (user, product, cart, order)
├── middlewares/    # Custom middlewares (auth, multer)
├── models/         # Mongoose schemas (User, Product, Cart, Order)
├── routes/         # Express routers
├── utils/          # Reusable helpers (ApiError, ApiResponse, asyncHandler, cloudinary)
├── app.js          # Express app configuration
└── server.js       # Database connection and server entry point

🛠️ Environment Variables
To run this project, you will need to add the following environment variables to your .env file:

PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_super_secret_access_key

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_super_secret_refresh_key

REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## 💻 Getting Started

1. **Clone the repository:**
   \`git clone https://github.com/yourusername/your-repo-name.git\`
2. **Install dependencies:**
   \`npm install\`
3. **Start the development server:**
   \`npm run dev\`

## 🛣️ API Endpoints (Quick Reference)

| Resource | Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | POST | `/api/v1/user/register` | Register new user | No |
| **Auth** | POST | `/api/v1/user/login` | Login user | No |
| **Products** | GET | `/api/v1/product/all-Products` | Get all products (paginated) | No |
| **Products** | POST | `/api/v1/product/add-New-Product` | Create product (w/ images) | Yes |
| **Cart** | GET | `/api/v1/cart/get` | View user cart | Yes |
| **Cart** | POST | `/api/v1/cart/add/:productID/:quantity`| Add/update item in cart | Yes |
| **Cart** | DELETE | `/api/v1/cart/remove/:productID` | Remove item from cart | Yes |
| **Orders** | POST | `/api/v1/order/place` | Checkout cart | Yes |
| **Orders** | GET | `/api/v1/order/history` | Get user order history | Yes |

---
*Built with ❤️ utilizing clean code practices and modern MERN architecture.*