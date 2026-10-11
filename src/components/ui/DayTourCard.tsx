import React from "react";
import { Plus, Star } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import { FaClock, FaRegClock } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import Image from "next/image";

interface PackageCardProps {
  id: number;
  image: string;
  title: string;
  description?: string;
  adultPrice: number;
  durationHours: string;
  rating?: number;
  className?: string;
  slug?: string;
  promotion?: any;
  tourType: string;
  dayTour?: boolean;
}

export const DayTourCard: React.FC<PackageCardProps & { index: number }> = ({
  index,
  slug,
  image,
  title,
  adultPrice,
  durationHours,
  className,
  promotion,
  tourType,
}) => {
  const router = useRouter();

  const images = image ? image.split(",").map((img) => img.trim()) : [];

  const prevId = `prev-btn-${index}`;
  const nextId = `next-btn-${index}`;

  const handleExploreClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem("prev", "/");
    try {
      await router.push(`/day-tour/${slug}`);
    } catch (error) {}
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
  }).format(adultPrice);

  const finalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceAfterPromotion(adultPrice));

  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-md md:shadow-lg h-full transition-all duration-500 ease-out overflow-hidden cursor-pointer group",
        className
      )}
    >
      {/* Swiper Carousel */}
      <div className="relative h-[264px] max-md:h-[163px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{ nextEl: `#${nextId}`, prevEl: `#${prevId}` }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              {/* Fixed: Replace background-image with Next/Image for optimization */}
              <div className="w-full h-full relative">
                <Image
                  src={getImageUrl(img)}
                  alt={`${title} - image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover object-center"
                  quality={75}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fixed: Added aria-label for accessibility */}
        <button
          id={prevId}
          aria-label={`Previous image for ${title}`}
          className="cursor-pointer z-30 absolute top-1/2 left-2 -translate-y-1/2 w-12 h-12 max-md:w-[30px] max-md:h-[30px] rounded-full text-primary-600 flex items-center justify-center hover:bg-primary-200/50 shadow-md"
        >
          <IoIosArrowBack
            className="w-5 h-5 text-secondary-500"
            aria-hidden="true"
          />
        </button>

        {/* Fixed: Added aria-label for accessibility */}
        <button
          id={nextId}
          aria-label={`Next image for ${title}`}
          className="cursor-pointer z-30 absolute top-1/2 right-2 -translate-y-1/2 w-12 h-12 max-md:w-[30px] max-md:h-[30px] rounded-full text-primary-600 flex items-center justify-center hover:bg-primary-200/50 shadow-md"
        >
          <IoIosArrowForward
            className="w-5 h-5 text-secondary-500"
            aria-hidden="true"
          />
        </button>

        {/* Promotion Badge */}
        {promotion && (
          <div className="absolute top-0 right-0 flex flex-col gap-2 items-end z-10">
            <div className="bg-[#EB00A5] backdrop-blur-sm text-white ps-5 pe-3 py-1 rounded-bl-xl flex items-center gap-2 max-md:ps-3 max-md:pe-2 max-md:py-1.5">
              <span className="text-[14px] font-bold max-md:text-[11px]">
                {promotion.type === "PERCENTAGE"
                  ? `${promotion.value}% OFF`
                  : `$${promotion.value} OFF`}
              </span>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-0 left-0 bg-[#23232399] backdrop-blur-sm text-white ps-5 pe-3 py-2 rounded-r-lg flex items-center gap-2 max-md:ps-3 max-md:pe-2 max-md:py-1.5">
          <FaClock
            className="w-4 h-4 max-md:w-3 max-md:h-3"
            aria-hidden="true"
          />
          <span className="text-[11px] font-medium max-md:text-[8px]">
            {durationHours} Hours
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-md:p-2 max-md:space-y-2 !h-full">
        <h3 className="text-[28px] max-md:text-[26px] max-[426px]:text-[24px]! font-semibold text-neutral-900 line-clamp-2">
          {title}
        </h3>

        <div>
          <ul
            className="flex items-center gap-4 sm:gap-6 text-sm sm:text-md"
            aria-label="Tour details"
          >
            <li className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full text-[14px] max-md:text-[11px]">
              {tourType.charAt(0).toUpperCase() +
                tourType.slice(1).toLowerCase()}
            </li>
            <li className="flex items-center gap-2 bg-black/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full text-[14px] max-md:text-[11px]">
              <FaRegClock
                className="w-4 h-4 max-md:w-3 max-md:h-3"
                aria-hidden="true"
              />
              <span>{durationHours} hrs</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-start pt-2 gap-2 md:gap-8">
          <div className="bg-green-500/10 backdrop-blur-sm px-2 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-1">
            <MdOutlineFreeCancellation
              className="text-green-500"
              aria-hidden="true"
            />
            <span className="text-[14px] max-md:text-[11px] text-green-500">
              Free Cancellation
            </span>
          </div>
          <div
            className="items-center gap-2 md:gap-2 flex bg-accent-orange/20 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-1.5 rounded-full"
            aria-label="Rating: 5 out of 5 stars"
          >
            <Star
              className="w-4 h-4 md:w-5 md:h-5 fill-accent-orange text-accent-orange"
              aria-hidden="true"
            />
            <span className="text-[14px] md:text-[16px] text-secondary-700">
              5
            </span>
          </div>
        </div>

        {/* Footer */}
       <div className="flex items-end justify-between pt-2 mt-auto">
          <div className="grid grid-cols-[repeat(2,auto)] gap-2 items-end">
            <div className="flex flex-col">
              <span className="min-[880px]:text-2xl text-xl font-bold text-primary-500 max-md:text-sm relative">
                {promotion && <span className="sr-only">Original price: </span>}
                {formattedPrice}
                {promotion && (
                  <div
                    className="absolute top-[50%] left-0 w-full border-b-2 border-primary-500"
                    aria-hidden="true"
                  ></div>
                )}
              </span>
              {promotion && (
                <span className="min-[880px]:text-2xl text-xl font-bold text-secondary-700 max-md:text-sm">
                  <span className="sr-only">Discounted price: </span>
                  {finalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500" aria-hidden="true">
                <RxCross1 />
              </span>
              <span
                className={`min-[880px]:text-2xl text-xl font-bold ${
                  promotion ? "text-secondary-700" : "text-primary-500"
                } max-md:text-sm`}
                aria-label="per person"
              >
                PP
              </span>
            </div>
          </div>

          {/* Fixed: Added aria-label for the Explore button */}
          <button
            onClick={handleExploreClick}
            aria-label={`Explore ${title} day tour`}
            className="bg-[#F2E7FF] text-[#872BFF] rounded-xl px-3 py-2.5 max-md:px-2 max-md:py-1.5 flex items-center gap-2 text-[12px] font-semibold max-md:text-[10px] cursor-pointer transition-all duration-400 ease-out transform hover:scale-105"
          >
            <Plus className="w-4 h-4 fill-[#872BFF]" aria-hidden="true" />
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};
