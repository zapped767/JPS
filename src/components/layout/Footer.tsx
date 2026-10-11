import React from "react";
import {motion} from "framer-motion";
import {Mail} from "lucide-react";
import {Button} from "@/components/ui/Button";
import {FaFacebook} from "react-icons/fa";
import {BsInstagram, BsWhatsapp} from "react-icons/bs";
import {LiaLinkedinIn} from "react-icons/lia";
import {a} from "framer-motion/client";

const footerLinks = {
    contact: [
        "No 41, Robert Gunawardena Mawatha,Kirulapona, Colombo 06, 00600",
        "info@zephyratravels.com",
        "+94 76 134 5718",
    ],
    about: ["How to Book", "Contact Us", "Help Center", "Careers"],
    others: ["Blog", "Freunde einladen", "Patienteninformationen"],
};

const legalLinks = [
    {name: "Dateenschutz", href: "#"},
    {name: "Privacy Policy", href: "/PolicyPage"},
    {name: "Cookie Policy", href: "#"},
    {name: "AGBs", href: "#"},
];

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-neutral-100">
            {/* Newsletter Section */}
            <div className="border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="max-w-md mx-auto"
                    >
                        <div className="bg-neutral-100 rounded-2xl p-2 flex items-center gap-2">
                            <div className="flex items-center gap-3 flex-1 px-4">
                                <Mail className="w-5 h-5 text-neutral-400"/>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-transparent border-0 focus:outline-none flex-1 text-neutral-700 placeholder-neutral-400"
                                />
                            </div>
                            <Button variant="primary" size="md" className="shrink-0">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Description */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="text-center md:text-left mb-6"
                        >
                            <h3 className="text-2xl font-bold text-neutral-900">
                                ZephyraTravels
                            </h3>
                        </motion.div>
                        <p className="text-neutral-500 leading-relaxed mb-6">
                            We believe travel is about more than just seeing new places,
                            it&apos;s about creating lasting connections. We craft authentic
                            experiences that take you to the heart of every destination.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="#"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                                <FaFacebook className="w-5 h-5 text-primary-500"/>
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="#"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                                <BsInstagram className="w-5 h-5 text-primary-500"/>
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="#"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                                <LiaLinkedinIn className="w-5 h-5 text-primary-500"/>
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                href="#"
                                className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-200"
                            >
                                <BsWhatsapp className="w-5 h-5 text-primary-500"/>
                            </motion.a>
                        </div>
                    </motion.div>
                    {/* Company Info */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        <h4 className="text-lg font-bold text-neutral-900 mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.contact.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                                    >
                                        {link}
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
                    >
                        <h4 className="text-lg font-bold text-neutral-900 mb-6">
                            About Us
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.about.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Others */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <h4 className="text-lg font-bold text-neutral-900 mb-6">Others</h4>
                        <ul className="space-y-3">
                            {footerLinks.others.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-neutral-600 hover:text-primary-500 transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.4}}
                    className="border-t border-neutral-100 pt-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-neutral-500 text-sm">
                            © 2025 ZephyraTravels. All right reserved
                        </p>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-8 text-sm">
                            {legalLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="text-primary-500 hover:text-primary-600 transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};
