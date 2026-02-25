# 🏦 Horizon Banking App

A modern, full-stack banking application built with **Next.js 14**, featuring real-time bank integration, fund transfers, and transaction tracking.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)

---

## ✨ Features

- **🏠 Dashboard** — Total balance overview with animated counters and doughnut chart
- **🏦 My Banks** — View all connected bank accounts as styled cards
- **📊 Transaction History** — Paginated transaction table with category badges and status tracking
- **💸 Transfer Funds** — Send money between accounts via Dwolla
- **🔗 Connect Bank** — Link new bank accounts using Plaid Link
- **🔐 Authentication** — Sign in/up with NextAuth.js credentials provider
- **📱 Responsive** — Full mobile navigation with slide-out drawer

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn/ui + Radix UI |
| Database | PostgreSQL + Prisma ORM |
| Authentication | NextAuth.js |
| Bank Integration | Plaid API |
| Fund Transfers | Dwolla API |
| Charts | Chart.js + react-chartjs-2 |
| Forms | React Hook Form + Zod |

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Sign-in & sign-up pages
│   ├── (root)/          # Dashboard, My Banks, Transactions, Transfers, Connect Bank
│   ├── api/auth/        # NextAuth API route
│   ├── globals.css      # Custom Tailwind utilities
│   └── layout.tsx       # Root layout with fonts
├── components/          # 21 custom + 10 Shadcn/ui components
├── lib/
│   ├── actions/         # Server actions (user, bank, transaction, dwolla)
│   ├── db.ts            # Prisma client singleton
│   ├── utils.ts         # Utility functions
│   ├── plaid.ts         # Plaid API client
│   └── dwolla.ts        # Dwolla API client
├── prisma/schema.prisma # Database schema (User, Bank, Transaction, Transfer)
├── constants/           # Sidebar links, category styles
├── types/               # TypeScript type definitions
└── public/icons/        # SVG icons
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** (local or cloud — [Neon](https://neon.tech) / [Supabase](https://supabase.com) work great)
- **Plaid** sandbox account — [dashboard.plaid.com](https://dashboard.plaid.com/signup)
- **Dwolla** sandbox account — [dwolla.com](https://accounts-sandbox.dwolla.com/sign-up)

### 1. Clone the repo

```bash
git clone https://github.com/jy7lsna/Horizon-Banking-App.git
cd Horizon-Banking-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file (use `.env.local.example` as reference):

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/banking_app"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
PLAID_CLIENT_ID="your_plaid_client_id"
PLAID_SECRET="your_plaid_secret"
PLAID_ENV="sandbox"
DWOLLA_KEY="your_dwolla_key"
DWOLLA_SECRET="your_dwolla_secret"
DWOLLA_ENV="sandbox"
```

### 4. Set up the database

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Models

| Model | Description |
|-------|-------------|
| **User** | Account info, credentials, Dwolla customer ID |
| **Bank** | Connected bank accounts (Plaid access tokens, balances) |
| **Transaction** | Transaction records synced from Plaid |
| **Transfer** | Fund transfers between users via Dwolla |

---

## 📄 License

This project is for educational purposes.
