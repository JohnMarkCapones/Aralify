# Aralify – SEO Improvement Plan

This document is a full-system SEO plan for the Aralify (CodeForge) platform: technical setup, on-page metadata and structure, structured data, content and UX, and operations. Ask product/design questions where noted so the plan can be refined.

---

## 1. Current State Summary

| Area | Status | Notes |
|------|--------|--------|
| Root metadata | ✅ Partial | Title template, description, keywords, OG, Twitter, robots in `layout.tsx` |
| Per-page metadata | ⚠️ Minimal | Only courses `[slug]` has `generateMetadata` (generic "Course \| Aralify") |
| Sitemap | ❌ Missing | No `sitemap.ts` or `sitemap.xml` |
| robots.txt | ❌ Missing | No `robots.ts` or `public/robots.txt` |
| Canonical / base URL | ❌ Missing | No `metadataBase` or canonical links |
| OG/Twitter images | ❌ Missing | No default or per-page images |
| JSON-LD | ❌ Missing | No structured data |
| Blog/course/lesson metadata | ❌ Missing | Blog, learning paths, challenges, lessons have no `generateMetadata` |
| Auth/dashboard indexing | ⚠️ Unclear | No explicit noindex for login, dashboard, settings |
| Multi-language (EN/FIL) | ⚠️ Unclear | No hreflang if you have locale-based routes |

---

## 2. Technical SEO (Foundation)

### 2.1 Base URL and canonicals

- **Add `NEXT_PUBLIC_SITE_URL`** (e.g. `https://aralify.com`) to env and use it everywhere you need an absolute URL.
- **Set `metadataBase`** in root `layout.tsx`:
  ```ts
  export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aralify.com'),
    // ... rest
  };
  ```
- **Canonical:** Next.js 14+ can derive canonicals from `metadataBase` + path. For any page that might be reached via multiple URLs (query params, trailing slash), set `alternates.canonical` in that page’s metadata.

**Owner:** Frontend. **Depends on:** Confirming production domain and env strategy.

---

### 2.2 Sitemap

- **Add `src/app/sitemap.ts`** (Next.js App Router dynamic sitemap).
- **Include:**
  - Static routes: `/`, `/about`, `/courses`, `/learning-paths`, `/challenges`, `/blog`, `/pricing`, `/faq`, `/contact`, `/careers`, `/compare`, `/explore`, `/playground`, `/showcase`, `/privacy`, `/terms`, `/changelog`, `/community`, `/referral`, `/search`.
  - Dynamic:
    - `/courses/[slug]` from `courses` (and from API/DB when you move off static data).
    - `/courses/[slug]/lesson/[lessonSlug]` when lessons are known (static list or API).
    - `/learning-paths/[slug]` from `learningPaths`.
    - `/challenges/[slug]` from `challengeDetails`.
    - `/blog/[slug]` from `blogPosts`.
    - `/blog/category/[slug]` from blog categories.
    - `/profile/[username]` only if you want public profiles indexed (optional; consider noindex for privacy).
- **Set:** `lastModified` (e.g. from content updatedAt if available), `changeFrequency`, `priority` (e.g. home 1.0, courses 0.9, blog 0.8, rest 0.6–0.7).
- **Question:** Will courses/lessons/blog eventually come from the backend API? If yes, sitemap should later fetch from API and cache (e.g. revalidate) so new content appears in sitemap.

**Owner:** Frontend (later integrate with backend if content is API-driven).

---

### 2.3 robots.txt

- **Add `src/app/robots.ts`** (or `public/robots.txt` if you prefer static).
- **Allow:** `/` and all indexable paths.
- **Disallow (recommended):**
  - `/api/` (if any Next.js API routes used only for app logic).
  - `/dashboard`, `/settings`, `/onboarding`, `/notifications`, `/auth`, `/auth/callback`.
  - `/admin` (and any admin-only paths).
  - `/invite/[code]` if invite links are private.
