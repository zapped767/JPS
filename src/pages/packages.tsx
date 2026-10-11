import React, {useRef, useState} from "react";
import {PackagesHero} from "@/components/sections/packages/PackagesHero";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {getImageUrl} from "@/lib/utils";
import Head from "next/head";
import {useSearchPackages} from "@/hooks/useApi";

const TravelThemes = dynamic(() => import("@/components/sections/packages/TravelThemes"), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
});

const PackageFilters = dynamic(() => import("@/components/sections/packages/PackageFilters").then(mod => ({default: mod.PackageFilters,})), {
    loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded-md"></div>,
});

const PackageGrid = dynamic(() => import("@/components/sections/packages/PackageGrid").then(mod => ({default: mod.PackageGrid,})), {
    loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded-md"></div>,
});

const InquirySection = dynamic(() => import("@/components/sections/packages/InquirySection").then(mod => ({default: mod.InquirySection,})), {
    loading: () => <div className="h-48 animate-pulse bg-gray-100 rounded-md"></div>,
});

const packageImages = [
    "public/images/packages/travel-themes/explore-culture.webp",
    "public/images/packages/travel-themes/wildlife-adventure.webp",
    "public/images/packages/travel-themes/beach-getaway.webp",
    "public/images/packages/travel-themes/luxury-retreat.webp"
]

export default function Packages() {
    const [activeFilter, setActiveFilter] = useState("All Packages");

    const travelThemeRef = useRef<HTMLDivElement>(null);

    const pageSize = 1000;

    const {data, isLoading, error} = useSearchPackages(0, pageSize);

    const packagesListSchema = {
        "@context": "https://schema.org",
        "@graph": [

            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.zephyratravels.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Tour Packages",
                        "item": "https://www.zephyratravels.com/packages"
                    }
                ]
            },

            {
                "@type": "WebPage",
                "@id": "https://www.zephyratravels.com/packages/#webpage",
                "url": "https://www.zephyratravels.com/packages",
                "name": "Sri Lanka Tour Packages Listing",
                "description": "Discover all available Sri Lanka tour packages: Cultural, Adventure, Beach, and Luxury trips.",
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://www.zephyratravels.com/#Organization",
                    "name": "Zephyra Travels",
                    "logo": {
                        "@type": "ImageObject",
                        "url": getImageUrl("public/logo.avif")
                    }
                }
            },

            {
                "@type": "OfferCatalog",
                "name": "All Sri Lanka Tour Packages",

                "itemListElement": (data?.content ?? []).map(
                    (packageTour: any, index: number) => ({
                        "@type": "Offer",
                        "position": index + 1,
                        "itemOffered": {
                            "@type": "TouristTrip",
                            "name": packageTour?.name ?? "",
                            "description": packageTour?.description || "",
                            "url": `https://www.zephyratravels.com/explore/${packageTour?.slug}`,
                            "image": packageTour?.image || "",
                            "provider": {
                                "@type": "Organization",
                                "name": "Zephyra Travels"
                            }
                        }
                    })
                )
            }
        ]
    };

    const ScrollToTravelThemes = () => {
        if (travelThemeRef.current && typeof (travelThemeRef.current as any).scrollIntoView === "function") {
            travelThemeRef.current.scrollIntoView({behavior: "smooth", block: "start"});
            return;
        }
        // fallback: use id lookup
        const el = document.getElementById("travel-themes");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    return (
        <>
            <Head>
                <title>Sri Lanka Tour Packages 2025 | Budget Family & Honeymoon Packages from $499 | Zephyra
                    Travels</title>
                <meta
                    name="description"
                    content="Browse 50+ affordable Sri Lanka tour packages. Budget family tours from $499, honeymoon packages with Ella train, Yala safari tours, cultural Kandy trips. Direct booking, customizable itineraries, SLTDA registered."
                />
                <meta
                    name="keywords"
                    content="Sri Lanka tour packages, Sri Lanka holiday packages, Sri Lanka travel packages, Sri Lanka itineraries, Sri Lanks Traditional foods, Sri Lanka Adventure tours, Sri Lanka tour package cost, Sri Lanka tour packages for couples, Sri Lanka tour packages for families, Sri Lanka tour packages for family with flight price, sri lanka top tour packages, sri lanka tours package, tour packages for sri lanka from mumbai, private sri lanka tour packages, sri lanka tour from india packages, sri lanka tour"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Sri Lanka"/>

                <link rel="canonical" href="https://www.zephyratravels.com/packages"/>
                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/packages"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/packages"/>

                {packageImages.map((image, index) => (
                    <link key={index} rel="preload" as="image" href={getImageUrl(image)}/>
                ))}

                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title"
                      content="Sri Lanka Tour Packages 2025 | Budget Family & Honeymoon Packages from $499"/>
                <meta property="og:description"
                      content="Browse 50+ affordable Sri Lanka tour packages. Budget family tours from $499, honeymoon packages with Ella train, Yala safari tours. Direct booking, customizable itineraries."/>
                <meta property="og:url" content="https://www.zephyratravels.com/packages"/>
                <meta property="og:image" content={getImageUrl("public/og-image-packages.jpg")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Affordable Sri Lanka Tour Packages - Family & Honeymoon Deals"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title"
                      content="Sri Lanka Tour Packages 2025 | From $499"/>
                <meta name="twitter:description"
                      content="50+ affordable packages: budget family tours, honeymoon deals, Yala safaris, cultural tours. Customizable itineraries, direct booking."/>
                <meta name="twitter:image" content={getImageUrl("public/og-image-packages.jpg")}/>
                <meta name="twitter:image:alt" content="Affordable Sri Lanka Tour Packages"/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(packagesListSchema),
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased">

                <div className="">
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>
                {/* Main Content */}
                <main className="relative max-w-7xl mx-auto pt-20">

                    <div className="relative z-30">
                        <div className="relative z-10 pt-4 lg:pt-6">
                            {/* Hero Section */}
                            <PackagesHero OnScrollToTravelThemes={ScrollToTravelThemes}/>
                        </div>
                        {/* Travel Themes Section */}
                        <TravelThemes ref={travelThemeRef}/>

                        {/* Package Filters */}
                        <PackageFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />

                        {/* Package Grid */}
                        <PackageGrid data={data ? data : []} isLoading={isLoading} error={error}
                                     activeFilter={activeFilter}/>

                        {/*Inquiry Section*/}
                        <InquirySection/>
                    </div>
                </main>

            </div>
        </>
    );
}
