# Asmara Store

Asmara Store is a modern Eritrean marketplace and classified ads web application. The platform is designed to help users browse, publish, manage, and discover advertisements for local services and opportunities in Eritrea and the Eritrean diaspora.

## Project Goal

The goal of Asmara Store is to provide a simple digital marketplace where users can:

- Browse local advertisements
- Search for listings by keyword
- Filter ads by category and location
- View ad details
- Publish new ads after signing in
- Manage their own ads from a user dashboard
- Connect with advertisers through the platform
- Explore services such as property, cars, electronics, jobs, hotels, and diaspora-related listings

## Main Categories

The app currently supports these main sections:

- Property / عقارات
- Cars / سيارات
- Electronics / إلكترونيات
- Jobs / وظائف
- Hotels / فنادق
- Diaspora / مغتربين
- All listings / الكل

## Main Features

- Arabic-first marketplace interface
- Multi-language support structure
- User authentication with Supabase
- Advertisement listing system
- Add, edit, and view ads
- Advertiser profile pages
- User dashboard
- Service detail pages
- Checkout page for paid services or promotions
- Floating WhatsApp contact button
- Built-in chat assistant component
- Cookie consent component
- Responsive layout for mobile and desktop

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Supabase
- Tailwind CSS
- Motion animations
- Lucide React icons
- PayPal React SDK
- Google GenAI SDK

## Project Structure

```txt
Asmara2-/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    ├── pages/
    ├── context/
    ├── lib/
    ├── translations/
    └── types/
```

## Routes

The application includes these main pages:

```txt
/                 Home page
/dashboard        User dashboard
/auth             Login and registration
/post-ad          Publish a new ad
/edit-ad/:id      Edit an existing ad
/ad/:id           Advertisement details
/advertiser/:id   Advertiser profile
/services/:type   Service category page
/service/:id      Service details
/checkout         Checkout page
/test-agent       Test agent / add ad page
```

## Getting Started

### Requirements

- Node.js
- npm
- Supabase project

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app runs with Vite on port `3000`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Type check

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file in the project root and add the required keys for the services used by the app.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

## Supabase Data

The app reads advertisements from the `ads` table in Supabase. If the table is not available or an error happens, the app can show fallback demo ads for cars, property, and electronics.

Expected ad fields include:

```txt
id
user_id
title
price
location
category
image_url
is_featured
created_at
```

## App Title

The browser title should be:

```html
<title>Asmara Store</title>
```

## Purpose

Asmara Store is built to become a practical online marketplace for Eritrean users, local businesses, service providers, job seekers, property owners, car sellers, hotels, and diaspora communities.

## License

This project is for development and learning purposes.
