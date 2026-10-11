import Image from "next/image";
import React, {useState} from "react";
import {FaCheck, FaStar} from "react-icons/fa";
import {IoIosArrowForward} from "react-icons/io";
import {IoTimeSharp} from "react-icons/io5";
import {motion} from "framer-motion";
import BookNowButton from "@/components/ui/BookNowButton";
import {getImageUrl} from "@/lib/utils";
import {FaXmark} from "react-icons/fa6";

export const TourOverview = ({packageData}: { packageData: any }) => {

    const [activeTab, setActiveTab] = useState<string>("inclusions");

    if (!packageData) return null;

    let tags = packageData?.badgeTags;

    const promtion = packageData?.promotion;

    const tagSection = () => {
        if (!tags) return null;
        tags = tags.slice(0, 4);
        const colors = [
            "bg-[#ff584a]",
            "bg-[#872bff]",
            "bg-[#009d05]",
            "bg-[#fcc417]",
        ];
        let bgcolor = "";
        return (
            <motion.div
                className="flex flex-wrap gap-[14px] md:max-w-[280px] pt-4"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 1.4}}
            >
                {tags.map((item: any, index: number) => {
                    bgcolor = colors[index % colors.length];
                    return (
                        <div
                            key={`tag-${index}`}
                            className="border border-[#e3e3e3] rounded-[25px] px-[18px] py-[10px] max-[600px]:px-[12px] max-[600px]:py-[8px] flex items-center gap-[10px]"
                        >
                            <div className={"w-2 h-2 rounded-full " + bgcolor}></div>
                            <span
                                className="font-plus-jakarta-sans font-semibold text-[10px] max-[600px]:text-[8px] leading-[13px] text-black">
                {item}
              </span>
                        </div>
                    );
                })}
            </motion.div>
        );
    };

    const promotionInclusions = promtion?.promotionInclusion;

    const promotionInclusionsSection = () => {
        if (!promotionInclusions) return null;
        return (
            <div className="grid grid-cols-2 gap-2">
                {promotionInclusions.map((item: any, index: number) => {
                    return (
                        <div
                            key={`inclusion-${index}`}
                            className="flex items-center gap-[6px]"
                        >
                            <div
                                className="min-w-[12px] h-[12px] bg-[#B795FF] rounded-full flex justify-center items-center">
                                <div
                                    className="w-[4.5px] h-[4.5px] bg-[#6938D3] rounded-full   flex justify-center items-center">
                                    <div className="w-[1.55px] h-[1.55px] bg-white rounded-full"></div>
                                </div>
                            </div>
                            <span className="font-plus-jakarta-sans font-medium text-[11px] leading-[12px] text-black">
                              {item}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const priceAfterPromotion = (price: number) => {
        if (!packageData.promotion) return price;

        if (promtion.type === "PERCENTAGE") {
            return price - (price * promtion.value) / 100;
        } else {
            return price - promtion.value;
        }
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(packageData.adultTotalPrice);

    const finalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceAfterPromotion(packageData.adultTotalPrice));

    return (
        <motion.div
            className="relative text-white"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
            {/* Main Tour Card */}
            <motion.div
                className="relative w-full rounded-[25px] p-5 flex items-start justify-evenly max-xl:gap-y-5 max-xl:gap-x-10 max-lg:justify-center max-md:flex-col max-md:items-center max-md:overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(235,0,165,0.01) 20%, rgba(235,0,165,0.06) 50%, rgba(235,0,165,0.3) 100%)",
                }}
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                {/* Left Content */}
                <motion.div
                    className="flex flex-col h-full w-2/5 max-lg:w-1/2 justify-between xl:ps-8 pt-4 max-md:w-full"
                    initial={{opacity: 0, x: -30}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6, delay: 0.4}}
                >
                    {/* Title Section */}
                    <div className="mb-0">
                        <motion.h1
                            className="font-plus-jakarta-sans font-bold text-[26px] leading-[33px] text-[#eb00a5] mb-[13px] max-xl:w-[400px] max-sm:w-full max-lg:w-full max-sm:text-[22px]"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.6}}
                        >
                            {packageData.name || "Loading..."}
                        </motion.h1>

                        {/* Price Section */}
                        <motion.div
                            className="flex items-center gap-4 mb-[7px]"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.8}}
                        >
                          <span className="font-plus-jakarta-sans font-normal text-[16px] leading-[20px] text-black">
                            Price P.P
                          </span>
                            <IoIosArrowForward className="text-[#937EBE] text-xl"/>

                            <div className="flex max-[425px]:flex-col items-center min-[425px]:gap-4">
                                 <span
                                     className="font-bold text-[24px] leading-[36px] text-center text-[#fcc417] relative">
                             {formattedPrice || "Loading..."}

                                     {packageData.promotion &&
                                         <span className="absolute top-[50%] left-0 w-full h-0.5 bg-[#fcc417]"></span>
                                     }
                            </span>
                                {packageData.promotion &&
                                    <span
                                        className="font-bold text-[24px] leading-[36px] text-center text-secondary-700">
                                 {finalPrice || "Loading..."}
                                </span>
                                }
                            </div>
                        </motion.div>
                    </div>

                    {/* Description */}
                    <motion.p
                        className="font-plus-jakarta-sans font-medium text-[13px] leading-[15px] tracking-[0.4px] text-[#585858] mb-[14px] max-w-[388px]"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 1.0}}
                    >
                        {packageData.description || "Loading..."}
                    </motion.p>

                    <div className="bg-[#F9F9F9] rounded-[26px] p-4 h-full md:max-w-[440px]">
                        <div className="flex justify-center">
                            <div className="relative flex items-center bg-[#F5F0FF] rounded-[50px] p-1">
                                {/* Animated background indicator */}
                                <motion.div
                                    className="absolute bg-primary-500 rounded-[50px] h-full"
                                    initial={false}
                                    animate={{
                                        x: activeTab === "inclusions" ? 0 : "100%",
                                        width: activeTab === "inclusions" ? "50%" : "50%",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />

                                {/* Tab buttons */}
                                <motion.div
                                    onClick={() => setActiveTab("inclusions")}
                                    className="relative z-30 rounded-[50px] px-7 max-[375px]:px-5 py-1 text-center justify-center items-center flex cursor-pointer   "
                                >
                                    <motion.span
                                        className="font-plus-jakarta-sans font-medium text-sm max-[375px]:text-xs"
                                        animate={{
                                            color: activeTab === "inclusions" ? "#ffffff" : "#872BFF",
                                        }}
                                        transition={{duration: 0.2}}
                                    >
                                        Inclusions
                                    </motion.span>
                                </motion.div>

                                <motion.div
                                    onClick={() => setActiveTab("exclusions")}
                                    className="relative z-10 rounded-[50px] px-7 max-[375px]:px-5 py-1 text-center justify-center items-center flex cursor-pointer   "
                                >
                                    <motion.span
                                        className="font-plus-jakarta-sans font-medium text-sm max-[375px]:text-xs"
                                        animate={{
                                            color: activeTab === "exclusions" ? "#ffffff" : "#872BFF",
                                        }}
                                        transition={{duration: 0.2}}
                                    >
                                        Exclusions
                                    </motion.span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col items-start">
                            <div className="grid grid-cols-1 min-[426px]:grid-cols-2 gap-4 ms-4">
                                {/* Inclusions */}
                                {activeTab === "inclusions" &&
                                    packageData?.inclusion?.length > 0 && (
                                        <>
                                            {packageData.inclusion.map(
                                                (item: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <FaCheck className="text-[#872bff] text-[10px]"/>
                                                        <span
                                                            className="font-plus-jakarta-sans font-medium text-xs text-[#3d3d3d]">
                                                          {item}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}

                                {/* Exclusions */}
                                {activeTab === "exclusions" &&
                                    packageData?.exclusion?.length > 0 && (
                                        <>
                                            {packageData.exclusion.map(
                                                (item: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-3"
                                                    >
                                                        <FaXmark className="text-[#872bff] text-[11px]"/>
                                                        <span
                                                            className="font-plus-jakarta-sans font-medium text-xs text-[#3d3d3d]">
                                                          {item}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col min-[470px]:items-end justify-between max-md:w-full max-lg:w-1/2 h-full"
                    initial={{opacity: 0, x: 30}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6, delay: 0.6}}
                >
                    <div className="max-md:flex max-[600px]:flex-col gap-[20px]">
                        {/* Duration and Rating Cards */}
                        <motion.div
                            className="flex gap-[20px] md:mb-5 max-[600px]:max-h-[100px] overflow-y-hidden"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 1.2}}
                        >
                            {/* Duration Card */}
                            <div
                                className="bg-[#f6f6f6] rounded-[12px] px-[12px] py-[12px] min-[720px]:min-w-[158px] flex items-center gap-[8px]">
                                <div className="  rounded-full flex items-center justify-center">
                                    <IoTimeSharp className="text-[#6a14da] text-4xl max-[336px]:text-2xl"/>
                                </div>
                                <div className="">
                                    <div className="font-medium text-[14px] leading-[16px] text-[#3c3c3c]">
                                        Duration
                                    </div>
                                    <div className="font-normal text-[10px] leading-[12px] text-[#6a14da]">
                                        {packageData.durationDays +
                                            " Days" +
                                            " & " +
                                            packageData.durationNights +
                                            " Nights" || "Loading..."}
                                    </div>
                                </div>
                            </div>

                            {/* Rating Card */}
                            <div
                                className="bg-[#f6f6f6] rounded-[12px] px-[12px]  min-[720px]:min-w-[138px] flex items-center gap-[8px]">
                                <div className="rounded-full flex items-center justify-center">
                                    <FaStar className="text-[#fcc417]  text-4xl max-[336px]:text-2xl"/>
                                </div>
                                <div className="">
                                    <div className="font-medium text-[14px] leading-[16px] text-[#3c3c3c]">
                                        Rating
                                    </div>
                                    <div className="font-normal text-[10px] leading-[12px] text-[#fcc417]">
                                        {Intl.NumberFormat("en-US", {
                                            style: "decimal",
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1,
                                        }).format(packageData.rating) || "Loading..."}
                                    </div>
                                </div>
                            </div>
                            <div className="block min-[600px]:hidden max-[470px]:hidden">
                                {tagSection()}
                            </div>
                        </motion.div>
                        <div className="max-[600px]:flex gap-2 items-end">
                            {promtion && (
                                <motion.div
                                    className="max-[375px]:min-w-[200px] min-w-[200px] max-w-[350px] max-md:max-w-[310px] bg-white rounded-[25px] p-5  shadow-lg relative overflow-hidden max-md:w-full max-md:p-4"
                                    whileHover={{scale: 1.02, y: -5}}
                                    transition={{duration: 0.3}}
                                >
                                    {/* Discount Badge */}
                                    <div
                                        className="h-[28px] absolute w-[132px] -right-10 top-11 rotate-45 bg-[#eb00a5] flex items-center justify-center text-white font-plus-jakarta-sans font-bold text-[10px] leading-[13px] -ml-[40px] -mt-[27px]">
                                        {"OFF " +
                                            promtion.value +
                                            (promtion.type === "PERCENTAGE" ? "%" : "$") || "Loading..."}
                                    </div>

                                    {/* Offer Content */}
                                    <div className="max-w-[90%]">
                                        <h3 className="font-plus-jakarta-sans !font-extrabold text-[14px] leading-[18px] text-[#6938d3] mb-2">
                                            {promtion.name || "Loading..."}
                                        </h3>
                                        <p className="font-plus-jakarta-sans font-semibold text-[12px] text-[#4a4a4a] mb-[15px]">
                                            {promtion.description || "Loading..."}
                                        </p>

                                        {/* Features */}
                                        {promotionInclusionsSection()}
                                    </div>
                                </motion.div>
                            )}
                            <motion.div className="flex justify-end mt-5 min-[600px]:hidden max-[470px]:hidden">
                                <BookNowButton slug={packageData.slug as string}/>
                            </motion.div>
                        </div>
                    </div>
                    {/* Tags Section */}
                    <div
                        className="hidden min-[600px]:block max-[470px]:block max-[470px]:max-h-[50px] max-[470px]:overflow-hidden">
                        {tagSection()}
                    </div>

                    <motion.div className="max-[470px]:flex justify-end mt-5 hidden min-[600px]:block">
                        <BookNowButton slug={packageData.slug as string}/>
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="rounded-[22px] w-[380px] h-[374px] hidden min-[1025px]:block ml-4"
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.6, delay: 0.1}}
                    whileHover={{scale: 1.05}}
                >
                    <div className="w-full h-full bg-gray-300 rounded-[22px] flex items-center justify-center">
                        <Image
                            src={getImageUrl(packageData?.image)}
                            alt="Tour Image"
                            width="500"
                            height="500"
                            className="w-full h-full object-cover rounded-[22px]"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Book Now Button */}
        </motion.div>
    );
};
