import React from "react";
import {motion} from "framer-motion";

export const PageLoadingSkeleton = () => {
    return (
        <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased">
            {/* Geometric background shape */}
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 1}}
                className="absolute z-20 top-40 max-sm:top-14 left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
            />

            {/* Main Content */}
            <main className="relative pt-20 pb-16">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section Skeleton */}
                    <div className="animate-pulse space-y-8 mb-12">
                        {/* Title skeleton */}
                        <div className="space-y-4">
                            <div className="h-12 bg-gray-200 rounded w-3/4 max-w-2xl mx-auto"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 max-w-md mx-auto"></div>
                        </div>

                        {/* Subtitle skeleton */}
                        <div className="space-y-3 max-w-3xl mx-auto">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
                        </div>
                    </div>

                    {/* Content Sections Skeleton */}
                    <div className="space-y-16 animate-pulse">
                        {/* Section 1 - Image Left, Text Right */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="h-96 bg-gray-200 rounded-3xl"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                <div className="h-12 bg-gray-200 rounded-xl w-40 mt-6"></div>
                            </div>
                        </div>

                        {/* Section 2 - Cards Grid */}
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 3 - Text Right, Image Left */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4 order-2 lg:order-1">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                            <div className="h-96 bg-gray-200 rounded-3xl order-1 lg:order-2"></div>
                        </div>

                        {/* Section 4 - Full Width Banner */}
                        <div className="bg-gray-100 rounded-3xl p-12 space-y-6">
                            <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            <div className="flex justify-center gap-4 mt-8">
                                <div className="h-12 bg-gray-200 rounded-xl w-40"></div>
                                <div className="h-12 bg-gray-200 rounded-xl w-40"></div>
                            </div>
                        </div>

                        {/* Section 5 - Team/Features Grid */}
                        <div>
                            <div className="h-8 bg-gray-200 rounded w-56 mx-auto mb-8"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                                        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};
