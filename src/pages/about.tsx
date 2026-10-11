import React from "react";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";
import {AboutHero} from "@/components/sections/about/AboutHero";
import {getImageUrl} from "@/lib/utils";
import Head from "next/head";

// Lazy load below-the-fold sections
const AboutWhoWeAre = dynamic(
    () =>
        import("@/components/sections/about/AboutWhoWeAre").then((mod) => ({
            default: mod.AboutWhoWeAre,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutWhatWeDo = dynamic(
    () =>
        import("@/components/sections/about/AboutWhatWeDo").then((mod) => ({
            default: mod.AboutWhatWeDo,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutWhyChoose = dynamic(
    () =>
        import("@/components/sections/about/AboutWhyChoose").then((mod) => ({
            default: mod.AboutWhyChoose,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutTrustUs = dynamic(
    () =>
        import("@/components/sections/about/AboutTrustUs").then((mod) => ({
            default: mod.AboutTrustUs,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutB2BTravelPartner = dynamic(
    () =>
        import("@/components/sections/about/AboutB2BTravelPartner").then((mod) => ({
            default: mod.AboutB2BTravelPartner,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutHowWeWork = dynamic(
    () =>
        import("@/components/sections/about/AboutHowWeWork").then((mod) => ({
            default: mod.AboutHowWeWork,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const AboutOurTeam = dynamic(
    () =>
        import("@/components/sections/about/AboutOurTeam").then((mod) => ({
            default: mod.AboutOurTeam,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

export default function About() {
    return (
        <>
            <Head>
                {/* Basic Meta */}
                <title>About Zephyra Travels | Local Sri Lanka Tour Operator Since 2025 | Certified Travel
                    Experts</title>
                <meta
                    name="description"
                    content="Zephyra Travels is a trusted local Sri Lanka travel agency offering personalized tours, budget-friendly packages, and expert guides. Direct booking with no middleman. ISO-certified & SLTDA registered. 24/7 customer support."
                />
                <meta name="keywords"
                      content="Sri Lanka travel agency, Sri Lanka tour operator, local travel experts Sri Lanka, Travel Agency colombo, Tour operators in Sri Lanka inbound, Tour operators in Sri Lanka outbound"/>

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Colombo, Sri Lanka"/>
                <meta name="geo.position" content="6.876764962224119;79.8766838976908"/>
                <meta name="ICBM" content="6.876764962224119, 79.8766838976908"/>

                {/* Canonical */}
                <link rel="canonical" href="https://www.zephyratravels.com/about"/>

                {/* Alternate Languages */}
                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/about"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/about"/>

                {/* Favicon */}
                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                {/* Open Graph */}
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:title"
                      content="About Zephyra Travels | Local Sri Lanka Tour Operator Since 2025 | Certified Travel Experts"/>
                <meta property="og:description"
                      content="Zephyra Travels is a trusted local Sri Lanka travel agency offering personalized tours, budget-friendly packages, and expert guides. Direct booking with no middleman. ISO-certified & SLTDA registered. 24/7 customer support."/>
                <meta property="og:url" content="https://www.zephyratravels.com/about"/>
                <meta property="og:image" content={getImageUrl("public/images/about/b2b/office-environment.webp")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Zephyra Travels Office - Local Sri Lanka Tour Operator"/>
                <meta property="og:locale" content="en_US"/>

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title" content="About Zephyra Travels | Local Sri Lanka Tour Operator Since 2025"/>
                <meta name="twitter:description"
                      content="Trusted local Sri Lanka travel agency. Personalized tours, budget packages, expert guides. Direct booking, no middleman. ISO-certified & SLTDA registered."/>
                <meta name="twitter:image" content={getImageUrl("public/images/about/b2b/office-environment.webp")}/>
                <meta name="twitter:image:alt" content="Zephyra Travels Office - Local Sri Lanka Tour Operator"/>

                {/* Structured Data JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                // BreadcrumbList
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
                                            "name": "About Us",
                                            "item": "https://www.zephyratravels.com/about"
                                        }
                                    ]
                                },
                                // Organization - Enhanced for E-E-A-T
                                {
                                    "@type": "TravelAgency",
                                    "@id": "https://www.zephyratravels.com/#organization",
                                    "name": "Zephyra Travels",
                                    "legalName": "Zephyra Travels Pvt Ltd",
                                    "url": "https://www.zephyratravels.com",
                                    "logo": "https://cdn.zephyratravels.com/public/logo.avif",
                                    "description": "Zephyra Travels is a trusted local Sri Lanka travel agency offering personalized tours, budget-friendly packages, and expert guides. SLTDA registered and ISO-certified tour operator.",
                                    "foundingDate": "2025",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressCountry": "LK",
                                        "addressLocality": "Colombo",
                                        "addressRegion": "Western Province"
                                    },
                                    "geo": {
                                        "@type": "GeoCoordinates",
                                        "latitude": "6.876764962224119",
                                        "longitude": "79.8766838976908"
                                    },
                                    "areaServed": {
                                        "@type": "Country",
                                        "name": "Sri Lanka"
                                    },
                                    "serviceType": ["Tour Operator", "Travel Agency", "DMC", "B2B Travel Partner"],
                                    "priceRange": "$$",
                                    "knowsAbout": ["Sri Lanka Tourism", "Cultural Tours", "Wildlife Safaris", "Beach Holidays", "Adventure Travel", "Honeymoon Packages"],
                                    "sameAs": [
                                        "https://maps.app.goo.gl/Mh87Yi8FNU6fXbTm7",
                                        "https://www.facebook.com/zephyratravelslk",
                                        "https://www.instagram.com/zephyratravels/",
                                        "https://www.linkedin.com/company/zephyratravels",
                                        "https://x.com/zephyratravels",
                                        "https://www.tiktok.com/@zephyratravels",
                                        "https://www.youtube.com/@ZephyraTravels",
                                        "https://www.pinterest.com/zephyratravels/",
                                        "https://www.tripadvisor.com/Attraction_Review-g293962-d33675398-Reviews-ZephyraTravels-Colombo_Western_Province.html",
                                        "https://wa.me/94761345718"
                                    ]
                                },
                                // AboutPage
                                {
                                    "@type": "AboutPage",
                                    "url": "https://www.zephyratravels.com/about",
                                    "name": "About Zephyra Travels",
                                    "description": "Learn about Zephyra Travels, a local Sri Lanka tour operator offering personalized travel experiences, budget-friendly packages, and certified tour guides.",
                                    "mainEntity": {
                                        "@type": "Organization",
                                        "@id": "https://www.zephyratravels.com/#organization"
                                    },
                                    "inLanguage": "en-US",
                                    "isPartOf": {
                                        "@type": "WebSite",
                                        "url": "https://www.zephyratravels.com"
                                    }
                                }
                            ]
                        })
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased overflow-x-hidden hide-scrollbar">
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

                    {/* Content Sections */}
                    <div className="relative z-10">
                        {/* Hero Section */}
                        <AboutHero/>

                        {/*/!* Who We Are Section *!/*/}
                        <AboutWhoWeAre/>

                        {/*/!* What We Do Section *!/*/}
                        <AboutWhatWeDo/>

                        {/*/!* Why Choose Section *!/*/}
                        <AboutWhyChoose/>

                        {/*/!* Trust & Recognition Section *!/*/}
                        <AboutTrustUs/>

                        {/*/!* B2B Section *!/*/}
                        <AboutB2BTravelPartner/>

                        {/*/!* How We Work Section *!/*/}
                        <AboutHowWeWork/>

                        {/*/!* Our Team Section *!/*/}
                        <AboutOurTeam/>
                    </div>
                </main>
            </div>
        </>
    );
}
