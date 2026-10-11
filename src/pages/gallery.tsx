import {motion} from "framer-motion";
import GalleryPage from "@/components/sections/gallery/GalleryPage";
import Head from "next/head";
import {getImageUrl} from "@/lib/utils";
import React from "react";

const firstViewImages = [
    "public/images/gallery/photo/cultural/kandyan-dancers.webp",
    "public/images/gallery/photo/wildlife/yala-leopard.webp",
    "public/images/gallery/photo/beaches/hikkaduwa-reef.webp"
]

export default function Gallery() {
    return (
        <>
            <Head>
                <title>Sri Lanka Travel Photo Gallery 2025 | Real Tour Photos & Videos | Zephyra Travels</title>
                <meta
                    name="description"
                    content="Browse authentic Sri Lanka travel photos and videos from real tours. Sigiriya rock photos, Ella train views, Yala leopard sightings, Nine Arch Bridge, Galle Fort, cultural experiences. Inspire your Sri Lanka trip."
                />
                <meta
                    name="keywords"
                    content="Sri Lanka travel gallery, Sri Lanka tour photos, Sri Lanka destinations, Sri lanka images, Sri lanka pictures, Sri lanka flag images, people of sri lanka images"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Sri Lanka"/>

                <link rel="canonical" href="https://www.zephyratravels.com/gallery"/>

                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/gallery"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/gallery"/>

                {firstViewImages.map((image, index) => (
                    <link key={index} rel="preload" as="image" href={getImageUrl(image)}/>
                ))}

                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title" content="Sri Lanka Travel Photo Gallery 2025 | Real Tour Photos & Videos"/>
                <meta property="og:description"
                      content="Browse authentic Sri Lanka travel photos from real tours. Sigiriya, Ella train, Yala leopards, Nine Arch Bridge, Galle Fort, cultural experiences. Inspire your trip."/>
                <meta property="og:url" content="https://www.zephyratravels.com/gallery"/>
                <meta property="og:image"
                      content={getImageUrl("public/images/gallery/photo/wildlife/yala-leopard.webp")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Sri Lanka Travel Gallery - Yala Leopard Safari Photo"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title" content="Sri Lanka Travel Photo Gallery 2025 | Real Tour Photos"/>
                <meta name="twitter:description"
                      content="Authentic Sri Lanka photos: Sigiriya, Ella train, Yala leopards, Nine Arch Bridge, Galle Fort. Real tour experiences."/>
                <meta name="twitter:image"
                      content={getImageUrl("public/images/gallery/photo/wildlife/yala-leopard.webp")}/>
                <meta name="twitter:image:alt" content="Sri Lanka Travel Gallery - Yala Leopard Safari"/>

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
                                "@type": "CollectionPage",
                                "name": "Gallery – Zephyra Travels Sri Lanka Photography & Experiences",
                                "url": "https://www.zephyratravels.com/gallery",
                                "description": "Explore the Zephyra Travels gallery showcasing authentic Sri Lankan experiences, cultural highlights, wildlife safaris, and breathtaking landscapes.",
                                "mainEntityOfPage": {
                                    "@type": "ImageGallery",
                                    "name": "Sri Lanka Travel Experiences"
                                },
                                "isPartOf": {
                                    "@type": "Organization",
                                    "@id": "https://www.zephyratravels.com/#Organization"
                                }
                            }
                        ]),
                    }}
                />
            </Head>

            <div className="relative min-h-screen bg-white overflow-hidden">
                {/* Animated glow circle - Left side (Secondary color) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1, delay: 0.4}}
                    className="absolute z-20 top-40 max-sm:top-14 left-[150px] transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                />

                {/* Animated glow circle - Right side (Purple tone 1) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1, delay: 0.6}}
                    className="absolute z-10 top-[550px] max-sm:top-[600px] right-[180px] transform translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] w-[600px] bg-linear-to-bl from-[#8725E3]/30 to-transparent rounded-full blur-2xl"
                />

                {/* Animated glow circle - Right side (Purple tone 2) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1, delay: 0.6}}
                    className="absolute z-10 top-[1550px] max-sm:top-[1650px] right-[180px] transform translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] w-[600px] bg-linear-to-bl from-[#8725E3]/30 to-transparent rounded-full blur-2xl"
                />

                {/* Gallery section */}
                <GalleryPage/>
            </div>
        </>
    );
}
