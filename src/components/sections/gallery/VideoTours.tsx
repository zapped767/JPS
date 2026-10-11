import React, {useState} from "react";
import {VideoTour} from "./types";
import {getImageUrl} from "@/lib/utils";

const VideoTours = () => {
    const [selectedVideo, setSelectedVideo] = useState<VideoTour | null>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const videoTours: VideoTour[] = [
        {
            id: 1,
            videoSrc: "public/images/gallery/video/down-south-escapes.mp4",
            title: "Down South Escapes",
            descriptionLine1: "Golden beaches, surfing waves, and coastal charm",
            descriptionLine2: "Discover Sri Lanka's vibrant southern coast.",
        },
        {
            id: 2,
            videoSrc: "public/images/gallery/video/hill-country-kandy.mp4",
            title: "Hill Country: Kandy",
            descriptionLine1: "A scenic blend of culture and nature",
            descriptionLine2: "Explore temples, tea hills, and breathtaking views.",
        },
        {
            id: 3,
            videoSrc: "public/images/gallery/video/wild-sri-lanka.mp4",
            title: "Wildlife Adventure",
            descriptionLine1: "Step into the wild witness elephants,",
            descriptionLine2: "leopards, and nature's untamed beauty.",
        },
        {
            id: 4,
            videoSrc: "public/images/gallery/video/cultural-heritage.mp4",
            title: "Cultural Heritage: Ancient Cities",
            descriptionLine1: "Walk through history explore ancient",
            descriptionLine2: "kingdoms and timeless architecture.",
        },
    ];

    // Split videos into two rows for mobile (2 videos per row)
    const firstRowVideos = videoTours.slice(0, 2);
    const secondRowVideos = videoTours.slice(2);

    return (
        <section className="pt-5 md:pt-12 lg:pt-16 pb-4 md:pb-6 lg:pb-[25px] px-4 relative">


            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-black text-3xl md:text-5xl font-extrabold -mt-[45px]">
                        <span className="text-[#6938D3]">Video</span> Tours
                    </h2>
                    <p className="text-black sm:text-lg">
                        Experience Sri Lanka through our immersive video content
                    </p>
                </div>

                {/* Desktop Grid - Unchanged */}
                <div className="grid md:grid-cols-2 gap-12 hidden md:grid">
                    {videoTours.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className="
                bg-white rounded-3xl shadow-sm transition-all duration-300
                w-full hover:shadow-lg cursor-pointer relative z-10
              "
                        >
                            {/* Video container */}
                            <div className="relative overflow-hidden rounded-t-3xl aspect-[2/1]">
                                <video
                                    src={getImageUrl(video.videoSrc)}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300"/>
                            </div>

                            {/* Text Section */}
                            <div className="p-4 text-left">
                                <h3
                                    className="
                    text-xl font-bold mb-1 text-black
                    break-words
                    whitespace-normal
                  "
                                >
                                    {video.title}
                                </h3>
                                <p
                                    className={`text-black leading-relaxed ${
                                        expandedId === video.id ? "max-h-full" : "max-h-[3rem] overflow-hidden"
                                    } transition-all duration-300`}
                                >
                                    {video.descriptionLine1} <br/>
                                    {video.descriptionLine2}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedId(expandedId === video.id ? null : video.id);
                                    }}
                                    className="text-purple-500 text-sm mt-1 md:hidden"
                                >
                                    {expandedId === video.id ? "See Less" : "See More"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Layout - 2 rows with 2 columns each, scrolling independently */}
                <div className="max-md:block md:hidden">
                    {/* First Row */}
                    <div className="flex gap-4 px-2 overflow-x-auto scrollbar-hide mb-4">
                        {firstRowVideos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => setSelectedVideo(video)}
                                className="
                  bg-white rounded-xl  shadow-sm transition-all duration-300 flex-shrink-0
                  w-[200px] hover:shadow-lg cursor-pointer relative z-10
                "
                            >
                                {/* Video container */}
                                <div className="relative overflow-hidden rounded-t-xl aspect-[2/1]">
                                    <video
                                        src={getImageUrl(video.videoSrc)}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300"/>
                                </div>

                                {/* Text Section */}
                                <div className="p-3 text-left">
                                    <h3
                                        className="
                      text-sm font-bold mb-1 text-black
                      break-words
                      whitespace-normal
                    "
                                    >
                                        {video.title}
                                    </h3>
                                    <p
                                        className={`text-black leading-relaxed ${
                                            expandedId === video.id ? "max-h-full" : "max-h-[3rem] overflow-hidden"
                                        } transition-all duration-300`}
                                    >
                                        {video.descriptionLine1} <br/>
                                        {video.descriptionLine2}
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedId(expandedId === video.id ? null : video.id);
                                        }}
                                        className="text-purple-500 text-sm mt-1"
                                    >
                                        {expandedId === video.id ? "See Less" : "See More"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="flex gap-4 px-2 overflow-x-auto scrollbar-hide">
                        {secondRowVideos.map((video) => (
                            <div
                                key={video.id}
                                onClick={() => setSelectedVideo(video)}
                                className="
                  bg-white rounded-xl  shadow-sm transition-all duration-300 flex-shrink-0
                  w-[200px] hover:shadow-lg cursor-pointer relative z-10
                "
                            >
                                {/* Video container */}
                                <div className="relative overflow-hidden rounded-t-xl aspect-[2/1]">
                                    <video
                                        src={getImageUrl(video.videoSrc)}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300"/>
                                </div>

                                {/* Text Section */}
                                <div className="p-3 text-left">
                                    <h3
                                        className="
                      text-sm font-bold mb-1 text-black
                      break-words
                      whitespace-normal
                    "
                                    >
                                        {video.title}
                                    </h3>
                                    <p
                                        className={`text-black leading-relaxed ${
                                            expandedId === video.id ? "max-h-full" : "max-h-[3rem] overflow-hidden"
                                        } transition-all duration-300`}
                                    >
                                        {video.descriptionLine1} <br/>
                                        {video.descriptionLine2}
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedId(expandedId === video.id ? null : video.id);
                                        }}
                                        className="text-purple-500 text-sm mt-1"
                                    >
                                        {expandedId === video.id ? "See Less" : "See More"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Modal Popup */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 px-4 py-6 video-modal-fade">
                    <div
                        className="absolute inset-0"
                        onClick={() => setSelectedVideo(null)}
                    />
                    <div
                        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl video-modal-scale">
                        {/* Header */}
                        <div
                            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-10 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-[#6938D3] animate-pulse"/>
                                <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">
                                    {selectedVideo.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2.5 transition-all duration-300 hover:rotate-90 border border-white/20"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        <div className="relative aspect-video bg-black">
                            <video
                                src={getImageUrl(selectedVideo.videoSrc)}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                                controlsList="nodownload"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div
                            className="absolute top-0 left-0 w-32 h-32 bg-[#6938D3]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"/>
                        <div
                            className="absolute bottom-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"/>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoTours;