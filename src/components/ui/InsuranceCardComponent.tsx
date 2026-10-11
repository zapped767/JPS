import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

export const InsuranceCardComponent: React.FC = () => {

    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.3}}
            viewport={{once: true, margin: "-50px"}}
            className="border border-slate-100 relative w-full h-full max-w-[950px] bg-white rounded-[20px] md:rounded-[30px] flex flex-col md:grid grid-cols-6 items-center justify-start px-3 py-4 md:px-4 md:py-6 cursor-pointer overflow-hidden
        group shadow-xl"
            style={{minHeight: '140px', willChange: 'opacity'}}
        >
            {/* Icon */}
            <motion.div
                className="flex col-span-1 items-center justify-center mb-2 md:mb-0 text-primary-500 z-10 relative"
            >
                <Image
                    src={getImageUrl("public/images/home/services/travels-insuran.avif")}
                    alt="Travel Insurance"
                    width={60}
                    height={60}
                    sizes="60px"
                    className="rounded-2xl object-cover"
                    quality={60}
                    loading="lazy"
                    priority={false}
                    fetchPriority="auto"
                />
            </motion.div>

            <div className="flex flex-col items-center justify-center col-span-5">
                {/* Title Badge */}
                <motion.div
                    className={`bg-[#fff2fb] rounded-md md:rounded-lg px-2 py-1 md:px-3 md:py-2 mb-2 md:mb-3 z-10 relative w-fit`}
                >
                    <p className={`font-plus-jakarta-sans font-semibold text-[14px] md:text-[16px] leading-[15px] md:leading-[15.12px] text-[#C4008D] text-center tracking-[0.1px] md:tracking-[0.12px]`}>
                        Travel Insurance (Up to USD 10,000)
                    </p>
                </motion.div>

                {/* Description */}
                <motion.p
                    className={`font-plus-jakarta-sans font-medium text-[14px] md:text-[16px] leading-4 md:leading-5  text-center z-10 relative px-1 text-primary-500`}
                >
                    Coverage for medical needs, trip interruptions, and emergencies, giving you peace of mind throughout
                    your journey.
                </motion.p>
            </div>

        </motion.div>
    );
};