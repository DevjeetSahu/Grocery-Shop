# PriceCat Grocery Shop

A fast, responsive, and search-optimized digital grocery catalog built with React, Vite, and Supabase.

## Features
- 🛒 **Customer Storefront:** Clean, dynamic grid layout for browsing grocery categories.
- 🔍 **Fuzzy Multi-language Search:** Powered by PostgreSQL Trigram Similarity, search items by English, Hindi, or Odia names (including spelling mistake tolerance).
- 🔐 **Secure Admin Dashboard:** Protected portal for shop owners to manage inventory (Add/Edit/Delete products).
- 📉 **Offline-ready Architecture:** Built to handle spotty internet connections smoothly.
- ⚡ **Lightning Fast:** Built with Vite and Tailwind CSS v4.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Supabase Project

### Installation
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Note: Never commit your `.env` file. It is safely ignored in `.gitignore`.*

3. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup (Supabase)

To properly set up the backend database, run the following SQL scripts (found in the `/supabase` folder) in your Supabase SQL Editor in this order:

1. `schema.sql` - Creates the `products` and `categories` tables, triggers, and basic RLS policies.
2. `setup_fuzzy_search.sql` - Enables the `pg_trgm` extension and creates the `search_products` RPC function for typo-tolerant searching.
3. `setup_admins.sql` - Secures the admin dashboard by restricting Write access to specific shop owner emails.
4. *(Optional)* Generate your initial data by placing your inventory in `inventory.csv` and running `node scripts/csv_to_sql.js`. Copy the resulting `import_inventory.sql` into Supabase to populate your store!

## Deployment

This project is fully ready to be deployed to **Vercel** or **Netlify**. 

1. Connect your GitHub repository to Vercel/Netlify.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the deployment Environment Variables.
3. Deploy!

## Security Notes
- **API Keys:** No API keys are hardcoded in the repository. The project strictly uses `import.meta.env` to load environment variables.
- **Data Protection:** The Supabase database utilizes Row Level Security (RLS) to ensure only authorized admins can mutate product and category data.
