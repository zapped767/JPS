import React, {useEffect, useRef, useState} from "react";
import {PackageCardSkeleton} from "../../ui/PackageCardSkeleton";
import {DayTourCard} from "@/components/sections/day-tour/DayTourCard";
import {getImageUrl} from "@/lib/utils";

interface PackageGridProps {
    activeFilter?: string;
    data: any;
    isLoading: boolean,
    error: any
}

export const DayToursGrid = ({
                                 activeFilter = "All Day Tours",
                                 data,
                                 isLoading,
                                 error
                             }: PackageGridProps) => {
    const [allPackages, setAllPackages] = useState<any[]>([]);

    const scrollRefs = useRef<HTMLDivElement[]>([]);
    const isScrollingRef = useRef(false);
    const isMouseDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    // Update packages when new data arrives
    useEffect(() => {
        if (data) {
            setAllPackages(data);
        }
    }, [data]);

    const filteredPackages = React.useMemo(() => {
        if (activeFilter === "All Day Tours") return allPackages;

        return allPackages.filter(pkg => {
            return pkg.tourType.toLowerCase() === activeFilter.toLowerCase();
        });
    }, [activeFilter, allPackages]);

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        const ref = scrollRefs.current[index];
        if (!ref) return;

        isMouseDownRef.current = true;
        isScrollingRef.current = true;
        ref.style.cursor = "grabbing";
        ref.style.userSelect = "none";
        startXRef.current = e.pageX;
        scrollLeftRef.current = ref.scrollLeft;
    };

    const handleMouseLeave = (index: number) => {
        const ref = scrollRefs.current[index];
        isMouseDownRef.current = false;
        if (ref) {
            ref.style.cursor = "grab";
            ref.style.userSelect = "auto";
        }
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 100);
    };

    const handleMouseUp = (index: number) => {
        const ref = scrollRefs.current[index];
        isMouseDownRef.current = false;
        if (ref) {
            ref.style.cursor = "grab";
            ref.style.userSelect = "auto";
        }
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 100);
    };

    const handleMouseMove = (index: number, e: React.MouseEvent) => {
        const ref = scrollRefs.current[index];
        if (!isMouseDownRef.current || !ref) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startXRef.current) * 1.5;
        ref.scrollLeft = scrollLeftRef.current - walk;
    };

    const chunkArray = <T, >(arr: T[], size: number): T[][] => {
        const res: T[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            res.push(arr.slice(i, i + size));
        }
        return res;
    };

    const rows = chunkArray(filteredPackages, 3);

    const getImages = (images: string) => {
        const imagesArray = images ? images.split(",").map((img) => img.trim()) : [];
        return imagesArray.map((img) => getImageUrl(img));
    }

    if (error) {
        return (
            <div className="px-[100px] pb-[88px] max-xl:px-5 max-md:pb-10">
                <div className="text-center py-20">
                    <p className="text-red-500 text-lg">
                        Error loading packages. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-[100px] max-xl:px-5 max-md:pb-2">
            {/* Package Grid */}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex}
                     ref={(el) => {
                         if (el) scrollRefs.current[rowIndex] = el;
                     }}
                     className="flex min-[960px]:grid min-[960px]:grid-cols-3 gap-5 md:gap-10 overflow-x-scroll packages-scroll scrollbar-hide sm:pt-10 pb-6 sm:pb-12"
                     onMouseDown={(e) => handleMouseDown(rowIndex, e)}
                     onMouseLeave={() => handleMouseLeave(rowIndex)}
                     onMouseUp={() => handleMouseUp(rowIndex)}
                     onMouseMove={(e) => handleMouseMove(rowIndex, e)}
                >
                    {row.map((pkg, index) => {
                        const images = getImages(pkg.image);
                        if (!images.length) return null;
                        return (
                            <DayTourCard
                                index={index}
                                key={pkg.id}
                                id={pkg.id}
                                title={pkg.name}
                                description={pkg.description}
                                durationHours={pkg.durationHours}
                                rating={pkg.rating}
                                adultPrice={pkg.adultPrice}
                                images={images}
                                tourType={pkg.tourType}
                                slug={pkg.slug}
                                promotion={pkg.promotion}
                            />
                        );
                    })}

                    {isLoading && allPackages.length === 0 && (
                        <>
                            {Array.from({length: 6}).map((_, index) => (
                                <div key={`skeleton-${index}`}>
                                    <PackageCardSkeleton/>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}

            {/* No packages found */}
            {!isLoading && allPackages.length === 0 && !error && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                        No packages found for the selected filter.
                    </p>
                </div>
            )}
        </div>
    );
};
