import React from "react";
import {motion} from "framer-motion";

export const ExplorePageSkeleton = () => {
    return (
        <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased">
            <div className="">
                {/* Geometric shapes */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1, delay: 0.4}}
                    className="absolute z-20 top-40 max-sm:top-14 left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                />
            </div>

            {/* Main Content */}
            <main className="pt-20">
                <div className="relative max-w-7xl mx-auto max-2xl:mx-10 max-sm:mx-4">
                    {/* Header Skeleton */}
                    <div className="animate-pulse space-y-6 mb-8">
                        {/* Breadcrumb skeleton */}
                        <div className="flex gap-2 items-center mb-4">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </div>

                        {/* Title skeleton */}
                        <div className="h-10 bg-gray-200 rounded w-3/4 max-w-xl"></div>

                        {/* Subtitle skeleton */}
                        <div className="h-5 bg-gray-200 rounded w-1/2 max-w-md"></div>
                    </div>

                    {/* Tour Overview Skeleton */}
                    <div className="animate-pulse bg-white rounded-3xl shadow-xl p-6 mb-8">
                        {/* Image Skeleton */}
                        <div className="h-96 bg-gray-200 rounded-2xl mb-6"></div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Info boxes */}
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price and Button Skeleton */}
                        <div className="flex justify-between items-center border-t pt-6">
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                <div className="h-8 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="h-12 bg-gray-200 rounded-xl w-40"></div>
                        </div>
                    </div>

                    {/* Scroll Indicator Skeleton */}
                    <div className="flex justify-center items-center mb-8">
                        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Itinerary Section Skeleton */}
                <div className="bg-gray-50 py-12">
                    <div className="relative max-w-7xl mx-auto max-xl:mx-10 max-sm:mx-4 animate-pulse">
                        {/* Section Title */}
                        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>

                        {/* Itinerary Items */}
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl shadow p-6 space-y-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tour Itinerary Details Skeleton */}
                <div className="relative max-w-7xl mx-auto max-xl:mx-10 max-sm:mx-4 py-12 animate-pulse">
                    <div className="space-y-6">
                        <div className="h-7 bg-gray-200 rounded w-56"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
