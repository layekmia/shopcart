

# 🛒 ShopCart – Modern E-commerce Platform

ShopCart is a production-ready full-stack e-commerce platform built with modern technologies like Next.js, Prisma, and Stripe. It delivers a seamless shopping experience with authentication, product management, and secure payments.

---

## ✨ Features

### 👤 Authentication

* Email/password login & signup
* Google & GitHub OAuth
* Session management with Better Auth
* Protected routes & user profiles

### 🛒 Shopping

* Product browsing with filtering & search
* Product details with image gallery
* Cart & wishlist functionality
* Persistent cart using Zustand
* Real-time price calculations

### 📦 Orders & Checkout

* Multiple address management
* Stripe payment integration
* Order tracking & history
* Order status flow (Pending → Delivered)

### 📝 CMS & Admin

* Blog system with categories
* Product & content management via Sanity
* Admin dashboard at `/admin`

### 🎨 UI/UX

* Fully responsive design
* Loading skeletons & toast notifications
* Accessible UI (shadcn/ui)
* Smooth animations (Framer Motion)

---

## 🛠️ Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
**Backend:** Better Auth, Prisma, Stripe, Sanity
**Database:** PostgreSQL

---

## 🚀 Getting Started

```bash
git clone https://github.com/layekmia/shopcart.git
cd shopcart
npm install
cp .env.example .env.local
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables (Required)

* Database (PostgreSQL)
* Better Auth (secret & URL)
* Google & GitHub OAuth
* Stripe (secret & webhook)
* Sanity CMS credentials

---

## 💳 Payment Flow

1. Add products to cart
2. Select address
3. Checkout via Stripe
4. Payment confirmation (webhook)
5. Order stored & shown in dashboard

---

## 🚢 Deployment

* Deploy easily on **Vercel**
* Add environment variables
* Run:

```bash
npx prisma migrate deploy
npx prisma generate
```

---

## 📂 Key Pages

* `/` – Home
* `/shop` – Products
* `/product/[id]` – Product details
* `/cart` – Cart
* `/wishlist` – Wishlist
* `/orders` – Orders
* `/blog` – Blog
* `/admin` – Dashboard

---

## 🤝 Contributing

Pull requests are welcome. Feel free to fork and improve.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Layek Miah**
GitHub: [https://github.com/layekmia](https://github.com/layekmia)
Live: [https://shopcart.nexotechit.com](https://shopcart.nexotechit.com)

---

⭐ If you like this project, give it a star on GitHub!
