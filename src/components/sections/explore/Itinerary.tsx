import React, {forwardRef} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {getImageUrl} from "@/lib/utils";
import {useIsMobile} from "@/hooks/useIsMobile";

const images = [
    "public/images/explore/itinerary/travel.webp",
    "public/images/explore/itinerary/ride-bicycle.webp",
    "public/images/explore/itinerary/island-view.webp",
    "public/images/explore/itinerary/bus.webp",
    "public/images/explore/itinerary/car.webp",
];
const images2 = [
    "public/images/explore/itinerary/travel.webp",
    "public/images/explore/itinerary/train.webp",
];
const images3 = [
    "public/images/explore/itinerary/island-view.webp",
    "public/images/explore/itinerary/car.webp",
];

type ItineraryProps = {
    title?: string;
}

export const Itinerary = forwardRef<HTMLDivElement, ItineraryProps>(
    ({title = "Tour Itinerary"}, ref) => {

        const isMobile = useIsMobile();

        return (
            <motion.div
                id="itinerary"
                ref={ref}
                className="relative bg-[#6938d3] scroll-offset"
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: "easeOut"}}
                viewport={{once: true}}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center max-xl:mx-10 max-sm:mx-2">
                    <motion.div
                        className="flex justify-center items-center gap-7 max-xl:gap-4 max-sm:gap-2 max-md:hidden"
                        initial={{opacity: 0, x: -50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={image}
                                className="w-1/4"
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.2 * index}}}
                                animate={{y: [0, 5, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                                viewport={{once: true}}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    alt="itinerary"
                                    width={100}
                                    height={100}
                                    className="w-[30px] object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex justify-center items-center gap-7 max-xl:gap-4 max-sm:gap-2 md:hidden"
                        initial={{opacity: 0, x: -50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        {images2.map((image, index) => (
                            <motion.div
                                key={image}
                                className="w-1/4"
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.2 * index}}}
                                animate={{y: [0, 5, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                                viewport={{once: true}}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    alt="itinerary"
                                    width={100}
                                    height={100}
                                    className="w-[30px] object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="py-4"
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        transition={{duration: 0.6, delay: 0.4}}
                        viewport={{once: true}}
                    >
                        <div className="text-center">
                            <motion.div
                                className="text-[35px] text-white font-semibold max-sm:text-[20px]"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.6}}
                                viewport={{once: true}}
                            >
                                Tour Itinerary
                            </motion.div>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.8}}
                                viewport={{once: true}}
                                className="max-sm:text-[10px] text-white hidden md:block"
                            >
                                Highlights Of Your Journey
                            </motion.div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex justify-center items-center gap-7 max-xl:gap-4 max-sm:gap-2 max-md:hidden"
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={image}
                                className="w-1/4"
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.2 * index}}}
                                animate={{y: [0, 5, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                                viewport={{once: true}}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    alt="itinerary"
                                    width={100}
                                    height={100}
                                    className="w-[30px] object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex justify-center items-center gap-7 max-xl:gap-4 max-sm:gap-2 md:hidden"
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        {images3.map((image, index) => (
                            <motion.div
                                key={image}
                                className="w-1/4"
                                initial={{opacity: 0, scale: 0.8}}
                                whileInView={{opacity: 1, scale: 1, transition: {duration: 0.4, delay: 0.2 * index}}}
                                animate={{y: [0, 5, 0]}}
                                transition={{duration: 2, repeat: Infinity}}
                                viewport={{once: true}}
                            >
                                <Image
                                    src={getImageUrl(image)}
                                    alt="itinerary"
                                    width={100}
                                    height={100}
                                    className="w-[30px] object-cover"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        );

    }
);

Itinerary.displayName = "Itinerary";

export default Itinerary;
