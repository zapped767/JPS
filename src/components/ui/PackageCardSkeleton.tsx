import React from "react";

export const PackageCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="relative h-[300px] bg-gray-200">
                <div className="absolute top-4 right-4 w-20 h-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Content skeleton */}
            <div className="p-6">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded mb-3"></div>

                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Duration and price skeleton */}
                <div className="flex justify-between items-center mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>

                {/* Button skeleton */}
                <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};
