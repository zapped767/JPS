import React, {useRef} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {usePackage} from "@/hooks/useApi";
import {motion} from "framer-motion";
import {ExplorePageSkeleton} from "@/components/ui/ExplorePageSkeleton";
import ScrollIndicator from "@/components/sections/explore/ScrollIndicator";
import PackageViewHead from "@/components/sections/explore/PackageViewHead";
import {getImageUrl} from "@/lib/utils";

// Lazy load below-the-fold sections
const Itinerary = dynamic(
    () => import("@/components/sections/explore/Itinerary"),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const TourItinerary = dynamic(
    () =>
        import("@/components/sections/explore/TourItinerary").then((mod) => ({
            default: mod.TourItinerary,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const TourOverview = dynamic(
    () =>
        import("@/components/sections/explore/TourOverview").then((mod) => ({
            default: mod.TourOverview,
        })),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

const TrustSection = dynamic(
    () => import("@/components/sections/explore/TrustSection").then(mod => mod.TrustSection),
    {
        loading: () => <div className="h-96 animate-pulse bg-gray-100"></div>,
    }
);

export default function Slug() {
    const router = useRouter();
    const {slug} = router.query;

    const {
        data: packageData,
        isLoading,
        error,
    } = usePackage(slug as string, {
        enabled: !!slug,
    });

    const itineraryRef = useRef<HTMLDivElement>(null);

    const ScrollToItinerary = () => {
        if (
            itineraryRef.current &&
            typeof (itineraryRef.current as any).scrollIntoView === "function"
        ) {
            itineraryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            return;
        }

        const el = document.getElementById("itinerary");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    if (isLoading) return <ExplorePageSkeleton/>;
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-10">
                    <p className="text-red-500 text-xl mb-4">{error.message as string}</p>
                    <button
                        onClick={() => router.push("/packages")}
                        className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Back to Packages
                    </button>
                </div>
            </div>
        );

    return (
        <>
            <PackageViewHead apiResponse={packageData} getImageUrl={getImageUrl}/>

            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased overflow-x-hidden w-full">
                <div className="overflow-x-hidden">
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>
                {/* Main Content */}
                <main className="pt-20 max-md:pt-16 w-full overflow-x-hidden">
                    <div className="relative max-w-7xl mx-auto max-2xl:mx-10 max-sm:mx-4">

                        <div className="relative h-[120px] max-w-7xl mx-auto justify-center hidden">
                            <ScrollIndicator
                                OnClick={ScrollToItinerary}
                                className="top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                    <Itinerary ref={itineraryRef}/>
                    <div className="relative max-w-7xl max-md:max-w-[400px] mx-auto md:mx-10 xl:mx-auto">
                        <TourItinerary packageData={packageData}/>
                    </div>

                    <div className="max-w-7xl mx-auto max-xl:mx-10 max-sm:mx-4 mt-5">
                        <TourOverview packageData={packageData}/>
                    </div>

                    <div
                        className="relative max-w-7xl mx-auto max-xl:mx-10 max-sm:mx-0 mb-8 lg:mb-16 overflow-hidden mt-10">
                        <TrustSection slug={slug as string}/>
                    </div>
                </main>
            </div>
        </>

    );
}
