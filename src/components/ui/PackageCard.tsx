import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Plus, Star } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import { FaClock } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/router";
import Image from "next/image";

interface PackageCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  adultTotalPrice: number;
  durationDays: string;
  durationNights: string;
  rating?: number;
  className?: string;
  slug?: string;
  promotion?: any;
  tags?: string[];
  imageProps?: {
    loading?: "eager" | "lazy";
    priority?: boolean;
  };
}

export const PackageCard: React.FC<PackageCardProps> = ({
  image,
  title,
  description,
  adultTotalPrice,
  durationDays,
  durationNights,
  rating,
  className,
  slug,
  promotion,
  tags,
  imageProps,
}) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    sessionStorage.setItem("prev", "/");
    try {
      await router.push(`/explore/${slug}`);
    } catch (error) {
      setIsNavigating(false);
    }
  };

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
  }).format(adultTotalPrice);

  const finalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceAfterPromotion(adultTotalPrice));

  return (
    <>
      <motion.div
        onClick={handleExploreClick}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover="hover"
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={cn(
          "bg-white rounded-3xl shadow-lg md:shadow-xl h-full transition-all duration-500 ease-out overflow-hidden cursor-pointer group flex flex-col",
          className
        )}
        style={{ willChange: "opacity" }}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-392/240 overflow-hidden">
          <Image
            src={getImageUrl(image)}
            alt={title || "Package image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
            className="object-cover"
            quality={imageProps?.priority ? 85 : 70}
            loading={imageProps?.loading || "lazy"}
            priority={imageProps?.priority || false}
            fetchPriority={imageProps?.priority ? "high" : "auto"}
          />
          <motion.div
            className=" "
            variants={{
              initial: { scale: 1 },
              hover: {
                scale: 1.05,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          ></motion.div>

          <div className="absolute bottom-0 right-0 bg-[#00000054] backdrop-blur-sm text-white px-3 py-1 rounded-l-2xl items-center gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-90 max-md:opacity-90 flex">
            <Star className="w-4 h-4 fill-accent-orange text-accent-orange" />
            <span className="text-[11px] max-md:text-[8px]">{rating}</span>
          </div>

          {tags && tags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 items-end">
              <div className="bg-[#EB00A5] backdrop-blur-sm text-white px-3 py-1 rounded-2xl items-center gap-1 flex w-fit">
                <span className="text-[11px] max-md:text-[8px]">
                  {tags ? tags[0] : ""}
                </span>
              </div>
            </div>
          )}

          {promotion && (
            <div className="absolute top-0 right-0 flex flex-col gap-2 items-end">
              <div className=" bg-[#eb00a5] backdrop-blur-sm text-white ps-5 pe-3 py-1 rounded-bl-xl flex items-center gap-2 max-md:ps-3 max-md:pe-2 max-md:py-1.5">
                <span className="text-[14px] font-bold max-md:text-[11px]">
                  {promotion
                    ? promotion.type === "PERCENTAGE"
                      ? `${promotion.value}%  OFF`
                      : `$${promotion.value} OFF`
                    : ""}
                </span>
              </div>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute bottom-0 left-0 bg-[#23232399] backdrop-blur-sm text-white ps-5 pe-3 py-2 rounded-r-lg flex items-center gap-2 max-md:ps-3 max-md:pe-2 max-md:py-1.5">
            <FaClock className="w-4 h-4 max-md:w-3 max-md:h-3" />
            <span className="text-[11px] font-medium max-md:text-[8px]">
              {durationDays} Days & {durationNights} Nights
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-md:p-4 max-md:space-y-4 flex-1 flex flex-col ">
          {/* Title */}
          <h3 className="text-[20px] font-semibold text-neutral-900 line-clamp-2 max-md:text-[18px] max-[426px]:text-[24px]! ">
            {title}
          </h3>

          {/* Description */}
          <p className="text-neutral-700 text-sm leading-relaxed line-clamp-3 max-md:text-[9px] flex-1">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-end justify-between pt-2 mt-auto">
            {/* Price */}
            <div className="grid grid-cols-[repeat(2,auto)] gap-2 items-end">
              <div className="flex flex-col">
                <span className="min-[880px]:text-2xl text-xl font-bold text-primary-500 max-md:text-sm relative">
                  {formattedPrice}
                  {promotion && (
                    <div className="absolute top-[50%] left-0 w-full border-b-2 border-primary-500"></div>
                  )}
                </span>
                {promotion && (
                  <span className="min-[880px]:text-2xl text-xl font-bold text-secondary-700 max-md:text-sm">
                    {finalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">
                  <RxCross1 />
                </span>
                <span
                  className={`min-[880px]:text-2xl text-xl font-bold ${
                    promotion ? "text-secondary-700" : "text-primary-500"
                  } max-md:text-sm`}
                >
                  PP
                </span>
              </div>
            </div>

            {/* Slug Button */}
            <motion.button
              onClick={handleExploreClick}
              disabled={isNavigating}
              className={cn(
                "bg-[#F2E7FF] text-[#872BFF] rounded-xl px-3 py-2.5 max-md:px-2 max-md:py-1.5 flex items-center gap-2 text-[12px] font-semibold max-md:text-[10px] cursor-pointer transition-all duration-400 ease-out transform hover:scale-105",
                isNavigating && "opacity-70 cursor-not-allowed"
              )}
              whileHover={isNavigating ? {} : "hover"}
              initial="initial"
              variants={{
                initial: {},
                hover: {},
              }}
            >
              {isNavigating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <motion.div
                    variants={{
                      initial: {
                        rotate: 0,
                        scale: 1,
                      },
                      hover: {
                        rotate: 90,
                        scale: 1.1,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      },
                    }}
                  >
                    <Plus className="w-4 h-4 fill-[#872BFF]" />
                  </motion.div>
                  Explore
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
