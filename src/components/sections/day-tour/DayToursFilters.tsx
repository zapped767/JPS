import React from "react";
import FilterButton from "../../ui/FilterButton";

interface PackageFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    filters: string[] | undefined
}

export const DayToursFilters = ({
                                    activeFilter,
                                    onFilterChange,
                                    filters
                                }: PackageFiltersProps) => {
    const filterOptions = [
        "All Day Tours",
        ...(filters ?? [])
    ];

    const handleFilterClick = (filter: string) => {
        onFilterChange(filter);
    };

    return (
        <div id="day-tours" className="px-[100px] max-xl:px-10 max-xl:py-0 max-md:px-5 text-gray-900 scroll-offset">
            {/* Section Title */}
            <div className="text-center mb-4 sm:mb-10">
                <h2 className="font-plus-jakarta-sans font-extrabold text-[52px] max-md:text-[36px] leading-[30px] ">
                    <span className="text-[#6938d3]"> Our</span> Day Tours
                </h2>
            </div>

            {/* Filter Tabs */}
            <div
                className="flex justify-center gap-[18px] mb-5 md:mb-6 max-lg:flex-wrap max-lg:justify-center max-lg:gap-4 max-md:gap-2">
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
