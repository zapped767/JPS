import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FaCompass, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { BiSolidSend } from "react-icons/bi";
import { useRouter } from "next/router";
import { getImageUrl } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Settings2 } from "lucide-react";
import { ScrollIndicatorNew } from "@/components/ui/ScrollIndicatorNew";
import { TbMap2 } from "react-icons/tb";

export const HeroSection: React.FC = () => {
  const router = useRouter();

  const isMobile = useIsMobile();

  const handleCustomizeClick = (): void => navigateAndScroll("inquiry-section");

  const scrollToTarget = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navigateAndScroll = (targetId: string): void => {
    if (typeof window === "undefined") return;

    if (window.location.pathname === "/packages") {
      scrollToTarget(targetId);
    } else {
      const handleRouteDone = (): void => {
        setTimeout(() => scrollToTarget(targetId), 150);
        router.events.off("routeChangeComplete", handleRouteDone);
      };

      router.events.on("routeChangeComplete", handleRouteDone);
      router
        .push(`/packages/#${targetId}`)
        .then(() => scrollToTarget(targetId));
    }
  };

  const ScrollToPackage = () => {
    const el = document.getElementById("package");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" aria-label="Hero section - Explore Sri Lanka">
      {/* Background Elements */}

      <div className=" max-w-7xl mx-auto grid md:grid-cols-2 xl:gap-12 items-center max-xl:px-10 max-sm:px-4 lg:mb-10 relative">
        <div className="absolute bottom-5 inset-x-0 flex justify-center">
          <ScrollIndicatorNew
              onScroll={ScrollToPackage}
              sectionName={"EXPLORE"}
          />
        </div>

        {/* Left Content - Render immediately for LCP */}
        <div className=" max-md:text-center">
          {/* Badge - Render immediately, animation only for compass icon */}
          <div className="mb-2 md:mb-4 bg-white text-secondary-500 inline-flex relative items-center gap-2 px-7 py-2 rounded-full text-[10px] sm:text-[14px] md:text-[16px] font-bold shadow-xl z-10">
            Explore Sri Lanka!
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaCompass className="w-4 h-4" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Heading - Optimized for LCP */}
          <h1
            className="text-5xl lg:text-[60px] max-[350px]:text-[28px] max-sm:text-3xl max-md:text-[36px] font-extrabold text-neutral-900 leading-tight mb-1"
            style={{
              fontVariationSettings: '"wght" 800',
            }}
            aria-describedby="hero-desc"
          >
            Fall In <br className="max-md:hidden" />
            Love With
            <br />
            <span className="lg:text-[80px] text-secondary-500">Sri Lanka.</span>
          </h1>

          {/* Description - LCP element, must render immediately without animation */}
          <p
            id="hero-desc"
            className="text-[18px] text-neutral-700 leading-relaxed md:max-w-lg max-sm:text-[14px] w-full max-md:text-center"
          >
            Book Tours, Day Trips, Cars & Add-Ons — free $10,000 travel
            insurance with every package. Secure payments. 24/7 support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 max-md:justify-center max-sm:gap-2 mt-3 sm:mt-6">
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={{
                initial: {},
                hover: {},
              }}
            >
              <Button
                size={isMobile ? "ssm" : "md"}
                variant="outline"
                aria-label="Customize your travel package"
                icon={
                  <motion.div
                    variants={{
                      initial: { scale: 1, rotate: 0 },
                      hover: {
                        scale: 1.1,
                        rotate: [0, -10, 10, -10, 0],
                      },
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <Settings2
                      className="w-6 h-6 text-primary-500 transition-colors duration-300 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </motion.div>
                }
                className="text-black hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 ease-in-out group cursor-pointer"
                iconPosition="right"
                onClick={handleCustomizeClick}
              >
                Customize
              </Button>
            </motion.div>

            <Button
              size={isMobile ? "ssm" : "md"}
              variant="primary"
              className="cursor-pointer max-sm:px-3 text-nowrap"
              aria-label="Book your Sri Lanka travel package"
              onClick={() => router.push("/packages")}
            >
              Curated Itineraries
              <motion.div
                variants={{
                  initial: { scale: 1, rotate: 0 },
                  hover: {
                    scale: 1.1,
                    rotate: [0, -10, 10, -10, 0],
                  },
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <TbMap2
                  className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Right Content - Interactive Map/Visual */}
        {!isMobile && (
          <div className="relative max-md:hidden w-full">
            {/* Map Container */}
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl lg:overflow-hidden flex gap-5 max-lg:justify-end">
              {/* Sri Lanka Map Visual */}
              <motion.div
                className="lg:col-span-1 flex flex-col gap-4 justify-center items-center"
                animate={isMobile ? {} : { y: [0, -8, 0] }}
                transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
              >
                {/* Fixed: temple-of-tooth - displayed at 172x210 */}
                <Image
                  src={getImageUrl("public/images/home/hero/temple.avif")}
                  alt="Temple of the Tooth, Kandy"
                  width={172}
                  height={210}
                  sizes="172px"
                  className="rounded-3xl object-cover"
                  style={{ width: 172, height: 210 }}
                  quality={75}
                  loading="eager"
                  priority={true}
                  fetchPriority="high"
                />
                <div className="flex w-full justify-end">
                  <motion.div className="bg-[#2FA6D9] rounded-full p-2.5">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-1 flex flex-col gap-4 justify-center items-center relative"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                {/* Fixed: fishing - displayed at 157x181 */}
                <Image
                  src={getImageUrl("public/images/home/hero/fishing.avif")}
                  alt="Traditional stilt fishing in Sri Lanka"
                  width={157}
                  height={181}
                  sizes="157px"
                  className="rounded-3xl object-cover"
                  style={{ width: 157, height: 181 }}
                  quality={75}
                  loading="eager"
                  priority
                  fetchPriority="high"
                />
                {/* Fixed: surfing - displayed at 157x181 */}
                <Image
                  src={getImageUrl("public/images/home/hero/surfing.avif")}
                  alt="Surfing in Sri Lanka"
                  width={157}
                  height={181}
                  sizes="157px"
                  className="rounded-3xl object-cover"
                  style={{ width: 157, height: 181 }}
                  quality={75}
                  loading="eager"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute lg:top-10 max-lg:-top-5 right-0 max-lg:-right-5 z-10 ">
                  <motion.div className="bg-[#FACD49] rounded-full w-[50px] h-[50px] flex items-center justify-center">
                    <BiSolidSend
                      className="w-6 h-6 text-white -rotate-130 mb-1"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="col-span-1 flex flex-col gap-4 justify-center items-center  max-lg:hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                {/* Fixed: lotus-tower - displayed at 157x242 */}
                <Image
                  src={getImageUrl("public/images/home/hero/lotus-tower.avif")}
                  alt="Lotus Tower, Colombo"
                  width={157}
                  height={242}
                  sizes="157px"
                  className="rounded-3xl object-cover"
                  style={{ width: 157, height: 242 }}
                  quality={75}
                  loading="eager"
                  priority
                  fetchPriority="high"
                />
                {/* Fixed: nine-arch - displayed at 157x242 */}
                <Image
                  src={getImageUrl("public/images/home/hero/nine-arch.avif")}
                  alt="Nine Arch Bridge, Ella"
                  width={157}
                  height={242}
                  sizes="157px"
                  className="rounded-3xl object-cover"
                  style={{ width: 157, height: 242 }}
                  quality={75}
                  loading="eager"
                  priority
                  fetchPriority="high"
                />
              </motion.div>
            </div>
            <div className="">
              {/* Fixed: Decorative images - use actual display sizes */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute bottom-12 right-0 w-26 max-xl:hidden "
              >
                <Image
                  src={getImageUrl("public/images/home/hero/pink-line.avif")}
                  alt=""
                  width={104}
                  height={104}
                  sizes="104px"
                  quality={60}
                  loading="lazy"
                  priority={false}
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[92px] right-16 w-8 z-10  max-xl:-right-[3%] max-lg:hidden"
              >
                <Image
                  src={getImageUrl("public/images/home/hero/pink-plane.avif")}
                  alt=""
                  width={32}
                  height={32}
                  sizes="32px"
                  quality={60}
                  loading="lazy"
                  priority={false}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[70px] -left-22 w-24 z-10 max-lg:left-[calc(100%-430px)] max-lg:top-0"
              >
                <Image
                  src={getImageUrl("public/images/home/hero/purple-line.avif")}
                  alt=""
                  width={96}
                  height={96}
                  sizes="96px"
                  quality={60}
                  loading="lazy"
                  priority={false}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[50px] left-1 w-10 z-10 max-lg:-top-5 max-lg:left-[calc(100%-340px)]"
              >
                <Image
                  src={getImageUrl("public/images/home/hero/purple-plane.avif")}
                  alt=""
                  width={40}
                  height={40}
                  sizes="40px"
                  quality={60}
                  loading="lazy"
                  priority={false}
                />
              </motion.div>
            </div>
          </div>
        )}

        <div className={"h-20 relative my-5 md:my-5 lg:hidden"}>

        </div>
      </div>
    </section>
  );
};
