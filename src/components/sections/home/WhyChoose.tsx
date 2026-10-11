import React, {useEffect, useRef, useState} from "react";
import {m, motion} from "framer-motion";
import {Heart, Package, Star, Users} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {BsFillSendFill} from "react-icons/bs";
import {getImageUrl} from "@/lib/utils";
import CountUp from "react-countup";
import {FeatureCard} from "./FeatureCard";
import {FaStar, FaUsers, FaUtensils} from "react-icons/fa";
import {RiShieldCrossFill} from "react-icons/ri";
import { useIsMobile } from "@/hooks/useIsMobile";

const stats = [
    {
        icon: <Package className="w-8 h-8"/>,
        number: 200,
        label: "Holiday Packages",
        color: "bg-accent-orange",
        suffix: "",
    },
    {
        icon: <Users className="w-8 h-8"/>,
        number: 450,
        label: "Certified Guides",
        color: "bg-primary-500",
        suffix: "",
    },
    {
        icon: <Star className="w-8 h-8"/>,
        number: 100,
        label: "Unique Experiences",
        color: "bg-accent-blue",
        suffix: "",
    },
    {
        icon: <Heart className="w-8 h-8"/>,
        number: 12,
        label: "Happy Customers",
        color: "bg-secondary-500",
        suffix: "k",
    },
];

const features = [
    {
        icon: FaUsers,
        desktopTitle: "Warm Hospitality",
        mobileTitle: "Warm\nHospitality",
        description:
            "Sri Lanka is renowned for its friendly people, where every traveler is welcomed like family.",
    },
    {
        icon: FaStar,
        desktopTitle: "World-Class Recognition",
        mobileTitle: "World-Class\nRecognition",
        description:
            "Globally recognized by TIME, BBC Travel, and others for its beauty, safety, and charm.",
    },
    {
        icon: FaUtensils,
        desktopTitle: "Culinary Paradise",
        mobileTitle: "Culinary\nParadise",
        description:
            "Enjoy vibrant flavors, from street food and seafood to rich tea-country cuisine.",
    },
    {
        icon: RiShieldCrossFill,
        desktopTitle: "Safe & Family-Friendly",
        mobileTitle: "Safe &\nFamily-Friendly",
        description:
            "A safe, welcoming destination praised by Condé Nast Traveller for family travel.",
    },
];


