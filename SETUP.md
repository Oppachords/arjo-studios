# Arjo Studios — Admin Dashboard Setup

Portfolio site with admin CMS at `/admin`.

## External services required

Before deploying, set up these three services and add their credentials to Vercel (and `.env.local` for local dev).

---

### 1. Supabase (database) — **Recommended**

**Why Supabase:** Free tier, PostgreSQL, works natively with Vercel serverless, simple REST API, and fits relational project + image data well.

**Alternatives considered:**
| Service | Pros | Cons |
|---------|------|------|
| **MongoDB Atlas** | Flexible JSON documents | Overkill for structured portfolio data |
| **Neon Postgres** | Great Postgres hosting | No built-in dashboard like Supabase |
| **Firebase Firestore** | Real-time sync | More complex pricing, less SQL-friendly |
| **Vercel Postgres** | Tight Vercel integration | Paid, smaller free tier |

**Setup steps:**
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project (choose a region close to your users)
3. Go to **Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **SQL Editor** and run, in order:
   - `supabase/schema.sql`
   - `supabase/seed.sql`

---

### 2. Cloudinary (image storage) — **Recommended**

**Why Cloudinary:** Built for image upload, resize, optimize, and CDN delivery. Free tier includes 25 credits/month — plenty for a portfolio CMS.

**Alternatives considered:**
| Service | Pros | Cons |
|---------|------|------|
| **Uploadthing** | Simple React uploads | Better suited for Next.js |
| **AWS S3 + CloudFront** | Maximum control | Complex setup, no free tier |
| **Vercel Blob** | Native Vercel integration | No image transforms, paid storage |
| **Supabase Storage** | One vendor with DB | Weaker image optimization vs Cloudinary |

**Setup steps:**
1. Create account at [cloudinary.com](https://cloudinary.com)
2. From the **Dashboard**, copy:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

Existing images in `/public/images/` stay local until you re-upload them via the admin panel.

---

### 3. Vercel (hosting) — **Already configured**

**Setup steps:**
1. Open your project at [vercel.com](https://vercel.com)
2. Go to **Settings → Environment Variables**
3. Add all variables from `.env.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_USERNAME` | Yes | Default: `Admin` |
| `ADMIN_PASSWORD` | Yes | Your admin password |
| `JWT_SECRET` | Yes | Random string, 32+ characters |
| `SUPABASE_URL` | Yes | From Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | From Supabase (keep secret) |
| `CLOUDINARY_CLOUD_NAME` | Yes | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Yes | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Yes | From Cloudinary (keep secret) |

4. Redeploy after adding variables.

---

## Environment variables checklist

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in every value before running locally.

Generate a JWT secret:

```bash
openssl rand -base64 32
```

---

## Local development

API routes run as Vercel serverless functions. Use Vercel CLI for full local dev (frontend + API):

```bash
npm install
cp .env.example .env.local   # fill in values
npx vercel dev
```

Open `http://localhost:3000`. Admin login: `/admin`

For frontend-only dev (no API, uses static fallback data):

```bash
npm run dev
```

---

## Admin features

| Route | Description |
|-------|-------------|
| `/admin` | Login page |
| `/admin/dashboard` | Project list (Selected + All Works) |
| `/admin/projects/new` | Create new project |
| `/admin/projects/:id/edit` | Edit project + manage gallery |

**Admin capabilities:**
- Login / logout with session cookie
- Create, edit, delete projects
- Toggle "Selected Works" featured flag
- Set display order for both sections
- Upload, replace, delete, reorder gallery photos
- Set cover image from any gallery photo
- All new uploads go to Cloudinary CDN

---

## Deploy

Push to GitHub — Vercel auto-deploys from `main`:

```bash
git push origin main
```

Ensure all environment variables are set in Vercel before the first deploy with admin features.
