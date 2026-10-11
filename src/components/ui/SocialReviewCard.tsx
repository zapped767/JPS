import {motion} from "framer-motion";
import React from "react";

interface SocialReviewCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    delay?: number;
    animation?: {
        initial?: any;
        whileInView?: any;
        whileHover?: any;
        transition?: any;
    };
    className?: string;
    ariaLabel?: string;
}

const SocialReviewCard: React.FC<SocialReviewCardProps> = ({
                                                               icon,
                                                               title,
                                                               subtitle,
                                                               delay = 0,
                                                               animation = {},
                                                               className = "",
                                                               ariaLabel,
                                                           }) => {
    const defaultAnimation = {
        initial: {opacity: 0, y: 50, rotateY: -20},
        whileInView: {opacity: 1, y: 0, rotateY: 0},
        whileHover: {
            y: -8,
            scale: 1.05,
            rotateY: 5,
            transition: {duration: 0.3},
        },
    };

    const mergedAnimation = {
        ...defaultAnimation,
        ...animation,
        transition: {
            duration: 0.6,
            delay,
            ...animation.transition,
        },
    };

    return (
        <motion.div
            {...mergedAnimation}
            viewport={{once: true}}
            role="link"
            aria-label={ariaLabel}
            className={`flex flex-col md:flex-row gap-3 w-full bg-[#f9f9f9] rounded-xl items-center justify-start p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
        >
            <div className="text-primary-500 w-8 h-8 flex-shrink-0">
                {icon}
            </div>
            <div className="flex flex-col gap-0.5">
                <h2 className="text-base md:text-[18px] font-bold text-primary-900 leading-tight">
                    {title}
                </h2>
                <p className="text-[12px] md:text-[14px] text-[#414141] font-normal leading-snug">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    );
};

export default SocialReviewCard;
