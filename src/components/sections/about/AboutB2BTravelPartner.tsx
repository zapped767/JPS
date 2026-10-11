import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {FaClipboardCheck, FaGlobe, FaHandshake, FaRoute, FaUserFriends, FaUsers,} from "react-icons/fa";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {getImageUrl} from "@/lib/utils";

export const AboutB2BTravelPartner = () => {
    return (
        <section className="relative py-4 lg:py-14 px-4 md:px-10 lg:px-[100px] text-center   ">
            {/*right*/}
            {/* Background Elements - placed behind content */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                {/* Main Glow (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1}}
                    className="absolute top-1/3 -translate-y-1/2 -right-40
            w-40 h-40 sm:w-64 sm:h-64 md:w-90 md:h-90
            bg-[#872BFF]/20 rounded-full blur-[120px]"
                />

                {/* Purple Blurred Ellipse (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.6, x: 100}}
                    whileInView={{opacity: 1, scale: 1, x: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.2, delay: 0.3}}
                    className="absolute top-1/3 -translate-y-1/2 -right-20 sm:-right-32 md:-right-50
            w-[400px] h-[320px] sm:w-[550px] sm:h-[400px] md:w-[800px] md:h-[650px]
            bg-gradient-to-l from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
            rounded-full blur-[140px]"
                />

                {/* Smaller Glow for Depth (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.4}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.5, delay: 0.6}}
                    className="absolute top-1/3 -translate-y-1/2 -right-60
            w-48 h-48 sm:w-72 sm:h-72 md:w-100 md:h-100
            bg-[#872BFF]/25 rounded-full blur-[100px]"
                />
            </div>

            {/*left*/}
            {/* Background Elements - placed behind content */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                {/* Main Glow (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1}}
                    className="absolute top-[80%] -translate-y-1/2 -left-40
            w-40 h-40 sm:w-64 sm:h-64 md:w-90 md:h-90
            bg-[#872BFF]/20 rounded-full blur-[120px]"
                />

                {/* Purple Blurred Ellipse (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.6, x: 100}}
                    whileInView={{opacity: 1, scale: 1, x: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.2, delay: 0.3}}
                    className="absolute top-[80%] -translate-y-1/2 -left-20 sm:-left-32 md:-left-50
            w-[400px] h-[320px] sm:w-[550px] sm:h-[400px] md:w-[800px] md:h-[650px]
            bg-gradient-to-l from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
            rounded-full blur-[140px]"
                />

                {/* Smaller Glow for Depth (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.4}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.5, delay: 0.6}}
                    className="absolute top-[80%] -translate-y-1/2 -left-60
            w-48 h-48 sm:w-72 sm:h-72 md:w-100 md:h-100
            bg-[#872BFF]/25 rounded-full blur-[100px]"
                />
            </div>

            {/*Heading*/}
            <motion.h2
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="font-plus-jakarta-sans font-extrabold text-[52px] max-md:text-[36px] text-[#303030]"
            >
                {" "}
                Your Trusted{" "}
                <span className="text-[#6938d3] cursor-default"> B2B </span> Travel
                Partner
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl mx-auto cursor-default"
            >
                Delivering exceptional travel experiences through seamless partnerships
                and professional service
            </motion.p>

            {/* Top Section – Global Travel Partnerships */}
            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-5 lg:gap-10 xl:gap-16 items-center mt-10 sm:md:mt-12 lg:mt-18">
                {/* Left Content */}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-left"
                >
                    <h3 className="text-[#6938D3] text-3xl font-extrabold mb-4 md:text-start text-center">
                        Global Travel Partnerships
                    </h3>
                    <p className="border-l-4 border-primary-500 pl-4 text-[#3D3D3D]  text-sm sm:text-base lg:text-lg leading-[1.8] text-justify">
                        We work with international and local travel agencies, providing
                        ready-to-sell Sri Lanka packages and Destination Management Company
                        (DMC) services. With us, agencies can deliver tailor-made
                        itineraries, seamless ground operations, and memorable journeys for
                        their clients.
                    </p>

                    <div
                        className="flex flex-row max-[425px]:gap-5 gap-10 mt-8 lg:justify-start sm:justify-center justify-center items-center">
                        {[
                            {icon: FaHandshake, title: "Partnerships"},
                            {icon: FaRoute, title: "Itineraries"},
                            {icon: FaGlobe, title: "Global Reach"},
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="sm:px-4 flex flex-col gap-2 items-center"
                            >
                                <div
                                    className="w-18 h-18 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-[#DECFFF] flex items-center justify-center">
                                    <item.icon className="text-[#872BFF] w-9 h-9"/>
                                </div>

                                {/*{item.icon}*/}
                                <p
                                    className={`md:text-md font-medium mt-2 text-[#2B2B2B] text-sm
                                   ${
                                        item.title === "Global Reach"
                                            ? ` max-[375px]:min-w-[100px] lg:w-[100px] xl:w-auto`
                                            : `lg:w-auto xl:w-auto`
                                    }`}
                                >
                                    {item.title}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{opacity: 0, x: 40}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="flex justify-center"
                >
                    <div
                        className="relative aspect-[7/5] w-full max-w-[470px] rounded-3xl overflow-hidden shadow-md hidden lg:block z-10 translate-y-[-10%] lg:-bottom-0 lg:left-2 xl:-bottom-9">
                        <Image
                            src={getImageUrl("public/images/about/b2b/handshake.webp")}
                            alt="Global Travel"
                            fill
                            className="object-cover object-[center_50%]"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section – Corporate Travel Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center lg:mt-20">
                {/* Left Image */}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="flex justify-center"
                >
                    <div
                        className="relative aspect-[7/5] w-full max-w-[470px] rounded-3xl overflow-hidden shadow-md hidden lg:block z-10 translate-y-[-10%] lg:bottom-9">
                        <Image
                            src={getImageUrl(
                                "public/images/about/b2b/office-environment.webp"
                            )}
                            alt="Corporate Travel"
                            fill
                            className="object-cover object-[center_50%]"
                        />
                    </div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                    initial={{opacity: 0, x: 40}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-left"
                >
                    <h3 className="text-[#6938D3] text-3xl font-extrabold mb-4 md:text-start text-center">
                        Corporate Travel Solutions
                    </h3>
                    <p className="border-l-4 border-primary-500 pl-4 text-[#3D3D3D]  text-sm sm:text-base lg:text-lg leading-[1.8] text-justify">
                        From business trips to MICE (Meetings, Incentives, Conferences,
                        Exhibitions), ZephyraTravels offers complete solutions for
                        corporates and organizations. We manage group logistics,
                        accommodations, and event coordination to ensure smooth and
                        professional experiences in Sri Lanka.
                    </p>

                    <div
                        className="flex flex-row max-[425px]:gap-5 gap-10 mt-8 lg:justify-start sm:justify-center justify-center items-center">
                        {[
                            {icon: FaUsers, title: "Meetings"},
                            {icon: FaUserFriends, title: "Groups"},
                            {icon: FaClipboardCheck, title: "Logistics"},
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="sm:px-4 flex flex-col gap-2 items-center"
                            >
                                <div
                                    className="w-18 h-18 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-2xl bg-[#DECFFF] flex items-center justify-center">
                                    <item.icon className="text-[#872BFF] w-9 h-9"/>
                                </div>

                                {/*{item.icon}*/}
                                <p className="md:text-md font-medium mt-2 text-[#2B2B2B] text-sm">
                                    {item.title}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 md:flex justify-end hidden">
                        <Link href="/src/pages/partners">
                            <Button
                                variant="primary"
                                size="md"
                                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium rounded-full px-6 py-2 flex items-center gap-2 transition-all duration-300 cursor-pointer"
                            >
                                Partner with Us
                                <ArrowRight
                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                    strokeWidth={2.5} // makes arrow bolder and longer-looking
                                />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