- **Sitemap:** Point to `https://<siteUrl>/sitemap.xml`.
- **Question:** Any other paths that must never be indexed (e.g. `/certificate/[id]`)? Decide and list in robots.

**Owner:** Frontend.

---

### 2.4 Default and per-page OG/Twitter images

- **Root layout:** Add `openGraph.images` and `twitter.images` (default brand image, e.g. `public/og-default.png` 1200×630).
- **Per-page:** Where you have a clear “hero” or share image (e.g. course image, blog featured image), set it in that page’s `generateMetadata` (or static `metadata`) so shares show the right image.
- **Format:** Prefer absolute URLs using `metadataBase`; Next.js Image can be used with `metadataBase` for OG image generation if you add an OG image route later.

**Owner:** Frontend + design (asset for default OG image).

---

## 3. On-Page Metadata by Section

Use Next.js `metadata` / `generateMetadata` (and when needed `generateStaticParams` for static paths). Prefer **async `generateMetadata`** where you need to resolve params (e.g. slug) and fetch data.

### 3.1 Root layout (already partially done)

- Keep and refine: `title.template`, `description`, `keywords`, `openGraph`, `twitter`, `robots`.
- Add: `metadataBase`, `openGraph.images`, `twitter.images`, `openGraph.url` (optional; can be set per page).
- Consider: `applicationName`, `appleWebApp`, `formatDetection` if you care about mobile/pwa behavior.

---

### 3.2 Home (`/`)

- **Title:** e.g. "Aralify – Learn to Code with Interactive Challenges"
- **Description:** Unique, compelling 150–160 chars (learn to code, XP, difficulty tiers, Philippines/Filipino mention if key).
- **OG/Twitter:** Use default or a dedicated home hero image.
- **JSON-LD:** Add Organization + WebSite (and SearchAction if you have site search). See Section 4.

**Owner:** Frontend.

---

### 3.3 Public marketing/content pages

Give each of these a **unique title and description** (and optional OG image where it makes sense):

| Route | Suggested title pattern | Notes |
|-------|--------------------------|--------|
| `/about` | About Us \| Aralify | Mission, who you are |
| `/pricing` | Pricing \| Aralify | Plans, free tier |
| `/faq` | FAQ \| Aralify | FAQ schema later |
| `/contact` | Contact \| Aralify | |
| `/careers` | Careers \| Aralify | |
| `/compare` | Compare \| Aralify | e.g. vs other platforms |
| `/explore` | Explore Courses \| Aralify | |
| `/playground` | Code Playground \| Aralify | |
| `/showcase` | Showcase \| Aralify | |
| `/privacy` | Privacy Policy \| Aralify | noindex optional |
| `/terms` | Terms of Service \| Aralify | noindex optional |
| `/changelog` | Changelog \| Aralify | |
| `/community` | Community \| Aralify | |
| `/referral` | Referral Program \| Aralify | |
| `/search` | Search \| Aralify | Can noindex if purely app search |

**Owner:** Frontend. Optional: small “content audit” to align titles/descriptions with target keywords.

---

### 3.4 Courses

- **List `/courses`:**
  - Title: e.g. "Courses – Learn Programming \| Aralify"
  - Description: One sentence on course catalog and difficulty tiers.
- **Detail `/courses/[slug]`:**
  - **Current:** Only generic "Course \| Aralify". **Change:** Use course title and description from data (e.g. `courses` from `@/lib/data/courses`).
  - Title: `{course.title} | Aralify` (or "Course: {title} | Aralify").
  - Description: `course.description` or first 155 chars of `longDescription`.
  - OG image: If course has `icon` or image, use it.
  - **Requirement:** Page must be server component or pass data to a server parent so `generateMetadata` can read the same course (no client-only data in generateMetadata).
