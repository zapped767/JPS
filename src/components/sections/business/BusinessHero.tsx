import React from "react";
import ScrollIndicator from "@/components/sections/home/ScrollIndicator";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/router";

export const BusinessHero = () => {
    const router = useRouter();

    // Scroll to the target element smoothly
    const scrollToTarget = (id: string, offset: number): void => {
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({top, behavior: "smooth"});
        }
    };

    const navigateAndScroll = (targetId: string, offset: number): void => {
        if (typeof window === "undefined") return;

        if (window.location.pathname === "/") {
            scrollToTarget(targetId, offset);
        } else {
            const handleRouteDone = (): void => {
                setTimeout(() => scrollToTarget(targetId, offset), 150);
                router.events.off("routeChangeComplete", handleRouteDone);
            };

            router.events.on("routeChangeComplete", handleRouteDone);
            router.push(`/#${targetId}`);
        }
    };

    const ScrollToPackage = () => {
        const el = document.getElementById("options");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    return (
        <div className="relative pb-10 lg:px-[100px] text-center flex flex-col items-center justify-center   ">
            {/*Main Title*/}
            <h1 className="font-plus-jakarta-sans font-extrabold text-[65px] max-md:text-[36px] leading-[82px] text-[#262626] cursor-default">
                Partner with <span className="text-[#C4008D]">Us</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[18px] leading-relaxed max-w-[700px] max-sm:text-[14px] my-8 px-1 md:px-0 text-[#393939] cursor-default">
                Zephyra Travels collaborates with agents, corporates, hotels, and global
                partners to deliver world-class inbound travel experiences in Sri Lanka.
            </p>

            {/* CTA Buttons */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.5}}
                className="flex flex-row gap-4 max-md:justify-center max-sm:flex-wrap max-sm:gap-2 mb-10"
            >
                <Button
                    size="md"
                    variant="primary"
                    className="cursor-pointer max-sm:px-6"
                    aria-label="Start Partnership"
                    onClick={() => scrollToTarget("partnership-form", -85)}
                >
                    Start Partnership
                </Button>
            </motion.div>

            {/*Down Arrow Button*/}
            <div
                className="flex justify-center items-center relative mt-6"
                onClick={() => scrollToTarget("options", -85)}
            >
                <ScrollIndicator OnClick={ScrollToPackage}/>
            </div>
        </div>
    );
};
