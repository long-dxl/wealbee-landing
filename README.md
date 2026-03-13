# Wealbee Landing Page

> **Where your wealth will be** — Hợp nhất toàn bộ tài sản vào một dashboard duy nhất với AI phân tích thông minh.

## 🚀 Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Lightning-fast build tool
- **Tailwind CSS 4** — Utility-first styling
- **Supabase** — Backend (email subscriber storage)

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Create .env file with Supabase credentials
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ Supabase Setup

Run the SQL in `supabase/create_subscribers_table.sql` in your Supabase SQL Editor to create the `subscribers` table with proper RLS policies.

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx              # Main landing page
│   └── components/          # Reusable components
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── subscribe.ts         # Email subscription logic
├── assets/                  # Images
├── styles/                  # CSS / Tailwind
└── main.tsx                 # Entry point
```

## ✨ Features

- 🎨 Fully responsive landing page
- 📧 Email subscription (Hero + Footer) with Supabase
- 🤖 AI feature showcase cards
- 📊 Safety Score visualization
- ❓ FAQ accordion
- 📱 Mobile-friendly navigation

## 📄 License

Private project — All rights reserved.
