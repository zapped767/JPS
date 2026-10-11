import React from "react";
import {ScrollIndicatorNew} from "@/components/ui/ScrollIndicatorNew";


interface PackageHeroProps {
    OnScrollToTravelThemes: () => void;
}

export const DayTourHero = ({OnScrollToTravelThemes}: PackageHeroProps) => {
    return (
        <section
            className="relative pb-4 sm:pb-8 px-4 lg:px-[100px] text-center">
            {/*Main Title*/}
            <h1 className="font-plus-jakarta-sans font-extrabold text-[65px] max-md:text-[30px] leading-[82px] text-[#262626] mb-[9px] ">
                Day Trips <span className="text-secondary-600">Made Easy</span>
            </h1>

            {/* Subtitle */}
            <p className="font-medium text-[18px] max-md:text-[14px] leading-[30px] max-md:leading-[24px] text-[#525252] mb-6 sm:mb-8 max-w-[826px] mx-auto px-4">
                Experience our curated selection of exceptional day tours crafted for unforgettable island adventures.
            </p>

            {/*Down Arrow Button*/}
            <div className="flex justify-center items-center relative">
                <ScrollIndicatorNew onScroll={OnScrollToTravelThemes} sectionName={"DAY TOURS"}/>
            </div>
        </section>
    );
};

export default DayTourHero;
