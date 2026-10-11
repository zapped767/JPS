import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

const sponsors = [
    {name: "Traveloka", logo: "public/images/home/sponsors/traveloka.webp"},
    {name: "Booking", logo: "public/images/home/sponsors/booking-dot-com.webp"},
    {
        name: "Tiket.com",
        logo: "public/images/home/sponsors/ticket-dot-com.webp",
    },
    {name: "Tripadvisor", logo: "public/images/home/sponsors/tripadvisor.webp"},
    {name: "Airbnb", logo: "public/images/home/sponsors/airbnb.webp"},
];

export const SponsorsSection: React.FC = () => {
    // Create multiple duplicates for seamless infinite scrolling
    const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

    return (
        <section className="bg-white ">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-5">
                <div className="relative overflow-hidden z-30">
                    {/* Left blur gradient */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-20 md:bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"/>

                    {/* Right blur gradient */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-20 md:bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"/>

                    <motion.div
                        className="flex items-center gap-20 max-sm:gap-6"
                        animate={{
                            x: [`-${sponsors.length * 170}px`, 0],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                        style={{
                            width: `${duplicatedSponsors.length * 170}px`,
                        }}
                    >
                        {duplicatedSponsors.map((sponsor, index) => (
                            <motion.div
                                key={`${sponsor.name}-${index}`}
                                className="flex items-center justify-center min-w-[150px] max-sm:min-w-[100px] group"
                                whileHover={{scale: 1.05}}
                                transition={{duration: 0.2}}
                            >
                                <div className="relative w-40 h-20 max-sm:w-[100px] max-sm:h-[50px]">
                                    <Image
                                        src={getImageUrl(sponsor.logo)}
                                        alt={sponsor.name}
                                        fill
                                        sizes="(max-width: 640px) 100px, 160px"
                                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out opacity-60 group-hover:opacity-100"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
