import React, {forwardRef, useRef} from "react";
import TravelThemeCard from "../../ui/TravelThemeCard";

const TravelThemesData = [
    {
        title: "Cultural Exploration",
        description: "Immerse yourself in Sri Lanka's rich heritage, ancient temples, and traditional villages.",
        imageSrc: "public/images/packages/travel-themes/explore-culture.webp",
        imageAlt: "Cultural Exploration - Ancient Temple",
    },
    {
        title: "Wildlife Adventures",
        description: "Discover exotic wildlife in national parks and experience thrilling safari adventures.",
        imageSrc: "public/images/packages/travel-themes/wildlife-adventure.webp",
        imageAlt: "Wildlife Adventures - Safari Experience",
    },
    {
        title: "Beach Getaways",
        description: "Relax on pristine beaches and enjoy water sports along Sri Lanka's stunning coastline.",
        imageSrc: "public/images/packages/travel-themes/beach-getaway.webp",
        imageAlt: "Beach Getaways - Coastal Paradise",
    },
    {
        title: "Luxury Retreats",
        description: "Experience bespoke tours and exclusive stays for an unforgettable luxury getaway.",
        imageSrc: "public/images/packages/travel-themes/luxury-retreat.webp",
        imageAlt: "Beach Getaways - Coastal Paradise",
    },
];

type TravelThemesProps = {
    title?: string;
}

const TravelThemes = forwardRef<HTMLElement, TravelThemesProps>(
    ({title = "Travel Themes"}, ref) => {

        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const isScrollingRef = useRef(false);
        const isMouseDownRef = useRef(false);
        const startXRef = useRef(0);
        const scrollLeftRef = useRef(0);

        const handleMouseDown = (e: React.MouseEvent) => {
            if (!scrollContainerRef.current) return;
            isMouseDownRef.current = true;
            isScrollingRef.current = true; // Prevent scroll event handler from updating index
            scrollContainerRef.current.style.cursor = 'grabbing';
            scrollContainerRef.current.style.userSelect = 'none';
            startXRef.current = e.pageX;
            scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
        };

        const handleMouseLeave = () => {
            isMouseDownRef.current = false;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab';
                scrollContainerRef.current.style.userSelect = 'auto';
            }
            // Re-enable scroll event handler after a delay
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 100);
        };

        const handleMouseUp = () => {
            isMouseDownRef.current = false;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.cursor = 'grab';
                scrollContainerRef.current.style.userSelect = 'auto';
            }
            // Re-enable scroll event handler after a delay
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 100);
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!isMouseDownRef.current || !scrollContainerRef.current) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - startXRef.current) * 1.5;
            scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
        };

        return (
            <section ref={ref} id="travel-themes" className="px-6 sm:pb-5 text-gray-900 max-md:px-5 scroll-offset">
                {/* Section Title */}
                <div className="text-center">
                    <h2 className="font-[800] text-[52px] max-md:text-[36px] leading-[30px] ">
                        <span className="text-[#6938d3]">Travel </span>Themes
                    </h2>
                </div>

                {/* Theme Cards Grid */}
                <div ref={scrollContainerRef}
                     className="flex gap-10 overflow-x-scroll packages-scroll scrollbar-hide pt-6 sm:pt-10 pb-12"
                     onMouseDown={handleMouseDown}
                     onMouseLeave={handleMouseLeave}
                     onMouseUp={handleMouseUp}
                     onMouseMove={handleMouseMove}
                >
                    {TravelThemesData.map((theme, index) => (
                        <TravelThemeCard
                            key={index}
                            title={theme.title}
                            description={theme.description}
                            imageSrc={theme.imageSrc}
                            imageAlt={theme.imageAlt}
                        />
                    ))}
                </div>
            </section>
        );
    }
);

TravelThemes.displayName = "TravelThemes";

export default TravelThemes;
