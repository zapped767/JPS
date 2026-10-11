import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Loader2, Plus, Star} from "lucide-react";
import {cn} from "@/lib/utils";
import {FaRegClock} from "react-icons/fa";
import {RxCross1} from "react-icons/rx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {MdOutlineFreeCancellation} from "react-icons/md";
import Image from "next/image";
import {useRouter} from "next/router";

interface DayTourCardProps {
    id: number;
    images: string[];
    title: string;
    description: string;
    adultPrice: number;
    durationHours: string;
    rating?: number;
    tourType: string;
    className?: string;
    slug?: string;
    promotion?: any;
}

export const DayTourCard: React.FC<DayTourCardProps & { index: number }> = ({
                                                                                images,
                                                                                title,
                                                                                description,
                                                                                adultPrice,
                                                                                durationHours,
                                                                                tourType,
                                                                                className,
                                                                                slug,
                                                                                promotion
                                                                            }) => {

    const router = useRouter();

    const [isNavigating, setIsNavigating] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    console.log("images", images)

    // Auto-advance slides
    useEffect(() => {
        if (images.length <= 1 || isDragging) return;

        console.log("images", images)

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [images.length, isDragging]);

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const handleExploreClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsNavigating(true);
        sessionStorage.setItem("prev", "/");
        try {
            await router.push(`/day-tour/${slug}`);
        } catch (error) {
            setIsNavigating(false);
        }
    };

    const priceAfterPromotion = (price: number) => {
        if (!promotion) return price;

        if (promotion.type === "PERCENTAGE") {
            return price - (price * promotion.value) / 100;
        } else {
            return price - promotion.value;
        }
    }

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(adultPrice);

    const finalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceAfterPromotion(adultPrice));

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
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            whileHover="hover"
            transition={{duration: 0.6, ease: "easeOut"}}
            className={cn(
                "bg-white rounded-3xl max-sm:w-[200px] max-sm:min-w-[200px] max-[960px]:w-[290px] min-w-[280px] shadow-md sm:shadow-lg min-h-full transition-all duration-500 ease-out overflow-hidden cursor-pointer group",
                className
            )}
        >
            {/* Image Container */}
            <div className="relative h-[264px] max-md:h-[163px] overflow-hidden rounded-2xl bg-gray-100">
                {/* Background images for smooth transitions */}
                <div className="absolute inset-0">
                    <Image
                        src={images[currentIndex == 0 ? images.length - 1 : currentIndex - 1]}
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
                            x: {type: "tween", duration: 1, ease: "easeInOut"},
                            opacity: {duration: 0.2}
                        }}
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={1}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(e, {offset, velocity}) => {
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
                            src={images[currentIndex]}
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
                {images.length > 1 && (
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
                            {images.map((_, index) => (
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


                {promotion &&
                    <div className="absolute top-0 right-0 flex flex-col gap-2 items-end z-10">
                        <div
                            className=" bg-[#eb00a5] backdrop-blur-sm text-white ps-5 pe-3 py-1 rounded-bl-xl flex items-center gap-2 max-md:ps-3 max-md:pe-2 max-md:py-1.5">
                            <span
                                className="text-[14px] font-bold max-md:text-[11px]">{promotion ? promotion.type === "PERCENTAGE" ? `${promotion.value}%  OFF` : `$${promotion.value} OFF` : ""}</span>
                        </div>
                    </div>}
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 min-h-full max-md:p-2 max-md:space-y-2">
                {/* Title */}
                <h3 className="text-[20px] font-semibold text-neutral-900 line-clamp-2 max-md:text-[16px] w-full">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 max-md:text-[10px] w-full">
                    {description}
                </p>

                <div>
                    <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-md">
                        <li className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full text-[14px] max-md:text-[11px]">
                            {tourType.charAt(0).toUpperCase() + tourType.slice(1).toLowerCase()}</li>
                        <li className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full text-[14px] max-md:text-[11px]">
                            <FaRegClock
                                className="w-4 h-4 max-md:w-3 max-md:h-3"/>{durationHours} hrs
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-start pt-2 gap-2 md:gap-4">
                    <div
                        className="bg-green-500/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-1">
                        <MdOutlineFreeCancellation className="text-green-500"/>
                        <span className="text-[14px] max-md:text-[11px] text-green-500">Free Cancellation</span>
                    </div>
                    <div
                        className="items-center gap-2 md:gap-2 flex bg-accent-orange/20 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-1.5 rounded-full">
                        <Star className="w-4 h-4 md:w-5 md:h-5 fill-accent-orange text-accent-orange"/>
                        <span className="text-[14px] md:text-[16px] text-secondary-700">5</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between pt-2 mt-auto">
                    {/* Price */}
                    <div className="grid grid-cols-[repeat(2,auto)] gap-1 items-end">
                        <div className="flex flex-col"><span
                            className={`min-[880px]:text-2xl text-xl font-bold text-primary-500 max-md:text-sm relative ${promotion ? "mt-0" : "mt-5 md:mt-14"}`}>{formattedPrice}
                            {promotion &&
                                <div className="absolute top-[50%] left-0 w-full border-b-2 border-primary-500"></div>
                            }
                        </span>
                            {promotion && <span
                                className="min-[880px]:text-2xl text-xl font-bold text-secondary-700 max-md:text-sm">{finalPrice}</span>}
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500"><RxCross1/></span>
                            <span
                                className={`min-[880px]:text-2xl text-xl font-bold ${promotion ? "text-secondary-700" : "text-primary-500"} max-md:text-sm`}>PP</span>
                        </div>

                    </div>

                    {/* Slug Button */}
                    <motion.button
                        onClick={handleExploreClick}
                        disabled={isNavigating}
                        className={cn(
                            "bg-[#F2E7FF] text-[#872BFF] rounded-xl px-3 max-[830px]:px-2 py-2.5 max-[830px]:py-1.5 max-md:px-1 max-md:py-1.5 flex items-center gap-1 text-[12px] font-semibold max-md:text-[10px] cursor-pointer transition-all duration-400 ease-out transform hover:scale-105",
                            isNavigating && "opacity-70 cursor-not-allowed"
                        )}
                        whileHover={isNavigating ? {} : "hover"}
                        initial="initial"
                        variants={{
                            initial: {},
                            hover: {},
                        }}
                    >
                        {isNavigating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin"/>
                                Loading...
                            </>
                        ) : (
                            <>
                                <motion.div
                                    variants={{
                                        initial: {
                                            rotate: 0,
                                            scale: 1,
                                        },
                                        hover: {
                                            rotate: 90,
                                            scale: 1.1,
                                            transition: {
                                                duration: 0.3,
                                                ease: "easeOut",
                                            },
                                        },
                                    }}
                                >
                                    <Plus className="w-4 h-4 fill-[#872BFF]"/>
                                </motion.div>
                                Explore
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
