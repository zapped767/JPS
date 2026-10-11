import {motion} from "framer-motion";
import Link from "next/link";
import React from "react";
import {HiArrowNarrowRight} from "react-icons/hi";

const BookThisPackageButton = ({slug}: { slug: string }) => {
    return (
        <Link href={`/booking/${slug}`}>
            <motion.div
                className="bg-[#872bff] rounded-[50px] px-[12px] sm:px-[22px] py-[9px] md:py-[10px] max-w-fit flex items-center gap-[8px] sm:gap-[16px] cursor-pointer shadow-[0_8px_24px_rgba(135,43,255,0.3)]"
                whileHover={{scale: 1.05, y: -2}}
                whileTap={{scale: 0.95}}
            >
        <span className="sm:text-nowrap font-semibold text-[10px] sm:text-[14px] leading-[12px] text-white">
          Book now with just 40% advance payment-secure your trip today!
        </span>
                <motion.div
                    animate={{x: [0, 5, 0]}}
                    transition={{duration: 2, repeat: Infinity}}
                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]  bg-white bg-opacity-20 rounded-full flex items-center justify-start">
                    <HiArrowNarrowRight className="text-[#872bff] text-2xl -ms-[5px]"/>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default BookThisPackageButton;
