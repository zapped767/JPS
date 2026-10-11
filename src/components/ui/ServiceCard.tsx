import React from "react";
import {motion} from "framer-motion";
import {cn, getImageUrl} from "@/lib/utils";
import Image from "next/image";

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    isActive?: boolean;
    className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
                                                            icon,
                                                            title,
                                                            description,
                                                            className,
                                                        }) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                transition: {duration: 0.3, ease: "easeInOut"}
            }}
            whileTap={{scale: 0.98}}
            className={cn(
                "relative p-4 md:pb-8 max-md:px-6 rounded-3xl bg-[#F7F7F7]  cursor-default border border-neutral-100 h-full max-[425px]:min-h-[170px]"
            )}
        >
            {/* Icon Container */}
            <div className="flex justify-center md:mb-4">
                <div
                    className={cn(
                        "w-[70px] h-[70px] max-md:w-[42px] max-md:h-[42px] md:my-5 sm:my-4 my-2 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary-100 text-primary-600 bg-[#EDEDED]"
                    )}
                >
                    <Image
                        src={getImageUrl(icon)}
                        alt={title}
                        width={100}
                        height={100}
                        className={`w-10 max-md:w-[28px] ${className}`}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-2 sm:space-y-4">
                <h3
                    className={cn(
                        "text-[28px] max-md:text-[14px] font-semibold text-neutral-800 group-hover:text-neutral-900 "
                    )}
                >
                    {title}
                </h3>
                <p className="text-[#A8A8A8] leading-relaxed md:pt-4 text-[18px] max-md:text-[12px] text-center min-[380px]:mb-4 max-[340px]:!mb-2">
                    {description}
                </p>
            </div>

            {/* Active indicator */}

            <motion.div
                initial={{scale: 0}}
                animate={{scale: 1}}
                className="top-4 right-4 w-3 h-3 bg-primary-500 rounded-full group-hover:block absolute hidden"
            />
        </motion.div>
    );
};
