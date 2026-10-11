import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import Link from "next/link";
import {getImageUrl} from "@/lib/utils";
import {useRouter} from "next/router";

export const AboutOurTeam = () => {
    const teamMembers = [
        {
            name: "Pathum Lakshan",
            role: "Founder & CEO",
            image: getImageUrl("public/images/about/ourTeam/pathum.webp"),
        },
        {
            name: "Sudeera Madushan",
            role: "CIO",
            image: getImageUrl("public/images/about/ourTeam/sudeera.webp"),
        },
        {
            name: "Vibuddha Vidarshana",
            role: "Travel Consultant",
            image: getImageUrl("public/images/about/ourTeam/vibuddha.webp"),
        },
        {
            name: "Malshi Withanage",
            role: "Business Analyst",
            image: getImageUrl("public/images/about/ourTeam/malshi.webp"),
        },
    ];

    const phoneNumber = "94761345718";

    const message = `Hello Zephyra Travels! I'm interested in planning a trip to Sri Lanka and would like to know more about your tours. Could you please help me with the options and prices?`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    const scrollRef = useRef<HTMLDivElement | null>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        scrollRef.current?.classList.add("cursor-grabbing");
        startX = e.pageX - scrollRef.current!.offsetLeft;
        scrollLeft = scrollRef.current!.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current!.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    const router = useRouter();

    // Scroll to the target element smoothly
    const scrollToTarget = (id: string, offset: number): void => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({top, behavior: "smooth"});
        }
    };

    const navigateAndScroll = (targetId: string, offset: number): void => {
        if (typeof window === "undefined") return;

        if (window.location.pathname === "/") {
            scrollToTarget(targetId, offset);
        } else {
            const handleRouteDone = (): void => {
                setTimeout(() => scrollToTarget(targetId, offset), 150);
                router.events.off("routeChangeComplete", handleRouteDone);
            };

            router.events.on("routeChangeComplete", handleRouteDone);
            router.push(`/#${targetId}`);
        }
    };

    const handleExploreClick = () => {
        router.push("/packages");
    };
    const handleContactClick = (): void => navigateAndScroll("contact", -25);

    const [buttonSize, setButtonSize] = useState<"ssm" | "md">("md");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setButtonSize("ssm"); // mobile
            } else {
                setButtonSize("md"); // desktop/tablet
            }
        };

        handleResize(); // run once on load
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <section
                id="team"
                className="relative text-center py-10 lg:py-18 px-4 md:px-10 lg:px-[100px] overflow-hidden   "
            >
                {/* Heading */}
                <motion.h2
                    className="font-plus-jakarta-sans font-extrabold text-[52px] max-md:text-[36px] text-[#303030]">
                    <span className="text-[#6938d3]">Our </span>
                    Team
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto mb-8 sm:mb-14">
                    Meet the passionate individuals dedicated to creating your perfect Sri
                    Lankan adventure
                </motion.p>

                {/*Team Cards*/}
                <div
                    ref={scrollRef}
                    className="lg:grid lg:grid-cols-4 gap-6 px-2 sm:px-4 sm:gap-10 sm:pb-4 sm:pt-6 md:gap-12 lg:gap-5 xl:gap-10 flex max-[640px]:gap-10 max-[640px]:px-4 max-[640px]:py-4 max-[425px]:gap-10 max-[425px]:px-4 max-[425px]:py-4 max-[375px]:gap-10 max-[375px]:px-4 max-[475px]:py-4
                                max-lg:overflow-x-auto max-lg:overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]
                                [scrollbar-width:none]   cursor-grab lg:cursor-default"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#F3F3F3] rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center overflow-hidden mt-4 sm:mt-0 pt-8 sm:p-5 lg:p-0 pb-6 lg:py-4 xl:pt-10 xl:pb-8
                             w-[55vw] max-w-[240px] flex-shrink-0 sm:w-[38%] sm:max-w-[280px] lg:w-auto"
                        >
                            {/* Purple curve & Image */}
                            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                                {/* Curved purple shape */}
                                <div
                                    className="absolute -top-20 -left-25 sm:-top-25 sm:-left-30 md:-top-22 md:-left-30 lg:-top-23 lg:-left-22 w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] md:w-[200px] md:h-[200px] bg-[#6938D3] rounded-full z-1"></div>

                                {/* Profile Image */}
                                <div
                                    className="relative w-[85px] h-[85px] left-2 sm:w-[105px] sm:h-[105px] sm:left-3 md:left-0 md:w-[120px] md:h-[120px] md:top-0 lg:w-[100px] lg:top-6 lg:left-2 lg:h-[100px] xl:w-[120px] xl:h-[120px] xl:top-0 xl:left-0
                                    rounded-full border-3 border-[#6938D3] overflow-hidden shadow-md z-2"
                                >
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={120}
                                        height={120}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-3/4 h-[1px] bg-[#D3D3D3] my-4 sm:my-6"></div>

                            {/* Info */}
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-semibold text-black text-center lg:w-[110px] xl:w-auto">
                                    {member.name}
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-[#6938D3] font-medium mt-1 px-4 sm:px-8">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/*CTA Section*/}
            <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen text-center   ">
                <motion.div className="md:mt-8 md:mb-20 bg-[#EEEEEE] py-14 px-4">
                    <h3 className="text-2xl lg:text-5xl font-extrabold text-[#2B2B2B]">
                        <span className="text-[#6938D3]">Ready</span> to Explore Sri Lanka?
                    </h3>
                    <p className="text-md text-[#2B2B2B] mt-3 lg:text-2xl mx-auto">
                        Let us create your perfect journey through the pearl of the Indian
                        Ocean
                    </p>

                    {/* Buttons */}
                    <div
                        className="flex flex-col lg:flex-row mx-auto justify-center items-center gap-5 mt-8 px-10 sm:px-0">
                        <div className="flex max-[425px]:flex-col lg:flex-row gap-5 justify-center items-center">
                            <Button
                                variant="primary"
                                size={buttonSize}
                                className="cursor-pointer w-[100px] sm:w-[150px] lg:w-[150px] "
                                onClick={handleExploreClick}
                            >
                                Book now
                            </Button>

                            <Link
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size={buttonSize}
                                    className="cursor-pointer w-[190px] sm:w-[260px] lg:w-[250px] "
                                >
                                    Speak to a Travel Expert
                                </Button>
                            </Link>
                        </div>

                        <div className="flex max-[425px]:flex-col lg:flex-row gap-5 justify-center items-center">
                            <Button
                                variant="outline"
                                size={buttonSize}
                                className="cursor-pointer w-[100px] sm:w-[150px] lg:w-[150px] "
                                onClick={handleContactClick}
                            >
                                Inquiry Now
                            </Button>

                            <a
                                href={getImageUrl("public/sampleItinerary.pdf")}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size={buttonSize}
                                    className="cursor-pointer w-[190px] sm:w-[260px] lg:w-[280px] "
                                >
                                    Download Sample Itinerary
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};
