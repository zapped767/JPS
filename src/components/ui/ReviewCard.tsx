import {motion} from "framer-motion";
import React from "react";
import {FaStar} from "react-icons/fa";

interface ReviewCardProps {
    icon: React.ReactNode;
    title: string;
    rating: string;
    delay?: number;
    animation?: {
        initial?: any;
        whileInView?: any;
        whileHover?: any;
        transition?: any;
    };
    className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
                                                   icon,
                                                   title,
                                                   rating,
                                                   delay = 0,
                                                   animation = {},
                                                   className = "",
                                               }) => {
    const defaultAnimation = {
        initial: {opacity: 0, y: 50},
        whileInView: {opacity: 1, y: 0},
        whileHover: {
            y: -8,
            scale: 1.05,
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
            className={`bg-[#fafafa] rounded-[25px] p-4 pt-6 pb-10 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
        >
            <div className="w-[25px] h-[25px] text-primary-500">{icon}</div>
            <p className="text-[20px] font-semibold text-[#292929] mt-3 mb-1">
                {title}
            </p>
            <div className="flex items-center gap-2">
                <FaStar className="w-[17px] h-[17px] text-[#E6AE00]"/>
                <p className="text-[18px] font-semibold text-[#292929]">{rating}</p>
            </div>
        </motion.div>
    );
};

export default ReviewCard;
