import {motion, AnimatePresence} from "framer-motion";
import React, {useState, useEffect} from "react";
import {getImageUrl} from "@/lib/utils";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {IoTimeSharp} from "react-icons/io5";
import {FaStar} from "react-icons/fa";
import {MdOutlineFreeCancellation} from "react-icons/md";
import {BsCircleFill} from "react-icons/bs";
import Image from "next/image";

export interface Promotion {
    id: number,
    active: true,
    code: string,
    name: string,
    description: string,
    type: string,
    value: number,
    promotionInclusion: string[],
    "startDate": string,
    "endDate": string,
    "image": string
}

interface DayTourHeroSectionProps {
    promotion: Promotion | null;
    images: string[]
    title: string
    description: string
    price: number
    durationHours: number
    type: string
    slug: string
}

export const DayTourHeroSection = ({
                                       images,
                                       title,
                                       description,
                                       price,
                                       promotion,
                                       durationHours,
                                       type,
                                   }: DayTourHeroSectionProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);


    const imageUrls = images.map((img) => getImageUrl(img));

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    // Auto-advance slides
    useEffect(() => {
        if (imageUrls.length <= 1 || isDragging) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [imageUrls.length, isDragging]);

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    };

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const priceAfterPromotion = (price: number) => {
        if (!promotion) return price;
        if (promotion.type === "PERCENTAGE") {
            return price - (price * promotion.value) / 100;
        } else {
            return price - promotion.value;
        }
    };

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    const finalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceAfterPromotion(price));

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0
        })
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            <motion.h1
                initial={{opacity: 0, x: -10}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6}}
                className="text-lg md:text-3xl lg:text-5xl font-semibold text-center text-primary-500 line-clamp-2 mb-6 lg:mb-12"
            >
                {title}
            </motion.h1>

            <motion.div
                initial={{opacity: 0, x: 20}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.6}}
                className=" mb-2 md:flex items-start gap-8"
            >
                <div className="relative h-[264px] max-md:h-[163px] overflow-hidden md:w-[50%] rounded-2xl bg-gray-100">
                    {/* Background images for smooth transitions */}
                    <div className="absolute inset-0">
                        <Image
                            src={imageUrls[currentIndex == 0 ? imageUrls.length - 1 : currentIndex - 1]}
                            alt={`${title} background`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Image Slider */}
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "tween", duration: 1, ease: "easeInOut" },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(e, { offset, velocity }) => {
                                setIsDragging(false);
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    goToNext();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    goToPrevious();
                                }
                            }}
                            className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        >
                            <Image
                                src={imageUrls[currentIndex]}
                                alt={`${title} - Image ${currentIndex + 1}`}
                                fill
                                priority={currentIndex === 0}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover pointer-events-none select-none"
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {imageUrls.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="cursor-pointer z-30 absolute top-1/2 left-2 -translate-y-1/2 w-12 h-12 max-md:w-[30px] max-md:h-[30px] bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                            >
                                <IoIosArrowBack className="w-5 h-5 text-secondary-500"/>
                            </button>

                            <button
                                onClick={goToNext}
                                className="cursor-pointer z-30 absolute top-1/2 right-2 -translate-y-1/2 w-12 h-12 max-md:w-[30px] max-md:h-[30px] bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                            >
                                <IoIosArrowForward className="w-5 h-5 text-secondary-500"/>
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {imageUrls.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === currentIndex
                                                ? 'bg-white w-6'
                                                : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="md:w-[50%]">

                    <motion.h2
                        initial={{opacity: 0, x: -10}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6}}
                        className="text-secondary-600 mt-2 text-sm lg:text-lg p-2"
                    >
                        About
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, x: -10}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6}}
                        className="text-neutral-600 text-sm lg:text-base px-2"
                    >
                        {description}
                    </motion.p>


                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                        {/*price & rating*/}
                        <motion.div
                            className="col-span-2 flex items-center justify-between gap-2 px-2"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.8}}
                        >
                            <div className="flex flex-col items-start justify-between gap-4">
                                <div className="flex items-center justify-between gap-4">

                                    {/*rating*/}
                                    <div
                                        className=" flex items-center justify-center gap-2">
                                        <div className="rounded-full flex items-center justify-center">
                                            <FaStar className="text-[#fcc417]  text-xl"/>
                                        </div>
                                        <div className="">
                                            <div className="font-normal text-sm lg:text-lg leading-3 text-[#fcc417]">
                                                {Intl.NumberFormat("en-US", {
                                                    style: "decimal",
                                                    minimumFractionDigits: 1,
                                                    maximumFractionDigits: 1,
                                                }).format(5) || "Loading..."}
                                            </div>
                                        </div>
                                    </div>

                                    {/*duration - visible on and above 375px */}
                                    <motion.div
                                        className="hidden min-[375px]:flex items-center justify-start"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: 0.8}}
                                    >
                                        <div
                                            className="flex items-center gap-2">
                                            <div className="rounded-full flex items-center justify-center">
                                                <IoTimeSharp className="text-[#6a14da] text-sm lg:text-lg"/>
                                            </div>
                                            <div className="">
                                                <div className="font-bold text-xs lg:text-lg leading-3 text-[#6a14da]">
                                                    {durationHours} hrs
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/*tour type - visible on and above 375px*/}
                                    <motion.div
                                        className="hidden min-[375px]:flex items-center justify-center gap-2"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: 0.8}}
                                    >
                                        <div className="  rounded-full flex items-center justify-center">
                                            <BsCircleFill size={8} className="text-secondary-600"/>
                                        </div>
                                        <span className="font-bold text-xs lg:text-lg leading-3 text-secondary-600">
                                 {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() || "Loading..."}</span>
                                    </motion.div>
                                </div>

                                {/*free cancellation - visible on and above 375px*/}
                                <motion.div
                                    className="hidden min-[375px]:flex items-center justify-center gap-2"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.6, delay: 0.8}}
                                >
                                    <div
                                        className="font-bold text-xs lg:text-lg leading-3 text-green-500 flex items-center gap-2">
                                        <MdOutlineFreeCancellation className="w-4 h-4 lg:h-6 lg:w-6"/> <span>Free Cancellation</span>
                                    </div>
                                </motion.div>

                            </div>

                            {/*price*/}
                            <div className="flex items-center justify-start min-[375px]:items-end gap-2">
                                <div
                                    className="flex min-[375px]:flex-col xl:flex-row xl:gap-4 text-center text-lg lg:text-xl xl:text-2xl items-center justify-center min-[375px]:justify-end xl:items-start! gap-4 min-[375px]:gap-1">
                                    <span className="font-bold text-[#fcc417] relative">{formattedPrice || "Loading..."}
                                        {promotion && <span
                                            className="absolute top-[50%] left-0 w-full border-b border-secondary-700"></span>}</span>
                                    {promotion &&
                                        <span className="flex items-end gap-1">
                                            <span
                                                className="font-bold text-secondary-700">{finalPrice || "Loading..."}</span>
                                            <span className="font-semibold text-sm lg:text-lg leading-5 text-black/50 mb-1">PP</span>
                                        </span>
                                    }
                                </div>
                                {!promotion && <div className="flex justify-center items-center">
                                    <p className="font-semibold text-sm lg:text-lg leading-5 text-black/50 min-[375px]:mb-0.5">PP</p>
                                </div>}
                            </div>
                        </motion.div>

                        <div className="col-span-2 flex items-center justify-between gap-2 px-2">
                            {/*free cancellation*/}
                            <motion.div
                                className="flex min-[375px]:hidden items-center justify-center gap-2"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.8}}
                            >
                                <div
                                    className="font-bold text-xs leading-3 text-green-500 flex items-center gap-2">
                                    <MdOutlineFreeCancellation size={15}/> <span>Free Cancellation</span>
                                </div>
                            </motion.div>

                            {/*duration */}
                            <motion.div
                                className="flex min-[375px]:hidden items-center justify-start"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.8}}
                            >
                                <div
                                    className="flex items-center gap-2">
                                    <div className="  rounded-full flex items-center justify-center">
                                        <IoTimeSharp className="text-[#6a14da] text-sm"/>
                                    </div>
                                    <div className="">
                                        <div className="font-bold text-xs leading-3 text-[#6a14da]">
                                            {durationHours} hrs
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/*tour type*/}
                            <motion.div
                                className="flex min-[375px]:hidden items-center justify-center gap-2"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.8}}
                            >
                                <div className="  rounded-full flex items-center justify-center">
                                    <BsCircleFill size={8} className="text-secondary-600"/>
                                </div>
                                <span
                                    className="font-bold text-xs leading-3 text-secondary-600">
                                 {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() || "Loading..."}
                            </span>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
}