- **Lesson `/courses/[slug]/lesson/[lessonSlug]`:**
  - Add `generateMetadata` when lesson data is available (from static list or API). Title: e.g. "{Lesson title} | {Course title} | Aralify". Description: lesson summary or course description.
  - **Note:** Lesson page is currently client-only with hardcoded content; for SEO you’ll want server-resolved lesson by `courseSlug` + `lessonSlug` and metadata derived from that.

**Owner:** Frontend. Backend when courses/lessons come from API.

---

### 3.5 Learning paths

- **List `/learning-paths`:** Title/description for “Learning Paths” (e.g. structured roadmaps).
- **Detail `/learning-paths/[slug]`:**
  - Page is client-only and uses `useParams()`; metadata cannot be set from client. **Recommendation:** Convert to server component that resolves path by slug and renders the same UI, or add a server layout/wrapper that reads slug and calls `generateMetadata` with path data (e.g. from `learningPaths`). Then set title/description from `path.title` and `path.description`.

**Owner:** Frontend (and possibly refactor to server component or server metadata wrapper).

---

### 3.6 Blog

- **List `/blog`:** Title e.g. "Blog – Programming Tips & Guides \| Aralify", description for blog index.
- **Post `/blog/[slug]`:**
  - Add **async `generateMetadata`** that finds the post by slug (e.g. from `blogPosts`) and returns:
    - title: post.title (and template)
    - description: post.excerpt
    - openGraph.images: if post.image
    - Optional: article publishedTime, modifiedTime, author.
  - You already have `generateStaticParams`; ensure metadata uses the same data source.
- **Category `/blog/category/[slug]`:** Title/description for category (e.g. "Category: {name} | Aralify Blog").

**Owner:** Frontend.

---

### 3.7 Challenges

- **List `/challenges`:** Title/description for coding challenges (e.g. practice, XP).
- **Detail `/challenges/[slug]`:**
  - Currently client-only. Same pattern as learning paths: either make the page (or a parent) a server component that resolves challenge by slug and sets metadata, or add a server wrapper that provides `generateMetadata` from `challengeDetails`. Title: e.g. "{challenge.title} | Challenges | Aralify", description from challenge description.

**Owner:** Frontend.

---

### 3.8 Profile (`/profile/[username]`)

- **Decision:** Do you want public profiles in search results?
  - **If yes:** Add `generateMetadata` (server) that loads public profile by username and sets title (e.g. "{displayName} (@{username}) | Aralify") and description (e.g. bio or "View profile on Aralify"). Consider noindex for users who opt out of public profile.
  - **If no:** Set `robots: { index: false, follow: false }` (or noindex,follow) for this route in layout or in a server metadata layer.
- **Note:** Page is client and uses mock data; real implementation will need server-side profile fetch for metadata (and optionally for initial HTML).

**Owner:** Frontend + product (privacy decision).

---

### 3.9 Auth, dashboard, settings, admin

- **Auth:** `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`, `/auth/callback`. Set **robots: { index: false, follow: false }** in layout `(auth)` or per page so they are not indexed.
- **Dashboard and app:** `/dashboard`, `/dashboard/*`, `/settings`, `/settings/*`, `/onboarding`, `/notifications`, `/referral` (if logged-in only). Set **noindex** in their layout or per page so personal/app pages are not indexed.
- **Admin:** `/admin` and all children. **noindex** and keep in robots Disallow.

**Owner:** Frontend.

---

### 3.10 Certificate and invite

