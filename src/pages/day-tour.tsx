import React, {useState} from "react";
import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {getImageUrl} from "@/lib/utils";
import Head from "next/head";
import {DayToursFilters} from "@/components/sections/day-tour/DayToursFilters";
import DayTourHero from "@/components/sections/day-tour/DayTourHero";
import {useQuery} from "@tanstack/react-query";
import {dayTourService} from "@/lib/services";

const DayTourTravelThemes = dynamic(() => import("@/components/sections/day-tour/DayTourTravelThemes"), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
});

const DayToursGrid = dynamic(() => import("@/components/sections/day-tour/DayToursGrid").then((mod) => mod.DayToursGrid), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>, ssr: false,
});

const TravelThemesDesktop = dynamic(() => import("@/components/sections/day-tour/TravelThemesDesktop"), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
});

export default function DayTour() {
    const [activeFilter, setActiveFilter] = useState("All Day Tours");

    const {
        data: dayTourData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["day-tour"],
        queryFn: dayTourService.getDayTours,
    });

    const tourTypes = dayTourData?.map((t: any) => t.tourType) ?? undefined;
    const filters = Array.from(new Set(tourTypes)) as string[];

    const packagesListSchema = {
        "@context": "https://schema.org",
        "@graph": [
            // 1. Breadcrumb List
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
                        "name": "Day Tours",
                        "item": "https://www.zephyratravels.com/day-tour"
                    }
                ]
            },

            // 2. WebPage
            {
                "@type": "WebPage",
                "@id": "https://www.zephyratravels.com/day-tour/#webpage",
                "url": "https://www.zephyratravels.com/day-tour",
                // Targeted name/title
                "name": "Best Sri Lanka Day Tours | Zephyra Travels",
                "description": "Discover all available Sri Lanka day tour packages: Cultural, Adventure, Beach, and Luxury trips.",
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

            // 3. Offer Catalog
            {
                "@type": "OfferCatalog",
                "name": "All Sri Lanka Day Tour Packages",

                "itemListElement": (dayTourData?.content ?? []).map(
                    (packageTour: any, index: number) => ({
                        "@type": "Offer",
                        "position": index + 1,
                        "itemOffered": {
                            "@type": "TouristTrip",
                            "name": packageTour?.name ?? "",
                            "description": packageTour?.description || "",
                            "url": `https://www.zephyratravels.com/day-tour/${packageTour?.slug}`,
                            "image": packageTour?.image.slice(',')[0] || "",
                            "provider": {
                                "@type": "Organization",
                                "name": "Zephyra Travels"
                            }
                        }
                    })
                )
            },
        ]
    };

    const ScrollToTravelThemes = () => {
        // fallback: use id lookup
        const el = document.getElementById("day-tours");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    return (
        <>
            <Head>
                <title>Best Sri Lanka Day Tours | Zephyra Travels</title>

                <meta
                    name="description"
                    content="Book the best Sri Lanka Day Tours! Find affordable Colombo Airport pickup prices, one day Ella itineraries, and expertled cultural excursions."
                />

                <meta
                    name="keywords"
                    content="Sri Lanka day tours, Sri Lanka excursions, one day tours Sri Lanka, Colombo day tours, Sri Lanka day out, Sri Lanka day out packages, Sri Lanka day trips, Sri Lanka day trips from colombo, sri lanka 3 day tour, sri lanka 5 days tour package, sri lanka day tours, 10 day sri lanka tour, 3 days tour package sri lanka, 5 days tour package sri lanka, 6 day sri lanka tour, 7 days tour in sri lanka, day tour taxi sri lanka, day tours colombo sri lanka"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots" content="index, follow, max-image-preview:large"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>

                <link rel="canonical" href="https://www.zephyratravels.com/day-tour"/>
                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/day-tour"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/day-tour"/>

                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:title"
                      content="Best Sri Lanka Day Tours | Zephyra Travels"/>
                <meta property="og:description"
                      content="Book the best Sri Lanka Day Tours! Find affordable Colombo Airport pickup prices, one day Ella itineraries, and expertled cultural excursions."/>
                <meta property="og:url" content="https://www.zephyratravels.com/day-tour"/>
                <meta property="og:image" content={getImageUrl("public/og-image-packages.jpg")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Best Sri Lanka Day Tour Packages and Excursions"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title"
                      content="Best Sri Lanka Day Tours | Zephyra Travels"/>
                <meta name="twitter:description"
                      content="Book the best Sri Lanka Day Tours! Find affordable Colombo Airport pickup prices, one day Ella itineraries, and expertled cultural excursions."/>
                <meta name="twitter:image" content={getImageUrl("public/og-image-packages.jpg")}/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(packagesListSchema),
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased md:mt-5">

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
                <main className="relative max-w-7xl mx-auto pt-16">

                    <div className="relative z-30">
                        <div className="relative z-10 pt-2 min-[1060px]:pt-6">
                            {/* Hero Section */}
                            <DayTourHero OnScrollToTravelThemes={ScrollToTravelThemes}/>
                        </div>

                        {/* Package Filters */}
                        <DayToursFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                            filters={filters}
                        />

                        {/* Package Grid */}
                        <DayToursGrid data={dayTourData ? dayTourData : []} isLoading={isLoading} error={error}
                                      activeFilter={activeFilter}/>

                        {/* Travel Themes Section */}
                        <div className="lg:hidden">
                            <DayTourTravelThemes/>
                        </div>
                        <div className="hidden lg:block">
                            <TravelThemesDesktop/>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
