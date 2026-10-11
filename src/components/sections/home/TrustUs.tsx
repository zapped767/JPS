import {motion} from "framer-motion";
import React from "react";
import Image from "next/image";
import {FaBuilding, FaExpeditedssl} from "react-icons/fa";
import {getImageUrl} from "@/lib/utils";
import {useIsMobile} from "@/hooks/useIsMobile";
import {TiDocumentText} from "react-icons/ti";
import {PiCertificateFill} from "react-icons/pi";
import {RiSecurePaymentFill} from "react-icons/ri";
import {MdVerifiedUser} from "react-icons/md";

interface PaymentMethodLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const TrustUs = () => {

    const isMobile = useIsMobile();

    const cardPaymentMethods = [
        {
            src: "public/images/home/trust/advance-payment-40.svg",
            alt: "Advance Payment"
        },
        {
            src: "public/images/home/trust/visa.svg",
            alt: "Visa Card Logo"
        },
        {
            src: "public/images/home/trust/mastercard.svg",
            alt: "Master Card Logo"
        },
        {
            src: "public/images/home/trust/american-express.svg",
            alt: "American Express Card Logo"
        },
    ]

    const paymentMethods: PaymentMethodLogo[] = [
        {
            src: "public/images/home/trust/stripe-logo.svg",
            alt: "Stripe",
            width: isMobile ? 30 : 50,
            height: isMobile ? 30 : 50
        },
        {
            src: "public/images/home/trust/apple-pay-logo.svg",
            alt: "Apple Pay",
            width: isMobile ? 30 : 50,
            height: isMobile ? 30 : 50
        },
        {
            src: "public/images/home/trust/google-pay-logo.svg",
            alt: "Google Pay",
            width: isMobile ? 80 : 100,
            height: isMobile ? 80 : 100
        },
        {
            src: "public/images/home/trust/paypal.svg",
            alt: "PayPal",
            width: isMobile ? 50 : 70,
            height: isMobile ? 50 : 70
        },
        {
            src: "public/images/home/trust/alipay-logo.webp",
            alt: "AliPay",
            width: isMobile ? 15 : 25,
            height: isMobile ? 15 : 25
        }
    ]

