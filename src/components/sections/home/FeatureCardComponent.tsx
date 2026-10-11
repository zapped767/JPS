import React from "react";
import {motion} from "framer-motion";

export interface FeatureCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    titleColor?: string;
    titleBgColor?: string;
    descriptionColor?: string;
    titleTextSize?: string;
    descTextSize?: string;
}

export const FeatureCardComponent: React.FC<{
    feature: FeatureCard;
    index: number;
}> = ({feature, index}) => {

    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.3, delay: index * 0.05}}
            viewport={{once: true, margin: "-50px"}}
            className="border border-slate-100 relative max-[375px]:min-h-[220px]! max-md:min-h-[185px] w-full lg:w-[220px] h-full lg:h-[220px]
             bg-white rounded-[20px] md:rounded-[30px] flex flex-col items-center justify-start px-3 py-4 md:px-4 md:py-6 cursor-pointer overflow-hidden
        group shadow-lg lg:shadow-xl"
            style={{willChange: 'opacity'}}
        >
            {/* Icon */}
            <motion.div
                className="flex items-center justify-center mb-2 md:mb-4 text-primary-500 z-10 relative"
            >
                <div className="flex items-center justify-center">
                    {feature.icon}
                </div>
            </motion.div>

            {/* Title Badge */}
            <motion.div
                className={`${feature.titleBgColor ? feature.titleBgColor : "bg-[#fff2fb]"} rounded-md md:rounded-lg px-2 py-1 md:px-3 md:py-2 mb-2 md:mb-3 z-10 relative`}
            >
                <p className={`font-plus-jakarta-sans font-semibold text-[14px] md:text-[16px] leading-[15px] md:leading-[15.12px] ${feature.titleColor ? feature.titleColor : "text-[#eb00a5]"} text-center tracking-[0.1px] md:tracking-[0.12px]`}>
                    {feature.title}
                </p>
            </motion.div>

            {/* Description */}
            <motion.p
                className={`font-plus-jakarta-sans font-medium ${feature.descTextSize ? feature.descTextSize : "text-[12px] md:text-[16px] leading-4 md:leading-5"}  text-center z-10 relative px-1 ${feature.descriptionColor ? feature.descriptionColor : "text-black/70"}`}
            >
                {feature.description}
            </motion.p>
        </motion.div>
    );
};