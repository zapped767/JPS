import React, {useEffect, useRef, useState} from "react";
import {FaCertificate, FaHeadset, FaNetworkWired, FaTags, FaUserTie, FaWrench,} from "react-icons/fa";
import {motion} from "framer-motion";

export const BusinessWhyPartnerWith = () => {
    const services = [
        {
            icon: <FaCertificate className="w-10 h-10 text-[#6938d3]"/>,
            title: "Licensed & Registered",
            description: "Fully accredited inbound operator (BR+SLTDA)"
        },
        {
            icon: <FaTags className="w-10 h-10 text-[#6938d3]"/>,
            title: "Competitive Rates",
            description: "Exclusive local connections for the best pricing"
        },
        {
            icon: <FaNetworkWired className="w-10 h-10 text-[#6938d3]"/>,
            title: "Wide Partner Network",
            description: "Established connections across Sri Lanka"
        },
        {
            icon: <FaHeadset className="w-10 h-10 text-[#6938d3]"/>,
            title: "24/7 Local Support",
            description: "Round-the-clock assistance for your clients"
        },
        {
            icon: <FaWrench className="w-10 h-10 text-[#6938d3]"/>,
            title: "Flexible Options",
            description: "Customizable itineraries to meet client needs"
        },
        {
            icon: <FaUserTie className="w-10 h-10 text-[#6938d3]"/>,
            title: "Dedicated Manager",
            description: "A single point of contact for seamless support"
        },
    ];

    const iconRefs = useRef<HTMLDivElement[]>([]);
    const titleRefs = useRef<HTMLHeadingElement[]>([]);
    const [maxIconHeight, setMaxIconHeight] = useState(0);
    const [maxTitleHeight, setMaxTitleHeight] = useState(0);


    useEffect(() => {
        const iconHeights = iconRefs.current.map((el) => el?.offsetHeight || 0);
        const titleHeights = titleRefs.current.map((el) => el?.offsetHeight || 0);

        setMaxIconHeight(Math.max(...iconHeights));
        setMaxTitleHeight(Math.max(...titleHeights));
    }, []);


    const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;

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
        return {ref, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove};
    };

    const row1 = useDragScroll();
    const row2 = useDragScroll();

    return (
        <section className="relative pt-5 pb-4 sm:py-10 lg:pt-16 lg:pb-20 px-4 md:px-10 lg:px-[100px] text-center z-10">

            {/* Heading */}
            <motion.h2 initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                       transition={{duration: 0.6}}
                       className="font-plus-jakarta-sans font-extrabold text-[52px] text-[#303030] max-md:text-[36px] cursor-default">
                <span className="text-[#6938d3]">Why </span>Partner With ZephyraTravels
            </motion.h2>

            <motion.p initial={{opacity: 0}} animate={{opacity: 1}}
                      transition={{duration: 0.8, delay: 0.2}}
                      className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto cursor-default">
                Discover the advantages of collaborating with Sri Lanka's premier travel specialist
            </motion.p>


            {/* Desktop Grid */}
            <div className="max-[1024px]:hidden grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-12 px-4 lg:px-0">
                {services.map((service, index) => (
                    <motion.div key={index}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                whileHover={isDesktop ? {y: -8, scale: 1.05} : {}}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="relative bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300
                        rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-start text-center">

                        <div
                            ref={(el) => {
                                if (el) iconRefs.current[index] = el
                            }}
                            style={{minHeight: maxIconHeight}}
                            className="flex items-center justify-center mb-4"
                        >
                            {service.icon}
                        </div>

                        <h3
                            ref={(el) => {
                                if (el) titleRefs.current[index] = el
                            }}
                            style={{minHeight: maxTitleHeight}}
                            className="text-lg font-semibold text-black mb-2"
                        >
                            {service.title}
                        </h3>

                        <p className="text-sm xl:w-[300px] text-[#2B2B2B] leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>


            {/* Mobile Sliders */}
            <div className="hidden max-[1024px]:block mt-6 cursor-default">

                {/* Row 1 */}
                <div ref={row1.ref}
                     className="flex gap-6 px-4 overflow-x-auto py-2 cursor-grab
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                     onMouseDown={row1.handleMouseDown}
                     onMouseLeave={row1.handleMouseLeave}
                     onMouseUp={row1.handleMouseUp}
                     onMouseMove={row1.handleMouseMove}
                >
                    {services.slice(0, 3).map((service, index) => (
                        <motion.div key={index}
                                    initial={{opacity: 0, y: 0}}
                                    whileInView={{opacity: 1, y: 0}}
                                    whileHover={isDesktop ? {y: -12, scale: 1.05} : {}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    viewport={{once: true}}
                                    className="bg-[#fafafa] shadow-md rounded-2xl flex flex-col items-center
                            justify-start text-center flex-shrink-0 w-[63%] max-[640px]:w-[55%]
                            max-[768px]:w-[45%] max-[1024px]:w-[40%] p-4"
                        >
                            <div style={{minHeight: maxIconHeight}}
                                 className="flex items-center justify-center mb-4">
                                {service.icon}
                            </div>

                            <h3 style={{minHeight: maxTitleHeight}}
                                className="text-base md:text-lg font-semibold text-black mb-2">
                                {service.title}
                            </h3>

                            <p className="text-[12px] md:text-sm text-[#2B2B2B] leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>


                {/* Row 2 */}
                <div ref={row2.ref}
                     className="flex gap-6 px-4 overflow-x-auto py-2 mt-2 cursor-grab
                    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                     onMouseDown={row2.handleMouseDown}
                     onMouseLeave={row2.handleMouseLeave}
                     onMouseUp={row2.handleMouseUp}
                     onMouseMove={row2.handleMouseMove}
                >
                    {services.slice(3, 6).map((service, index) => (
                        <motion.div key={index}
                                    initial={{opacity: 0, y: 0}}
                                    whileInView={{opacity: 1, y: 0}}
                                    whileHover={isDesktop ? {y: -8, scale: 1.05} : {}}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    viewport={{once: true}}
                                    className="bg-[#fafafa] shadow-md rounded-2xl flex flex-col items-center
                            justify-start text-center flex-shrink-0 w-[63%] max-[640px]:w-[55%]
                            max-[768px]:w-[45%] max-[1024px]:w-[40%] p-4"
                        >
                            <div style={{minHeight: maxIconHeight}}
                                 className="flex items-center justify-center mb-4">
                                {service.icon}
                            </div>

                            <h3 style={{minHeight: maxTitleHeight}}
                                className="text-base md:text-lg font-semibold text-black mb-2">
                                {service.title}
                            </h3>

                            <p className="text-[12px] md:text-sm text-[#2B2B2B] leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
