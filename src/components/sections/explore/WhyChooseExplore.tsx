import React from "react";
import {motion} from "framer-motion";

export const WhyChooseExplore = () => {
    return (
        <motion.div
            className="bg-[#f8f8f8] rounded-[79px] mx-[100px] py-[37px] px-[42px] mt-[200px] relative"
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            viewport={{once: true}}
        >
            {/* Section Title */}
            <motion.div
                className="text-center mb-[63px]"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.2}}
                viewport={{once: true}}
            >
                <h2 className="font-plus-jakarta-sans font-medium text-[26px] leading-[33px] text-[#434343]">
                    Why Choose Us
                </h2>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
                className="flex justify-center gap-[29px] mb-[32px]"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.4}}
                viewport={{once: true}}
            >
                {/* 24/7 Support Card */}
                <motion.div
                    className="bg-white border border-[#c9b1ff] rounded-[20px] w-[194px] h-[200px] p-[33px] text-center"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.5, delay: 0.6}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[37px] h-[37px] bg-[#6938d3] rounded-full mx-auto mb-[25px] flex items-center justify-center">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2"/>
                            <path
                                d="M10 6V10L13 13"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="font-bold text-[16px] leading-[20px] text-[#6938d3] mb-[13px]">
                        24/7 Support
                    </h3>
                    <p className="font-normal text-[11px] leading-[13px] text-center text-[#565656]">
                        Chat, call, or WhatsApp anytime during your trip—real humans on
                        standby.
                    </p>
                </motion.div>

                {/* Best Price Guarantee Card */}
                <motion.div
                    className="bg-white border border-[#c9b1ff] rounded-[20px] w-[194px] h-[200px] p-[33px] text-center"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.5, delay: 0.8}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[41px] h-[41px] bg-[#6938d3] rounded-full mx-auto mb-[23px] flex items-center justify-center">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L13.09 8.26L19 9L13 14L15 21L12 18.5L9 21L11 14L5 9L10.91 8.26L12 2Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <h3 className="font-bold text-[16px] leading-[20px] text-[#6938d3] mb-[13px]">
                        Best Price Guarantee
                    </h3>
                    <p className="font-normal text-[11px] leading-[13px] text-center text-[#565656]">
                        Chat, call, or WhatsApp anytime during your trip—real humans on
                        standby.
                    </p>
                </motion.div>

                {/* Local Expertise Card */}
                <motion.div
                    className="bg-white border border-[#c9b1ff] rounded-[20px] w-[194px] h-[200px] p-[33px] text-center"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.5, delay: 1.0}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[32px] h-[32px] bg-[#6938d3] rounded-full mx-auto mb-[28px] flex items-center justify-center">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2"/>
                            <path
                                d="M14 8L8 14L6 12"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="font-bold text-[16px] leading-[20px] text-[#6938d3] mb-[13px]">
                        Local Expertise
                    </h3>
                    <p className="font-normal text-[11px] leading-[13px] text-center text-[#565656]">
                        Chat, call, or WhatsApp anytime during your trip—real humans on
                        standby.
                    </p>
                </motion.div>

                {/* Licensed Guides Card */}
                <motion.div
                    className="bg-white border border-[#c9b1ff] rounded-[20px] w-[194px] h-[200px] p-[33px] text-center"
                    initial={{opacity: 0, y: 30, scale: 0.9}}
                    whileInView={{opacity: 1, y: 0, scale: 1}}
                    transition={{duration: 0.5, delay: 1.2}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, y: -5}}
                >
                    <div
                        className="w-[35px] h-[35px] bg-[#6938d3] rounded-full mx-auto mb-[25px] flex items-center justify-center">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <h3 className="font-bold text-[16px] leading-[20px] text-[#6938d3] mb-[13px]">
                        Licensed Guides
                    </h3>
                    <p className="font-normal text-[11px] leading-[13px] text-center text-[#565656]">
                        Chat, call, or WhatsApp anytime during your trip—real humans on
                        standby.
                    </p>
                </motion.div>
            </motion.div>

            {/* Book Now Button */}
            <motion.div
                className="text-center"
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 1.4}}
                viewport={{once: true}}
            >
                <motion.button
                    className="bg-[#872bff] rounded-[50px] px-[22px] py-[14px] flex items-center gap-[12px] mx-auto"
                    whileHover={{scale: 1.05, y: -2}}
                    whileTap={{scale: 0.95}}
                >
          <span className="font-semibold text-[10px] leading-[12px] text-white">
            BOOK NOW
          </span>
                    <div
                        className="w-[25px] h-[25px] bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.25 10.5H15.75M15.75 10.5L10.5 5.25M15.75 10.5L10.5 15.75"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </motion.button>
            </motion.div>

            {/* Down Arrow Button */}
            <motion.div
                className="absolute bottom-[42px] right-[107px]"
                initial={{opacity: 0, scale: 0}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, delay: 1.6}}
                viewport={{once: true}}
            >
                <motion.div
                    className="w-[49px] h-[62px] bg-[#eeeeee] rounded-[25px] flex items-center justify-center"
                    whileHover={{scale: 1.1, y: -2}}
                    whileTap={{scale: 0.9}}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 11.25L15 18.75L22.5 11.25"
                            stroke="#6B7280"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
