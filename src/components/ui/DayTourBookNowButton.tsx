import {motion} from "framer-motion";
import Link from "next/link";
import React from "react";
import {MdOutlineConfirmationNumber} from "react-icons/md";
import {useIsMobile} from "@/hooks/useIsMobile";

const DayTourBookNowButton = ({slug}: { slug: string }) => {
    const isMobile = useIsMobile();

    return (
        <Link href={`/booking/${slug}`}>
            <motion.div
                className="bg-[#872bff] rounded-full px-3 py-2 md:px-[22px] md:py-[9px] max-w-fit flex justify-center items-center gap-4 cursor-pointer shadow-[0_8px_24px_rgba(135,43,255,0.3)]"
                whileHover={{scale: 1.05, y: -2}}
                whileTap={{scale: 0.95}}
                animate={{scale: [1, 1.05, 1]}}
                transition={{duration: 2, repeat: Infinity}}
            >
                    <span className="text-nowrap font-bold text-[12px] md:text-[14px] leading-3 text-white">
                      BOOK NOW
                    </span>

                <motion.div
                    className="w-5 h-5 md:w-[25px] md:h-[25px]  rounded-full flex items-center justify-start font-extrabold">
                    <MdOutlineConfirmationNumber size={isMobile ? 20 : 30} className="text-white text-2xl -ms-[5px] font-black"/>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default DayTourBookNowButton;
