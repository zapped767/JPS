import React from "react";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";
import Head from "next/head";
import {getImageUrl} from "@/lib/utils";

// Lazy load sections
const BusinessPartnershipOptions = dynamic(
    () =>
        import("@/components/sections/business/BusinessPartnershipOptions").then(
            (mod) => mod.BusinessPartnershipOptions
        ),
    {loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>}
);

const BusinessWhyPartnerWith = dynamic(
    () =>
        import("@/components/sections/business/BusinessWhyPartnerWith").then(
            (mod) => mod.BusinessWhyPartnerWith
        ),
    {loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>}
);

const BusinessHowItWorks = dynamic(
    () =>
        import("@/components/sections/business/BusinessHowItWorks").then(
            (mod) => mod.BusinessHowItWorks
        ),
    {loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>}
);

const BusinessPartnershipForm = dynamic(
    () =>
        import("@/components/sections/business/BusinessPartnershipForm").then(
            (mod) => mod.BusinessPartnershipForm
        ),
    {loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>}
);

export default function Partners() {
    return (
        <>
            <Head>
                <title>B2B Travel Partner Sri Lanka | DMC & Wholesale Tour Operator | Zephyra Travels</title>
                <meta
                    name="description"
                    content="Partner with SLTDA registered DMC in Sri Lanka. Wholesale tour packages, ground handling services, negotiated hotel rates, private driver fleet. Competitive commissions, 24/7 support. Join 200+ travel agencies worldwide."
                />
                <meta
                    name="keywords"
                    content="Sri Lanka DMC, travel partners Sri Lanka, destination management Sri Lanka, dmc in sri lanka, sri lanka dmc, best dmc in sri lanka, top 10 dmc in sri lanka, akorn dmc sri lanka, best dmc for sri lanka, best dmc for sri lanka in india, dmc for sri lanka, dmc for sri lanka in india"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Colombo, Sri Lanka"/>

                <link rel="canonical" href="https://www.zephyratravels.com/partners"/>

                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/partners"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/partners"/>

                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title" content="B2B Travel Partner Sri Lanka | DMC & Wholesale Tour Operator"/>
                <meta property="og:description"
                      content="Partner with SLTDA registered DMC in Sri Lanka. Wholesale packages, ground handling, negotiated rates, private fleet. Competitive commissions, 24/7 support. Join 200+ agencies."/>
                <meta property="og:url" content="https://www.zephyratravels.com/partners"/>
                <meta property="og:image" content={getImageUrl("public/images/about/b2b/handshake.webp")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="B2B Partnership with Zephyra Travels - Sri Lanka DMC"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title" content="B2B Travel Partner Sri Lanka | DMC & Wholesale Operator"/>
                <meta name="twitter:description"
                      content="SLTDA registered DMC. Wholesale packages, ground handling, negotiated hotel rates. Competitive commissions, 24/7 support."/>
                <meta name="twitter:image" content={getImageUrl("public/images/about/b2b/handshake.webp")}/>
                <meta name="twitter:image:alt" content="B2B Partnership with Zephyra Travels"/>

                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "Organization",
                                "@id": "https://www.zephyratravels.com/#Organization",
                                "name": "Zephyra Travels",
                                "url": "https://www.zephyratravels.com"
                            },

                            {
                                "@context": "https://schema.org",
                                "@type": "ServicePage",
                                "name": "B2B Partnership Opportunities with Zephyra Travels",
                                "url": "https://www.zephyratravels.com/partners",
                                "description": "Offering ground handling, negotiated hotel rates, and custom wholesale tour packages for international travel agencies and affiliates.",
                                "serviceType": "B2B Travel Services",
                                "provider": {
                                    "@type": "Organization",
                                    "@id": "https://www.zephyratravels.com/#Organization"
                                },
                                "mainEntityOfPage": "https://www.zephyratravels.com/partners"
                            }
                        ]),
                    }}
                />
            </Head>
            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased">
                <div>
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute z-20 top-40 max-sm:top-14 left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>

                <main className="relative pt-20">
                    <div className="relative z-10 max-w-7xl mx-auto">

                        {/* Partnership Options */}
                        <BusinessPartnershipOptions/>

                        {/* Why Partner With Us */}
                        <BusinessWhyPartnerWith/>

                        {/* How It Works */}
                        <BusinessHowItWorks/>
                    </div>

                    {/* Full-width Partnership Form */}
                    <div className="w-full bg-[#6938d3]">
                        <div className="max-w-7xl mx-auto">
                            <BusinessPartnershipForm/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
