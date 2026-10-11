import React, {useState} from "react";
import {motion} from "framer-motion";
import {FaCar, FaClipboardList, FaHeadset, FaPlaneArrival, FaSimCard,} from "react-icons/fa";
import {FaHandshakeSimple} from "react-icons/fa6";
import {HiCreditCard, HiReceiptTax} from "react-icons/hi";
import {GiWaterBottle} from "react-icons/gi";
import {IoFastFoodSharp} from "react-icons/io5";

interface FeatureCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    extendedDescription?: string;
    hasGradient?: boolean;
}

const comfortFeatures: FeatureCard[] = [
    {
        icon: <FaSimCard className="w-[50px] h-[50px]"/>,
        title: "Free SIM",
        description: "Complimentary local SIM with data on arrival.",
        extendedDescription:
            "Stay connected instantly with a pre-activated SIM — no queues or fees.",
    },
    {
        icon: <GiWaterBottle className="w-[50px] h-[50px]"/>,
        title: "Bottled Water",
        description: "Daily purified bottled water for all travelers.",
        extendedDescription:
            "Fresh, sealed water provided every day throughout your journey.",
        hasGradient: true,
    },
    {
        icon: <FaCar className="w-[50px] h-[50px]"/>,
        title: "Private Vehicle",
        description: "Air-conditioned private vehicle for all tours.",
        extendedDescription:
            "Enjoy total comfort and flexibility with reliable local chauffeurs.",
    },
    {
        icon: <FaPlaneArrival className="w-[50px] h-[50px]"/>,
        title: "Airport Transfer",
        description: "Free pickup and drop from the airport.",
        extendedDescription:
            "Seamless start and end to your trip — no extra transfer costs.",
    },
    {
        icon: <IoFastFoodSharp className="w-[44px] h-[50px]"/>,
        title: "Daily Breakfast",
        description: "Complimentary breakfast at all accommodations.",
        extendedDescription:
            "Wake up to authentic Sri Lankan or continental morning meals.",
    },
];

const trustFeatures: FeatureCard[] = [
    {
        icon: <FaClipboardList className="w-[50px] h-[50px]"/>,
        title: "Visa Assistance",
        description: "Full guidance for tourist or on-arrival visas.",
        extendedDescription:
            "We help you prepare and process documents for smooth entry.",
    },
    {
        icon: <HiCreditCard className="w-[50px] h-[50px]"/>,
        title: "Flexible Payments",
        description: "Reserve with just 40% upfront.",
        extendedDescription:
            "Secure your booking easily and pay the rest before arrival.",
    },
    {
        icon: <HiReceiptTax className="w-[50px] h-[50px]"/>,
        title: "All Taxes Included",
        description: "Transparent pricing, no hidden fees.",
        extendedDescription:
            "What you see is what you pay — all taxes are included.",
        hasGradient: true,
    },
    {
        icon: <FaHeadset className="w-[50px] h-[50px]"/>,
        title: "24/7 Support",
        description: "Continuous assistance during your trip.",
        extendedDescription:
            "Our local support team is available any time you need help.",
    },
    {
        icon: <FaHandshakeSimple className="w-[62px] h-[50px]"/>,
        title: "Trusted Partners",
        description: "Verified hotels, guides, and transport.",
        extendedDescription:
            "Every partner is certified for safety, comfort, and quality.",
    },
];

const FeatureCardComponent: React.FC<{
    feature: FeatureCard;
    index: number;
}> = ({feature, index}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: index * 0.1}}
            viewport={{once: true}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full md:w-[224px] h-[160px] md:h-[202px] bg-white rounded-[20px] md:rounded-[30px] flex flex-col items-center justify-center px-3 py-4 md:px-4 md:py-6 cursor-pointer overflow-hidden
        group shadow-2xl"
        >
            {/* Icon */}
            <motion.div
                animate={{opacity: isHovered ? 0.2 : 1}}
                transition={{duration: 0.3}}
                className="flex items-center justify-center mb-2 md:mb-4 text-primary-500 z-10 relative"
            >
                <div className="w-[24px] h-[24px] md:w-[50px] md:h-[50px] flex items-center justify-center">
                    {feature.icon}
                </div>
            </motion.div>

            {/* Title Badge */}
            <motion.div
                animate={{opacity: isHovered ? 0.2 : 1}}
                transition={{duration: 0.3}}
                className="bg-[#fff2fb] rounded-[6px] md:rounded-[8px] px-2 py-1 md:px-3 md:py-2 mb-2 md:mb-3 z-10 relative"
            >
                <p className="font-plus-jakarta-sans font-medium text-[10px] md:text-[12px] leading-[12px] md:leading-[15.12px] text-[#eb00a5] text-center tracking-[0.1px] md:tracking-[0.12px]">
                    {feature.title}
                </p>
            </motion.div>

            {/* Description */}
            <motion.p
                animate={{opacity: isHovered ? 0 : 1}}
                transition={{duration: 0.3}}
                className="font-plus-jakarta-sans font-medium text-[12px] md:text-[16px] leading-[16px] md:leading-[20px] text-black/70 text-center z-10 relative px-1"
            >
                {feature.description}
            </motion.p>

            {/* Gradient Overlay with Extended Description - On hover for all cards */}
            {feature.extendedDescription && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: isHovered ? 1 : 0}}
                    transition={{duration: 0.3}}
                    className="absolute inset-0 rounded-[20px] md:rounded-[30px] overflow-hidden pointer-events-none"
                >
                    {/* Glass effect background */}
                    <div
                        className="absolute inset-0 bg-primary-500/30 backdrop-blur-lg border border-primary-300/40 shadow-[0_12px_40px_rgba(135,43,255,0.35)]"/>

                    {/* Gradient tint for depth */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-primary-400/20 via-primary-500/45 to-primary-600/60"/>

                    {/* Extended Description */}
                    <div
                        className="absolute inset-0 flex items-end justify-center pb-4 md:pb-6 px-3 md:px-4 z-20 pointer-events-none">
                        <motion.p
                            initial={{y: 20, opacity: 0}}
                            animate={{y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0}}
                            transition={{duration: 0.3, delay: 0.1}}
                            className="font-medium text-[11px] md:text-[14px] leading-[16px] md:leading-[20px] text-white text-center drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]"
                        >
                            {feature.extendedDescription}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export const ComfortTrustSection: React.FC = () => {
    return (
        <section
            className="relative my-16 flex flex-col items-center justify-center max-xl:px-10 max-sm:px-4">
            <div className="w-full max-w-[1248px] mx-auto">
                {/* Trust & Flexibility Section */}
                <div>
                    {/* Section Header */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                        className="text-center mb-12"
                    >
                        <h2
                            className="font-plus-jakarta-sans font-semibold text-[40px] leading-[50.4px] text-[#1c1c1c] mb-3
              max-md:text-[32px] max-md:leading-[40px] max-sm:text-[24px] max-sm:leading-[30px]"
                        >
                            Trust & Flexibility
                        </h2>
                        <p className="font-plus-jakarta-sans font-medium text-[18px] leading-[22.68px] text-[#872bff] tracking-[0.18px]">
                            Book confidently, we're by your side every step of the way.
                        </p>
                    </motion.div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-6 max-md:gap-4">
                        {trustFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={
                                    index === trustFeatures.length - 1
                                        ? "col-span-2 flex justify-center md:col-span-1 md:flex-none"
                                        : ""
                                }
                            >
                                <FeatureCardComponent feature={feature} index={index}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
