import React, {useRef} from "react";
import {motion} from "framer-motion";
import {FaBriefcase, FaGlobeAmericas, FaHandshake, FaHotel, FaPlug, FaUserFriends,} from "react-icons/fa";

export const BusinessPartnershipOptions = () => {
    const services = [
        {
            icon: <FaGlobeAmericas className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Destination Management Services",
            description:
                "Be a trusted DMC for foreign travel agencies. We handle all ground operations including itineraries, transport, accommodations",
        },
        {
            icon: <FaHandshake className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Travel Agency Partnerships",
            description:
                "Work with local and international agencies to sell our Sri Lanka tour packages.",
        },
        {
            icon: <FaBriefcase className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Corporate Travel Solutions",
            description:
                "Provide MICE and business travel arrangements with tailored solutions.",
        },
        {
            icon: <FaPlug className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "OTA Connectivity",
            description:
                "Distribute packages through major OTAs like Expedia, Trip.com, and niche platforms",
        },
        {
            icon: <FaHotel className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Hotel & Resort Tie-ups",
            description:
                "Partner with hotels and resorts to offer special rates and exclusive deals through our platform.",
        },
        {
            icon: <FaUserFriends className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Affiliate Partnerships",
            description:
                "Collaborate with bloggers, influencers, and online publishers to promote Sri Lanka tours.",
        },
    ];

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

    return (
        <section
            id="options"
            className="relative py-2 lg:py-4 px-4 md:px-10 lg:px-[100px] text-center   "
        >
            {/* Heading */}
            <motion.h2
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="font-plus-jakarta-sans font-extrabold text-[52px] text-[#303030] max-md:text-[36px] cursor-default relative z-10"
            >
                <span className="text-[#6938d3]">B2B </span>Partnership Options
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[800px] mx-auto cursor-default relative z-10"
            >
                Explore our range of partnership opportunities designed for travel professionals
            </motion.p>

            {/* Desktop & Tablet grid */}
            <div className="max-[640px]:hidden grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4 md:px-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        viewport={{once: true}}
                        className="relative bg-gradient-to-br from-white to-[#f7f3ff] rounded-2xl p-6
                            shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[#6938d3]/50
                            flex flex-col items-center justify-start min-h-[250px]"
                    >
                        <div className="absolute -bottom-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>

                        {/* Icon */}
                        <div className="text-[#6938d3] mb-4">{service.icon}</div>

                        {/* Title */}
                        <h3 className="text-md md:text-lg font-semibold text-[#6938d3] mb-3 text-center">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[12px] md:text-sm text-[#2B2B2B] leading-relaxed text-center">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile version */}
            <div className="hidden max-[640px]:block mt-10 cursor-default">
                {/* Row 1 */}
                <div
                    ref={row1.ref}
                    className="flex gap-6 px-3 p-3 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden
                    [-ms-overflow-style:none] [scrollbar-width:none]    cursor-grab"
                    onMouseDown={row1.handleMouseDown}
                    onMouseLeave={row1.handleMouseLeave}
                    onMouseUp={row1.handleMouseUp}
                    onMouseMove={row1.handleMouseMove}
                >
                    {services.slice(0, 3).map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            className="relative bg-gradient-to-br from-white to-[#f7f3ff] rounded-2xl p-4 shadow-md
                                hover:shadow-lg transition-shadow duration-300 w-[200px] h-[220px] flex-shrink-0  flex flex-col items-center justify-start border border-[#6938d3]/50 overflow-hidden"
                        >
                            <div className="absolute -top-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>
                            <div className="text-[#6938d3] mb-3">{service.icon}</div>
                            <h3 className="text-sm font-semibold text-[#6938d3] mb-2 text-center">{service.title}</h3>
                            <p className="text-[12px] text-[#2B2B2B] leading-relaxed text-center">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Row 2 */}
                <div
                    ref={row2.ref}
                    className="flex gap-6 px-3 p-3 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden
                    [-ms-overflow-style:none] [scrollbar-width:none]    cursor-grab mt-4"
                    onMouseDown={row2.handleMouseDown}
                    onMouseLeave={row2.handleMouseLeave}
                    onMouseUp={row2.handleMouseUp}
                    onMouseMove={row2.handleMouseMove}
                >
                    {services.slice(3, 6).map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            className="relative bg-gradient-to-br from-white to-[#f7f3ff] rounded-2xl p-4 shadow-md
                                hover:shadow-lg transition-shadow duration-300 w-[200px] h-[220px] flex-shrink-0  flex flex-col items-center justify-start border border-[#6938d3]/50 overflow-hidden"
                        >
                            <div className="absolute -top-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>
                            <div className="text-[#6938d3] mb-3">{service.icon}</div>
                            <h3 className="text-sm font-semibold text-[#6938d3] mb-2 text-center">{service.title}</h3>
                            <p className="text-[12px] text-[#2B2B2B] leading-relaxed text-center">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
