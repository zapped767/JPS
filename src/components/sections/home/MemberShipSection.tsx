import { motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../../ui/Button";
import MembershipFeatureCard from "../../ui/MembershipFeatureCard";
import { useRouter } from "next/router";
import { getImageUrl } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
    FaHandshake,
    FaMedal,
    FaUserTie,
    FaAward,
    FaHotel,
    FaCar,
    FaShieldAlt,
    FaTags
} from "react-icons/fa";

const memberships = [
    {
        desktopName: "Local Expertise",
        mobileName: "Local\nExpertise",
        description: "Access Sri Lanka's largest network of local experts",
        since: "Trusted\nCollaborators",
        icon: FaUserTie,
    },
    {
        desktopName: "TAASL Certified",
        mobileName: "TAASL\nCertified",
        description: "Official member of Travel Agents Association of SL",
        since: "Certified\nMember",
        icon: FaAward,
    },
    {
        desktopName: "Hotel Partners",
        mobileName: "Hotel\nPartners",
        description: "Partnerships with 50+ luxury hotels and resorts",
        since: "Preferred\nPartner",
        icon: FaHotel,
    },
    {
        desktopName: "Premium Transport",
        mobileName: "Premium\nTransport",
        description: "Modern air-conditioned private fleet and transfers",
        since: "Official Travel\nPartner",
        icon: FaCar,
    },
];

const MemberShipSection = () => {
    const router = useRouter();
    const isMobile = useIsMobile();

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
        <section className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8 md:mt-8">

            {/* --- Section Header --- */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center gap-2 my-5 md:my-10 max-md:mt-7"
            >
                <FaHandshake
                    size={isMobile ? 30 : 40}
                    className="text-secondary-500"
                />

                <p className="text-[16px] font-bold text-[#373737] md:text-2xl">
                    Memberships & Partnerships
                </p>
            </motion.div>

            {/* --- Grid Layout --- */}
            <div className="mb-10">
                {/* REDUCED GAP BETWEEN CARDS: gap-3 md:gap-4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:justify-center items-stretch gap-3 md:gap-4">
                    {memberships.map((membership, index) => (
                        <div key={index} className="lg:flex-1">
                            <MembershipFeatureCard
                                className="membership-mobile-title"
                                icon={membership.icon}
                                alt={membership.desktopName}
                                title={isMobile ? membership.mobileName : membership.desktopName}
                                description={membership.description}
                                subTag={membership.since}
                                delay={index * 0.1}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="pb-10 md:px-6 lg:px-0 cursor-default">
                <p className=" font-medium text-sm sm:text-base lg:text-xl  text-[#353535] text-center">
                    We are proud members of leading travel associations and maintain
                    partnerships with major hotels.
                </p>
            </div>

            {/* --- Guarantees & Policies Section --- */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center gap-2"
            >
                <FaMedal size={isMobile ? 23 : 40} className="text-secondary-500" />
                <p className="text-[16px] font-bold text-[#373737] md:text-2xl">
                    Guarantees & Policies
                </p>
            </motion.div>

            {/* Guarantees Horizontal Cards */}
            <div className="flex justify-center mt-4 gap-3 max-md:flex-col max-w-5xl mx-auto">
                <GuaranteeCard
                    icon="public/images/home/membership/verified.webp"
                    text="No hidden charges"
                    delay={0.1}
                />
                <GuaranteeCard
                    icon="public/images/home/membership/transaction.webp"
                    text="Flexible cancellation policy"
                    delay={0.2}
                />
                <GuaranteeCard
                    icon="public/images/home/membership/headset.webp"
                    text="24/7 customer support"
                    delay={0.3}
                />
            </div>

            {/* --- Partner With Us Section --- */}
            <div className="text-center mt-6 px-4 md:px-4 xl:px-0">
                <p
                    className="text-[24px] font-bold mb-3 max-md:text-[14px] text-secondary-500 cursor-default text-center"
                    style={{ letterSpacing: "0.28em" }}
                >
                    SRI LANKAN PARTNERSHIPS
                </p>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl lg:text-[42px] max-md:text-[20px] font-black font-dm-sans text-neutral-900 cursor-default text-center"
                >
                    Partner with Us
                </motion.h2>

                <p className="border-l-4 mt-5 border-primary-500 p-4 text-[#3E3E3E] text-sm sm:text-base lg:text-xl cursor-default">
                    ZephyraTravels is your trusted inbound tourism partner. We collaborate
                    with travel agencies, corporates, and global partners to deliver
                    authentic Sri Lankan travel experiences with competitive rates and
                    reliable support.
                </p>
            </div>

            {/* Feature Cards for Partners (Bottom Row) */}
            <div
                ref={scrollRef}
                className="mt-2 pt-3 px-4 md:px-4 lg:px-8 mx-auto grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-6 cursor-grab sm:cursor-default items-center"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="w-full sm:h-full sm:w-[220px] lg:w-[240px]">
                    <MembershipFeatureCard
                        icon={FaHandshake}
                        alt="Travel Agencies"
                        title="Partnerships"
                        description="We build long-term relationships based on trust and mutual success."
                        delay={0.1}
                        ariaLabel="Learn more about Partnerships"
                    />
                </div>
                <div className="w-full h-full sm:w-[220px] lg:w-[240px]">
                    <MembershipFeatureCard
                        icon={FaShieldAlt}
                        alt="Travel Agencies"
                        title="Reliability"
                        description="Count on us for consistent service quality and dependable support."
                        delay={0.2}
                        ariaLabel="Learn more about Reliability"
                    />
                </div>
                <div className="w-full sm:w-[220px] lg:w-[240px] col-span-2 flex justify-center">
                    <MembershipFeatureCard
                        icon={FaTags}
                        alt="Travel Agencies"
                        title="Competitive Rates"
                        description="Access exclusive pricing that gives your business an edge in the market."
                        delay={0.3}
                        ariaLabel="Learn more about Competitive Rates"
                        imageWidth={40}
                        imageHeight={40}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8 md:mt-10">
                <Button
                    variant="primary"
                    className="p-4 px-8 h-auto text-lg rounded-full mb-6 font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    aria-label="Partner with Zephyra Travels"
                    onClick={() => router.push("/partners")}
                >
                    <span className="flex items-center gap-3">
                        Partner with Us
                        <span>
                            <motion.div
                                animate={{ x: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Image
                                    src={getImageUrl("public/images/right-arrow.webp")}
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </motion.div>
                        </span>
                    </span>
                </Button>
            </div>
        </section>
    );
};

// Sub-component for the horizontal guarantee strips
const GuaranteeCard = ({ icon, text, delay }: { icon: string; text: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.05 }}
        className="bg-[#F5F5F5] flex items-center gap-3 px-4 py-3 rounded-xl w-full md:w-auto justify-start"
    >
        <Image
            src={getImageUrl(icon)}
            alt="icon"
            width={25}
            height={25}
            className="object-contain"
        />
        <p className="text-[16px] md:text-[18px] text-[#6938D3] font-medium whitespace-nowrap">
            {text}
        </p>
    </motion.div>
);

export default MemberShipSection;