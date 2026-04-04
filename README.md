📖 Overview
ShopCart is a production-ready, full-stack e-commerce platform built with modern web technologies. It provides a seamless shopping experience with secure authentication, product browsing, cart management, wishlist functionality, blog system, and complete order processing with Stripe payment integration.

✨ Key Features
👤 Authentication & User Management
Email/Password sign-up and sign-in

Social login with Google and GitHub

Session management with Better Auth

Protected routes for checkout and orders

User profile management

🛒 Shopping Experience
Browse products with category filtering

Advanced product search functionality

Product details page with image gallery

Add to cart with quantity management

Wishlist for saving favorite products

Cart persistence using Zustand (survives page refresh)

Real-time price calculations (subtotal, discount, total)

📦 Checkout & Order Management
Multiple address management (Bangladesh-specific fields)

Default address selection

Stripe payment integration

Order confirmation and status tracking

Order history page with detailed views

Order status flow: Pending → Processing → Paid → Shipped → Delivered

📝 Content Management
Blog system with categories

Product management via Sanity Studio

Admin dashboard (renamed to /admin for easy access)

Real-time content updates

🎨 UI/UX Features
Fully responsive design (mobile-first approach)

Loading skeletons for better UX

Toast notifications for user feedback

Accessible components using shadcn/ui

Smooth animations with Framer Motion

🛠️ Tech Stack
Frontend
Technology	Version	Purpose
Next.js	16.0.7	React framework with App Router
React	19.2.0	UI library
TypeScript	5.0	Type safety
Tailwind CSS	4.0	Styling
shadcn/ui	Latest	UI components
Framer Motion	12.23.25	Animations
Zustand	5.0.9	State management
Immer	11.0.1	Immutable state updates
Backend
Technology	Version	Purpose
Better Auth	1.5.6	Authentication
Prisma	7.6.0	ORM for PostgreSQL
Stripe	20.0.0	Payment processing
Sanity	4.20.3	Headless CMS
Database
PostgreSQL (via Neon or Vercel Postgres)

Prisma for schema management and migrations

📂 Project Structure
text
shopcart/
├── app/
│   ├── (client)/              # Public routes
│   │   ├── cart/              # Shopping cart page
│   │   ├── wishlist/          # User wishlist
│   │   ├── orders/            # Order history
│   │   ├── shop/              # Product listing
│   │   ├── blog/              # Blog posts
│   │   └── product/[id]/      # Single product page
│   ├── admin/                 # Sanity Studio (renamed from studio)
│   ├── api/                   # API routes
│   │   ├── auth/[...all]/     # Better Auth endpoints
│   │   └── stripe/webhook/    # Stripe webhook handler
│   └── layout.tsx             # Root layout
├── components/                # Reusable UI components
│   ├── ui/                    # shadcn/ui components
│   ├── AddressForm.tsx        # Address management
│   ├── AuthForm.tsx           # Authentication modal
│   └── GlobalLoader.tsx       # Loading animations
├── lib/                       # Utilities & configs
│   ├── auth.ts               # Better Auth configuration
│   ├── auth-client.ts        # Better Auth client
│   ├── stripe.ts             # Stripe configuration
│   └── sanity/               # Sanity client & utilities
├── sanity/                   # Sanity CMS
│   ├── schemaTypes/          # Product, Order, Address, Blog schemas
│   └── sanity.config.ts      # Sanity configuration
├── store/                    # Zustand store
│   └── cartStore.ts          # Cart state management
└── public/                   # Static assets
🚀 Getting Started
Prerequisites
Node.js 18+

PostgreSQL database (Neon, Vercel Postgres, or local)

Stripe account (for payments)

Sanity.io account (for CMS)

Google OAuth credentials (for social login)

GitHub OAuth credentials (for social login)

Installation Steps
Clone the repository

bash
git clone https://github.com/layekmia/shopcart.git
cd shopcart
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env.local
Then fill in all the required variables (see below).

Generate Prisma client

bash
npx prisma generate
Run database migrations

bash
npx prisma migrate dev
Run the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:3000

Environment Variables
env
# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://username:password@host:5432/database"

# ============================================
# BETTER AUTH (Authentication)
# ============================================
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# ============================================
# OAUTH PROVIDERS
# ============================================
# Google
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# ============================================
# STRIPE (Payments)
# ============================================
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# ============================================
# SANITY CMS
# ============================================
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="sk_..."
🔧 Available Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production (generates Prisma client + Next.js build)
npm run start	Start production server
npm run lint	Run ESLint for code quality
npm run typegen	Generate Sanity TypeScript types
🗄️ Database Schema
Prisma Models (Better Auth)
User - User accounts and profiles

Session - Active user sessions

Account - OAuth account connections

Verification - Email verification tokens

Sanity Schemas
Product - Products with name, price, images, variants, stock

Order - Customer orders with products, address, status

Address - User shipping addresses (Bangladesh-specific fields)

Blog Post - Blog content with categories and SEO

Category - Product and blog categories

💳 Payment Flow
User adds products to cart

User selects shipping address

User clicks "Proceed to Checkout"

Stripe Checkout Session is created

User completes payment on Stripe's page

Stripe webhook confirms payment

Order is created in Sanity

User is redirected to success page

Order appears in user's order history

🔐 Authentication Flow
User signs up via email/password or OAuth (Google/GitHub)

Better Auth creates session and stores in database

Session cookie is set in browser

Protected routes check session via middleware

User profile and addresses are linked via email/userId

📱 Pages Overview
Page	Route	Description
Home	/	Landing page with featured products
Shop	/shop	Product listing with filters
Product	/product/[id]	Single product details
Cart	/cart	Shopping cart management
Wishlist	/wishlist	Saved products
Orders	/orders	Order history
Blog	/blog	Blog posts listing
Blog Post	/blog/[slug]	Single blog post
Admin	/admin	Sanity Studio dashboard
🚢 Deployment
Deploy to Vercel
Push your code to GitHub

Import project to Vercel

Add all environment variables

Deploy!

Post-Deployment Steps
bash
# Run database migrations on production
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
Developer: Layek Miah

GitHub: @layekmia

Live Demo: shopcart.nexotechit.com

🙏 Acknowledgments
Next.js - React framework

Better Auth - Authentication library

Sanity - Headless CMS

Stripe - Payment processing

shadcn/ui - UI components

Tailwind CSS - Styling

⭐ If you found this project helpful, please give it a star on GitHub!
