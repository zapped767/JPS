import React, {useEffect, useRef, useState} from "react";
import {PackageCardSkeleton} from "../../ui/PackageCardSkeleton";
import {PackageCard} from "./PackageCard";

interface PackageGridProps {
    activeFilter?: string;
    data: any;
    isLoading: boolean,
    error: any
}

export const PackageGrid = ({
                                activeFilter = "All Packages",
                                data,
                                isLoading,
                                error
                            }: PackageGridProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [allPackages, setAllPackages] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const scrollRefs = useRef<HTMLDivElement[]>([]);
    const isScrollingRef = useRef(false);
    const isMouseDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    // Update packages when new data arrives
    useEffect(() => {
        if (data?.content) {
            if (currentPage === 0) {
                // First page - replace all packages
                setAllPackages(data.content);
            } else {
                // Subsequent pages - append to existing packages
                setAllPackages((prev) => [...prev, ...data.content]);
            }

            // Check if there are more pages
            setHasMore(data.currentPage < data.totalPages - 1);
        }
    }, [data, currentPage]);

    const filteredPackages = React.useMemo(() => {
        if (activeFilter === "All Packages") return allPackages;

        return allPackages.filter(pkg => {
            const firstTag = pkg.badgeTags?.[0]?.toLowerCase();
            return firstTag === activeFilter.toLowerCase();
        });
    }, [activeFilter, allPackages]);

    // Transform API data to package card props
    const transformPackageData = (pkg: any) => {
        const duration = `${pkg.durationDays} Days & ${pkg.durationNights} Night${
            pkg.durationNights > 1 ? "s" : ""
        }`;
        const price = `$${pkg.adultTotalPrice?.toFixed(0) || "0"}`;

        // Get first badge tag if available
        const badge =
            pkg.badgeTags && pkg.badgeTags.length > 0
                ? {
                    text: pkg.badgeTags[0],
                    color: "pink" as const,
                }
                : undefined;

        return {
            id: pkg.id,
            title: pkg.name,
            description: pkg.description,
            duration,
            price,
            imageUrl: pkg.image,
            badge,
            rating: pkg.rating,
        };
    };

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
        <div className="px-[100px] pb-10 max-xl:px-5 max-md:pb-10">
            {/* Package Grid */}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex}
                     ref={(el) => {
                         if (el) scrollRefs.current[rowIndex] = el;
                     }}
                     className="flex min-[960px]:grid min-[960px]:grid-cols-3 gap-5 md:gap-10 overflow-x-scroll packages-scroll scrollbar-hide pt-6 sm:pt-10 pb-6 sm:pb-12 px-5"
                     onMouseDown={(e) => handleMouseDown(rowIndex, e)}
                     onMouseLeave={() => handleMouseLeave(rowIndex)}
                     onMouseUp={() => handleMouseUp(rowIndex)}
                     onMouseMove={(e) => handleMouseMove(rowIndex, e)}
                >
                    {row.map((pkg) => {
                        const transformedPkg = transformPackageData(pkg);
                        return (
                            <PackageCard
                                key={pkg.id}
                                id={pkg.id}
                                title={transformedPkg.title}
                                description={transformedPkg.description}
                                durationDays={pkg.durationDays}
                                durationNights={pkg.durationNights}
                                rating={pkg.rating}
                                adultTotalPrice={pkg.adultTotalPrice}
                                image={transformedPkg.imageUrl}
                                tags={pkg.badgeTags}
                                slug={pkg.slug}
                                promotion={pkg.promotion}
                            />
                        );
                    })}

                    {/* Show skeleton loading for initial load or when loading more */}
                    {isLoading && allPackages.length === 0 && (
                        <>
                            {Array.from({length: 6}).map((_, index) => (
                                <PackageCardSkeleton key={`skeleton-${index}`}/>
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
