import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {getImageUrl} from "@/lib/utils";
import {useRouter} from "next/router";

export const AboutWhoWeAre = () => {

    const router = useRouter();

    const handleTeamClick = () => {
        const scrollToTeam = () => {
            const el = document.getElementById("team");
            if (el) {
                const headerOffset = 75; // Fixed header height
                const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        };

        // If already on /about page, just scroll directly
        if (router.pathname === "/about") {
            scrollToTeam();
        } else {
            // Navigate to /about page and then scroll
            router.push("/about#team").then(() => {
                setTimeout(scrollToTeam, 200);
            });
        }
    };

    return (
        <section id="whoWeAre"
                 className=" text-center relative py-10 max-[431px]:py-6 lg:py-20-10 px-4 md:px-10 lg:px-[100px]   ">

            {/* Background Elements - placed behind content */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                {/* Main Glow (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1}}
                    className="absolute top-2/3 -translate-y-1/2 -right-40
            w-40 h-40 sm:w-64 sm:h-64 md:w-90 md:h-90
            bg-[#872BFF]/20 rounded-full blur-[120px]"
                />

                {/* Purple Blurred Ellipse (Right) */}
                <motion.div
                    initial={{opacity: 0, scale: 0.6, x: 100}}
                    whileInView={{opacity: 1, scale: 1, x: 0}}
                    viewport={{once: true, amount: 0.2}}
                    transition={{duration: 1.2, delay: 0.3}}
                    className="absolute top-2/3 -translate-y-1/2 -right-20 sm:-right-32 md:-right-50
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
                    className="absolute top-1/2 -translate-y-1/2 -right-60
            w-48 h-48 sm:w-72 sm:h-72 md:w-100 md:h-100
            bg-[#872BFF]/25 rounded-full blur-[100px]"
                />
            </div>


            <div className="text-center mb-6 sm:mb-8">
                <h2 className="font-plus-jakarta-sans font-extrabold text-[52px] text-[#303030] max-md:text-[36px] leading-[30px] ">
                    <span className="text-[#6938d3]">Who </span>We Are
                </h2>
            </div>

            {/* Description */}
            <p className="px-4 md:px-4 xl:p-3 text-[#2B2B2B] text-sm sm:text-base lg:text-xl    max-w-[950px] mx-auto ">
                ZephyraTravels is a Sri Lanka based inbound tour company dedicated to designing authentic journeys that
                showcase the island's culture, nature, adventure and hospitality.
            </p>

            {/* Content Wrapper */}
            <div
                className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-10 xl:gap-25 mt-6 sm:mt-8 w-full">
                {/* Left Content */}
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8}}
                    className="text-end lg:w-1/2 xl:w-2/3"
                >
                    <p className="border-l-4 border-primary-500 pl-4 text-[#000000] text-[12px] sm:text-base lg:text-[16px] leading-[2.5]
                    font-normal    text-justify ">
                        We combine local expertise with reliable operations to deliver memorable,
                        stress free travel experiences. Our team of passionate travel experts has
                        extensive knowledge of Sri Lanka's hidden gems and popular destinations alike.
                        Founded with the mission to showcase the true beauty of Sri Lanka to the world,
                        we take pride in creating journeys that not only delight travelers but also support
                        local communities and promote sustainable tourism practices.
                        Whether you're seeking cultural immersion, natural wonders, adventurous activities
                        or simply relaxation on pristine beaches, we craft personalized experiences that
                        exceed expectations.
                    </p>

                    {/* Button */}

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.5}}
                        className="mt-6 sm:mt-8"
                    >

                        <Button
                            size="md"
                            variant="primary"
                            className="cursor-pointer max-sm:px-6"
                            aria-label="Meet Our Team"
                            onClick={handleTeamClick}
                        >
                            Meet Our Team
                        </Button>

                    </motion.div>
                </motion.div>


                {/* Right Image */}
                <motion.div
                    initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="relative lg:w-1/2 xl:w-1/2 flex justify-center  max-lg:hidden z-10"
                >
                    <video
                        src={getImageUrl("public/images/about/whoWeAre/sri-lanka.mp4")}
                        width={500}
                        height={500}
                        className="rounded-[80px] object-cover w-[400px] h-[400px] lg:w-[450px] lg:h-[400px] relative lg:-top-9 xl:-top-7"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </motion.div>

            </div>
        </section>
    );
};
