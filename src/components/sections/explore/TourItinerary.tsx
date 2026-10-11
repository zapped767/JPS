import React from "react";
import Image from "next/image";
import TourRow from "./TourRow";
import {motion} from "framer-motion";
import {getImageUrl} from "@/lib/utils";

export const TourItinerary = ({packageData}: { packageData: any }) => {
    if (!packageData) return null;

    const itineraries = [...(packageData?.itineraries || [])].sort(
        (a, b) => a.day - b.day
    );

    const tourItinerary = () => {
        if (!itineraries) return null;
        return (
            <div className="space-y-0">
                {itineraries.map((item: any, index: number) => {
                    // First row type = "start", last row type = "end", others = "center"
                    let type: "start" | "center" | "end" = "center";
                    if (itineraries.length === 1) type = "end";
                    else if (index === 0) type = "start";
                    else if (index === itineraries.length - 1) type = "end";

                    // Alternating alignment left/right
                    const align: "left" | "right" = index % 2 === 0 ? "left" : "right";

                    return (
                        <motion.div
                            key={item.id || index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            viewport={{once: true}}
                        >
                            <TourRow type={type} align={align} itineraryData={item}
                                     isSingleDay={itineraries.length === 1}
                            />
                        </motion.div>
                    );
                })}
            </div>
        );
    };

    return (
        <motion.div
            className="relative max-md:overflow-hidden"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            viewport={{once: true}}
        >
            <div className="grid grid-cols-2 md:mx-20 max-md:mx-0 max-md:grid-cols-1">
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.1}}}
                    animate={{y: [0, 5, 0]}}
                    transition={{duration: 2, repeat: Infinity}}
                    viewport={{once: true}}
                    className="max-md:px-8 py-2 max-[375px]:!mb-20 max-md:mb-14"
                >
                    <Image
                        src={getImageUrl("public/images/explore/itinerary/fly-start.webp")}
                        alt="itinerary"
                        width={1000}
                        height={1000}
                        className="w-full"
                    />
                </motion.div>
                <div className="relative max-md:px-4 md:mt-30">

                    <motion.div
                        className="bg-[#fbf9ff] rounded-t-[20px] min-[375px]:min-w-[300px] md:min-w-[320px] rounded-r-[20px] p-4 max-w-[368px] mx-auto absolute left-12 -bottom-10 max-md:left-4 max-[375px]:left-0 max-md:-bottom-16 max-md:max-w-[220px] max-md:p-[8px] max-md:rounded-t-[12px] max-md:rounded-r-[12px] max-md:mb-10 space-y-3"
                        initial={{opacity: 0, y: 30, scale: 0.9}}
                        whileInView={{opacity: 1, y: 0, scale: 1}}
                        transition={{duration: 0.6, delay: 0.4}}
                        viewport={{once: true}}
                        whileHover={{scale: 1.02, y: -5}}
                    >
                        <div
                            className="absolute -top-5 left-1/5 -translate-x-1/2 bg-[#eb00a4] px-5 py-0.5 rounded-t-[8px] rounded-b-none text-white text-[12px] font-semibold shadow-md max-md:px-2 max-md:text-[7px] max-md:-top-3">
                            Start
                        </div>
                        <h3 className="font-bold text-[16px] leading-[18px] text-[#6938d3] mb-[5px] max-md:text-[12px] max-md:leading-[11px] max-md:mb-[2px]">
                            Ayubowan! 🙏 Welcome to Sri Lanka
                        </h3>
                        <p className="font-normal text-[13px] leading-[14px] text-[#616161] max-xl:text-[10px] max-xl:leading-[12px]">
                            We'll warmly welcome you at Bandaranaike International Airport
                            (CMB) and begin your unforgettable journey.
                        </p>
                        <div
                            className="bg-[#eee6ff] w-fit rounded-[10px] p-[8px] flex items-center gap-[10px] max-md:rounded-[6px] max-md:p-[4px] max-md:gap-[4px]">
                            <div className="w-4 h-4 flex items-center justify-center max-md:w-2.5 max-md:h-2.5">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="max-md:w-2.5 max-md:h-2.5"
                                >
                                    <path
                                        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                                        fill="#6938d3"
                                    />
                                    <path
                                        d="M10.5 6L7 9.5L5.5 8"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span
                                className="font-plus-jakarta-sans font-semibold text-[12px] leading-[13px] text-[#6938d3]">
                                Bandaranaike International Airport (CMB)
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {tourItinerary()}

            <div className={`grid grid-cols-2 pt-10 max-md:-mt-25 -mt-10 max-md:grid-cols-1 max-md:gap-4`}>
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.1}}}
                    animate={{y: [0, 5, 0]}}
                    transition={{duration: 2, repeat: Infinity}}
                    viewport={{once: true}}
                    className="max-md:px-4 max-md:order-2 max-md:mr-3 md:mt-10"
                >
                    <Image
                        src={getImageUrl("public/images/explore/itinerary/fly-end.webp")}
                        alt="itinerary"
                        width={1000}
                        height={1000}
                        className="w-full pe-6 max-md:pe-0"
                    />
                </motion.div>
                <div className="relative max-md:px-4 max-md:order-1 md:mb-40">
                    <motion.div
                        className="bg-[#fbf9ff] rounded-t-[20px] rounded-r-[20px] p-[19px] max-w-[368px] mx-auto absolute left-12 max-md:relative max-md:-left-12 max-[475px]:!-left-8 max-md:w-full max-md:rounded-[20px] max-md:max-w-[220px] max-md:p-[8px] min-[375px]:min-w-[300px] md:min-w-[320px] space-y-3"
                        initial={{opacity: 0, y: 30, scale: 0.9}}
                        whileInView={{opacity: 1, y: 0, scale: 1}}
                        transition={{duration: 0.6, delay: 2.0}}
                        viewport={{once: true}}
                        whileHover={{scale: 1.02, y: -5}}
                    >
                        <div
                            className="absolute -top-5 left-1/5 -translate-x-1/2 bg-[#eb00a4] px-5 py-0.5 rounded-t-[8px] rounded-b-none text-white text-[10px] font-semibold shadow-md max-md:px-2 max-md:text-[7px] max-md:-top-3">
                            End
                        </div>
                        <h3 className="font-bold text-[14px] leading-[18px] text-[#6938d3] mb-[5px] max-md:text-[12px] max-md:leading-[11px] max-md:mb-[2px]">
                            Goodbye 👋 with Memories Forever
                        </h3>
                        <p className="font-normal text-[12px] leading-[14px] text-[#616161] max-xl:text-[10px] max-xl:leading-[12px]">
                            We'll drop you safely at Bandaranaike International Airport (CMB)
                        </p>
                        <div
                            className="bg-[#eee6ff] w-fit rounded-[10px] p-[8px] flex items-center gap-[10px] max-md:rounded-[6px] max-md:p-[4px] max-md:gap-[4px]">
                            <div className="w-4 h-4 flex items-center justify-center max-md:w-2.5 max-md:h-2.5">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="max-md:w-2.5 max-md:h-2.5"
                                >
                                    <path
                                        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                                        fill="#6938d3"
                                    />
                                    <path
                                        d="M10.5 6L7 9.5L5.5 8"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span
                                className="font-plus-jakarta-sans font-semibold text-[10px] leading-[13px] text-[#6938d3]">
                                Bandaranaike International Airport (CMB)
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
