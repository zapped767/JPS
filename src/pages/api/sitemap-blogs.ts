import type {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

interface Blog {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string;
    category?: {
        name: string;
    };
    updatedAt?: string;
    createdAt?: string;
    publishedAt?: string;
    status?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    // Set headers for XML
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    try {
        // Fetch blogs from your API
        const blogs = await fetchBlogs();

        // Generate XML sitemap
        const xml = generateBlogSitemap(blogs);

        res.status(200).send(xml);
    } catch (error) {
        console.error('Error generating blog sitemap:', error);

        // Return empty but valid sitemap on error
        const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Error generating sitemap. Please check server logs. -->
</urlset>`;

        res.status(200).send(errorXml);
    }
}

async function fetchBlogs(): Promise<Blog[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiUrl) {
            console.error('API_BASE_URL not configured');
            return [];
        }

        // Fetch blogs from your backend API
        const response = await axios.get(`${apiUrl}/blogs`, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the response structure based on your API
        const data = response.data?.data || response.data || [];

        // Filter only published blogs (if status field exists)
        const publishedBlogs = Array.isArray(data)
            ? data.filter((blog: Blog) =>
                !blog.status || blog.status === 'published' || blog.status === 'active'
            )
            : [];

        console.log(`Fetched ${publishedBlogs.length} published blogs for sitemap`);

        return publishedBlogs;
    } catch (error: any) {
        console.error('Error fetching blogs:', error.message);

        // Return empty array on error
        return [];
    }
}

function generateBlogSitemap(blogs: Blog[]): string {
    const baseUrl = 'https://www.zephyratravels.com';
    const now = new Date().toISOString();

    // If no blogs, return minimal sitemap
    if (!blogs || blogs.length === 0) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- No published blogs found -->
</urlset>`;
    }

    const urls = blogs.map((blog) => {
        const lastmod = blog.updatedAt || blog.publishedAt || blog.createdAt || now;
        const imageUrl = blog.image || `${baseUrl}/images/default-blog.jpg`;

        // Escape XML special characters in text
        const escapedTitle = escapeXml(blog.title || 'Sri Lanka Travel Blog');
        const escapedDescription = escapeXml(
            (blog.description || blog.title || 'Sri Lanka travel guide and tips')
                .substring(0, 200)
                .replace(/\n/g, ' ')
        );

        // Calculate priority based on how recent the blog is
        const postDate = new Date(blog.publishedAt || blog.createdAt || now);
        const daysSincePublish = Math.floor(
            (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        let priority = 0.7;
        if (daysSincePublish < 7) {
            priority = 0.8; // Recent posts get higher priority
        } else if (daysSincePublish < 30) {
            priority = 0.75;
        }

        return `
    <url>
        <loc>${baseUrl}/view-blog/${blog.slug}</loc>
        <lastmod>${new Date(lastmod).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
        <image:image>
            <image:loc>${escapeXml(imageUrl)}</image:loc>
            <image:title>${escapedTitle}</image:title>
            <image:caption>${escapedDescription}</image:caption>
        </image:image>
    </url>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function escapeXml(unsafe: string): string {
    if (!unsafe) return '';

    return unsafe
        .toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
