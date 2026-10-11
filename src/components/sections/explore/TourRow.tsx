import React from "react";
import {DayCard} from "./DayCard";
import Image from "next/image";
import dynamic from "next/dynamic";
import {motion} from "framer-motion";

const VideoPlayer = dynamic(() => import("@/components/ui/VideoPlayer"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-[75px]"/>
});
import formatTwoDigits from "@/utils/util";
import {getImageUrl} from "@/lib/utils";

const TourRow = ({
                     align = "left",
                     type = "center",
                     itineraryData,
                     isSingleDay,
                 }: {
    align?: "left" | "right";
    type?: "center" | "start" | "end";
    itineraryData: any;
    isSingleDay?: boolean;
}) => {
    if (!itineraryData) return null;

    const imageOrVideo = () => {
        const url = getImageUrl(itineraryData?.image);

        // Get the last part of the URL (e.g. ".jpg", ".mp4")
        const ext = url?.slice(-4).toLowerCase();
        return (
            <>
                {ext === ".mp4" ? (
                    <VideoPlayer
                        videoUrl={url}
                        width={504}
                        height={504}
                        rounded="75px"
                    />
                ) : (
                    <Image
                        src={url}
                        alt="Tour Image"
                        width={504}
                        height={504}
                        className="object-cover rounded-[75px] max-md:rounded-[40px] h-full w-full"
                    />
                )}
            </>
        );
    }

    return (
        <motion.div
            className={`flex justify-between max-md:flex-col relative max-md:overflow-hidden ${
                align === "right" && "flex-row-reverse"
            } `}
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            viewport={{once: true}}
        >
            <motion.div
                className={`pt-28 max-xl:pt-16 ${type === "end" && "md:pb-20"} w-full max-w-[504px] max-xl:max-w-[400px] max-xl:min-h-[300px] max-lg:max-w-[250px] max-lg:min-h-[200px] max-md:!max-h-[230px] [@media(min-width:380px)_and_(max-width:767px)]:min-w-[380px] max-md:min-w-[320px] aspect-square max-md:pt-8 max-md:pl-4 max-md:pr-16`}
                initial={{opacity: 0, x: align === "left" ? -50 : 50}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6, delay: 0.2}}
                viewport={{once: true}}
                whileHover={{scale: 1.02}}
            >
                {imageOrVideo()}
            </motion.div>
            <motion.div
                className="relative max-md:absolute max-md:right-4 max-md:top-0 max-md:h-full"  // line start
                initial={{opacity: 0, scale: 0.8}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.6, delay: 0.4}}
                viewport={{once: true}}
            >
                <motion.div
                    className={`absolute w-[56px] h-[56px] bg-[#6938d3]/40 rounded-full flex items-center justify-center max-md:w-[40px] max-md:h-[40px] ${
                        (type === "center" || type === "end") && !isSingleDay
                            ? "hidden"
                            : ""
                    }`}
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, delay: 0.6}}
                    viewport={{once: true}}
                >
                    <div
                        className="w-[20px] h-[20px] bg-[#6938d3] rounded-full flex items-center justify-center max-md:w-[14px] max-md:h-[14px]">
                        <div className="w-[7px] h-[7px] bg-white rounded-full max-md:w-[5px] max-md:h-[5px]"></div>
                    </div>
                </motion.div>
                <motion.div
                    className={`absolute w-[35px] h-[35px] rounded-full flex items-center justify-center -bottom-10 max-md:w-[25px] max-md:h-[25px] max-md:-bottom-6 ${
                        type === "center" || type === "start" ? "hidden" : " max-md:bottom-0"
                    }`}
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, delay: 0.8}}
                    viewport={{once: true}}
                >
                    <Image
                        src={getImageUrl("public/images/explore/itinerary/oval.webp")}
                        alt="itinerary"
                        width={1000}
                        height={1000}
                        className="absolute w-full h-ful flex left-1/4"
                    />
                </motion.div>
                <motion.div
                    className={`w-[56px] h-full flex items-center justify-center mt-[20px] max-md:w-[40px] ${
                        type === "start" ? "max-md:mt-[14px]" : "max-md:mt-[0px]"
                    }`}
                    initial={{scaleY: 0}}
                    whileInView={{scaleY: 1}}
                    transition={{duration: 0.8, delay: 0.4}}
                    viewport={{once: true}}
                    style={{transformOrigin: "top"}}
                >
                    <div className="w-1 h-full bg-[#6938d3] max-md:w-[3px]"></div>
                </motion.div>
                <motion.div
                    className={`absolute w-[56px] ${type === "end" ? "max-[767px]:!top-[42%]" : "max-[767px]:!top-[42%]"}  top-9/14 max-xl:top-[59%] rounded-full flex items-center justify-center max-md:w-[40px] max-md:top-[55%]`}
                    initial={{opacity: 0, scale: 0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, delay: 0.6}}
                    viewport={{once: true}}
                >
                    <motion.div
                        animate={{y: [0, 8, 0]}}
                        transition={{duration: 2, repeat: Infinity}}
                        className="absolute -top-5 left-1/2 transform -translate-x-1/2"
                    >
                        <Image
                            src={getImageUrl("public/images/explore/itinerary/location-point.webp")}
                            alt="itinerary"
                            width={1000}
                            height={1000}
                            className="w-[28px] max-md:w-[20px]"
                        />
                    </motion.div>
                    <Image
                        src={getImageUrl("public/images/explore/itinerary/oval.webp")}
                        alt="itinerary"
                        width={1000}
                        height={1000}
                        className="w-[35px] h-full max-md:w-[25px]"
                    />
                </motion.div>
                <motion.div
                    className={`absolute top-[50%] ${type === "end" ? "max-[767px]:!top-[33%]" : "max-[767px]:!top-[33%]"} max-xl:top-[45%] max-md:top-[48%] -left-[100%] rounded-full flex items-center justify-center shadow z-10 max-xl:-left-[60%] max-md:-left-[80%] max-[375px]:!-left-[15%] max-md:right-auto`}
                    initial={{opacity: 0, x: -20}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{duration: 0.6, delay: 0.8}}
                    viewport={{once: true}}
                >
                    <div
                        className="flex max-[375px]:flex-col max-[1060px]:text-[11px] text-[13px] bg-[#efefef] items-center justify-center rounded-[10px] max-xl:rounded-[5px] max-md:text-[8px] max-md:rounded-[6px]">
                        <div
                            className="max-[375px]:flex justify-center bg-[#6938D3] text-white px-5 py-2 leading-[15px] text-center rounded-l-[10px] max-[375px]:rounded-b-none max-[375px]:rounded-t-lg max-[375px]:w-full  max-xl:px-3 max-xl:py-1 max-xl:leading-[12px] max-md:px-2 max-md:py-0.5 max-md:leading-[10px]">
                            <div>Day</div>
                            <div>{formatTwoDigits(itineraryData.day)}</div>
                        </div>
                        <div
                            className=" text-black ps-5 pe-8 py-1 leading-[14px] text-center max-xl:ps-3 max-xl:pe-4 max-xl:py-1 max-xl:leading-[12px] max-md:ps-2 max-md:pe-3 max-md:py-0.5 max-md:leading-[10px]">
                            {itineraryData.destination}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                className={`pt-28 max-xl:pt-16 ${type === "end" && "max-md:pb-25 pb-20"}  max-md:pt-8 max-md:pl-4 max-md:pr-16 max-md:w-full`}
                initial={{opacity: 0, x: align === "left" ? 50 : -50}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6, delay: 0.4}}
                viewport={{once: true}}
            >
                <DayCard
                    day={"Day " + formatTwoDigits(itineraryData.day)}
                    destination={itineraryData.destination}
                    description={itineraryData.description}
                    experiences={itineraryData.experiences}
                    stayAt={
                        type === 'end' ? undefined :
                            itineraryData.accommodationIds.length > 0
                                ? itineraryData.accommodationIds[0].name
                                : ""
                    }
                    roomType={
                        type === 'end' ? undefined :
                            itineraryData.accommodationIds.length > 0
                                ? itineraryData.accommodationIds[0].rooms.length > 0
                                    ? itineraryData.accommodationIds[0].rooms[0].name
                                    : ""
                                : ""
                    }
                    foodSpecialty={
                        itineraryData.mealIds.length > 0
                            ? itineraryData.mealIds[0].name
                            : ""
                    }
                    align={align}
                />
            </motion.div>
        </motion.div>
    );
};

export default TourRow;
