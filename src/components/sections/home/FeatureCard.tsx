import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    description,
    index,
}) => {

    const isMobile = useIsMobile();

    return (
         <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="
        bg-[#f6f6f6]
        rounded-[10px]
        w-full
        h-full
        p-3 md:px-6 md:py-5
        flex
        flex-col
        items-center
        text-center
      "
    >
      {/* Icon */}
      <div className="mb-2 md:mb-3">
        <Icon
          size={isMobile ? 24 : 32}
          className="text-primary-500"
        />
      </div>

      {/* Title */}
      <h3
        className="
          font-plus-jakarta-sans
          text-base md:text-[18px]
          leading-[20px] md:leading-[27px]
          text-primary-900
          tracking-[0.16px]
          whitespace-pre-line
        "
      >
        {title}
      </h3>

      {/* Description (scrolls if needed) */}
      <div
        className="
          mt-2
          text-[12px] md:text-[14px]
          leading-[20px] md:leading-[26px]
          text-[#414141]
          tracking-[0.14px]
          overflow-y-auto
          flex-1
          w-full
          px-1
        "
      >
        {description}
      </div>
    </motion.div>
    );
};
