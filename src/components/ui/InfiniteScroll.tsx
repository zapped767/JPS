import React, { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const scrollItems = [
    {
        text: "Get the Experience of Hassle free travel with us",
        image: "public/images/craft-journey/hiking.webp",
    },
    {
        text: "Discover the vibrant soul of Sri Lanka",
        image: "public/images/craft-journey/island.webp",
    },
    {
        text: "Get the Experience of Hassle free travel with us",
        image: "public/images/craft-journey/lotus-tower.webp",
    },
];

export const InfiniteScroll: React.FC = () => {
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <section className="pt-0 pb-8 bg-white overflow-hidden">
            <div className="relative">
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex items-center gap-4 max-lg:gap-4 max-md:gap-4 cursor-pointer"
                    style={{
                        animation: 'scroll 45s linear infinite',
                        animationPlayState: isPaused ? 'paused' : 'running',
                        transform: 'translateX(-100px)',
                    }}
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-4 max-md:gap-2">
                            {scrollItems.map((item, index) => (
                                <div
                                    key={`${i}-${index}`}
                                    className="
                                    flex items-center gap-4
                                    bg-white shadow-lg rounded-xl
                                    p-2
                                    w-[407px] h-[90px]
                                    max-md:w-[184px] max-md:h-[70px]
                                    flex-shrink-0
                                "
                                >
                                    {/* IMAGE */}
                                    <div className="w-[83px] h-[83px] max-md:w-[40px] max-md:h-[40px] rounded-md overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={item.text}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* TEXT */}
                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <p
                                            className="
                                            text-[14px] font-semibold text-neutral-700
                                            leading-tight
                                            line-clamp-2
                                            max-md:text-[7px]
                                        "
                                        >
                                            {item.text}
                                        </p>

                                        <span
                                            className="
                                            mt-1 text-primary-500 font-medium
                                            text-[12px]
                                            max-md:text-[7px]
                                        "
                                        >
                                            Read more...
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
