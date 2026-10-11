import React from "react";
import {ScrollIndicatorNew} from "@/components/ui/ScrollIndicatorNew";


interface PackageHeroProps {
    OnScrollToTravelThemes: () => void;
    dayTours?: boolean;
}

export const PackagesHero = ({OnScrollToTravelThemes, dayTours}: PackageHeroProps) => {
    return (
        <section
            className="relative pb-6 sm:pb-8 px-4 lg:px-[100px] text-center">
            {/*Main Title*/}
            <h1 className="font-plus-jakarta-sans font-extrabold text-[65px] max-md:text-[36px] leading-[82px] text-[#262626] mb-[9px] ">
                Discover <span className="text-secondary-600">Sri Lanka</span>
            </h1>

            {/* Subtitle */}
            <p className="font-medium text-[18px] max-md:text-[16px] leading-[30px] text-[#525252] mb-10 sm:mb-8 max-w-[826px] mx-auto px-4">
                Explore our curated collection of unforgettable experiences in the heart
                of the Indian Ocean
            </p>

            {/*Down Arrow Button*/}
            <div className="flex justify-center items-center relative">
                <ScrollIndicatorNew onScroll={OnScrollToTravelThemes}
                                    sectionName={dayTours ? "DAY TOURS" : "TRAVEL THEMES"}/>
            </div>
        </section>
    );
};

export default PackagesHero;
