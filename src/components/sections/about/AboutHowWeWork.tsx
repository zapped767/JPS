import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

export const AboutHowWeWork = () => {
    const steps = [
        {
            number: "1",
            title: "Discover",
            text: "Browse and find your perfect Sri Lanka getaway",
        },
        {
            number: "2",
            title: "Consult",
            text: "Talk with our travel experts to plan your trip",
        },
        {
            number: "3",
            title: "Confirm",
            text: "Book easily with secure and quick confirmation",
        },
        {
            number: "4",
            title: "Meet & Greet",
            text: " Receive a warm welcome at the airport",
        },
        {
            number: "5",
            title: "Explore",
            text: "Enjoy scenic tours, activities, and adventures",
        },
        {
            number: "6",
            title: "Relax",
            text: "Stay in comfort at our partner hotels",
        },
        {
            number: "7",
            title: "Farewell",
            text: "We’ll drop you safely for your departure",
        },
        {
            number: "8",
            title: "Share",
            text: "Share your memories and tag us online!",
        },
    ];

    const scrollRef = useRef<HTMLDivElement | null>(null);

    // Track scroll position to show/hide arrows
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const useDragScroll = () => {
        const ref = useRef<HTMLDivElement | null>(null);
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: React.MouseEvent) => {
            isDown = true;
            ref.current?.classList.add("cursor-grabbing");
            startX = e.pageX - ref.current!.offsetLeft;
            scrollLeft = ref.current!.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            ref.current?.classList.remove("cursor-grabbing");
        };

        const handleMouseUp = () => {
            isDown = false;
            ref.current?.classList.remove("cursor-grabbing");
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - ref.current!.offsetLeft;
            const walk = (x - startX) * 1.5;
            ref.current!.scrollLeft = scrollLeft - walk;
        };

        return {
            ref,
            handleMouseDown,
            handleMouseLeave,
            handleMouseUp,
            handleMouseMove,
        };
    };

    const row1 = useDragScroll();
    const row2 = useDragScroll();

    // Arrow scroll logic
    const scrollByAmount = 300; // adjust per click

    const handleNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: scrollByAmount, behavior: "smooth"});
        }
    };

    const handlePrevious = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -scrollByAmount, behavior: "smooth"});
        }
    };

    // Check scroll position to toggle arrows
    const checkScrollPosition = () => {
        if (!scrollRef.current) return;
        const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;

        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        checkScrollPosition();
        container.addEventListener("scroll", checkScrollPosition);
        return () => container.removeEventListener("scroll", checkScrollPosition);
    }, []);

    return (
        <>
            <section className="relative text-center pt-10 pb-4 sm:py-10 lg:py-10 px-4 md:px-10 lg:px-[100px]   ">
                {/* Heading */}
                <motion.h2
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="font-plus-jakarta-sans font-extrabold text-[52px] max-md:text-[36px] text-[#303030]"
                >
                    <span className="text-[#6938d3] cursor-default">How </span>
                    We Work
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto cursor-default"
                >
                    Our simple process ensures a seamless travel planning experience from
                    start to finish
                </motion.p>

                {/* Commented the left and right carousel arrows incase if it needs to be added again */}
                {/* Arrows (always visible, opacity controlled) */}
                {/* <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.4}}
                    className="flex justify-end gap-4 sm:hidden mt-6 px-4"
                >
                    <motion.button
                        onClick={handlePrevious}
                        whileHover={{scale: canScrollLeft ? 1.05 : 1}}
                        whileTap={{scale: canScrollLeft ? 0.95 : 1}}
                        className={`w-12 h-12 max-md:w-[36px] max-md:h-[36px] rounded-full flex items-center justify-center 
              bg-primary-100 text-primary-600 hover:bg-primary-200 transition-all duration-300
              ${canScrollLeft ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <IoIosArrowBack className="w-5 h-5"/>
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        whileHover={{scale: canScrollRight ? 1.05 : 1}}
                        whileTap={{scale: canScrollRight ? 0.95 : 1}}
                        className={`w-12 h-12 max-md:w-[36px] max-md:h-[36px] rounded-full flex items-center justify-center 
              bg-primary-100 text-primary-600 hover:bg-primary-200 transition-all duration-300
              ${canScrollRight ? "opacity-100 cursor-pointer" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <IoIosArrowForward className="w-5 h-5"/>
                    </motion.button>
                </motion.div> */}

                {/* Desktop & Tablet grid */}
                <div className="max-[1024px]:hidden grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8 sm:mt-12 px-4 lg:px-0">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            className="flex-shrink-0 bg-[#F5F0FF] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-6 lg:px-0 lg:py-8 xl:py-5 xl:px-4 flex flex-col
                            items-center justify-center w-[55vw] max-w-[240px] sm:w-[38%] sm:max-w-[280px] lg:w-auto "
                        >
                            <div
                                className="bg-[#6938D3] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold mb-3">
                                {step.number}
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm sm:text-lg lg:text-base xl:text-lg text-[#464646] leading-relaxed lg:w-[130px] xl:w-[150px]">
                                {step.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className="hidden max-[1024px]:block mt-6 md:mt-10 cursor-default">
                    {/* Row 1: first 3 cards */}
                    <div
                        ref={row1.ref}
                        className="flex gap-6 px-4 sm:gap-8 max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              cursor-grab"
                        onMouseDown={row1.handleMouseDown}
                        onMouseLeave={row1.handleMouseLeave}
                        onMouseUp={row1.handleMouseUp}
                        onMouseMove={row1.handleMouseMove}
                    >
                        {steps.slice(0, 4).map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    transition: {duration: 0.3},
                                }}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="flex-shrink-0 bg-[#F5F0FF] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-6 lg:px-0 lg:py-8 xl:py-5 xl:px-4 flex flex-col
                            items-center justify-center w-[55vw] max-w-[240px] sm:w-[38%] sm:max-w-[280px] lg:w-auto "
                            >
                                <div
                                    className="bg-[#6938D3] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold mb-3">
                                    {step.number}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-lg lg:text-base xl:text-lg text-[#464646] leading-relaxed  max-[425px]:w-[130px]  md:w-[150px] lg:w-[130px] xl:w-[150px]">
                                    {step.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Row 2: next 3 cards */}
                    <div
                        ref={row2.ref}
                        className="flex gap-6 px-4 sm:gap-8 max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              cursor-grab"
                        onMouseDown={row2.handleMouseDown}
                        onMouseLeave={row2.handleMouseLeave}
                        onMouseUp={row2.handleMouseUp}
                        onMouseMove={row2.handleMouseMove}
                    >
                        {steps.slice(4, 8).map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    transition: {duration: 0.3},
                                }}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="flex-shrink-0 bg-[#F5F0FF] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 sm:p-6 lg:px-0 lg:py-8 xl:py-5 xl:px-4 flex flex-col
                            items-center justify-center w-[55vw] max-w-[240px] sm:w-[38%] sm:max-w-[280px] lg:w-auto "
                            >
                                <div
                                    className="bg-[#6938D3] text-white w-10 h-10 flex items-center justify-center rounded-full font-bold mb-3">
                                    {step.number}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-lg lg:text-base xl:text-lg text-[#464646] leading-relaxed max-[425px]:w-[110px] md:w-[150px] lg:w-[130px] xl:w-[150px]">
                                    {step.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/*Sustainability & Community Section*/}
            <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen    mt-6">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.3}}
                    viewport={{once: true, amount: 0.3}}
                    className="bg-[#6938d3] text-white py-14 px-6 md:px-12 lg:px-24 w-full"
                >
                    <div className="flex flex-col gap-4 items-center text-center max-w-[900px] mx-auto">
                        <Image
                            src={getImageUrl("public/images/about/howWeWork/leaf.webp")}
                            alt="Leaf Image"
                            width={50}
                            height={50}
                            className="text-[#6938d3]"
                        />
                        <h3 className="text-xl font-extrabold sm:text-3xl mb-2">
                            Sustainability & Community
                        </h3>
                        <p className="text-sm sm:text-xl leading-relaxed">
                            We prioritize responsible travel: supporting local businesses,
                            respecting cultural heritage, reducing waste, and promoting
                            conservation-focused experiences.
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};
