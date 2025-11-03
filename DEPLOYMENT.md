# Deployment Guide

## Vercel Production Setup

### 1. Add PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Name it (e.g., `pottenbakkerij-db`)
5. Click **Create**
6. Vercel automatically adds `DATABASE_URL` to your environment variables

**Option B: External Provider (Neon, Supabase, Railway)**
1. Sign up for [Neon](https://neon.tech) (free tier available)
2. Create a new project
3. Copy the connection string (looks like `postgresql://user:pass@host/db`)
4. In Vercel: **Project Settings** → **Environment Variables**
5. Add `DATABASE_URL` with your connection string
6. Apply to: **Production**, **Preview**, and **Development**

### 2. Run Database Migrations

After adding the database, run migrations:

```bash
# Set your production DATABASE_URL locally
export DATABASE_URL="postgresql://your-vercel-or-neon-url"

# Push the schema to production database
npx prisma db push

# OR create and apply migrations (recommended for production)
npx prisma migrate deploy
```

### 3. Seed Production Database (Optional)

```bash
# With DATABASE_URL set to production
npm run db:seed
```

### 4. Set Other Environment Variables

In Vercel Project Settings → Environment Variables, add:

```bash
# Database (already added in step 1)
DATABASE_URL=postgresql://...

# Stripe (use LIVE keys for production!)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... 
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Site URL (update after deployment)
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app

# Email (optional - for order confirmations)
RESEND_API_KEY=re_...

# Admin Panel
ADMIN_EMAIL=admin@degraal.nl
ADMIN_PASSWORD=your-secure-password
```

### 5. Redeploy

After setting environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Check **Use existing build cache** (optional)
4. Click **Redeploy**

---

## Local Development Setup

### Option 1: Local PostgreSQL

Install PostgreSQL:
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb degraal_dev
```

Update `.env`:
```bash
DATABASE_URL="postgresql://localhost:5432/degraal_dev"
```

Run migrations and seed:
```bash
npx prisma db push
npm run db:seed
```

### Option 2: Hosted Dev Database (Easier)

1. Create a free database on [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Copy connection string to `.env`
3. Run migrations: `npx prisma db push`
4. Seed: `npm run db:seed`

### Option 3: Keep SQLite for Local (Not Recommended)

If you want to keep SQLite locally:

1. Change `prisma/schema.prisma` provider back to:
   ```prisma
   provider = "sqlite"
   ```
2. Update `.env`:
   ```bash
   DATABASE_URL="file:./dev.db"
   ```
3. Run: `npx prisma db push`

**Note:** This creates a mismatch between dev and production databases, which can cause issues.

---

## Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Cause:** Missing `DATABASE_URL` in Vercel environment variables

**Fix:**
1. Go to Vercel Project Settings → Environment Variables
2. Add `DATABASE_URL` with your PostgreSQL connection string
3. Redeploy

### Error: "Can't reach database server"

**Cause:** Invalid connection string or database not accessible

**Fix:**
1. Verify connection string format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
2. Check database is running and accessible
3. For Vercel Postgres, use the connection string from the Storage tab

### Error: "Table doesn't exist"

**Cause:** Migrations not run on production database

**Fix:**
```bash
# Set production DATABASE_URL
export DATABASE_URL="postgresql://..."

# Push schema
npx prisma db push
```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:
- ✅ TypeScript type checking
- ✅ ESLint
- ✅ Unit tests (Vitest)
- ✅ Production build

Vercel automatically deploys:
- **Production:** Commits to `main` branch
- **Preview:** Pull requests and other branches
