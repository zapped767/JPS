import React, {useState} from "react";
import {motion} from "framer-motion";
import {Mail} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {FaFacebook, FaTripadvisor} from "react-icons/fa";
import {BsInstagram, BsWhatsapp} from "react-icons/bs";
import {LiaLinkedinIn} from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import {getImageUrl} from "@/lib/utils";
import {toast} from "react-toastify";
import {inquiryService} from "@/lib/services";

const footerLinks = {
    contact: [
        {
            name: "No 41, Robert Gunawardena Mawatha, Kirulapone, Colombo 06, Sri Lanka",
            url: "https://maps.app.goo.gl/KFGiRuLUyjXmVBXNA?g_st=ipc",
        },
        {name: "info@zephyratravels.com", url: "mailto:info@zephyratravels.com"},
        {name: "+94 76 134 5718", url: "tel:+94761345718"},
        // { name: "Support", url: "/support" },
    ],

    about: [
        {
            name: "Partners",
            link: "/partners"
        },
        {
            name: "Privacy Policy",
            link: "/policies#privacy-policy"
        },
        {
            name: "Blogs & News",
            link: "/blogs"
        },
        {
            name: "Gallery",
            link: "/gallery"
        }
    ],
};


interface PaymentMethodLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const paymentMethods: PaymentMethodLogo[] = [
    {
        src: "public/images/home/trust/visa.svg",
        alt: "Visa",
        width: 30,
        height: 30
    },
    {
        src: "public/images/home/trust/mastercard.svg",
        alt: "Mastercard",
        width: 30,
        height: 30
    },
    {
        src: "public/images/home/trust/american-express.svg",
        alt: "American Express",
        width: 30,
        height: 30
    },
    {
        src: "public/images/home/trust/apple-pay-logo.svg",
        alt: "Apple Pay",
        width: 50,
        height: 50
    }
];

