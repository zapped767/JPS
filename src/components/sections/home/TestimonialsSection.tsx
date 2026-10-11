import React, {useState} from "react";
import {Star} from "lucide-react";
import Image from "next/image";
import {motion} from "framer-motion";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {getImageUrl} from "@/lib/utils";

const testimonials = [
    {
        name: "Shehani Rash",
        role: "Travel Enthusiast",
        avatar: "public/images/home/testimonial/shehani.webp",
        rating: 3,
        review:
            "Fantastic experience with ZephyraTravels! Great support and memorable travel moments throughout.",
    },
    {
        name: "Irfan Rahmat",
        role: "Travel Enthusiast",
        avatar: "public/images/home/testimonial/irfan.webp",
        rating: 5,
        review:
            "ZephyraTravels made our vacation seamless and stress-free! Excellent service from start to finish.",
    },
    {
        name: "Richard Hale",
        role: "Travel Enthusiast",
        avatar: "public/images/home/testimonial/richard.webp",
        rating: 4,
        review:
            "Wonderful trip planning by ZephyraTravels! Everything was organized perfectly and hassle free.",
    },
    {
        name: "Sarah Johnson",
        role: "Adventure Seeker",
        avatar: "public/images/home/testimonial/sarah.webp",
        rating: 5,
        review:
            "Amazing experience with ZephyraTravels! The team was professional and made our trip unforgettable.",
    },
    {
        name: "Michael Chen",
        role: "Travel Blogger",
        avatar: "public/images/home/testimonial/michael.webp",
        rating: 4,
        review:
            "Great service and attention to detail. Highly recommend for anyone planning a trip to Sri Lanka.",
    },
];

export const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="pt-12 pb-8 sm:pb-12 md:pb-16 lg:pb-20 relative overflow-x-hidden !overflow-y-visible">
            {/* Background elements */}
            <div className="inset-0">
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                    className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-4 md:w-64 md:h-64 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{opacity: 0, scale: 0.6, x: 100}}
                    whileInView={{opacity: 1, scale: 1, x: 0}}
                    transition={{duration: 1.2, delay: 0.3}}
                    className="absolute top-1/2 -translate-y-1/2 -right-20 sm:-right-32 md:-right-40 w-[300px] h-[250px] sm:w-[450px] sm:h-[250px] md:w-[600px] md:h-[250px] bg-gradient-to-l from-purple-500/25 via-purple-600/20 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    initial={{opacity: 0, scale: 0.4}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 1.5, delay: 0.6}}
                    className="absolute top-1/4 right-5 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-purple-400/15 rounded-full blur-2xl"
                />
            </div>
            <div className="max-w-6xl mx-auto px-8 sm:px-10 md:px-4 text-center">
                <p
                    className="text-[24px] font-bold mb-3 max-md:text-[14px] text-[#C4008D] cursor-default text-center "
                    style={{letterSpacing: "0.28em"}}
                >
                    TESTIMONIALS
                </p>
                <motion.h2
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="text-4xl lg:text-[42px] max-md:text-[20px] font-black font-dm-sans text-neutral-900 cursor-default text-center "
                >
                    They Trusted Us, You Can too
                </motion.h2>

                <div className="relative w-full h-[250px] mt-12 overflow-visible !overflow-y-visible">
                    <Swiper
                        modules={[Navigation]}
                        centeredSlides={true}
                        loop={true}
                        spaceBetween={30}
                        slidesPerView={3}
                        grabCursor={true}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        navigation={{
                            prevEl: ".prev-arrow",
                            nextEl: ".next-arrow",
                        }}
                        breakpoints={{
                            0: {slidesPerView: 1, spaceBetween: 20},
                            640: {slidesPerView: 1.3, spaceBetween: 25},
                            768: {slidesPerView: 1.5, spaceBetween: 30},
                            1024: {slidesPerView: 2, spaceBetween: 30},
                            1280: {slidesPerView: 3, spaceBetween: 30},
                        }}
                        className="w-full h-full !overflow-x-hidden !overflow-y-visible"
                    >
                        {testimonials.map((testimonial, index) => {
                            const isCenter = index === activeIndex;
                            return (
                                <SwiperSlide key={index} className="px-3 !overflow-visible">
                                    <div
                                        className={`shadow-lg border border-gray-100 p-5 rounded-2xl bg-white cursor-grab transform transition-transform duration-300 overflow-visible ${
                                            isCenter ? "scale-120 z-10" : "scale-100"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                                <Image
                                                    src={getImageUrl(testimonial.avatar)}
                                                    alt={testimonial.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg truncate text-neutral-900">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="text-primary-600 text-sm truncate">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-neutral-700 text-sm line-clamp-3">
                                            {testimonial.review}
                                        </p>
                                        <div className="flex items-center justify-center gap-1 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < testimonial.rating
                                                            ? "fill-yellow-500 text-yellow-500"
                                                            : "text-gray-300 fill-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Previous Slide Button */}
                    <button
                        className="prev-arrow absolute -left-4 sm:-left-5 md:-left-6 lg:-left-9 bottom-28 -translate-y-1/2
             text-purple-500 hover:text-purple-600
             z-20 cursor-pointer p-2 sm:p-3
             transition-all duration-300"
                        aria-label="Previous slide" // <- accessibility fix
                    >
                        <IoIosArrowBack className="w-5 h-5 sm:w-6 sm:h-6"/>
                    </button>

                    {/* Next Slide Button */}
                    <button
                        className="next-arrow absolute -right-4 sm:-right-5 md:-right-6 lg:-right-9 bottom-28 -translate-y-1/2
             text-purple-500 hover:text-purple-600
             z-20 cursor-pointer p-2 sm:p-3
             transition-all duration-300"
                        aria-label="Next slide" // <- accessibility fix
                    >
                        <IoIosArrowForward className="w-5 h-5 sm:w-6 sm:h-6"/>
                    </button>

                    {/* 3 Dot Indicators */}
                    <div className="flex justify-center items-center mb-10 space-x-2">
                        {Array.from({length: 3}).map((_, i) => {
                            const total = testimonials.length;
                            const visibleIndexes = [
                                (activeIndex - 1 + total) % total,
                                activeIndex,
                                (activeIndex + 1) % total,
                            ];
                            const isActive = visibleIndexes[i] === activeIndex;

                            return (
                                <span
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 transform
          ${isActive ? "bg-purple-500 scale-150" : "bg-gray-300 scale-100"}
        `}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
