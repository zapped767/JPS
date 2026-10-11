import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IconType } from "react-icons";

interface MembershipFeatureCardProps {
    image?: string;
    icon?: React.ElementType | IconType;
    alt: string;
    title: string;
    description: string;
    subTag?: string;
    delay?: number;
    className?: string;
    ariaLabel?: string;
    imageWidth?: number;
    imageHeight?: number;
}

const MembershipFeatureCard: React.FC<MembershipFeatureCardProps> = ({
    image,
    icon: Icon,
    alt,
    title,
    description,
    subTag,
    delay = 0,
    className = "",
    ariaLabel,
    imageWidth = 60,
    imageHeight = 60,
}) => {
    const isMobile = useIsMobile();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
            }}
            role="button"
            aria-label={ariaLabel || title}
            tabIndex={0}
            className={cn(
                "w-full h-full bg-white shadow-lg border border-slate-100 z-10 rounded-xl lg:rounded-3xl flex flex-col items-center gap-2 p-3 md:p-4 text-center transition-all",
                className
            )}
        >
            {/* Icon/Image Section */}
            <div className="flex-shrink-0 flex items-center justify-center">
                {Icon ? (
                    <Icon
                        size={isMobile ? 24 : 32}
                        className="text-primary-500"
                    />
                ) : (
                    image && (
                        <Image
                            src={image}
                            alt={alt}
                            width={imageWidth}
                            height={imageHeight}
                            className="object-contain w-[35px] h-[35px] md:w-[60px] md:h-[60px]"
                        />
                    )
                )}
            </div>

            {/* Content Section*/}
            <div className="flex flex-col w-full gap-1">

                {/* Top part: Title and Description */}
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-base md:text-[18px] font-bold text-primary-900 leading-tight">
                        {title.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < title.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h3>

                    <p className="text-[12px] md:text-[14px] text-[#414141] leading-snug">
                        {description}
                    </p>
                </div>

                {/* Bottom part: SubTag */}
                {subTag && (
                    <div className="pt-1">
                        <p className="text-[10px] md:text-[12px] font-semibold text-secondary-500 uppercase tracking-wide leading-tight">
                            {subTag.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < subTag.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MembershipFeatureCard;