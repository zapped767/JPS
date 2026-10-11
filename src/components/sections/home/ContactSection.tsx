import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTripadvisor, FaWhatsapp,} from "react-icons/fa";
import {Button} from "@/components/ui/Button";
import {IoMdMail} from "react-icons/io";
import {PiMapPinFill} from "react-icons/pi";
import {BsTelegram} from "react-icons/bs";
import {useSubmitInquiry} from "@/hooks/useApi";
import {toast} from "react-toastify";

export const ContactSection: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // React Query mutation for submitting inquiry
    const {mutateAsync: submitInquiry, isPending: isSubmitting} =
        useSubmitInquiry({
            onSuccess: (res: any) => {
                toast.success(res);
                // Reset form after a short delay
                setTimeout(() => {
                    setFormData({name: "", email: "", message: ""});
                }, 1000);
            },
            onError: (error: any) => {
                // Handle axios errors
                const status = error?.response?.status;

                if (status === 403 || status === 401) {
                    toast.error(error);
                    return;
                }

                // Extract error message from axios error response
                const errorMessage =
                    error ||
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to submit inquiry. Please try again.";

                toast.error(errorMessage);
            },
        });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form - only email is required
        if (!formData.email.trim()) {
            toast.error("Please enter your email address.");
            return;
        }

        // Use React Query mutation to submit inquiry
        // Map form fields to API structure with empty strings for other fields
        submitInquiry({
            fullName: formData.name.trim() || "",
            email: formData.email.trim(),
            mobileNumber: "",
            travelType: "",
            travelCategory: "",
            numberOfDays: 0,
            preferredActivities: "",
            additionalNotes: formData.message.trim() || "",
        }).catch(() => {
            // Silently catch - error is already handled in onError callback
        });
    };

    const [rows, setRows] = useState(9);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setRows(6);
            } else {
                setRows(9);
            }
        };

        handleResize(); // run on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section id="contact" className="py-10 relative overflow-hidden">
            <div className="absolute inset-0">
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 max-sm:px-4 ">
                <div className="text-center mt-6 pb-10">
                    <h2
                        className="text-[24px] font-bold mb-3 max-md:text-[14px] text-[#C4008D] cursor-default text-center "
                        style={{letterSpacing: "0.28em"}}
                    >
                        LOOKING FOR AN
                    </h2>
                    <motion.h3
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="text-4xl lg:text-[42px] max-md:text-[20px] font-black font-dm-sans text-neutral-900 cursor-default text-center"
                    >
                        Exclusive Customized Tour?
                    </motion.h3>
                </div>

                <div className="flex items-center flex-col lg:flex-row">
                    <motion.div
                        initial={{opacity: 0, x: 30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        className="bg-primary-500 rounded-3xl p-5 sm:p-8 text-white relative overflow-hidden w-full md:w-4/5 lg:w-3/5"
                    >
                        {/* Add Map here */}
                        <div
                            className="h-64 sm:h-72 rounded-2xl overflow-hidden relative hidden sm:block "
                            style={{
                                width: "100%",
                                height: "18rem",
                                overflow: "hidden",
                                clipPath: "inset(0 0 20px 0 round 16px)",
                            }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110781.14929583303!2d79.81317720391601!3d6.942297864096709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bcce2007083%3A0x6d48d539f68a584e!2sZephyraTravels!5e0!3m2!1sen!2slk!4v1760879870624!5m2!1sen!2slk"
                                width="600"
                                height="450"
                                loading="lazy"
                            />
                        </div>

                        <h3 className="text-2xl font-bold my-4 md:my-2  cursor-default relative md:bottom-4">
                            Get Expert Travel Advices
                        </h3>
                        <p className="text-white/80 mb-6 md:mb-8 leading-relaxed text-sm  cursor-default relative md:bottom-2">
                            Planning a trip can be exciting but also overwhelming with so many
                            options available.
                        </p>

                        <div className="space-y-4 mb-6 md:mb-0 relative md:bottom-6">
                            {/* Phone */}
                            <div className="flex items-center gap-3 sm:gap-4  cursor-default">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0E0E0E4D] rounded-xl flex items-center justify-center">
                                    <FaPhoneAlt
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        aria-hidden="true"
                                    />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-all">
                                    <a
                                        href="tel:+94761345718"
                                        target="_self"
                                        rel="noopener noreferrer">
                                         +94 76 134 5718
                                    </a>

                </span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3 sm:gap-4  cursor-default">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0E0E0E4D] rounded-xl flex items-center justify-center">
                                    <IoMdMail
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        aria-hidden="true"
                                    />
                                </div>
                                <span className="font-semibold text-sm sm:text-base break-all">
                                    <a
                                        href="mailto:info@zephyratravels.com"
                                        target="_self"
                                        rel="noopener noreferrer"
                                    >
                                        info@zephyratravels.com
                                    </a>
                </span>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-3 sm:gap-4  cursor-default">
                                <div
                                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0E0E0E4D] rounded-xl flex items-center justify-center mt-1">
                                    <PiMapPinFill
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    className="font-semibold leading-relaxed text-sm sm:text-base w-[180px] sm:w-auto lg:w-[200px] xl:w-auto flex flex-col sm:flex">
                                    <p>No 41, Robert Gunawardena Mawatha,</p>
                                    <p>Kirulapone, Colombo 06,</p>
                                    <p>Sri Lanka</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <motion.a
                                whileHover={{scale: 1.05}}
                                href="https://www.facebook.com/zephyratravelslk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                                aria-label="Follow us on Facebook" // <- accessibility fix
                            >
                                <FaFacebook
                                    className="w-5 h-5 text-primary-500"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                href="https://www.instagram.com/zephyratravels/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                                aria-label="Follow us on Instagram" // <- accessibility fix
                            >
                                <FaInstagram
                                    className="w-5 h-5 text-primary-500"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                href="https://www.linkedin.com/company/zephyratravels"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                                aria-label="Follow us on Linkedin" // <- accessibility fix
                            >
                                <FaLinkedin
                                    className="w-5 h-5 text-primary-500"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                href="https://wa.me/94761345718"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                                aria-label="Follow us on Whatsapp" // <- accessibility fix
                            >
                                <FaWhatsapp
                                    className="w-5 h-5 text-primary-500"
                                    aria-hidden="true"
                                />
                            </motion.a>
                            <motion.a
                                whileHover={{scale: 1.05}}
                                href="https://www.tripadvisor.com/Attraction_Review-g293962-d33675398-Reviews-ZephyraTravels-Colombo_Western_Province.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                                aria-label="Follow us on TripAdvisor" // <- accessibility fix
                            >
                                <FaTripadvisor
                                    className="w-5 h-5 text-primary-500"
                                    aria-hidden="true"
                                />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Form Card */}
                    <motion.div
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.8}}
                        className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(135,43,255,0.4)] p-5 sm:p-8 lg:p-12 w-full relative"
                    >
                        <div className="relative flex items-center max-md:flex-col">
                            <BsTelegram
                                className="hidden lg:block text-6xl text-[#2FA6D9] absolute -top-16 -right-14 "/>
                        </div>

                        <h3 className="text-4xl font-thin text-primary-500 mb-8 text-start max-md:text-2xl  cursor-default">
                            Let’s Plan Your Dream Journey
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex gap-4 max-md:flex-col">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500  placeholder:text-neutral-500 placeholder:text-lg text-gray-700"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500  placeholder:text-neutral-500 placeholder:text-lg text-gray-700"
                                    required
                                />
                            </div>

                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={rows}
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full px-4 pb-3 pt-6 sm:px-6 sm:pb-4 sm:pt-8 bg-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none  placeholder:text-neutral-500 placeholder:text-lg text-gray-700"
                            />

                            <div className="flex justify-end -mt-2 md:mb-0 ">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    aria-busy={isSubmitting} // <- accessibility fix
                                    className="font-semibold rounded-[20px] flex items-center gap-2 bg-[#F411CF] hover:bg-[#F411CF]  cursor-pointer focus:ring-0 focus:ring-offset-0 focus:ring-[#F411CF]"
                                >
                                    {isSubmitting ? "Submitting..." : "Send now"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
