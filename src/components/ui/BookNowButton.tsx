import {motion} from "framer-motion";
import Link from "next/link";
import React from "react";
import {MdOutlineConfirmationNumber} from "react-icons/md";

const BookNowButton = ({slug}: { slug: string }) => {
    return (
        <Link href={`/booking/${slug}`}>
            <motion.div
                className="bg-[#872bff] rounded-[50px] px-[22px] py-[9px] max-w-fit flex items-center gap-[16px] cursor-pointer shadow-[0_8px_24px_rgba(135,43,255,0.3)]"
                whileHover={{scale: 1.05, y: -2}}
                whileTap={{scale: 0.95}}
                animate={{scale: [1, 1.05, 1]}}
                transition={{duration: 2, repeat: Infinity}}
            >
                    <span className="text-nowrap font-bold text-[14px] leading-[12px] text-white">
                      BOOK NOW
                    </span>

                <motion.div
                    className="w-[25px] h-[25px]  rounded-full flex items-center justify-start font-extrabold">
                    <MdOutlineConfirmationNumber size={30} className="text-white text-2xl -ms-[5px] font-[900]"/>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default BookNowButton;