export const WhyChoose: React.FC = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect(); // animate only once
                    }
                });
            },
            {threshold: 0.3}
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative -mt-2 md:mt-8 lg:mt-10 xl:mt-16 flex flex-col items-center justify-center text-center max-xl:px-10 max-sm:px-4">
            {/* Background Elements - placed behind content */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block ">
                {/* Main Glow (Left) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1}}
                    className="absolute top-1/2 -translate-y-1/2 left-10
               w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80
               bg-[#872BFF]/20  // <- hex color with opacity
               rounded-full blur-[120px]"
                />

                {/* Purple Blurred Ellipse (Left) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.6, x: -100}}
                    whileInView={{opacity: 1, scale: 1, x: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.2, delay: 0.3}}
                    className="absolute top-1/2 -translate-y-1/2 -left-20 sm:-left-32 md:-left-40
               w-[400px] h-[320px] sm:w-[550px] sm:h-[400px] md:w-[700px] md:h-[550px]
               bg-gradient-to-r from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
               rounded-full blur-[140px]"
                />

                {/* Smaller Glow for Depth */}
                <motion.div
                    initial={{opacity: 0, scale: 0.4}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.5, delay: 0.6}}
                    className="absolute top-1/2 -translate-y-1/2 left-5
               w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96
               bg-[#872BFF]/25 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative max-sm:mt-6 flex flex-col items-center justify-center text-center z-20 mb-8">

                {/* Original Why Choose Section */}
                <p
                    className="text-[24px] font-bold mb-3 max-md:text-[14px] text-[#C4008D] cursor-default"
                    style={{letterSpacing: "0.28em"}}
                >
                    {" "}
                    WHY CHOOSE US?
                </p>
                <motion.h2
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="text-4xl lg:text-[42px] max-md:text-[20px] font-black font-dm-sans text-neutral-900 cursor-default z-40"
                >
                    Travel with Confidence
                </motion.h2>
                <p
                    className="text-[#6B6B6B] text-[18px] font-medium leading-[30px] mt-3 mb-9 sm:mt-5 sm:mb-9 md:mt-5 md:mb-12 lg:mt-5 lg:mb-9 xl:mt-5 xl:mb-9
                max-md:text-[14px] max-md:leading-[25px] max-lg:text-center max-w-[1020px] cursor-default"
                >
                    As local experts, we create seamless travel packages with transport,
                    hotels and authentic guided experiences so you can simply enjoy the
                    beauty of our island.
                </p>

                <div
                    ref={sectionRef}
                    className="grid grid-cols-2 gap-5 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-10 min-[1070px]:flex align-center relative"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="rounded-[30px] max-md:rounded-[20px] h-[139px] lg:w-[220px] xl:w-[220px] max-sm:h-[107px] bg-[#FFFFFF] flex flex-col items-center justify-center px-2 sm:px-10 md:px-10 lg:px-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-10"
                            whileHover={{
                                scale: 1.05,
                                transition: {duration: 0.3, ease: "easeInOut"},
                            }}
                            whileTap={{scale: 0.98}}
                        >
                            <p className="text-[#872BFF] text-[32px] max-md:text-[24px] font-bold flex items-center">
                                {inView ? (
                                    <CountUp
                                        end={stat.number}
                                        duration={1.5}
                                        suffix={stat.suffix}
                                    />
                                ) : (
                                    stat.number + stat.suffix
                                )}
                                <span className="text-[#EB00A5] -mt-2">+</span>
                            </p>
                            <p className="text-[#6B6B6B] font-medium max-sm:text-[12px]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                    <div
                        className="rounded-full bg-[#FCC417] absolute top-[-23px] right-[-18px] md:top-[-35px] md:right-[-70px] lg:top-[-35px] lg:right-[-70px] xl:top-[-55px] xl:right-[-85px] w-[40px] h-[40px] md:w-[90px] md:h-[90px] lg:w-[90px] lg:h-[90px] xl:w-[110px] xl:h-[110px] ">
                        <Image
                            src={getImageUrl(
                                "public/images/home/why-choose/gift-circle.webp"
                            )}
                            alt="Why Choose"
                            width={90}
                            height={90}
                            className="items-center text-center relative xl:top-[9px] xl:left-[8px] lg:top-[10px] lg:left-[12px] md:top-[10px] md:left-[12px] top-[6px] left-[7px] w-[28px] h-[28px] md:w-[70px] md:h-[70px] lg:w-[70px] lg:h-[70px] xl:w-[90px] xl:h-[90px]"
                        />
                    </div>
                </div>

                <p
                    className="text-[#6B6B6B] text-[18px] font-medium leading-[30px] mb-2 mt-4 sm:mb-4 sm:mt-12 md:mb-0 md:mt-10 lg:mb-4 lg:mt-12 lx:mb-4 lx:mt-12
                max-md:text-[14px] max-md:leading-[25px] max-lg:text-center max-w-[1020px] cursor-default"
                >
                    Let us handle the details while you create unforgettable memories.
                    Contact our travel experts today to start planning your dream island
                    getaway!
                </p>

                <div
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 items-center justify-center mt-4 sm:mt-10 max-w-[1184px] mx-auto">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon as any}
                            title={isMobile ? feature.mobileTitle : feature.desktopTitle}
                            description={feature.description}
                            index={index}
                        />
                    ))}
                </div>

                <div className="mt-4 sm:mt-8">
                    <Link href="/about" passHref>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                transition: {duration: 0.3, ease: "easeInOut"},
                            }}
                            whileTap={{scale: 0.98}}
                            className="text-white bg-secondary-700 w-[195px] h-[72px] max-sm:w-auto max-sm:px-5 max-sm:py-2 max-sm:h-auto rounded-full font-semibold
            text-[23px] max-sm:text-[16px] flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(236,72,153,0.6)] cursor-pointer"
                        >
                            About Us
                            <BsFillSendFill className="w-[25px] h-[25px] max-sm:w-[16px] max-sm:h-[16px]"/>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
