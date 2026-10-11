import React, {useEffect, useRef, useState} from "react";

interface VideoPlayerProps {
    videoUrl: string;
    posterUrl?: string;
    className?: string;
    width?: number;
    height?: number;
    rounded?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
                                                     videoUrl,
                                                     posterUrl,
                                                     className = "",
                                                 }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        const handlePlay = () => {
            setIsPlaying(true);
            setIsLoading(false);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        const handleLoadStart = () => {
            setIsLoading(true);
        };

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("loadstart", handleLoadStart);
        video.addEventListener("canplay", handleCanPlay);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("loadstart", handleLoadStart);
            video.removeEventListener("canplay", handleCanPlay);
        };
    }, []);

    const togglePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newTime = (parseFloat(e.target.value) / 100) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            className={`relative group ${className} w-[504px] h-[401px] max-xl:w-[400px] max-xl:h-[320px] max-lg:w-[300px] max-lg:h-[240px] max-md:w-[66.316vw] max-md:h-[52.763vw]`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover max-md:rounded-[9.868vw] rounded-[75px]"
                poster={posterUrl}
                preload="metadata"
            >
                <source src={videoUrl} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>

            {/* Overlay when paused */}
            {!isPlaying && (
                <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                    <button
                        onClick={togglePlayPause}
                        className="w-[62px] h-[62px] bg-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-200 shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div
                                className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 5V19L19 12L8 5Z" fill="#333"/>
                            </svg>
                        )}
                    </button>
                </div>
            )}

            {/* Controls overlay when playing */}
            {isPlaying && showControls && (
                <div className="absolute inset-0  flex flex-col justify-end">
                    <div className="p-4 space-y-3">
                        {/* Progress Bar */}
                        <div className="w-full">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleSeek}
                                className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                                style={{
                                    background: `linear-gradient(to right, #6938d3 0%, #6938d3 ${progress}%, rgba(255,255,255,0.3) ${progress}%, rgba(255,255,255,0.3) 100%)`,
                                }}
                            />
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={togglePlayPause}
                                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect x="6" y="4" width="4" height="16" fill="white"/>
                                        <rect x="14" y="4" width="4" height="16" fill="white"/>
                                    </svg>
                                </button>

                                <span className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                            </div>

                            <button
                                onClick={togglePlayPause}
                                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="6" y="4" width="4" height="16" fill="white"/>
                                    <rect x="14" y="4" width="4" height="16" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom slider styles */}
            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #6938d3;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .slider::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #6938d3;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
};

export default VideoPlayer;
