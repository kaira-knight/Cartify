# Cartify 🛒

Cartify is a full-stack **MERN e-commerce platform** built with scalability, security, and real-world workflows in mind.  
It supports user authentication, product browsing, cart management, secure payments, and order tracking.

---

## 🚀 Features

### 👤 User
- Signup & Login (JWT authentication)
- Browse products with categories & filters
- Product variants (size, color, etc.)
- Add to cart & manage quantities
- Secure checkout with Stripe
- Order history & tracking

### 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- React Router
- Axios
- Stripe JS

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Stripe API

---

## 📁 Project Structure

Cartify/
├── frontend/
│
├── backend/
│
└── README.md


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/Cartify.git
cd Cartify


cd backend
npm install
npm run dev

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret

cd frontend
npm install
npm run dev

🌱 Future Enhancements

- Admin dashboard
- Product reviews & ratings
- Wishlist
- Coupons & discounts
- Cloud image uploads

Built with ❤️ as a full-stack MERN project for learning and production-grade practice.