- **Certificate `/certificate/[id]:**** Usually noindex (private or one-off). Set in layout or page metadata.
- **Invite `/invite/[code]`:** noindex; already recommended in robots Disallow.

**Owner:** Frontend.

---

### 3.11 Error and not-found

- **`not-found.tsx`:** Set metadata (e.g. title "Page Not Found | Aralify", noindex).
- **`error.tsx`:** No need to change metadata (inherits layout). Ensure layout still sends correct status when possible (Next.js handles this).

**Owner:** Frontend.

---

## 4. Structured Data (JSON-LD)

Add JSON-LD in the relevant layouts/pages (e.g. via a shared component that renders `<script type="application/ld+json">` with the object). Use `metadataBase` to build absolute URLs.

### 4.1 Organization (site-wide)

- **Where:** Root layout (once).
- **Type:** `Organization`.
- **Fields:** name, url (site URL), logo, sameAs (social links), optional contactPoint, optional address if you want local SEO.

### 4.2 WebSite + SearchAction (home or layout)

- **Where:** Home page or root layout.
- **Type:** `WebSite`.
- **Fields:** name, url, description, potentialAction of type `SearchAction` (target URL pattern for site search, e.g. `/search?q={search_term_string}`). Helps search engines understand you have search.

### 4.3 Course (per course detail page)

- **Where:** `/courses/[slug]` when course is resolved.
- **Type:** `Course`.
- **Fields:** name, description, provider (Organization), optional offers (e.g. free), optional numberOfCredits, educationalLevel, etc. Align with [Google Course schema](https://developers.google.com/search/docs/appearance/structured-data/course).

### 4.4 Article (blog posts)

- **Where:** `/blog/[slug]` when post is resolved.
- **Type:** `Article` or `BlogPosting`.
- **Fields:** headline, description, image, datePublished, dateModified, author (Person or Organization).

### 4.5 FAQ (FAQ page)

- **Where:** `/faq` if you have a list of Q&A.
- **Type:** `FAQPage`.
- **Fields:** mainEntity array of Question/Answer. Use content from `@/lib/data/faq` (or wherever FAQ content lives).

### 4.6 BreadcrumbList (optional)

- **Where:** Course detail, lesson, blog post, learning path detail.
- **Use:** BreadcrumbList with itemListElement (e.g. Home > Courses > Python Fundamentals > Lesson 8). Helps SERP breadcrumbs.

**Owner:** Frontend. Validate with Google Rich Results Test / Schema.org validator.

---

## 5. Content and UX for SEO

### 5.1 Semantic HTML and accessibility

- One **`<h1>`** per page that matches the main topic (e.g. course title, blog title, “Learning Paths”).
- Use **`<h2>`–`<h6>`** in a logical order; don’t skip levels.
- Use **`<main>`, `<article>`, `<section>`, `<nav>`** where appropriate so crawlers and assistive tech understand structure.
- **Landmark roles / aria:** Ensure nav, main, footer are clear (PageShell and layout likely already help).

**Owner:** Frontend (audit key templates: home, course, blog, learning path).

### 5.2 Images

- **Alt text:** Every meaningful image has descriptive `alt` (e.g. course icons, blog images, logos). Decorative images: `alt=""`.
- **Loading:** Keep `loading="lazy"` for below-the-fold images; hero images can stay eager.
- **Sizing:** Use Next.js `Image` with width/height or fill to avoid CLS; if you use `<img>`, set dimensions.

**Owner:** Frontend + content (copy for alt).

### 5.3 Internal linking

- **Navigation:** Main nav and footer already link to key sections; ensure key content (courses, learning paths, blog, challenges) is linked from home and from each other where relevant.
- **In-content:** From blog posts link to related courses/challenges; from course pages link to learning paths and related courses. Avoid orphan pages.

**Owner:** Frontend + content strategy.

### 5.4 Core Web Vitals and performance

- **LCP:** Optimize hero images and above-the-fold assets (size, format, priority).
- **INP/CLS:** Minimize layout shift (images with dimensions, reserved space for dynamic content); reduce heavy JS on critical path.
- **Mobile:** Ensure tap targets and font sizes are usable; test with mobile-friendly and PageSpeed tools.

**Owner:** Frontend (and infra if you use Vercel image optimization).

---

## 6. International and multi-language (EN/FIL)

- **If you have locale-based routes** (e.g. `/en/...`, `/fil/...` or subdomains):
  - Add **hreflang** in metadata (`alternates.languages`) for each version of a page.
  - Set **html lang** per locale (e.g. `lang="en"` / `lang="fil"`).
- **If EN/FIL is only in-app (no separate URLs):** No hreflang needed; keep single canonical URL and use one `lang` (e.g. `en`) for the document.

**Question:** Do you plan separate URLs per language? If yes, document strategy (path vs subdomain) and we can add hreflang and sitemap per locale.

**Owner:** Frontend + product.

---

## 7. Backend / API (minimal direct SEO impact)

- The **website frontend** is what search engines crawl; the NestJS backend does not need SEO tags.
- **Indirect impact:** If sitemap or SSR metadata will pull courses/lessons/blog from the API, ensure:
  - Endpoints are fast and cacheable where appropriate.
  - No unnecessary auth for public content used by sitemap or `generateMetadata`.

**Owner:** Backend (when frontend starts consuming API for SEO-related data).

---

## 8. Operations and monitoring

- **Google Search Console:** Add property for production domain, submit sitemap URL, fix any coverage or mobile issues reported.
- **Bing Webmaster Tools:** Submit same sitemap if you care about Bing.
- **Analytics:** Use existing PostHog (or GA) to see which pages get traffic from search; refine titles/descriptions and content based on queries.
- **Structured data:** After deploying JSON-LD, check with [Rich Results Test](https://search.google.com/test/rich-results) and fix errors.
- **Routine:** When adding new public routes (e.g. new course, new blog section), add them to sitemap and set metadata; when changing content model (e.g. moving to API), update sitemap and metadata logic.

**Owner:** Dev/ops or whoever manages deployment and GSC.

---

## 9. Priority order (suggested)

1. **P0 – Foundation**
   - Add `NEXT_PUBLIC_SITE_URL` and `metadataBase`.
   - Add `sitemap.ts` and `robots.ts`.
   - Default OG/Twitter image in layout.

2. **P1 – High-value pages**
   - Home: title, description, JSON-LD (Organization, WebSite).
   - Courses: list + detail metadata (and fix course detail to use real title/description); Course JSON-LD on detail.
   - Blog: list + post metadata (generateMetadata from slug); Article JSON-LD on post.
   - FAQ: metadata + FAQPage JSON-LD.

3. **P2 – Rest of public pages**
   - Learning paths: list + detail metadata (refactor detail for server metadata if needed).
   - Challenges: list + detail metadata (same refactor if client-only).
   - About, pricing, contact, careers, compare, explore, playground, showcase, community, referral, search; privacy, terms, changelog.
   - noindex for auth, dashboard, settings, admin, certificate, invite.
   - not-found metadata.

4. **P3 – Enhancements**
   - BreadcrumbList where useful.
   - Per-page OG images for course/blog where assets exist.
   - Profile metadata (or explicit noindex) after product decision.
   - Internal linking and content pass.
   - hreflang if you add locale URLs.

5. **Ongoing**
   - GSC + sitemap submission, Rich Results checks, and quarterly metadata/content review.

---

## 10. Open questions for you

1. **Production URL:** What is the canonical production domain (e.g. `https://aralify.com`)? Any staging URL to exclude from indexing?
2. **Courses/lessons/blog source:** Will these stay in static data for a while, or are you moving soon to backend API? (Affects sitemap and generateMetadata data source.)
3. **Public profiles:** Should `/profile/[username]` be indexable or noindex by default?
4. **Certificate and invite:** Confirm noindex for `/certificate/[id]` and `/invite/[code]`?
5. **Multi-language:** Will you have separate URLs per language (EN/FIL)? If yes, path prefix or subdomain?
6. **Default OG image:** Do you already have a 1200×630 brand image, or should we add a placeholder path until design provides one?

Once these are decided, the plan can be turned into concrete tasks (e.g. file-by-file checklist) and implemented in order of priority above.
