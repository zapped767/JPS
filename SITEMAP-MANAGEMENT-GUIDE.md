# Sitemap Management Guide - Zephyra Travels

## Dynamic Sitemap Generation for Production

---

## 📂 CURRENT SITEMAP STRUCTURE

### **Created Files:**

```
public/
├── sitemap-index.xml          ← Master index (points to all sitemaps)
├── sitemap.xml                ← Static pages (home, about, gallery, etc.)
├── sitemap-packages.xml       ← Tour packages (currently template)
└── sitemap-blogs.xml          ← Blog posts (currently template)
```

### **Robots.txt Configuration:**

```
Sitemap: https://www.zephyratravels.com/sitemap-index.xml
Sitemap: https://www.zephyratravels.com/sitemap.xml
Sitemap: https://www.zephyratravels.com/sitemap-packages.xml
Sitemap: https://www.zephyratravels.com/sitemap-blogs.xml
```

---

## ⚠️ IMPORTANT: CURRENT STATUS

### **Templates Created (Not Production Ready)**

The `sitemap-packages.xml` and `sitemap-blogs.xml` files are **TEMPLATES** with example data.

**For production, you MUST generate these dynamically from your database.**

---

## 🔧 PRODUCTION IMPLEMENTATION

### **Option 1: Next.js API Routes (Recommended)**

Create dynamic sitemap generation using Next.js API routes.

#### **Step 1: Create Package Sitemap API**

**File:** `src/pages/api/sitemap-packages.ts`

