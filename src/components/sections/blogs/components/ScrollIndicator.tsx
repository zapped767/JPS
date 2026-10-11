import {motion} from "framer-motion";
import React from "react";
import {FaArrowDownLong} from "react-icons/fa6";

interface ScrollIndicatorProps {
    OnClick: () => void;
    className?: string
}

const ScrollIndicator = ({OnClick, className}: ScrollIndicatorProps) => {
    return (
        /* Scroll Indicator */
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1, duration: 0.6}}
            className={`absolute  ${className}`}
        >
            <motion.div
                animate={{y: [0, 10, 0]}}
                transition={{duration: 2, repeat: Infinity}}
                className="w-8 h-12 sm:w-12 sm:h-16 bg-neutral-100 border-neutral-300 rounded-full flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl shadow"
                onClick={OnClick}
            >
                <motion.div
                    animate={{y: [0, 8, 0]}}
                    transition={{duration: 2, repeat: Infinity}}
                >
                    <FaArrowDownLong className="w-3 h-3 sm:w-5 sm:h-5 text-primary-500"/>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ScrollIndicator;
