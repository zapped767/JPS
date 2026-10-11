import React, {forwardRef, useRef} from "react";
import DayTourTravelThemeCard from "@/components/ui/DayTourTravelThemeCard";

const TravelThemesData = [
    {
        title: "Cultural Exploration",
        description: "Discover ancient heritage.",
        imageSrc: "public/images/packages/travel-themes/explore-culture.webp",
        imageAlt: "Cultural Exploration - Ancient Temple",
    },
    {
        title: "Wildlife Adventures",
        description: "Thrilling wildlife safaris.",
        imageSrc: "public/images/packages/travel-themes/wildlife-adventure.webp",
        imageAlt: "Wildlife Adventures - Safari Experience",
    },
    {
        title: "Beach Getaways",
        description: "Relax by the ocean.",
        imageSrc: "public/images/packages/travel-themes/beach-getaway.webp",
        imageAlt: "Beach Getaways - Coastal Paradise",
    },
    {
        title: "Luxury Retreats",
        description: "Exclusive luxury escapes.",
        imageSrc: "public/images/packages/travel-themes/luxury-retreat.webp",
        imageAlt: "Beach Getaways - Coastal Paradise",
    },
];

type TravelThemesProps = {
    title?: string;
};

// 🔥 Utility — break array into chunks of 2
const chunkArray = <T, >(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

const DayTourTravelThemes = forwardRef<HTMLElement, TravelThemesProps>(
    ({title = "Travel Themes"}, ref) => {

        const scrollRefs = useRef<HTMLDivElement[]>([]);
        const isMouseDownRef = useRef(false);
        const startXRef = useRef(0);
        const scrollLeftRef = useRef(0);

        const handleMouseDown = (idx: number, e: React.MouseEvent) => {
            const refEl = scrollRefs.current[idx];
            if (!refEl) return;

            isMouseDownRef.current = true;
            refEl.style.cursor = "grabbing";
            startXRef.current = e.pageX;
            scrollLeftRef.current = refEl.scrollLeft;
        };

        const handleMouseUp = (idx: number) => {
            const refEl = scrollRefs.current[idx];
            isMouseDownRef.current = false;
            if (refEl) refEl.style.cursor = "grab";
        };

        const handleMouseLeave = (idx: number) => {
            const refEl = scrollRefs.current[idx];
            isMouseDownRef.current = false;
            if (refEl) refEl.style.cursor = "grab";
        };

        const handleMouseMove = (idx: number, e: React.MouseEvent) => {
            const refEl = scrollRefs.current[idx];
            if (!isMouseDownRef.current || !refEl) return;

            e.preventDefault();
            const walk = (e.pageX - startXRef.current) * 1.5;
            refEl.scrollLeft = scrollLeftRef.current - walk;
        };

        // 🔥 Break into rows of 2
        const rows = chunkArray(TravelThemesData, 2);

        return (
            <section ref={ref} id="travel-themes" className="px-6 sm:pb-5 text-gray-900 max-w-7xl mx-auto">
                <div className="text-center mb-3 md:mb-6">
                    <h2 className="font-extrabold text-[52px] max-md:text-[36px] leading-[30px]">
                        <span className="text-[#6938d3]">Travel </span>Themes
                    </h2>
                </div>

                {/* Render → 2 scrollable rows */}
                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        ref={el => {
                            if (el) scrollRefs.current[rowIndex] = el;
                        }}
                        className="flex gap-5 overflow-x-scroll packages-scroll scrollbar-hide pt-3 pb-3 sm:justify-center"
                        onMouseDown={(e) => handleMouseDown(rowIndex, e)}
                        onMouseUp={() => handleMouseUp(rowIndex)}
                        onMouseLeave={() => handleMouseLeave(rowIndex)}
                        onMouseMove={(e) => handleMouseMove(rowIndex, e)}
                    >
                        {row.map((theme, i) => (
                            <DayTourTravelThemeCard
                                key={`${rowIndex}-${i}`}
                                title={theme.title}
                                description={theme.description}
                                imageSrc={theme.imageSrc}
                                imageAlt={theme.imageAlt}
                            />
                        ))}
                    </div>
                ))}
            </section>
        );
    }
);

DayTourTravelThemes.displayName = "DayTourTravelThemes";
export default DayTourTravelThemes;
