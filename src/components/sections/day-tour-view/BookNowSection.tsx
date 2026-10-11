import React from "react";
import {Promotion} from "@/components/sections/day-tour-view/DayTourHeroSection";
import {Button} from "@/components/ui/Button";
import {useIsMobile} from "@/hooks/useIsMobile";

interface BookNowSectionProps {
    price: number,
    promotion: Promotion | null
    onClick : () => void
}

export const BookNowSection = ({price, promotion, onClick}: BookNowSectionProps) => {

    const isMobile = useIsMobile();

    const priceAfterPromotion = (price: number) => {
        if (!promotion) return price;
        if (promotion.type === "PERCENTAGE") {
            return price - (price * promotion.value) / 100;
        } else {
            return price - promotion.value;
        }
    };

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);

    const finalPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceAfterPromotion(price));

  return (
    <div className={`${isMobile ? "flex" : "hidden"} fixed bottom-0 left-0 w-full h-20 bg-white z-30 items-center justify-around gap-4`}>
        <div className="flex items-center justify-start min-[375px]:items-end gap-2">
            <div
                className="flex xl:flex-row xl:gap-4 text-center text-lg lg:text-xl xl:text-2xl items-center justify-center min-[375px]:justify-end xl:items-start! gap-4">
                                    <span className="font-bold text-[#fcc417] relative">{formattedPrice || "Loading..."}
                                        {promotion && <span
                                            className="absolute top-[50%] left-0 w-full border-b border-secondary-700"></span>}</span>
                {promotion &&
                    <span className="flex items-end gap-1">
                                            <span
                                                className="font-bold text-secondary-700">{finalPrice || "Loading..."}</span>
                                            <span className="font-semibold text-sm lg:text-lg leading-5 text-black/50 mb-1">PP</span>
                                        </span>
                }
            </div>
            {!promotion && <div className="flex justify-center items-center">
                <p className="font-semibold text-sm lg:text-lg leading-5 text-black/50 min-[375px]:mb-0.5">PP</p>
            </div>}
        </div>
      <div>
         <Button onClick={onClick} type={"button"} variant={"primary"} size={"sm"} className="w-full">
             Proceed to Payment
         </Button>
      </div>
    </div>
  )
}