import React from "react";
import {motion} from "framer-motion";
import {getImageUrl} from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";

const BookThisPackageSection = dynamic(() => import("@/components/sections/explore/BookThisPackageSection"), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
});

export const TrustSection = ({slug}: { slug: string }) => {

    return (
        <motion.div
            className="bg-[#f8f8f8] rounded-[79px] py-10 px-[42px] relative max-md:rounded-[30px] mx-4 max-md:py-6 max-md:px-4"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.2, ease: "easeOut"}}
            viewport={{once: true}}
        >
            {/* Section Title */}
            <motion.div
                className="text-center mb-[33px] max-md:mb-6"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.2, delay: 0.2}}
                viewport={{once: true}}
            >
                <h2 className="font-plus-jakarta-sans font-medium text-[26px] leading-[33px] text-[#434343] max-md:text-[20px] max-md:leading-[26px]">
                    Trusted & Secure
                </h2>
            </motion.div>

            {/* Trust Cards */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 mb-10  justify-center gap-4 max-md:px-4 relative w-full"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.2, delay: 0.4}}
                viewport={{once: true}}
            >
                {/* Secure Payment Card */}
                <motion.div
                    className="bg-white justify-center max-w-[250px] lg:max-w-full max-lg:h-auto max-lg:gap-3 max-sm:rounded-[15px] rounded-[25px] h-[92px] flex items-center p-4 sm:p-10 shadow-lg max-md:h-auto max-md:gap-3 max-md:rounded-[15px]"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.1}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div className="flex flex-col lg:flex-row max-lg:justify-center items-center gap-2 sm:gap-5">
                        <div>
                            <Image
                                src={getImageUrl("public/images/home/trust/secure-payment.webp")}
                                alt="Trust"
                                width={100}
                                height={100}
                                className="w-[20px] sm:w-[30px] h-full object-contain"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-[14px] leading-[24px] text-[#6938d3] mb-[1px] max-sm:text-[10px] max-md:leading-[20px] text-center">
                                Secure Payment
                            </h3>
                            <p className="font-medium text-[12px] leading-[18px] text-[#797979] max-sm:text-[8px] max-md:leading-[16px] text-center">
                                SSL + 3D Secure
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Trusted by Travelers Card */}
                <motion.div
                    className="bg-white justify-center max-w-[250px] lg:max-w-full max-lg:h-auto max-lg:gap-3 max-sm:rounded-[15px] rounded-[25px] h-[92px] flex items-center p-4 sm:p-10 shadow-lg max-md:h-auto max-md:gap-3 max-md:rounded-[15px]"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.1}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div className="flex flex-col lg:flex-row max-lg:justify-center items-center gap-2 sm:gap-5">
                        <div>
                            <Image
                                src={getImageUrl("public/images/home/membership/handshake-purple.webp")}
                                alt="Trust"
                                width={100}
                                height={100}
                                className="w-full h-[25px] sm:h-[40px] object-contain"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-[14px] leading-[24px] text-[#6938d3] mb-[1px] max-sm:text-[10px] max-md:leading-[20px] text-center">
                                Trusted by 5,000+ Travelers
                            </h3>
                            <p className="font-medium text-[12px] leading-[18px] text-[#797979] max-sm:text-[8px] max-md:leading-[16px] text-center">
                                Real reviews & stories
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Licensed & Approved Card */}
                <div className="col-span-2 md:col-span-1 max-lg:flex max-lg:justify-center">
                    <motion.div
                        className="bg-white justify-center max-w-[250px] lg:max-w-full max-lg:h-auto max-lg:gap-3 max-sm:rounded-[15px] rounded-[25px] h-[92px] flex items-center p-4 sm:p-10 shadow-lg max-md:h-auto max-md:gap-3 max-md:rounded-[15px]"
                        initial={{opacity: 0, y: 30, scale: 0.9}}
                        whileInView={{opacity: 1, y: 0, scale: 1}}
                        transition={{duration: 0.3, delay: 0.1}}
                        viewport={{once: true}}
                        whileHover={{scale: 1.05, y: -5}}
                    >
                        <div className="flex flex-col lg:flex-row max-lg:justify-center items-center gap-2 sm:gap-5">
                            <div>
                                <Image
                                    src={getImageUrl("public/images/home/trust/licence.webp")}
                                    alt="Trust"
                                    width={100}
                                    height={100}
                                    className="w-[20px] sm:w-[30px] h-full object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-[14px] leading-[24px] text-[#6938d3] mb-[1px] max-sm:text-[10px] max-md:leading-[20px] text-center">
                                    Licensed & Approved
                                </h3>
                                <p className="font-medium text-[12px] leading-[18px] text-[#797979] max-sm:text-[8px] max-md:leading-[16px] text-center">
                                    Tourism Board Certified
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
                className="text-center mb-[33px] max-md:mb-6"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.2}}
                viewport={{once: true}}
            >
                <h2 className="font-plus-jakarta-sans font-medium text-[26px] leading-[33px] text-[#434343] max-md:text-[20px] max-md:leading-[26px]">
                    Why Choose Us
                </h2>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
                className="flex justify-center gap-[25px] mb-[50px] max-md:grid max-md:grid-cols-2 max-md:gap-4 max-md:px-4"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.2}}
                viewport={{once: true}}
            >
                {/* 24/7 Support Expertise Card */}
                <motion.div
                    className="bg-white shadow-lg rounded-[20px] w-[194px] h-[200px] flex flex-col items-center justify-center px-[33px] py-[32px] max-md:w-full max-md:h-auto max-md:px-4 max-md:py-6"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.2}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[37px] h-[37px] mb-[15px] flex items-center justify-center max-md:w-10 max-md:h-10 max-md:mb-4 max-md:bg-[#6938d3]/10 max-md:rounded-full">
                        <Image
                            src={getImageUrl("public/images/explore/support.svg")}
                            alt="Trust"
                            width={100}
                            height={100}
                            className="w-[20px] sm:w-[30px] h-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-[16px] leading-[19px] text-[#6938d3] mb-[2px] max-md:text-[13px] max-md:leading-[16px] max-md:mb-1">
                            24/7 Support
                        </h3>
                        <p className="font-normal text-[11px] leading-[13px] text-[#565656] text-center max-md:text-[9px] max-md:leading-[11px]">
                            Chat, call, or WhatsApp us anytime we're ready to help whenever you need.
                        </p>
                    </div>
                </motion.div>

                {/* Best Price Guarantee Card */}
                <motion.div
                    className="bg-white shadow-lg rounded-[20px] w-[194px] h-[200px] flex flex-col items-center justify-center px-[33px] py-[32px] max-md:w-full max-md:h-auto max-md:px-4 max-md:py-6"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.2}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[41px] h-[41px] mb-[15px] flex items-center justify-center max-md:w-10 max-md:h-10 max-md:mb-4 max-md:bg-[#6938d3]/10 max-md:rounded-full">
                        <Image
                            src={getImageUrl("public/images/explore/best-price.svg")}
                            alt="Trust"
                            width={100}
                            height={100}
                            className="w-[20px] sm:w-[30px] h-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-[16px] leading-[19px] text-[#6938d3] mb-[2px] max-md:text-[13px] max-md:leading-[16px] max-md:mb-1">
                            Best Price Guarantee
                        </h3>
                        <p className="font-normal text-[11px] leading-[13px] text-[#565656] text-center max-md:text-[9px] max-md:leading-[11px]">
                            Get unbeatable rates for every tour, quality experiences at the best value.
                        </p>
                    </div>
                </motion.div>

                {/* Local Expertise Card */}
                <motion.div
                    className="bg-white shadow-lg rounded-[20px] w-[194px] h-[200px] flex flex-col items-center justify-center px-[33px] py-[32px] max-md:w-full max-md:h-auto max-md:px-4 max-md:py-6"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.2}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[32px] h-[32px] mb-[15px] flex items-center justify-center max-md:w-10 max-md:h-10 max-md:mb-4 max-md:bg-[#6938d3]/10 max-md:rounded-full">
                        <Image
                            src={getImageUrl("public/images/explore/local-expertise.svg")}
                            alt="Trust"
                            width={100}
                            height={100}
                            className="w-[20px] sm:w-[30px] h-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-[16px] leading-[19px] text-[#6938d3] mb-[2px] max-md:text-[13px] max-md:leading-[16px] max-md:mb-1">
                            Local Expertise
                        </h3>
                        <p className="font-normal text-[11px] leading-[13px] text-[#565656] text-center max-md:text-[9px] max-md:leading-[11px]">
                            Explore Sri Lanka with locals who know every hidden gem and unique story.
                        </p>
                    </div>
                </motion.div>

                {/* Licensed Guides Card */}
                <motion.div
                    className="bg-white shadow-lg rounded-[20px] w-[194px] h-[200px] flex flex-col items-center justify-center px-[33px] py-[32px] max-md:w-full max-md:h-auto max-md:px-4 max-md:py-6"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.3, delay: 0.2}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[35px] h-[35px] mb-[15px] flex items-center justify-center max-md:w-10 max-md:h-10 max-md:mb-4 max-md:bg-[#6938d3]/10 max-md:rounded-full">
                        <Image
                            src={getImageUrl("public/images/explore/licensed-guide.svg")}
                            alt="Trust"
                            width={100}
                            height={100}
                            className="w-[20px] sm:w-[30px] h-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-[16px] leading-[19px] text-[#6938d3] mb-[2px] max-md:text-[13px] max-md:leading-[16px] max-md:mb-1">
                            Licensed Guides
                        </h3>
                        <p className="font-normal text-[11px] leading-[13px] text-[#565656] text-center max-md:text-[9px] max-md:leading-[11px]">
                            Travel with certified professionals ensuring safety, insight, and unforgettable moments.
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Book Now Button */}
            <motion.div
                className="text-center  flex justify-center items-center"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.3, delay: 0.2}}
                viewport={{once: true}}
            >
                <BookThisPackageSection slug={slug}/>
            </motion.div>
        </motion.div>
    );
};