```typescript
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Set headers for XML
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

    try {
        // Fetch packages from your database
        const packages = await fetchPackagesFromDatabase();

        // Generate XML
        const xml = generatePackageSitemap(packages);

        res.status(200).send(xml);
    } catch (error) {
        res.status(500).json({error: 'Error generating sitemap'});
    }
}

async function fetchPackagesFromDatabase() {
    // Replace with your actual database query
    // Example using Prisma:
    // return await prisma.package.findMany({
    //   where: { active: true },
    //   select: { slug: true, updatedAt: true, name: true, image: true }
    // });

    // Example using your API:
    const response = await fetch(`${process.env.API_URL}/packages`);
    return response.json();
}

function generatePackageSitemap(packages: any[]) {
    const baseUrl = 'https://www.zephyratravels.com';

    const urls = packages.map((pkg) => `
    <url>
      <loc>${baseUrl}/explore/${pkg.slug}</loc>
      <lastmod>${new Date(pkg.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
      ${pkg.image ? `
      <image:image>
        <image:loc>${pkg.image}</image:loc>
        <image:title>${escapeXml(pkg.name)}</image:title>
        <image:caption>${escapeXml(pkg.description?.substring(0, 200) || pkg.name)}</image:caption>
      </image:image>` : ''}
    </url>
  `).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '\'':
                return '&apos;';
            case '"':
                return '&quot;';
            default:
                return c;
        }
    });
}
```

#### **Step 2: Create Blog Sitemap API**

**File:** `src/pages/api/sitemap-blogs.ts`

```typescript
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate');

    try {
        const blogs = await fetchBlogsFromDatabase();
        const xml = generateBlogSitemap(blogs);

        res.status(200).send(xml);
    } catch (error) {
        res.status(500).json({error: 'Error generating sitemap'});
    }
}

async function fetchBlogsFromDatabase() {
    // Replace with your actual database query
    const response = await fetch(`${process.env.API_URL}/blogs?status=published`);
    return response.json();
}

function generateBlogSitemap(blogs: any[]) {
    const baseUrl = 'https://www.zephyratravels.com';

    const urls = blogs.map((blog) => `
    <url>
      <loc>${baseUrl}/view-blog/${blog.slug}</loc>
      <lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      ${blog.image ? `
      <image:image>
        <image:loc>${blog.image}</image:loc>
        <image:title>${escapeXml(blog.title)}</image:title>
        <image:caption>${escapeXml(blog.description?.substring(0, 200) || blog.title)}</image:caption>
      </image:image>` : ''}
    </url>
  `).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;
}

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '\'':
                return '&apos;';
            case '"':
                return '&quot;';
            default:
                return c;
        }
    });
}
```

#### **Step 3: Update Sitemap URLs**

After creating the API routes, update your sitemap references:

**In `robots.txt` and `sitemap-index.xml`, change:**

```
https://www.zephyratravels.com/sitemap-packages.xml
https://www.zephyratravels.com/sitemap-blogs.xml
```

**To:**

```
https://www.zephyratravels.com/api/sitemap-packages
https://www.zephyratravels.com/api/sitemap-blogs
```

---

### **Option 2: Server-Side Generation with Rewrites**

If you prefer static files, use Next.js rewrites in `next.config.ts`:

```typescript
async
rewrites()
{
    return [
        {
            source: '/sitemap-packages.xml',
            destination: '/api/sitemap-packages',
        },
        {
            source: '/sitemap-blogs.xml',
            destination: '/api/sitemap-blogs',
        },
    ];
}
```

This keeps URLs clean while serving dynamic content.

---

### **Option 3: Build-Time Static Generation**

For smaller sites, generate sitemaps at build time.

**Create:** `scripts/generate-sitemaps.js`

```javascript
const fs = require('fs');
const path = require('path');

async function generateSitemaps() {
    // Fetch data from API
    const packages = await fetchPackages();
    const blogs = await fetchBlogs();

    // Generate XMLs
    const packageXml = generatePackageXml(packages);
    const blogXml = generateBlogXml(blogs);

    // Write to public folder
    fs.writeFileSync(
        path.join(__dirname, '../public/sitemap-packages.xml'),
        packageXml
    );

    fs.writeFileSync(
        path.join(__dirname, '../public/sitemap-blogs.xml'),
        blogXml
    );

    console.log('✅ Sitemaps generated successfully');
}

generateSitemaps();
```

**Add to `package.json`:**

```json
{
  "scripts": {
    "generate-sitemaps": "node scripts/generate-sitemaps.js",
    "prebuild": "npm run generate-sitemaps",
    "build": "next build"
  }
}
```

---

## 🔄 AUTOMATIC REGENERATION

### **When to Regenerate Sitemaps:**

1. **New Package Added** → Regenerate `sitemap-packages.xml`
2. **New Blog Published** → Regenerate `sitemap-blogs.xml`
3. **Package Updated** → Update lastmod in sitemap
4. **Blog Updated** → Update lastmod in sitemap

### **Implementation Options:**

#### **A. Webhook Trigger**

```typescript
// After creating/updating package in database
await fetch('/api/regenerate-sitemap?type=packages', {
    method: 'POST'
});
```

#### **B. Database Trigger**

Set up database triggers to call sitemap regeneration.

#### **C. Scheduled Regeneration**

Use cron job to regenerate sitemaps daily:

```typescript
// Using Vercel Cron Jobs (vercel.json)
{
    "crons"
:
    [{
        "path": "/api/regenerate-sitemaps",
        "schedule": "0 0 * * *"
    }]
}
```

---

## 📊 SITEMAP BEST PRACTICES

### **URL Limits:**

- Maximum 50,000 URLs per sitemap
- Maximum 50 MB uncompressed
- If exceeded, split into multiple sitemaps

### **Priority Guidelines:**

```
Homepage:              1.0
Package Pages:         0.9
New Blogs (<7 days):   0.8
Old Blogs:             0.7
Gallery:               0.6
About/Policies:        0.5-0.7
```

### **Change Frequency:**

```
Homepage:              daily
Packages:              weekly
Blogs:                 monthly
Static Pages:          yearly
```

### **Images in Sitemaps:**

- Always include featured image
- Add descriptive caption (helps image SEO)
- Max 1,000 images per sitemap
- Use high-quality image URLs

---

## ✅ TESTING YOUR SITEMAPS

### **1. Validate XML Syntax:**

```bash
curl https://www.zephyratravels.com/sitemap-packages.xml | xmllint --noout -
```

### **2. Google Search Console:**

1. Go to Search Console
2. Navigate to Sitemaps
3. Submit sitemap URL
4. Monitor for errors

### **3. Test Tools:**

- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Screaming Frog SEO Spider](https://www.screamingfrogseosuite.com/)

---

## 🚀 SUBMISSION CHECKLIST

After implementing dynamic sitemaps:

- [ ] Test all sitemap URLs return valid XML
- [ ] Verify all package/blog URLs are included
- [ ] Check lastmod dates are correct
- [ ] Validate images are accessible
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor for crawl errors
- [ ] Set up automatic regeneration
- [ ] Add sitemap monitoring alerts

---

## 📞 TROUBLESHOOTING

### **Sitemap Not Found (404)**

```
✓ Check file exists in public/ folder
✓ Verify API route is created
✓ Check rewrites in next.config.ts
✓ Clear build cache and rebuild
```

### **Empty Sitemap**

```
✓ Verify database connection
✓ Check query returns results
✓ Validate data transformation
✓ Review error logs
```

### **Images Not Showing in Sitemap**

```
✓ Ensure image URLs are absolute
✓ Check images are accessible
✓ Verify XML namespace is correct
✓ Test image URLs in browser
```

---

## 📚 RESOURCES

- [Google Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Image Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Next.js Sitemap Generation](https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps)

---

**Last Updated:** December 7, 2025
**Status:** Templates created, awaiting dynamic implementation
**Next Step:** Implement API routes for dynamic generation
