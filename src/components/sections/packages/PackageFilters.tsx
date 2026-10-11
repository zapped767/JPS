import React from "react";
import FilterButton from "../../ui/FilterButton";

interface PackageFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export const PackageFilters = ({
                                   activeFilter,
                                   onFilterChange,
                               }: PackageFiltersProps) => {
    const filterOptions = [
        "All Packages",
        "Cultural",
        "Adventure",
        "Beach",
        "Luxury",
    ];

    const handleFilterClick = (filter: string) => {
        onFilterChange(filter);
    };

    return (
        <div className="px-[100px] max-xl:px-10 max-xl:py-0 max-md:px-5 text-gray-900">
            {/* Section Title */}
            <div className="text-center mb-6 sm:mb-10">
                <h2 className="font-plus-jakarta-sans font-extrabold text-[52px] max-md:text-[36px] leading-[30px] ">
                    <span className="text-[#6938d3]"> Our</span> Tour Packages
                </h2>
            </div>

            {/* Filter Tabs */}
            <div
                className="flex justify-center gap-[18px] mb-5 md:mb-16 max-lg:flex-wrap max-lg:justify-center max-lg:gap-4 max-md:gap-2">
                {filterOptions.map((filter) => (
                    <FilterButton
                        key={filter}
                        label={filter}
                        isActive={activeFilter === filter}
                        onClick={() => handleFilterClick(filter)}
                    />
                ))}
            </div>
        </div>
    );
};