export const Footer_new: React.FC = () => {
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!subscribeEmail) {
            toast.error("Please enter an email address!", {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setLoading(false);
            return;
        }

        try {
            const res = await inquiryService.subscribe(subscribeEmail);

            toast.success(res, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setSubscribeEmail("");
        } catch (err: any) {
            toast.error(err.response.data.error, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
            setSubscribeEmail("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="footer" className="bg-white border-t border-neutral-100    overflow-hidden">
            {/* Main Footer Content */}
            <div className="max-w-7xl xl:max-w-[1350px] mx-auto px-6 lg:px-1 pt-12 lg:pt-8">
                <div className="lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start space-y-8 lg:space-y-0 mb-4">
                    {/* Description */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                        className="text-left col-span-2 relative lg:left-4 xl:left-0"
                    >
                        <div className="mb-4">
                            <div className="flex items-center justify-start -mt-4">
                                <Link href="/" className="-mb-4 -ms-4 -me-2 -mt-6">
                                    <Image
                                        src={getImageUrl("public/logo.avif")}
                                        alt="ZephyraTravels"
                                        width={1000}
                                        height={1000}
                                        quality={85}
                                        className="w-28 h-28 object-contain "
                                    />
                                </Link>
                                <h3 className="text-2xl font-bold text-neutral-900">
                                    ZephyraTravels
                                </h3>
                            </div>
                            <p className="text-neutral-500 leading-relaxed text-[15px] lg:max-w-[85%]">
                                Unlock the true magic of Sri Lanka with ZephyraTravels. As a registered and trusted
                                local partner, we combine deep expertise with a passion for travel to design your
                                perfect, stress-free island getaway.
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3 justify-start mb-6 lg:mb-0">
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="https://www.facebook.com/zephyratravelslk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200 group"
                                aria-label="Follow us on Facebook" // <- accessibility fix
                            >
                                <FaFacebook
                                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="https://www.instagram.com/zephyratravels/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200 group"
                                aria-label="Follow us on Instagram" // <- accessibility fix
                            >
                                <BsInstagram
                                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="https://www.linkedin.com/company/zephyratravels"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200 group"
                                aria-label="Follow us on Linkedin" // <- accessibility fix
                            >
                                <LiaLinkedinIn
                                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="https://wa.me/94761345718"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200 group"
                                aria-label="Follow us on Whatsapp" // <- accessibility fix
                            >
                                <BsWhatsapp
                                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="https://www.tripadvisor.com/Attraction_Review-g293962-d33675398-Reviews-ZephyraTravels-Colombo_Western_Province.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200 group"
                                aria-label="Follow us on TripAdvisor" // <- accessibility fix
                            >
                                <FaTripadvisor
                                    className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors duration-200"
                                    aria-hidden="true"
                                />
                            </motion.a>
                        </div>

                        {/* Subscribe & Payment Methods - Shows below social media on mobile, hidden on large screens */}
                        <div className="lg:hidden">
                            <h4 className="text-lg font-bold text-neutral-900 mb-4">
                                Subscribe
                            </h4>

                            {/* Subscribe Button */}
                            <div
                                className="bg-neutral-100 rounded-lg p-1 grid grid-cols-[auto_1fr_auto] items-center mb-6 ">
                                <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-neutral-400 ml-3 mr-2"/>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={subscribeEmail}
                                    onChange={(e) => setSubscribeEmail(e.target.value)}
                                    className="bg-transparent border-0 focus:outline-none text-neutral-700 placeholder-neutral-400 text-sm py-2"
                                    required={true}
                                />
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="shrink-0 text-xs px-3 py-1.5 m-0.5 rounded-md relative right-4 md:right-0"
                                    onClick={handleSubscribe}
                                >
                                    {loading ? "Subscribing..." : "Subscribe"}
                                </Button>
                            </div>

                            {/* Payment Methods */}
                            <div>
                                <h5 className="text-sm font-semibold text-neutral-700 mb-4">
                                    Payment Methods
                                </h5>
                                <div className="flex gap-2 flex-wrap justify-start">
                                    {paymentMethods.map((method) => (
                                        <motion.div
                                            key={method.alt}
                                            whileHover={{scale: 1.05}}
                                            className="bg-white border border-neutral-200 rounded-lg p-3 hover:shadow-md transition-all duration-200"
                                        >
                                            <Image
                                                src={getImageUrl(method.src)}
                                                alt={method.alt}
                                                width={method.width}
                                                height={method.height}
                                                className=""
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    whileHover={{scale: 1.05}}
                                    className="bg-white border w-fit border-neutral-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 mt-2"
                                >
                                    <Image
                                        src={getImageUrl("public/images/home/trust/stripe-logo.svg")}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className=""
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Company Info and Products - 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-4 lg:contents">
                        {/* Company Info */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="text-left"
                        >
                            <h4 className="text-lg font-bold text-neutral-900 mb-6">
                                Contact Us
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.contact.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.url}
                                            target={link.url.startsWith("http") ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className="text-neutral-600 hover:text-primary-500 transition-colors duration-200 text-sm xl:text-[16px] leading-relaxed"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Products */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: 0.1}}
                            className="text-left relative left-12 lg:left-6"
                        >
                            <h4 className="text-lg font-bold text-neutral-900 mb-6">
                                Quick Links
                            </h4>
                            <ul className="space-y-4">
                                {footerLinks.about.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.link}
                                              className="text-neutral-600 hover:text-primary-500 transition-colors duration-200 text-sm xl:text-[16px]">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Others - Subscribe & Payment Methods - Shows as 4th column on large screens only */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="text-left hidden lg:block relative lg:right-8"
                    >
                        <h4 className="text-lg font-bold text-neutral-900 mb-4 relative lg:right-8 ">
                            Subscribe
                        </h4>

                        {/* Subscribe Button */}
                        <div
                            className="bg-neutral-100 rounded-lg p-2 grid grid-cols-[auto_1fr_auto] items-center gap-2 mb-6 -me-14 relative lg:right-8">
                            <Mail className="w-4 h-4 text-neutral-400 ml-3"/>
                            <input
                                type="email"
                                placeholder="Your email"
                                value={subscribeEmail}
                                onChange={(e) => setSubscribeEmail(e.target.value)}
                                className="bg-transparent border-0 focus:outline-none text-neutral-700 placeholder-neutral-400 text-sm py-2"
                                required={true}
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                className="text-xs px-3 py-1.5 xl:py-2 m-0.5 rounded-md relative lg:right-19 xl:right-2 cursor-pointer"
                                onClick={handleSubscribe}
                            >
                                {loading ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </div>

                        {/* Payment Methods */}
                        <div className="relative lg:right-8">
                            <h5 className="text-sm font-semibold text-neutral-700 mb-4">
                                Payment Methods
                            </h5>
                            <div className="flex gap-3 justify-start">
                                {paymentMethods.map((method) => (
                                    <motion.div
                                        key={method.alt}
                                        whileHover={{scale: 1.05}}
                                        className="bg-white hover:shadow-md transition-all duration-200"
                                    >
                                        <Image
                                            src={getImageUrl(method.src)}
                                            alt={method.alt}
                                            width={method.width}
                                            height={method.height}
                                            className=""
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                whileHover={{scale: 1.05}}
                                className="bg-white rounded-lg hover:shadow-md transition-all duration-200 mt-2 w-fit px-1"
                            >
                                <Image
                                    src={getImageUrl("public/images/home/trust/stripe-logo.svg")}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className=""
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.4}}
                    // className="border-t border-neutral-100 pt-2"
                    className="border-t border-neutral-100 py-3"
                >
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        {/* Copyright */}
                        <p className="text-neutral-500 text-sm text-center md:text-left">
                            © 2025 ZephyraTravels. All rights reserved
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Footer_new;
