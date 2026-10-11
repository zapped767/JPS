import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PackageCard } from "@/components/ui/PackageCard";
import { packageService } from "@/services/packages";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { getImageUrl } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";

export const PackagesSection: React.FC = () => {
  const router = useRouter();

  const isMobileSize = useIsMobile();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isScrollingRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: packageData } = useQuery({
    queryKey: ["packages", "popular"],
    queryFn: packageService.getPopularPackages,
  });

  const handlePrevious = () => {
    if (currentIndex > 0) {
      isScrollingRef.current = true;
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);

      if (scrollContainerRef.current) {
        const cardWidth = isMobile ? 223 + 16 : 338 + 16;
        scrollContainerRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    }
  };

  const handleNext = () => {
    if (packageData && currentIndex < packageData.length - 1) {
      isScrollingRef.current = true;
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      if (scrollContainerRef.current) {
        const cardWidth = isMobile ? 223 + 16 : 338 + 16;
        scrollContainerRef.current.scrollTo({
          left: newIndex * cardWidth,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    }
  };

  // Update currentIndex based on scroll position (only for manual scrolling)
  useEffect(() => {
    const handleScroll = () => {
      if (
        !isScrollingRef.current &&
        scrollContainerRef.current &&
        packageData
      ) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const cardWidth = isMobile ? 223 + 16 : 338 + 16;
        const newIndex = Math.round(scrollLeft / cardWidth);
        const clampedIndex = Math.max(
          0,
          Math.min(newIndex, packageData.length - 1)
        );
        setCurrentIndex(clampedIndex);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMobile, packageData]);

  // Calculate visible items and determine if at end
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const calculateCardsPerView = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const cardWidth = isMobile ? 223 + 16 : 338 + 16;
        const cards = Math.floor(containerWidth / cardWidth);
        setCardsPerView(cards);
      }
    };

    calculateCardsPerView();
    window.addEventListener("resize", calculateCardsPerView);
    return () => window.removeEventListener("resize", calculateCardsPerView);
  }, [isMobile]);

  const totalItems = packageData?.length || 0;
  const isAtEnd = currentIndex >= totalItems - cardsPerView;

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isMouseDownRef.current = true;
    isScrollingRef.current = true; // Prevent scroll event handler from updating index
    scrollContainerRef.current.style.cursor = "grabbing";
    scrollContainerRef.current.style.userSelect = "none";
    startXRef.current = e.pageX;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.userSelect = "auto";
    }
    // Re-enable scroll event handler after a delay
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
      scrollContainerRef.current.style.userSelect = "auto";
    }
    // Re-enable scroll event handler after a delay
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  return (
    <section
      id="package"
      className="bg-transparent relative overflow-hidden min-[1360px]:flex min-[1360px]:justify-center scroll-offset w-full sm:mt-4"
    >
      <div className="relative z-10 max-w-7xl max-2xl:mx-10 mx-auto max-sm:mx-6 w-full">
        {/* Header */}
<div className="flex justify-between items-center">
  <div className="mb-2">
    <h2 className="text-4xl lg:text-[42px] max-md:text-[20px] font-semibold font-dm-sans text-secondary-700">
      Popular Packages
    </h2>
    <p className="text-neutral-700 text-[20px] max-md:text-[14px] mb-4 max-sm:mb-0">
      Explore Sri Lankan Beauty
    </p>
  </div>
  <div className="flex flex-col items-end">
    <div className="flex gap-4 -mr-3 md:-ml-2">
              <motion.button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                role="button"
                aria-label="Previous slide"
                tabIndex={0}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 max-md:w-[30px] max-md:h-[30px] rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                    : "bg-primary-100 text-primary-600 hover:bg-primary-200 cursor-pointer hover:shadow-lg"
                }`}
              >
                <IoIosArrowBack className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={isAtEnd}
                role="button"
                aria-label="Next slide"
                tabIndex={0}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-full max-md:w-[30px] max-md:h-[30px] flex items-center justify-center transition-all duration-300 ${
                  isAtEnd
                    ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                    : "bg-primary-100 text-primary-600 hover:bg-primary-200 cursor-pointer hover:shadow-lg"
                }`}
              >
                <IoIosArrowForward className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
        {/* Packages Slider */}
        <div className="relative py-2">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide packages-scroll cursor-grab"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {packageData?.map((pkg: any, index: number) => (
              <div
                key={index}
                role="button"
                aria-label={`Learn more about ${pkg.packageWebRS.title}`}
                tabIndex={0}
                className="shrink-0 max-[376px]:w-[200px]! w-[338px] max-md:w-[223px] px-2 py-8 max-sm:pb-8 max-sm:pt-2 max-sm:px-0 flex"
              >
                <PackageCard
                  {...pkg.packageWebRS}
                  title={pkg.packageWebRS.name}
                  slug={pkg.packageWebRS.slug}
                  promotion={pkg.packageWebRS.promotion}
                  imageProps={{
                    loading: index === 0 ? "eager" : "lazy",
                    priority: index === 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center p-2"
        >
          <Button
            variant="primary"
            size={isMobileSize ? "sm" : "md"}
            className="mb-6 font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push("/packages")}
          >
            View All Packages
            <span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src={getImageUrl("public/images/right-arrow.webp")}
                  alt=""
                  width={20}
                  height={20}
                />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
