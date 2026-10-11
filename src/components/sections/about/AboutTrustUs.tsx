import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import Image from "next/image";
import {FaFacebook, FaGoogle, FaStar, FaTripadvisor} from "react-icons/fa";
import Link from "next/link";
import {getImageUrl} from "@/lib/utils";
import CountUp from "react-countup";


export const AboutTrustUs = () => {

    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect(); // animate only once
                    }
                });
            },
            {threshold: 0.3}
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0; // start at first card
        }
    }, []);


    const scrollRef = useRef<HTMLDivElement | null>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        scrollRef.current?.classList.add("cursor-grabbing");
        startX = e.pageX - scrollRef.current!.offsetLeft;
        scrollLeft = scrollRef.current!.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current!.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        scrollRef.current!.scrollLeft = scrollLeft - walk;
    };


    return (
        <>
            <section
                className="relative md:py-2 px-4 md:px-10 lg:px-[100px] text-center   ">

                {/*right*/}
                {/* Background Elements - placed behind content */}
                <div className="absolute inset-0 pointer-events-none z-0 ">
                    {/* Main Glow (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1}}
                        className="absolute top-[35%] sm:top-[50%] -translate-y-1/2 -right-150
            w-40 h-40 sm:w-64 sm:h-64 md:w-90 md:h-90
            bg-[#872BFF]/20 rounded-full blur-[120px]"
                    />

                    {/* Purple Blurred Ellipse (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.6, x: 100}}
                        whileInView={{opacity: 1, scale: 1, x: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.2, delay: 0.3}}
                        className="absolute top-[35%] sm:top-[50%]  -translate-y-1/2 -right-20 sm:-right-32 md:-right-150
            w-[400px] h-[320px] sm:w-[550px] sm:h-[400px] md:w-[800px] md:h-[650px]
            bg-gradient-to-l from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
            rounded-full blur-[140px]"
                    />

                    {/* Smaller Glow for Depth (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.4}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.5, delay: 0.6}}
                        className="absolute top-[35%] sm:top-[50%] -translate-y-1/2 -right-150
            w-48 h-48 sm:w-72 sm:h-72 md:w-100 md:h-100
            bg-[#872BFF]/25 rounded-full blur-[100px]"
                    />
                </div>


                {/*left*/}
                {/* Background Elements - placed behind content */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                    {/* Main Glow (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1}}
                        className="absolute top-[63%] sm:top-[15%] -translate-y-1/2 -left-180
            w-40 h-40 sm:w-64 sm:h-64 md:w-90 md:h-90
            bg-[#872BFF]/20 rounded-full blur-[120px]"
                    />

                    {/* Purple Blurred Ellipse (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.6, x: 100}}
                        whileInView={{opacity: 1, scale: 1, x: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.2, delay: 0.3}}
                        className="absolute top-[63%] sm:top-[15%] -translate-y-1/2 -right-20 sm:-right-32 md:-left-180
            w-[400px] h-[320px] sm:w-[550px] sm:h-[400px] md:w-[800px] md:h-[650px]
            bg-gradient-to-l from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
            rounded-full blur-[140px]"
                    />

                    {/* Smaller Glow for Depth (Right) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.4}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.5, delay: 0.6}}
                        className="absolute top-[63%] sm:top-[15%] -translate-y-1/2 -left-180
            w-48 h-48 sm:w-72 sm:h-72 md:w-100 md:h-100
            bg-[#872BFF]/25 rounded-full blur-[100px]"
                    />
                </div>

                {/* Heading */}
                <motion.h2 initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}
                           className="font-plus-jakarta-sans font-extrabold text-[#303030] text-[52px] max-md:text-[36px] cursor-default text-center"> Trust <span
                    className="text-[#6938d3]"> & </span> Recognition
                </motion.h2>


                {/* Subtitle */}
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8, delay: 0.2}}
                          className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto cursor-default"> Your
                    peace
                    of mind is our priority&nbsp;&nbsp;we maintain the highest standards of professionalism and security
                </motion.p>

                {/* Business & SLTDA Cards - Fluid layout with flexible widths */}
                <div
                    className="flex flex-col md:flex-row gap-8 md:gap-10 xl:gap-15 mt-14 mx-auto max-w-5xl px-2 sm:px-0"> {[{
                    src: getImageUrl("public/images/about/trustUs/verify-mark.webp"),
                    alt: "verify",
                    width: 30,
                    height: 30,
                    title: "Legal Business Entity",
                    desc: "Registered under the Companies Act, Sri Lanka",
                    details: "Business Registration Number",
                    valueName: "BR No:",
                    value: "PV 00339254",
                }, {
                    src: getImageUrl("public/images/about/trustUs/person-card.webp"),
                    alt: "card",
                    width: 35,
                    height: 35,
                    title: "SLTDA Authorized",
                    desc: "Sri Lanka Tourism Development Authority",
                    details: "Tourism Registration",
                    valueName: "SLTDA Reg:",
                    value: "TR/TRI/TO/2024/049",
                },].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{
                            y: -8,
                            scale: 1.05,
                            transition: {duration: 0.3}
                        }}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        viewport={{once: true}}

                        className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-6 bg-[#fafafa] text-left w-full max-w-[500px] sm:mx-auto md:mx-0 md:flex-1">

                        <div className="flex items-center gap-4 lg:gap-6 xl:gap-4 mb-4">
                            {/* Circle with conditional size */}
                            <div
                                className={`flex items-center justify-center bg-[#DECFFF] rounded-full 
                                ${item.alt === "card" ?
                                    `max-[2560px]:w-20 max-[2560px]:h-20
                                     max-[1440px]:w-20 max-[1440px]:h-20
                                     max-[1280px]:w-20 max-[1280px]:h-18
                                     max-[1180px]:w-25 max-[1180px]:h-18
                                     max-[1024px]:w-27 max-[1024px]:h-18
                                     max-[768px]:w-19 max-[768px]:h-18
                                     max-[640px]:w-19 max-[640px]:h-18
                                     max-[425px]:w-25 max-[425px]:h-18
                                     max-[375px]:w-30 max-[375px]:h-16
                              `
                                    :
                                    `max-[2560px]:w-23 max-[2560px]:h-20
                                     max-[1440px]:w-23 max-[1440px]:h-20
                                     max-[1280px]:w-23 max-[1280px]:h-18
                                     max-[1180px]:w-27 max-[1180px]:h-18
                                     max-[1024px]:w-30 max-[1024px]:h-18
                                     max-[768px]:w-20 max-[768px]:h-18
                                     max-[640px]:w-22 max-[640px]:h-18
                                     max-[425px]:w-28 max-[425px]:h-18
                                     max-[375px]:w-33 max-[375px]:h-16
                                 `
                                }`}
                            >

                                <Image src={item.src} alt={item.alt} width={item.width} height={item.height}
                                       className="text-[#6938d3] max-[640px]:h-[32px] max-[640px]:w-[30px]"/></div>
                            <div className="flex flex-col gap-3"><h3
                                className="font-bold lg:w-auto text-base md:text-lg lg:text-xl sm:text-xl text-[#282828]">{item.title}</h3>
                                <p
                                    className="font-medium text-[#282828] text-sm sm:text-lg md:text-base lg:text-lg">{item.desc}</p>
                            </div>
                        </div>
                        <p className="font-semibold text-[12px] sm:text-base md:text-[15px] lg:text-base text-black mb-2 sm:mb-4">{item.details}</p>
                        <div
                            className="border border-[#E7E7E7] rounded-2xl w-fit px-5 max-[375px]:px-3 md:px-3 lg:px-3 xl:px-5 py-2 bg-white flex flex-row text-left gap-2 max-[425px]:gap-1 md:gap-2">
                            <p className="font-mono text-black max-[375px]:text-[11px] max-[425px]:text-sm max-[640px]:text-sm  text-base md:text-[14px] lg:text-lg tracking-wider font-bold">{item.valueName}</p>
                            <p className="font-mono text-black max-[375px]:text-[12px] max-[425px]:text-sm max-[640px]:text-sm text-base md:text-[14px] lg:text-lg tracking-wider">{item.value}</p>
                        </div>
                    </motion.div>))}
                </div>

                {/* Secure Payment Section - Fluid card layouts */}
                <motion.div

                    initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                    transition={{duration: 0.8}}

                    className="mt-10 sm:mt-12 lg:mt-12 xl:mt-16">
                    <h3
                        className="font-bold font-arial text-xl text-[#2B2B2B] sm:text-2xl lg:w-auto mb-2 ">Secure
                        Payment Processing
                    </h3>
                    <p className="font-medium text-[#5D5D5D] text-md sm:text-lg mb-8">Your financial information is
                        protected with bank-grade security</p>

                    <div
                        ref={scrollRef}
                        className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 xl:gap-16 lg:items-center md:mx-auto px-3 py-4 sm:py-6 sm:px-2"
                    >


                        {/*Card 1*/}
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                transition: {duration: 0.3}
                            }}
                            transition={{duration: 0.6, delay: 0.1}}
                            viewport={{once: true}}

                            className="bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-8 ransition-all flex
                            flex-col gap-3 items-center justify-center flex-shrink-0 w-[230px] md:w-[285px] lg:flex-1 lg:max-w-[300px] md:bg-transparent">

                            <Image src={getImageUrl("public/images/icons/secure-payment.webp")} alt="checked"
                                   width={30} height={30}
                                   className="mx-auto"/>
                            <h4 className="font-semibold text-lg text-center text-[#3D3D3D]">SSL
                                Encryption</h4> <p
                            className="text-sm text-gray-600 max-[640px]:w-auto w-[75px] md:w-auto text-center">256-bit
                            SSL
                            protection</p>
                        </motion.div>

                        {/*Card 2*/}
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                transition: {duration: 0.3}
                            }}
                            transition={{duration: 0.6, delay: 0.1}}
                            viewport={{once: true}}

                            className="bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-8 ransition-all
                            flex flex-col gap-3 items-center justify-center flex-shrink-0 w-[230px] md:w-[285px] lg:flex-1 lg:max-w-[300px] md:bg-transparent">

                            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.8, delay: 0.5}}>
                                <Image src={getImageUrl("public/images/about/trustUs/stripe-logo.svg")} alt="stripe"
                                       width={70} height={70}
                                       className="mx-auto"/>
                            </motion.div>
                            <h4 className="font-semibold text-lg text-center text-[#3D3D3D]">Payment Platform</h4> <p
                            className="text-sm text-gray-600 max-[640px]:w-auto w-[75px] md:w-auto text-center">Stripe</p>
                        </motion.div>

                        {/*Card 3*/}
                        <motion.div

                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{
                                y: -8,
                                scale: 1.05,
                                transition: {duration: 0.3}
                            }}
                            transition={{duration: 0.6, delay: 0.1}}
                            viewport={{once: true}}

                            className="bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-4 md:p-8 ransition-all flex flex-col
                            gap-3 items-center justify-center col-span-2 mx-auto md:mx-0 flex-shrink-0 w-[230px] md:w-[285px] lg:flex-1 lg:max-w-[300px] md:bg-transparent">
                            <div className="flex gap-3 items-center justify-center">

                                <Image src={getImageUrl("public/images/home/trust/visa.svg")}
                                       alt="visaCard" width={50}
                                       height={50}
                                       className="mx-auto"/>
                                <Image src={getImageUrl("public/images/home/trust/mastercard.svg")} alt="masterCard"
                                       width={50}
                                       height={50}
                                       className="mx-auto"/>
                                <Image src={getImageUrl("public/images/home/trust/american-express.svg")}
                                       alt="americanExpressCard" width={50} height={50}
                                       className="mx-auto"/></div>
                            <h4 className="font-semibold text-lg text-center text-[#3D3D3D]">Major Cards</h4> <p
                            className="text-sm text-gray-600 text-center max-[640px]:w-auto w-[100px] lg:w-auto">Visa,
                            MasterCard</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Reviews Section - Fluid card layouts */}
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="w-screen relative left-1/2 right-1/2 -mx-[50vw] pt-10 sm:pt-4 lg:pt-6 xl:pt-10"
                >
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h3 className="font-bold font-arial text-xl text-[#2B2B2B] sm:text-2xl mb-6 sm:md:mb-8 lg:mb-12 ">
                            What Our Travelers Say
                        </h3>

                        <div
                            ref={scrollRef}
                            className=" flex lg:grid lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-10 max-lg:overflow-x-auto max-lg:overflow-y-hidden
                          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]    cursor-grab lg:cursor-default
                          px-3 py-5 lg:px-0 lg:py-0 max-[425px]:gap-8 max-[425px]:px-4 max-[425px]:py-4"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}>
                            {[
                                {
                                    icon: FaTripadvisor,
                                    platform: "TripAdvisor Reviews",
                                    rating: "4.8/5 (1,277 reviews)",
                                    reviews: [
                                        {
                                            text: "Exceptional service and authentic experiences. ZephyraTravels made our Sri Lankan dream trip a reality!",
                                            author: "Sarah M., Australia",
                                        },
                                        {
                                            text: "Professional, reliable, and incredibly knowledgeable guides. Highly recommended!",
                                            author: "David K., Germany",
                                        },
                                    ],
                                    button: "Read All TripAdvisor Reviews",
                                    link: "https://www.tripadvisor.com/Attraction_Review-g293962-d33675398-Reviews-ZephyraTravels-Colombo_Western_Province.html"
                                },
                                {
                                    icon: FaGoogle,
                                    platform: "Google Reviews",
                                    rating: "4.8/5 (1,277 reviews)",
                                    reviews: [
                                        {
                                            text: "Exceptional service and authentic experiences. ZephyraTravels made our Sri Lankan dream trip a reality!",
                                            author: "Sarah M., Australia",
                                        },
                                        {
                                            text: "Professional, reliable, and incredibly knowledgeable guides. Highly recommended!",
                                            author: "David K., Germany",
                                        },
                                    ],
                                    button: "Read All Google Reviews",
                                    link: "https://share.google/rZEcNFarFT9YXDRqA"
                                },
                                {
                                    icon: FaFacebook,
                                    platform: "Facebook Reviews",
                                    rating: "4.8/5 (1,277 reviews)",
                                    reviews: [
                                        {
                                            text: "Exceptional service and authentic experiences. ZephyraTravels made our Sri Lankan dream trip a reality!",
                                            author: "Sarah M., Australia",
                                        },
                                        {
                                            text: "Professional, reliable, and incredibly knowledgeable guides. Highly recommended!",
                                            author: "David K., Germany",
                                        },
                                    ],
                                    button: "Read All Facebook Reviews",
                                    link: "https://www.facebook.com/zephyratravelslk/reviews"
                                },
                            ].map((review, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.05,
                                        transition: {duration: 0.3},
                                    }}
                                    transition={{duration: 0.6, delay: index * 0.1}}
                                    viewport={{once: true}}
                                    className={`
                        bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-6 text-left
                       lg:w-auto lg:mx-auto lg:mt-5 text-[#282828] w-[55vw] max-w-[280px] sm:w-[38%] sm:max-w-[320px] md:w-[38%] md:max-w-[340px] lg:max-w-none flex-shrink-0 lg:flex-shrink
                    `}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div
                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#DECFFF] flex items-center justify-center flex-shrink-0">
                                            <review.icon className="text-[#872BFF] w-7 h-7 sm:w-8 sm:h-8"/>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base sm:text-lg font-extrabold truncate">{review.platform}</h4>
                                            <div className="flex flex-col items-start gap-1 text-start">
                                                <div className="flex gap-1 mt-2 justify-start text-start">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i}
                                                                className="text-[#E3C600] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"/>
                                                    ))}
                                                </div>
                                                <p className="text-black text-xs sm:text-sm text-start">{review.rating}</p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Desktop: show all reviews */}
                                    <div className="hidden md:block">
                                        {review.reviews.map((r, i) => (
                                            <div key={i} className="mb-4">
                                                <p className="text-black italic text-sm leading-relaxed mb-3">{r.text}</p>
                                                <p className="text-[#636363] text-xs font-medium">– {r.author}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mobile: show only one review */}
                                    <div className="block md:hidden">
                                        <div className="mb-4">
                                            <p className="text-black italic text-sm leading-relaxed mb-3">
                                                {review.reviews[0].text}
                                            </p>
                                            <p className="text-[#636363] text-xs font-medium">
                                                – {review.reviews[0].author}
                                            </p>
                                        </div>
                                    </div>

                                    <Link href={review.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-4 border-[#872BFF] rounded-xl w-full text-sm font-medium text-black hover:bg-[#872BFF] hover:text-white transition-all cursor-pointer p-3
                                              max-[375px]:text-xs max-[375px]:p-2 max-[375px]:w-[130px]"
                                        >
                                            {review.button}
                                        </Button>
                                    </Link>

                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </section>

            {/* Trusted by Travelers Section - Stats with responsive grid */}
            <div
                ref={sectionRef}
                className="relative left-1/2 right-1/2 -mx-[50vw] w-screen    mt-14 mb-10 bg-[#6938d3] text-white py-10 px-6 md:px-12 lg:px-26"
            >
                <h3 className="font-bold text-xl md:text-3xl mb-10 text-center cursor-default">
                    Trusted by Travelers Worldwide
                </h3>

                <div
                    className="grid grid-cols-2 gap-10 md:flex md:gap-20 lg:gap-24 xl:gap-28 md:items-center justify-center text-center cursor-default">
                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-xl md:text-3xl lg:text-4xl font-extrabold">
                            {inView ? <CountUp end={216} duration={1.5} suffix="+"/> : "216+"}
                        </h4>
                        <p className="text-sm md:text-base mt-2 opacity-90 max-[375px]:w-[70px]">Happy Travelers</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-xl md:text-3xl lg:text-4xl font-extrabold">
                            {inView ? <CountUp end={4.8} duration={1.5} decimals={1} suffix="/5"/> : "4.8/5"}
                        </h4>
                        <p className="text-sm md:text-base mt-2 opacity-90 max-[375px]:w-[50px]">Average Rating</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-xl md:text-3xl lg:text-4xl font-extrabold">
                            {inView ? <CountUp end={98} duration={1.5} suffix="%"/> : "98%"}
                        </h4>
                        <p className="text-sm md:text-base mt-2 opacity-90 max-[375px]:w-[90px]">Recommend Us</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h4 className="text-xl md:text-3xl lg:text-4xl font-extrabold">
                            {inView ? <CountUp end={83} duration={1.5} suffix="%"/> : "83%"}
                        </h4>
                        <p className="text-sm md:text-base mt-2 opacity-90 max-[375px]:w-[70px]">Repeat Customers</p>
                    </div>
                </div>
            </div>
        </>
    );
};