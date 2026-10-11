const SEO = {
    title: "Zephyra Travels | Affordable Sri Lanka Tour Packages from Colombo | Local Travel Experts",
    description: "Book customized Sri Lanka tours with local experts. Budget family packages, honeymoon tours with Ella train ride, Yala wildlife safaris, Kandy cultural tours. Direct booking, no middleman. 24/7 support.",
    canonical: "https://www.zephyratravels.com",

    // OpenGraph for Facebook, LinkedIn, WhatsApp
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.zephyratravels.com",
        title: "Zephyra Travels | Affordable Sri Lanka Tour Packages from Colombo | Local Travel Experts",
        description: "Book customized Sri Lanka tours with local experts. Budget family packages, honeymoon tours with Ella train ride, Yala wildlife safaris, Kandy cultural tours. Direct booking, no middleman. 24/7 support.",
        site_name: "Zephyra Travels",
        images: [
            {
                url: "https://cdn.zephyratravels.com/public/logo.avif",
                width: 1200,
                height: 630,
                alt: "Zephyra Travels - Sri Lanka Tour Packages and Local Travel Specialists",
            },
        ],
    },

    // Twitter cards
    twitter: {
        handle: "@zephyratravels",
        site: "@zephyratravels",
        cardType: "summary_large_image",
    },

    // Extra meta tags
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'Sri Lanka tour packages, budget family tours Sri Lanka Colombo, honeymoon package Ella train ride, Yala wildlife safari tours, Kandy cultural tours, Sigiriya day trips, Galle fort tours, customized Sri Lanka holidays, local travel agency Sri Lanka, affordable Sri Lanka vacation packages'
        },
        {name: 'author', content: 'Zephyra Travels'},
        {name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'},
        {name: 'googlebot', content: 'index, follow'},
        {name: 'geo.region', content: 'LK'},
        {name: 'geo.placename', content: 'Sri Lanka'},
        {name: 'language', content: 'English'},
        {name: 'revisit-after', content: '7 days'},
        {name: 'x-ua-compatible', content: 'IE=edge'},
        {name: 'format-detection', content: 'telephone=no'},
    ],

    // Additional link tags for better SEO
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.ico',
        },
        {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.avif',
            sizes: '180x180',
        },
    ],
};

export default SEO;
