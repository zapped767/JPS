import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import {FeatureCard, FeatureCardComponent,} from "@/components/sections/home/FeatureCardComponent";
import {FaCameraRetro, FaSimCard} from "react-icons/fa";
import {IoFastFoodSharp} from "react-icons/io5";
import {InsuranceCardComponent} from "@/components/ui/InsuranceCardComponent";
import {FaBottleWater} from "react-icons/fa6";
import {useIsMobile} from "@/hooks/useIsMobile";

export const ServicesSection: React.FC = () => {
    const isMobile = useIsMobile();

    //   const [isLoaded, setIsLoaded] = useState(false);
    //   useEffect(() => {
    //     setIsLoaded(true);
    //   }, []);
    const services: FeatureCard[] = [
        {
            icon: <FaSimCard size={isMobile ? 30 : 40}/>,
            title: "Free eSIM With Data",
            description:
                "Instant connectivity with a pre-activated eSIM for all travelers.",
        },
        {
            icon: <IoFastFoodSharp size={isMobile ? 30 : 40}/>,
            title: "Daily Breakfast Included",
            description: "Fresh breakfasts served daily to delight every guest.",
        },
        {
            icon: <FaBottleWater size={isMobile ? 30 : 40}/>,
            title: "Unlimited Bottled Water",
            description:
                "Daily purified bottled water supplied to keep all refreshed.",
        },
        {
            icon: <FaCameraRetro size={35}/>,
            title: "Photography Support (On Request)",
            description: "Your chauffeur-guide helps capture memorable moments.",
        },
    ];

    return (
        <section
            id="services"
            className="sm:pt-8 md:pt-10 relative overflow-hidden"
            style={{
                contain: "layout style paint",
            }}
        >
            {/* {!isLoaded ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      ) : ( */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    {/* Section Header */}
                    <div
                        className="text-center mb-6 md:mb-10"
                        style={{minHeight: "140px"}}
                    >
                        <h2 className="text-4xl lg:text-[42px] max-md:text-[20px] font-semibold font-dm-sans text-secondary-700">
                            Premium Free Inclusions for Every Traveler
                        </h2>
                        <p
                            className="pt-3 font-plus-jakarta-sans font-medium text-[18px] leading-[30px] text-[#6B6B6B] cursor-default
                        max-md:text-[16px] max-md:leading-[26px] max-sm:text-[14px] max-sm:leading-6"
                        >
                            Every traveler receives our premium complimentary services
                            designed for safety, comfort, and a truly seamless Sri Lankan
                            journey.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="col-span-2 flex justify-center md:col-span-1 md:flex-none mb-3 md:mb-6 ">
                        <InsuranceCardComponent/>
                    </div>
                    <div className="grid grid-cols-2 lg:flex justify-center items-center gap-4 md:gap-6 max-md:gap-4 ">
                        {services.map((feature, index) => (
                            <div key={index + 1}>
                                <FeatureCardComponent feature={feature} index={index + 1}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* )} */}
        </section>
    );
};
