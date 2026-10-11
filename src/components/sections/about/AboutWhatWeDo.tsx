import React, {useRef, useState} from "react";
import {motion} from "framer-motion";
import {FaBinoculars, FaCar, FaHotel, FaRegCalendarAlt, FaUserTie, FaUtensils} from "react-icons/fa";

export const AboutWhatWeDo = () => {
    // State to track which cards are expanded on mobile (stores card indices)
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    /**
     * Toggles the expanded/collapsed state of a card
     * @param index - The index of the card to toggle
     */
    const toggleCard = (index: number) => {
        setExpandedCards(prev => {
            const newSet = new Set<number>();

            if (!prev.has(index)) {
                newSet.add(index);
            }
            return newSet;
        });
    };

    /**
     * Truncates text to a specified length and adds ellipsis
     * @param text - The text to truncate
     * @param maxLength - Maximum character length (default: 20)
     * @returns Truncated text with "..." or original text if shorter
     */
    const truncateText = (text: string, maxLength: number = 20) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const services = [
        {
            icon: <FaHotel className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Handpicked Accommodations",
            description:
                "From luxury beachfront resorts to charming boutique villas and eco-lodges, we offer a curated selection of properties to match your style and budget.",
        },
        {
            icon: <FaRegCalendarAlt className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Personalized Itineraries",
            description:
                "Your dream trip, your way. We design bespoke travel plans based on your unique interests, budget, and travel pace for a truly personal adventure.",
        },
        {
            icon: <FaCar className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Complete Ground Handling",
            description:
                "From your arrival to departure, we manage all logistics: private transport, hotel reservations and activity bookings so you can relax and enjoy.",
        },
        {
            icon: <FaBinoculars className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Themed & Special Interest Tours",
            description:
                "Dive deeper with tours focused on wildlife photography, adventurous trekking, spiritual wellness retreats and historical explorations.",
        },
        {
            icon: <FaUserTie className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Expert Local Guides",
            description:
                "Explore with our certified, passionate local guides who share deep insights into the culture, history, and hidden gems of the island, bringing your journey to life.",
        },
        {
            icon: <FaUtensils className="w-7 h-7 md:w-10 md:h-10"/>,
            title: "Authentic Local Experiences",
            description:
                "Go beyond the tourist trail. Participate in a village cooking class, watch a traditional cultural show, or visit a local artisan for a truly memorable and immersive trip.",
        }
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

        return {ref, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove};
    };

    const row1 = useDragScroll();
    const row2 = useDragScroll();

    return (
        <section className="relative py-2 lg:py-4 px-4 md:px-10 lg:px-[100px] text-center select-none">
            {/* Heading */}
            <motion.h2
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="font-plus-jakarta-sans font-extrabold text-[52px] text-[#303030] max-md:text-[36px] cursor-default"
            >
                <span className="text-[#6938d3]">What </span>We Do
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[800px] mx-auto cursor-default"
            >
                We offer comprehensive travel solutions designed to make your Sri Lankan
                adventure unforgettable.
            </motion.p>


            {/*Desktop & Tablet grid*/}
            <div className=" max-[1024px]:hidden grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:px-4 md:px-0">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        viewport={{once: true}}
                        className="relative bg-gradient-to-br from-white to-[#f7f3ff] rounded-2xl p-4 md:p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                    >
                        <div className="absolute -top-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>
                        <div
                            className="flex items-center text-[#6938d3] mb-4 h-8 w-8 sm:h-10 sm:w-10">{service.icon}</div>
                        <h3 className="text-md md:text-lg font-semibold text-[#6938d3] mb-2 lg:w-[160px] xl:w-auto">{service.title}</h3>
                        <p className="text-[12px] md:text-sm text-[#2B2B2B] leading-relaxed lg:w-[200px] xl:w-auto">{service.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile version - Only visible on screens < 1024px */}
            <div className="hidden max-[1024px]:block mt-6 md:mt-10 cursor-default">
                {/* Row 1: First 3 cards with horizontal scroll */}
                <div
                    ref={row1.ref}
                    className="flex gap-6 px-3 sm:gap-8 max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden
                                [-ms-overflow-style:none] [scrollbar-width:none] select-none cursor-grab items-start"
                    onMouseDown={row1.handleMouseDown}
                    onMouseLeave={row1.handleMouseLeave}
                    onMouseUp={row1.handleMouseUp}
                    onMouseMove={row1.handleMouseMove}
                >
                    {services.slice(0, 3).map((service, index) => {
                        // Check if this card is currently expanded
                        const isExpanded = expandedCards.has(index);
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                style={{alignSelf: 'flex-start'}}
                                className="relative bg-gradient-to-br from-white to-[#f7f3ff] bg-[#fafafa] rounded-2xl max-[640px]:p-4 max-[1024px]:p-6 text-left shadow-md hover:shadow-lg transition-all duration-300 max-[375px]:min-w-[63%] max-[425px]:min-w-[63%] max-[640px]:min-w-[65%] max-[1024px]:min-w-[53%] overflow-hidden flex-shrink-0 "
                            >
                                {/* Corner color accent */}
                                <div
                                    className="absolute -top-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>
                                {/* Service Icon */}
                                <div
                                    className="flex items-center text-[#6938d3] mb-4 max-[640px]:h-8 max-[640px]:w-8 max-[1024px]:h-9 max-[1024px]:w-9 z-10">{service.icon}</div>

                                {/* Service Title */}
                                <h3 className="max-[640px]:text-sm max-[1024px]:text-lg font-semibold text-[#6938d3] mb-2 z-10  lg:w-[100px] max-[425px]:w-[150px] max-[640px]:w-[150px]">{service.title}</h3>

                                {/* Service Description - Shows truncated or full text based on expanded state */}
                                <p className={`max-[640px]:text-[12px] max-[1024px]:text-xs text-[#2B2B2B] leading-relaxed z-10
                                            ${service.title === "Handpicked Accommodations" ?
                                    `
                                                  max-[375px]:w-[125px]
                                                  max-[425px]:w-[130px]
                                                  max-[640px]:w-[180px]
                                                  max-[1024px]:w-[250px]
                                                 `
                                    :
                                    `
                                                  max-[375px]:w-[110px]
                                                  max-[425px]:w-[123px]
                                                  max-[640px]:w-[180px]
                                                  max-[1024px]:w-[250px]
                                                `
                                }`}>
                                    {isExpanded ? service.description : truncateText(service.description)}
                                </p>

                                {/* Read More/Less Button - Only shown if description is longer than 80 characters */}
                                {service.description.length > 80 && (
                                    <button
                                        onClick={() => toggleCard(index)}
                                        className="mt-2 text-[#6938d3] font-semibold max-[640px]:text-[11px] max-[1024px]:text-xs hover:underline z-10"
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Row 2: Last 3 cards (cards 3-5) with horizontal scroll */}
                <div
                    ref={row2.ref}
                    className="flex gap-6 px-3 sm:gap-8  max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden
                                    [-ms-overflow-style:none] [scrollbar-width:none] select-none cursor-grab items-start"
                    onMouseDown={row2.handleMouseDown}
                    onMouseLeave={row2.handleMouseLeave}
                    onMouseUp={row2.handleMouseUp}
                    onMouseMove={row2.handleMouseMove}
                >
                    {services.slice(3, 6).map((service, index) => {
                        // Calculate actual card index (3, 4, or 5) for the expandedCards state
                        const cardIndex = index + 3;
                        // Check if this card is currently expanded
                        const isExpanded = expandedCards.has(cardIndex);
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                                transition={{duration: 0.6, delay: index * 0.1}}
                                viewport={{once: true}}
                                style={{alignSelf: 'flex-start'}}
                                className={`relative bg-gradient-to-br from-white to-[#f7f3ff] bg-[#fafafa] rounded-2xl max-[640px]:p-4 max-[1024px]:p-6 text-left shadow-md hover:shadow-lg transition-all duration-300 max-[375px]:min-w-[70%] max-[425px]:min-w-[25%] max-[640px]:min-w-[65%] max-[1024px]:min-w-[53%] overflow-hidden flex-shrink-0 ${isExpanded ? " max-[375px]:min-h-[340px] max-[425px]:min-h-[280px] max-[640px]:min-h-[290px] max-[1024px]:min-h-[255px]" : ""}`}
                            >
                                {/* Corner color accent */}
                                <div
                                    className="absolute -top-8 -right-4 w-30 h-30 bg-[#872BFF]/20 rounded-full blur-xl"/>

                                {/* Service Icon */}
                                <div
                                    className="flex items-center text-[#6938d3] mb-4 max-[640px]:h-8 max-[640px]:w-8 max-[1024px]:h-9 max-[1024px]:w-9 z-10">{service.icon}</div>

                                {/* Service Title */}
                                <h3 className="max-[640px]:text-sm max-[1024px]:text-lg font-semibold text-[#6938d3] mb-2 z-10 max-[425px]:w-[130px] max-[640px]:w-[130px]">{service.title}</h3>

                                {/* Service Description - Shows truncated or full text based on expanded state */}
                                <p className={`max-[640px]:text-[12px] max-[1024px]:text-xs text-[#2B2B2B] leading-relaxed z-10
                                                    ${service.title === "Themed & Special Interest Tours"
                                    ? `max-[375px]:w-[100px]
                                                           max-[425px]:w-[165px]
                                                           max-[640px]:w-[160px]
                                                           max-[1024px]:w-[250px]
                                                        `
                                    : service.title === "Expert Local Guides"
                                        ? `max-[375px]:w-[115px]
                                                               max-[425px]:w-[155px]
                                                               max-[640px]:w-[160px]
                                                                max-[1024px]:w-[250px]
                                                               `
                                        : service.title === "Authentic Local Experiences"
                                            ? `max-[375px]:w-[110px]`
                                            : `max-[425px]:w-[150px]`

                                }
                                                                    max-[640px]:w-[155px]
                                                                    max-[1024px]:w-[230px]
                                                                `}
                                >
                                    {isExpanded ? service.description : truncateText(service.description)}
                                </p>

                                {/* Read More/Less Button - Only shown if description is longer than 80 characters */}
                                {service.description.length > 80 && (
                                    <button
                                        onClick={() => toggleCard(cardIndex)}
                                        className="mt-2 text-[#6938d3] font-semibold max-[640px]:text-[11px] max-[1024px]:text-xs hover:underline z-10"
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
};