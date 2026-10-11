import React, {useEffect, useRef, useState} from "react";
import {FaFacebook, FaGoogle, FaImage, FaLinkedin, FaShare, FaSpinner, FaStar, FaTripadvisor,} from "react-icons/fa";
import {motion} from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import SocialReviewCard from "../../ui/SocialReviewCard";
import {uploadImageToR2} from "../../../services/imageUpload";
import {toast} from "react-toastify";
import {useSubmitReview} from "@/hooks/useApi";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {loginModalAtom} from "@/lib/atoms";

export const ExperiencesSection: React.FC = () => {
    const router = useRouter();
    const [modalType, setModalType] = useAtom(loginModalAtom);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [review, setReview] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // React Query mutation for submitting review
    const {mutateAsync: submitReview, isPending: isSubmitting} =
        useSubmitReview({
            onSuccess: (res) => {
                // Show success toast
                toast.success(
                    res
                );

                // Reset form after a short delay
                setTimeout(() => {
                    setRating(0);
                    setReview("");
                    setSelectedFile(null);
                    setUploadedImageUrl(null);
                    setUploadError(null);
                    // Reset file input
                    const fileInput = document.querySelector(
                        'input[type="file"]'
                    ) as HTMLInputElement;
                    if (fileInput) {
                        fileInput.value = "";
                    }
                }, 2000);
            },
            onError: (error: any) => {
                // Handle axios errors - AxiosError has error.response structure
                const status = error?.response?.status;

                if (status === 403 || status === 401) {
                    setModalType("signIn");
                    toast.error("Please login to submit a review");
                    return;
                }

                // Extract error message from axios error response
                const errorMessage =
                    error ||
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to submit review. Please try again.";

                toast.error(errorMessage);
                setSubmitError(errorMessage);
            },
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        if (rating === 0) {
            toast.error("Please provide a star rating");
            return;
        }

        if (!review.trim()) {
            toast.error("Please share your experience");
            return;
        }

        setSubmitError(null);

        // Use React Query mutation to submit review
        // Errors are handled in the onError callback of useSubmitReview
        submitReview({
            star: rating,
            experience: review.trim(),
            image: uploadedImageUrl || "",
        }).catch(() => {
            // Silently catch - error is already handled in onError callback
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setUploadError(null);
            setIsUploading(true);

            try {
                const result = await uploadImageToR2(file, "reviews");

                setUploadedImageUrl(result);

            } catch (error) {
                setUploadError(
                    error instanceof Error ? error.message : "Upload failed"
                );
                setSelectedFile(null);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setUploadedImageUrl(null);
        setUploadError(null);
        // Reset file input
        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 425);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        scrollRef.current?.classList.add("cursor-grabbing");
        startX = e.pageX - scrollRef.current!.offsetLeft;
        scrollLeft = scrollRef.current!.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current!.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed multiplier
        scrollRef.current!.scrollLeft = scrollLeft - walk;
    };

    return (
        <>
            <section
                className="py-8 lg:py-8 px-4 max-sm:mt-6 flex flex-col items-center justify-center text-center overflow-x-hidden box-border w-full">
                <h2
                    className="text-[24px] font-bold mb-3 max-md:text-[14px] text-secondary-500 cursor-default text-center uppercase"
                    style={{letterSpacing: "0.28em"}}
                >
                    Share Your Experience with ZephyraTravels
                </h2>
                <motion.h3
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.1}}
                    className="text-4xl lg:text-[42px] max-md:text-[20px] font-black font-dm-sans text-neutral-900 cursor-default text-center "
                >
                    Inspire Future Travelers, Your Story Matters!
                </motion.h3>
                <p className="text-[#2D2D2D] text-sm sm:text-base lg:text-lg pt-6 pb-10 max-w-[700px] font-medium ">
                    Your journey with us is more than just a trip, it's a story that
                    inspires others to explore Sri Lanka with confidence. We'd love to
                    hear about your{" "}
                    <span className="text-[#6938D3] ">favorite moments, memories,</span>{" "}
                    and <span className="text-[#6938D3] ">experiences!</span>
                </p>

                <div className="flex gap-8 max-md:flex-col max-md:gap-8 max-md:items-center">
                    <div className="w-full lg:w-[400px] lg:max-w-none">
                        <div className="flex items-center justify-center gap-2 mb-6  lg:justify-start">
                            <FaShare size={isMobile ? 23 : 40 } className="text-secondary-500"/>
                            <p className="text-[16px] font-bold text-[#373737] md:text-2xl">
                                Share Your Review On
                            </p>
                        </div>
                        <div
                            ref={scrollRef}
                            className="grid grid-cols-2 gap-3 max-md:max-w-[388px] md:flex md:flex-col lg:gap-y-8 lg:max-w-none"
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            <SocialReviewCard
                                icon={<FaTripadvisor className="w-full h-full lg:w-6 lg:h-6"/>}
                                title="Tripadvisor"
                                subtitle="Help travelers discover authentic Sri Lankan experiences."
                                delay={0.1}
                                ariaLabel="Write a review on Tripadvisor"
                                className="w-full"
                            />
                            <SocialReviewCard
                                icon={<FaFacebook className="w-full h-full lg:w-6 lg:h-6"/>}
                                title="Facebook"
                                subtitle="Share your journey and tag @ZephyraTravels."
                                delay={0.1}
                                ariaLabel="Write a review on Facebook"
                                className="w-full"
                            />
                            <SocialReviewCard
                                icon={<FaGoogle className="w-full h-full lg:w-6 lg:h-6"/>}
                                title="Google Reviews"
                                subtitle="Boost trust and help travelers find us."
                                delay={0.1}
                                ariaLabel="Write a review on Google"
                                className="w-full"
                            />
                            <SocialReviewCard
                                icon={<FaLinkedin className="w-full h-full lg:w-6 lg:h-6"/>}
                                title="LinkedIn"
                                subtitle="Share your corporate or B2B travel experience."
                                delay={0.1}
                                ariaLabel="Write a review on Linkedin"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <motion.div
                        initial={{opacity: 0, scale: 0.9, y: 20}}
                        whileInView={{opacity: 1, scale: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        whileHover={{
                            scale: 1.02,
                            y: -3,
                            transition: {duration: 0.2},
                        }}
                        viewport={{once: true}}
                        className="w-full lg:w-[560px] md:w-[60%] flex flex-col items-stretch mx-auto bg-white rounded-[25px] p-6 border-l-2 border-[#872bff] max-md:px-4 max-md:py-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {/*Title */}
                        <p className="text-[16px] md:text-2xl font-bold text-[#373737] mb-6 text-center">
                            Your Turn, Tell Us About Your Journey
                        </p>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="w-full flex flex-col gap-4"
                        >
                            {/* Rating */}
                            <div className="flex flex-col gap-2 w-full items-start">
                                <label className="text-[12px] md:text-[14px] font-medium text-[#333232] ">
                                    Rate your experience*
                                </label>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <FaStar
                                                key={index}
                                                size={isMobile ? 23 : 33}
                                                aria-label={`Rate ${starValue} star${
                                                    starValue > 1 ? "s" : ""
                                                }`} // <- accessibility fix
                                                className={`cursor-pointer transition ${
                                                    starValue <= (hover || rating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                                onClick={() => setRating(starValue)}
                                                onMouseEnter={() => setHover(starValue)}
                                                onMouseLeave={() => setHover(0)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Review Input */}
                            <div className="flex flex-col text-start cursor-text w-full">
                                <label className="text-[12px] md:text-[14px] font-medium text-[#333232] mb-2">
                                    Share your story , what made your trip special?*
                                </label>
                                <textarea
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Share your experience..."
                                    rows={3}
                                    style={{
                                        caretColor: "#000000",
                                        overflowX: "hidden",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                    }}
                                    className="bg-[#f9f9f9] border border-black/30 rounded-lg px-3 py-3 focus:ring-2 focus:ring-[#6938D3] focus:outline-none text-[12px] md:text-[14px] caret-black text-black"
                                />
                            </div>

                            {/* Photo Upload */}
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-[12px] md:text-[14px] font-medium text-[#333232] text-left">
                                    Include photos or moments that capture your memories.
                                </label>

                                {uploadedImageUrl ? (
                                    <div className="relative border border-black/30 rounded-[10px] bg-[#f9f9f9] p-4">
                                        {/*<div className="relative w-full h-48 rounded-lg overflow-hidden">*/}
                                        {/*  <img*/}
                                        {/*    src={uploadedImageUrl}*/}
                                        {/*    alt="Uploaded preview"*/}
                                        {/*    className="w-full h-full object-cover"*/}
                                        {/*  />*/}
                                        {/*  <button*/}
                                        {/*    type="button"*/}
                                        {/*    onClick={handleRemoveImage}*/}
                                        {/*    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"*/}
                                        {/*    aria-label="Remove image"*/}
                                        {/*  >*/}
                                        {/*    <FaTimes className="w-4 h-4" />*/}
                                        {/*  </button>*/}
                                        {/*</div>*/}
                                        <p className="text-xs text-green-600 mt-2 text-center">
                                            ✓ Image uploaded successfully
                                        </p>
                                    </div>
                                ) : (
                                    <div
                                        className="relative border border-black/30 rounded-[10px] bg-[#f9f9f9] h-[78px] flex items-center justify-center cursor-pointer hover:bg-[#f0f0f0] transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            disabled={isUploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                            aria-label="Choose a file to upload"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            {isUploading ? (
                                                <>
                                                    <FaSpinner className="w-6 h-6 text-[#6938D3] animate-spin"/>
                                                    <span className="text-[10px] font-medium text-[#6938D3]">
                            Uploading...
                          </span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaImage className="w-6 h-6 text-[#848484]"/>
                                                    <span className="text-[10px] font-medium text-black/60">
                            {selectedFile ? selectedFile.name : "Choose a file"}
                          </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {uploadError && (
                                    <p className="text-xs text-red-600 text-center">
                                        {uploadError}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col items-center justify-end md:justify-center w-full">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    aria-label="Submit your review"
                                    className="bg-[#6938D3] text-white font-semibold px-4 py-2  rounded-full hover:bg-[#5a2cc5] transition duration-200 text-[14px] cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="animate-spin"/>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Review"
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </>
    );
};
