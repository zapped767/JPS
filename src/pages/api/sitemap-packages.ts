import type {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

interface Package {
    id: number;
    slug: string;
    name: string;
    description: string;
    image: string;
    adultTotalPrice: number;
    durationDays: number;
    durationNights: number;
    updatedAt?: string;
    createdAt?: string;
    active: boolean;
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
        // Fetch packages from your API
        const packages = await fetchPackages();

        // Generate XML sitemap
        const xml = generatePackageSitemap(packages);

        res.status(200).send(xml);
    } catch (error) {
        console.error('Error generating package sitemap:', error);

        // Return empty but valid sitemap on error
        const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Error generating sitemap. Please check server logs. -->
</urlset>`;

        res.status(200).send(errorXml);
    }
}

async function fetchPackages(): Promise<Package[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiUrl) {
            console.error('API_BASE_URL not configured');
            return [];
        }

        // Fetch packages from your backend API
        const response = await axios.get(`${apiUrl}/packages`, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the response structure based on your API
        const data = response.data?.data || response.data || [];

        // Filter only active packages
        const activePackages = Array.isArray(data)
            ? data.filter((pkg: Package) => pkg.active)
            : [];

        console.log(`Fetched ${activePackages.length} active packages for sitemap`);

        return activePackages;
    } catch (error: any) {
        console.error('Error fetching packages:', error.message);

        // Return empty array on error
        return [];
    }
}

function generatePackageSitemap(packages: Package[]): string {
    const baseUrl = 'https://www.zephyratravels.com';
    const now = new Date().toISOString();

    // If no packages, return minimal sitemap
    if (!packages || packages.length === 0) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- No active packages found -->
</urlset>`;
    }

    const urls = packages.map((pkg) => {
        const lastmod = pkg.updatedAt || pkg.createdAt || now;
        const imageUrl = pkg.image || `${baseUrl}/images/default-package.jpg`;

        // Escape XML special characters in text
        const escapedName = escapeXml(pkg.name || 'Tour Package');
        const escapedDescription = escapeXml(
            (pkg.description || pkg.name || 'Sri Lanka tour package')
                .substring(0, 200)
                .replace(/\n/g, ' ')
        );

        return `
    <url>
        <loc>${baseUrl}/explore/${pkg.slug}</loc>
        <lastmod>${new Date(lastmod).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
        <image:image>
            <image:loc>${escapeXml(imageUrl)}</image:loc>
            <image:title>${escapedName} - ${pkg.durationDays}D${pkg.durationNights}N from $${pkg.adultTotalPrice}</image:title>
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