    return (
        <>
            <section className="max-w-7xl mx-auto relative md:mt-6">
                {/* Background Elements - placed behind content */}
                <div className="absolute inset-10 inset-x-[-25%] pointer-events-none z-10 hidden lg:block ">

                    {/* Purple Blurred Ellipse (Left) */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.6, x: -100}}
                        whileInView={{opacity: 1, scale: 1, x: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.2, delay: 0.3}}
                        className="absolute top-1/2 -translate-y-1/2 -left-20 sm:-left-32 md:-left-40
               w-[400px] h-[320px] sm:w-[550px] sm:h-[450px] md:w-[600px] md:h-[650px]
               bg-gradient-to-r from-[#872BFF]/30 via-[#872BFF]/20 to-transparent
               rounded-full blur-[140px]"
                    />

                    {/* Smaller Glow for Depth */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.4}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{duration: 1.5, delay: 0.6}}
                        className="absolute top-1/2 -translate-y-1/2 left-5
               w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-150
               bg-[#872BFF]/25 rounded-full blur-[100px]"
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="text-4xl lg:text-[42px] max-md:text-[20px] font-semibold font-dm-sans text-secondary-500 text-center"
                    >
                        Why Travelers Trust Us
                    </motion.h2>
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="flex items-center justify-center gap-2 my-5 md:my-10"
                    >
                        <FaBuilding size={isMobile ? 25 : 30} className="text-secondary-500"/>
                        <p className="text-[16px] font-bold text-[#373737] md:text-2xl">
                            Company Legitimacy
                        </p>
                    </motion.div>
                </div>
                <div
                    className="grid grid-cols-2 md:flex items-center md:py-4 max-md:flex-col max-xl:mx-4 gap-4 md:gap-8 xl:gap-16">
                    <motion.div
                        initial={{opacity: 0, x: -50, scale: 0.9}}
                        whileInView={{opacity: 1, x: 0, scale: 1}}
                        transition={{duration: 0.6, delay: 0.1}}
                        whileHover={{
                            scale: 1.02,
                            y: -5,
                            transition: {duration: 0.2},
                        }}
                        viewport={{once: true}}
                        className="w-full h-full bg-white shadow-lg border border-slate-100 z-10 rounded-xl lg:rounded-3xl flex flex-col md:flex-row items-center  gap-2 p-4 max-md:text-center"
                    >
                        <TiDocumentText size={isMobile ? 45 : 100} className="text-primary-500"/>
                        <div>
                            <p className="text-[18px] text-primary-900 max-md:text-[16px] mb-1 md:mb-0">
                                Business Registration
                            </p>
                            <p className="text-[18px] text-black font-bold max-md:text-[15px] mb-1 md:mb-0">
                                P V 00339254
                            </p>
                            <p className="text-[16px] lg:text-[18px] text-[#414141] max-md:text-[12px]">
                                Registered under the Companies Act, Sri Lanka
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, x: 50, scale: 0.9}}
                        whileInView={{opacity: 1, x: 0, scale: 1}}
                        transition={{duration: 0.6, delay: 0.2}}
                        whileHover={{
                            scale: 1.02,
                            y: -5,
                            transition: {duration: 0.2},
                        }}
                        viewport={{once: true}}
                        className="w-full h-full bg-white shadow-lg border border-slate-100 z-10 rounded-xl lg:rounded-3xl flex flex-col md:flex-row items-center gap-2 p-4 max-md:text-center"
                    >
                        <PiCertificateFill size={isMobile ? 45 : 100} className="text-primary-500"/>
                        <div>
                            <p className="text-[18px] text-primary-900 max-md:text-[16px] mb-1 md:mb-0">
                                SLTDA License
                            </p>
                            <p className="text-[16px] lg:text-[18px] text-[#414141] max-md:text-[12px]">
                                Licensed & approved by Sri Lanka Tourism Development Authority
                            </p>
                        </div>
                    </motion.div>
                </div>
                <div>
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="flex items-center justify-center gap-2 my-5 md:my-10 max-md:mt-7"
                    >
                        <RiSecurePaymentFill size={isMobile ? 30 : 40} className="text-secondary-500"/>
                        <p className="text-[16px] font-bold text-[#373737] md:text-2xl">
                            Payment Security
                        </p>
                    </motion.div>
                </div>
                <div className="flex justify-center">
                    <div
                        className="flex gap-16 md:gap-3 lg:gap-16 items-center max-md:flex-col max-md:gap-4 mx-4">
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-6">
                            <motion.div
                                initial={{opacity: 0, y: 30, rotateX: 15}}
                                whileInView={{opacity: 1, y: 0, rotateX: 0}}
                                transition={{duration: 0.6, delay: 0.1}}
                                whileHover={{
                                    scale: 1.03,
                                    y: -3,
                                    transition: {duration: 0.2},
                                }}
                                viewport={{once: true}}
                                className="bg-white border border-slate-100 shadow-lg flex flex-col md:flex-row items-center gap-4 px-4 py-2 rounded-[8px] max-md:py-3"
                            >
                                <MdVerifiedUser size={isMobile ? 35 : 35} className="text-primary-500"/>
                                <p className="text-[14px] md:text-[22px] text-[#484848] font-bold max-md:text-center">
                                    100% Secure Online Payments
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 30, rotateX: -15}}
                                whileInView={{opacity: 1, y: 0, rotateX: 0}}
                                transition={{duration: 0.6, delay: 0.2}}
                                whileHover={{
                                    scale: 1.03,
                                    y: -3,
                                    transition: {duration: 0.2},
                                }}
                                viewport={{once: true}}
                                className="bg-white border border-slate-100 shadow-lg flex flex-col md:flex-row items-center gap-4 px-4 py-2 rounded-[8px] max-md:py-3"
                            >
                                <FaExpeditedssl size={isMobile ? 35 : 35} className="text-primary-500"/>
                                <p className="text-[14px] md:text-[22px] text-[#484848] font-bold max-md:text-center">
                                    SSL Encrypted Transactions
                                </p>
                            </motion.div>
                        </div>
                        <div className="h-[155px] w-1 bg-primary-500 rounded-2xl max-md:hidden"></div>
                        <motion.div
                            initial={{opacity: 0, x: -30}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.6, delay: 0.1}}
                            className="flex flex-col items-center gap-4 "
                        >
                            <p className="text-[16px] md:text-[22px] text-[#484848] font-bold text-center">
                                We Are Accepting
                            </p>
                            <div className="flex gap-6 max-md:justify-center">
                                {cardPaymentMethods.map((method, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, scale: 0.8}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        transition={{duration: 0.4, delay: 0.2}}
                                        whileHover={{
                                            scale: 1.15,
                                            transition: {duration: 0.2},
                                        }}
                                        className=" "
                                    >
                                        <Image
                                            src={getImageUrl(method.src)}
                                            alt={method.alt}
                                            width={100}
                                            height={100}
                                            className="w-[80px] max-md:w-[50px]"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="grid grid-cols-[repeat(5,auto)] items-center gap-4 justify-center w-full">
                                {paymentMethods.map((paymentMethod, index) => (
                                    <Image
                                        key={index}
                                        src={getImageUrl(paymentMethod.src)}
                                        alt={paymentMethod.alt}
                                        width={paymentMethod.width}
                                        height={paymentMethod.height}
                                        className="h-full object-contain"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrustUs;
