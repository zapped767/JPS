import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/router";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export const AboutHero = () => {

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

    // const handleExploreClick = (): void => navigateAndScroll("package", -85);
    const handleExploreClick = () => {
        router.push('/packages')
    }
    const handleContactClick = (): void => navigateAndScroll("contact", -25);

    const handleWhoWeAreClick = () => {

        const scrollToSection = () => {
            const el = document.getElementById("whoWeAre");
            if (el) {
                const headerOffset = 80; // Fixed header height (75px) + minimal spacing (5px)
                const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({top: offsetPosition, behavior: "smooth"});
            }
        };

        // If already on /about, just scroll directly
        if (router.pathname === "/about") {
            scrollToSection();
        } else {
            const handleRouteDone = () => {
                setTimeout(scrollToSection, 200); // small buffer to ensure layout is ready
                router.events.off("routeChangeComplete", handleRouteDone);
            };

            router.events.on("routeChangeComplete", handleRouteDone);
            router.push("/about#whoWeAre");
        }
    };


    return (
        <section className="relative pb-10 lg:px-[100px] text-center flex flex-col items-center justify-center   ">
            {/*Main Title*/}
            <h1 className="flex flex-col !font-extrabold sm:text-[60px] lg:text-[65px] text-[36px] leading-[82px] text-[#262626] cursor-default">
                Fall In Love With
                <span className="text-[#C4008D]">Sri Lanka.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[18px] leading-relaxed max-[431px]:w-[300px] sm:w-[700px] max-sm:text-[14px] mt-3 mb-4 md:mb-8 md:mt-7 px-1 max-[375px]:px-2 max-[500px]:px-1 max-[541px]:px-4 md:px-0 text-[#393939] cursor-default">
                Custom-designed, all-inclusive Sri Lanka holidays by trusted local experts. Your journey is fully
                covered, including up to $10,000 Travel Insurance, premium boutique hotels, private A/C transport, and
                instant 24/7 support for a seamless, unforgettable experience.
            </p>

            {/* CTA Buttons */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.5}}
                className="flex flex-row gap-4 max-md:justify-center max-[375px]:flex-col max-sm:gap-3 mb-6 md:mb-10"
            >
                <Button
                    size="md"
                    variant="primary"
                    className="cursor-pointer max-sm:px-6"
                    aria-label="Explore Our Packages"
                    onClick={handleExploreClick}
                >
                    Explore Our Packages
                </Button>

                <motion.div
                    whileHover="hover"
                    initial="initial"
                    variants={{
                        initial: {},
                        hover: {},
                    }}
                >
                    <Button
                        size="md"
                        variant="outline"
                        aria-label="Contact Us"
                        onClick={handleContactClick}
                        className="text-[#353535] cursor-pointer"
                    >
                        Contact Us
                    </Button>
                </motion.div>
            </motion.div>

            {/*Down Arrow Button*/}
            <div className="flex justify-center items-center relative mt-6"
                 onClick={handleWhoWeAreClick}
            >
                <ScrollIndicator OnClick={handleWhoWeAreClick}/>
            </div>

        </section>
    );
};
