import React, {useState} from "react";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {useDayTourSlug} from "@/hooks/useApi";
import {ExplorePageSkeleton} from "@/components/ui/ExplorePageSkeleton";
import {useInView} from "@/hooks/useInView";
import dynamic from "next/dynamic";

const DayTourHeroSection = dynamic(
    () =>
        import("@/components/sections/day-tour-view/DayTourHeroSection").then(
            (mod) => mod.DayTourHeroSection
        ),
    {ssr: false}
);

const DetailsSection = dynamic(
    () =>
        import("@/components/sections/day-tour-view/DetailsSection").then(
            (mod) => mod.DetailsSection
        ),
    {ssr: true}
);

const ActivitySection = dynamic(
    () =>
        import("@/components/sections/day-tour-view/ActivitySection").then(
            (mod) => mod.ActivitySection
        ),
    {ssr: false}
);

const BookingSection = dynamic(
    () =>
        import("@/components/sections/day-tour-view/BookingSection").then(
            (mod) => mod.BookingSection
        ),
    {ssr: false}
);

const BookNowSection = dynamic(
    () =>
        import("@/components/sections/day-tour-view/BookNowSection").then(
            (mod) => mod.BookNowSection
        ),
    {ssr: false}
);

export default function Slug() {
    const router = useRouter();
    const {slug} = router.query;

    const [proceedEl, setProceedEl] = useState<Element | null>(null);

    const isProceedVisible = useInView(proceedEl, {
        rootMargin: "0px 0px -20% 0px",
    });


    const {
        data: dayTourData,
        isLoading,
        error,
    } = useDayTourSlug(slug as string, {
        enabled: !!slug,
    });

    const images = dayTourData?.image ? dayTourData.image.split(",").map((img: string) => img.trim()) : [];

    const ScrollToBooking = () => {
        const el = document.getElementById("booking");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };


    if (isLoading) return <ExplorePageSkeleton/>;
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-10">
                    <p className="text-red-500 text-xl mb-4">{error.message as string}</p>
                    <button
                        onClick={() => router.push("/day-tour")}
                        className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Back to Day Tours
                    </button>
                </div>
            </div>
        );

    return (
        <>
            <div
                className="min-h-screen bg-white font-plus-jakarta-sans antialiased overflow-x-hidden w-full max-w-7xl mx-auto">
                <div className="overflow-x-hidden">
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute  z-0 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>
                {/* Main Content */}
                <main className="pt-16 md:pt-20 w-full overflow-x-hidden min-[425px]:px-4 lg:px-16 xl:px-0">

                    {dayTourData && images.length > 0 && (
                        <DayTourHeroSection
                            images={images}
                            title={dayTourData.name}
                            description={dayTourData.description}
                            price={dayTourData.adultPrice}
                            promotion={dayTourData.promotion}
                            durationHours={dayTourData.durationHours}
                            type={dayTourData.tourType}
                            slug={dayTourData.slug}
                        />
                    )}

                    <div className="md:grid grid-cols-2 mt-4">
                        <div>
                            {dayTourData &&
                                <DetailsSection tourDetails={dayTourData}/>}

                            <div className="hidden md:block">
                                {dayTourData &&
                                    <ActivitySection activities={dayTourData.activities}/>}
                            </div>
                        </div>

                        <div>
                            {dayTourData &&
                                <BookingSection setProceedRef={setProceedEl} dayTourData={dayTourData}/>}
                        </div>
                    </div>

                    <div className="md:hidden">
                        {dayTourData &&
                            <ActivitySection activities={dayTourData.activities}/>}
                    </div>

                </main>
                {!isProceedVisible && dayTourData && (
                    <motion.div
                        initial={{y: 80, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 80, opacity: 0}}
                        transition={{duration: 0.25}}
                    >
                        <BookNowSection
                            price={dayTourData.adultPrice}
                            promotion={dayTourData.promotion ?? null}
                            onClick={ScrollToBooking}
                        />
                    </motion.div>
                )}
            </div>
        </>

    );
}
