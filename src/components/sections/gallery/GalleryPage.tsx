import React from "react";
import HeroSection from "./HeroSection";
import dynamic from "next/dynamic";

const PhotoGallery = dynamic(() => import("./PhotoGallery"), {
    loading: () => <div className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 h-8 w-64 bg-gray-200 animate-pulse rounded"></h2>

        {/* Mimic a 3-column photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
                <div
                    key={index}
                    className="h-64 bg-gray-200 animate-pulse rounded-lg shadow-md"
                >
                    {/* Inner skeleton to mimic image aspect ratio */}
                </div>
            ))}
        </div>
    </div>, // Optional: Shows a loading state
    ssr: false,
});

const VideoTours = dynamic(() => import("./VideoTours"), {
    loading: () => <div className="py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 h-8 w-96 bg-gray-200 animate-pulse rounded"></h2>

        {/* Mimic a responsive video player container (16:9 ratio) */}
        <div className="relative w-full overflow-hidden" style={{paddingTop: '56.25%'}}>
            <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
    </div>,
    ssr: false,
});

const FAQSection = dynamic(() => import("./FAQSection"), {
    loading: () => <div className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 h-8 w-48 bg-gray-200 animate-pulse rounded"></h2>

        {/* Mimic three FAQ items with lines of text */}
        {Array(3).fill(0).map((_, index) => (
            <div key={index} className="border border-gray-200 p-4 mb-4 rounded-lg">
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-1"></div>
                <div className="h-4 w-5/6 bg-gray-100 animate-pulse rounded"></div>
            </div>
        ))}
    </div>,
    ssr: false,
});

const GalleryPage = () => {
    return (
        <div className="min-h-screen bg-white hide-scrollbar">
            <HeroSection/>
            <PhotoGallery/>
            <VideoTours/>
            <FAQSection/>
        </div>
    );
};

export default GalleryPage;
