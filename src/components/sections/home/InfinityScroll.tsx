"use client";

import React from "react";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

const ImageArray = [
    {
        image: "public/images/home/scroll-images/boat-ride.webp",
        alt: "Boat ride",
    },
    {
        image: "public/images/home/scroll-images/tea-harvesting.webp",
        alt: "Tea harvesting",
    },
    {
        image: "public/images/home/scroll-images/train-ride.webp",
        alt: "Train ride",
    },
    {
        image: "public/images/home/scroll-images/turtle-watching.webp",
        alt: "Turtle watching",
    },
    {
        image: "public/images/home/scroll-images/water-rafting.webp",
        alt: "Water rafting",
    },
    {image: "public/images/home/scroll-images/zip-line.webp", alt: "Zip line"},
    {image: "public/images/home/scroll-images/safari.webp", alt: "Safari"},
    {image: "public/images/home/scroll-images/surfing.webp", alt: "Surfing"},
];

export const InfinityScroll = () => {
    const MOBILE = {width: 200, height: 200};

    return (
        <section className="md:py-10 pt-6 pb-8 bg-white overflow-hidden select-none">
            <div className="relative w-full overflow-hidden">
                {/* Animated container with manual scroll */}
                <div className="flex overflow-x-auto scrollbar-hide py-4">
                    {/* Manual scroll area */}
                    <div className="flex space-x-6 flex-none animate-scroll hover:pause-animation">
                        {[...Array(4)].map((_, iteration) => (
                            <div key={iteration} className="flex space-x-6 flex-none">
                                {ImageArray.map((item, index) => (
                                    <div
                                        key={`${iteration}-${index}`}
                                        className="relative shrink-0 rounded-2xl overflow-hidden bg-gray-100 select-none"
                                        style={{
                                            width: `${MOBILE.width}px`,
                                            height: `${MOBILE.height}px`,
                                        }}
                                    >
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={item.alt}
                                            fill
                                            sizes="(max-width: 640px) 150px, 263px"
                                            quality={85}
                                            loading="lazy"
                                            className="object-cover"
                                            fetchPriority="low"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Animation for auto-scroll */
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-1 * (150px * 8 + 24px * 7)));
                    }
                }

                @keyframes scroll-desktop {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-1 * (263px * 8 + 24px * 7)));
                    }
                }

                .animate-scroll {
                    animation: scroll 30s linear infinite;
                    will-change: transform;
                }

                /* Pause animation on hover for manual scroll */
                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }

                /* Manual scroll container */
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    cursor: grab;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                .scrollbar-hide:active {
                    cursor: grabbing;
                }

                /* Prevent selection */
                .scrollbar-hide * {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }

                /* Desktop styles */
                @media (min-width: 640px) {
                    .animate-scroll {
                        animation-name: scroll-desktop;
                        animation-duration: 40s;
                    }

                    .scrollbar-hide > div > div > div {
                        width: 100% !important;
                        height: 260px !important;
                    }
                }

                .animate-scroll {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }

                .scrollbar-hide {
                    scroll-behavior: smooth;
                }
            `}</style>
        </section>
    );
};
