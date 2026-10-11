import React, {useRef, useState} from "react";
import Image from "next/image";
import {GalleryImage, TabType} from "./types";
import {getImageUrl} from "@/lib/utils";

const PhotoGallery = () => {
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const [tappedCard, setTappedCard] = useState<number | null>(null);

    const firstRowRef = useRef<HTMLDivElement>(null);
    const secondRowRef = useRef<HTMLDivElement>(null);

    const tabs: TabType[] = [
        "All",
        "Cultural",
        "Wildlife",
        "Beaches",
        "Heritage",
    ];

    const allImages: GalleryImage[] = [
        {
            id: 1,
            src: "public/images/gallery/photo/cultural/kandyan-dancers.webp",
            alt: "Kandyan Dancers",
            category: "Cultural",
            title: "Kandyan Dancers",
            subtitle: "Spirit of Sri Lanka's Heritage",
        },
        {
            id: 2,
            src: "public/images/gallery/photo/wildlife/yala-leopard.webp",
            alt: "Yala Leopards",
            category: "Wildlife",
            title: "Yala Leopards",
            subtitle: "Silent Shadows of the Jungle",
        },
        {
            id: 3,
            src: "public/images/gallery/photo/beaches/hikkaduwa-reef.webp",
            alt: "Hikkaduwa Reef",
            category: "Beaches",
            title: "Hikkaduwa Reef",
            subtitle: "Dive into Coral Wonderlands",
        },
        {
            id: 4,
            src: "public/images/gallery/photo/heritage/polonnaruwa-ruins.webp",
            alt: "Polonnaruwa Ruins",
            category: "Heritage",
            title: "Polonnaruwa Ruins",
            subtitle: "Echoes of Ancient Glory",
        },
        {
            id: 5,
            src: "public/images/gallery/photo/wildlife/udawalawe-safari.webp",
            alt: "Udawalawe Safari",
            category: "Wildlife",
            title: "Udawalawe Safari",
            subtitle: "Wild Heart of the South",
        },
        {
            id: 6,
            src: "public/images/gallery/photo/heritage/nallur-kovil-jaffna.webp",
            alt: "Nallur Kovil, Jaffna",
            category: "Heritage",
            title: "Nallur Kovil, Jaffna",
            subtitle: "Sacred Heritage of the North use instead of galle fort walls",
        },
    ];

    // ✅ Cultural Images
    const culturalImages: GalleryImage[] = [
        {
            id: 7,
            src: "public/images/gallery/photo/cultural/kandyan-dancers.webp",
            alt: "Kandyan Dancers",
            category: "Cultural",
            title: "Kandyan Dancers",
            subtitle: "Spirit of Sri Lanka's Heritage",
        },
        {
            id: 8,
            src: "public/images/gallery/photo/cultural/traditional-masks.webp",
            alt: "Traditional Masks",
            category: "Cultural",
            title: "Traditional Masks",
            subtitle: "Faces of Myth and Legend",
        },
        {
            id: 9,
            src: "public/images/gallery/photo/cultural/tea-pluckers.webp",
            alt: "Tea Pluckers of Ceylon",
            category: "Cultural",
            title: "Tea Pluckers of Ceylon",
            subtitle: "Grace in Every Leaf",
        },
        {
            id: 10,
            src: "public/images/gallery/photo/cultural/village-farmer-nurturing.webp",
            alt: "Village Farmer",
            category: "Cultural",
            title: "Village Farmer",
            subtitle: "Nurturing the Fields of Tradition",
        },
        {
            id: 11,
            src: "public/images/gallery/photo/cultural/sinhala-new-year.webp",
            alt: "Avurudu Celebrations",
            category: "Cultural",
            title: "Avurudu Celebrations",
            subtitle: "Joy, Tradition, and New Beginnings",
        },
        {
            id: 12,
            src: "public/images/gallery/photo/cultural/vesak-lanterns.webp",
            alt: "Vesak Lanterns",
            category: "Cultural",
            title: "Vesak Lanterns",
            subtitle: "Lights of Peace and Devotion",
        },
    ];

    // ✅ Wildlife Images
    const wildlifeImages: GalleryImage[] = [
        {
            id: 13,
            src: "public/images/gallery/photo/wildlife/minneriya-elephants.webp",
            alt: "Minneriya Elephants",
            category: "Wildlife",
            title: "Minneriya Elephants",
            subtitle: "The Gathering of Giants",
        },
        {
            id: 14,
            src: "public/images/gallery/photo/wildlife/yala-leopard.webp",
            alt: "Yala Leopards",
            category: "Wildlife",
            title: "Yala Leopards",
            subtitle: "Silent Shadows of the Jungle",
        },
        {
            id: 15,
            src: "public/images/gallery/photo/wildlife/udawalawe-safari.webp",
            alt: "Udawalawe Safari",
            category: "Wildlife",
            title: "Udawalawe Safari",
            subtitle: "Wild Heart of the South",
        },
        {
            id: 16,
            src: "public/images/gallery/photo/wildlife/wilpattu-lakes.webp",
            alt: "Wilpattu Lakes",
            category: "Wildlife",
            title: "Wilpattu Lakes",
            subtitle: "Hidden Trails and Tranquility",
        },
        {
            id: 17,
            src: "public/images/gallery/photo/wildlife/kumana-birds.webp",
            alt: "Birdlife in Kumana",
            category: "Wildlife",
            title: "Birdlife in Kumana",
            subtitle: "Paradise for Feathered Wanderers",
        },
        {
            id: 18,
            src: "public/images/gallery/photo/wildlife/sinharaja-forest.webp",
            alt: "Sinharaja Forest",
            category: "Wildlife",
            title: "Sinharaja Forest",
            subtitle: "The Living Rainforest Jewel",
        },
    ];

    // ✅ Beaches Images
    const beachesImages: GalleryImage[] = [
        {
            id: 19,
            src: "public/images/gallery/photo/beaches/mirissa-beach.webp",
            alt: "Mirissa Beach",
            category: "Beaches",
            title: "Mirissa Bay",
            subtitle: "Waves, Whales, and Golden Sands",
        },
        {
            id: 20,
            src: "public/images/gallery/photo/beaches/unawatuna-beach.webp",
            alt: "Unawatuna Beach",
            category: "Beaches",
            title: "Unawatuna Coast",
            subtitle: "Sunsets and Coconut Dreams",
        },
        {
            id: 21,
            src: "public/images/gallery/photo/beaches/arugam-bay.webp",
            alt: "Arugam Bay",
            category: "Beaches",
            title: "Arugam Bay",
            subtitle: "Surfing Freedom and Serenity",
        },
        {
            id: 22,
            src: "public/images/gallery/photo/beaches/surfing-weligama.webp",
            alt: "Surfing Weligama",
            category: "Beaches",
            title: "Surfing Weligama",
            subtitle: "Freedom on Sri Lanka’s Blue Coast.",
        },
        {
            id: 23,
            src: "public/images/gallery/photo/beaches/trincomalee-beach.webp",
            alt: "Trincomalee Beach",
            category: "Beaches",
            title: "Trincomalee Beach",
            subtitle: "Blue Waters of the East",
        },
        {
            id: 24,
            src: "public/images/gallery/photo/beaches/hikkaduwa-reef.webp",
            alt: "Hikkaduwa Reef",
            category: "Beaches",
            title: "Hikkaduwa Reef",
            subtitle: "Dive into Coral Wonderlands",
        },
    ];

    // ✅ Heritage Images
    const heritageImages: GalleryImage[] = [
        {
            id: 25,
            src: "public/images/gallery/photo/heritage/sigiriya-rock.webp",
            alt: "Sigiriya Rock Fortress",
            category: "Heritage",
            title: "Sigiriya Rock Fortress",
            subtitle: "The Lion's Kingdom Above",
        },
        {
            id: 26,
            src: "public/images/gallery/photo/heritage/polonnaruwa-ruins.webp",
            alt: "Polonnaruwa Ruins",
            category: "Heritage",
            title: "Polonnaruwa Ruins",
            subtitle: "Echoes of Ancient Glory",
        },
        {
            id: 27,
            src: "public/images/gallery/photo/heritage/dambulla-cave.webp",
            alt: "Dambulla Cave Temple",
            category: "Heritage",
            title: "Dambulla Cave Temple",
            subtitle: "Art Carved in Stone",
        },
        {
            id: 28,
            src: "public/images/gallery/photo/heritage/anuradhapura-dagoba.webp",
            alt: "Anuradhapura Dagoba",
            category: "Heritage",
            title: "Anuradhapura Dagoba",
            subtitle: "Sacred City of Kings",
        },
        {
            id: 29,
            src: "public/images/gallery/photo/heritage/galle-fort-sri-lanka.webp",
            alt: "Galle Fort Walls",
            category: "Heritage",
            title: "Galle Fort Walls",
            subtitle: "Colonial Charm by the Sea",
        },
        {
            id: 30,
            src: "public/images/gallery/photo/heritage/temple-of-the-tooth.webp",
            alt: "Temple of the Tooth",
            category: "Heritage",
            title: "Temple of the Tooth",
            subtitle: "A Legacy of Royal Faith",
        },
    ];

    const galleryImages =
        activeTab === "Cultural"
            ? culturalImages
            : activeTab === "Wildlife"
                ? wildlifeImages
                : activeTab === "Beaches"
                    ? beachesImages
                    : activeTab === "Heritage"
                        ? heritageImages
                        : allImages;

    // Split images into two rows for mobile & tablet
    const firstRowImages = galleryImages.slice(
        0,
        Math.ceil(galleryImages.length / 2)
    );
    const secondRowImages = galleryImages.slice(
        Math.ceil(galleryImages.length / 2)
    );

    // Reset scroll to start when tab changes
    const resetScrollToStart = () => {
        if (firstRowRef.current) firstRowRef.current.scrollLeft = 0;
        if (secondRowRef.current) secondRowRef.current.scrollLeft = 0;
    };

    // Handle tab change
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setTappedCard(null);
        resetScrollToStart();
    };

    // Handle card click/tap for mobile and tablet
    const handleCardClick = (imageId: number) => {
        setTappedCard(tappedCard === imageId ? null : imageId);
    };

    return (
        <section className="py-9 md:py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold -mt-[25px] md:-mt-[45px]">
                        <span className="text-[#6938D3]">Photo</span> Gallery
                    </h2>

                    <p
                        className="
    text-black 
    text-[13px] sm:text-[15px] md:text-[17px] lg:text-[18px] 
    mt-2 sm:mt-4 leading-relaxed text-center
  "
                    >
                        Capturing the essence of Sri Lanka&apos;s diverse{" "}
                        <span className="block sm:block md:block lg:inline">
              landscapes and culture
            </span>
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-3 mb-6 md:mb-12 relative z-10">
                    <div className="flex justify-center gap-2 md:gap-3">
                        {tabs.slice(0, 3).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-3 py-1 sm:px-6 sm:py-2 rounded-full font-medium border-2 transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                                    activeTab === tab
                                        ? "bg-[#6938D3] text-white border-[#B492FF]"
                                        : "bg-white text-gray-700 border-[#B492FF] hover:bg-purple-100"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 md:gap-3 mt-2 md:mt-0">
                        {tabs.slice(3).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-3 py-1 sm:px-6 sm:py-2 rounded-full font-medium border-2 transition-all duration-300 cursor-pointer text-sm sm:text-base ${
                                    activeTab === tab
                                        ? "bg-[#6938D3] text-white border-[#B492FF]"
                                        : "bg-white text-gray-700 border-[#B492FF] hover:bg-purple-100"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Desktop / Laptop Layout */}
                <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:px-0">
                    {galleryImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative w-full aspect-[3/4] group cursor-pointer rounded-3xl overflow-hidden  bg-white transition-all duration-300"
                        >
                            <Image
                                src={getImageUrl(image.src)}
                                alt={image.alt}
                                fill
                                className={`object-cover group-hover:scale-105 transition-transform duration-500
          ${
                                    image.src === "/images/elephant.jpg"
                                        ? "max-[425px]:object-[center_20%]"
                                        : image.src ===
                                        "public/images/gallery/photo/cultural/kandyan-dancers.webp"
                                            ? "max-[450px]:object-[center_25%]"
                                            : image.src ===
                                            "public/images/gallery/photo/beaches/unawatuna-beach.webp"
                                                ? "max-[425px]:object-[center_80%]"
                                                : image.src ===
                                                "public/images/gallery/photo/beaches/arugam-bay.webp"
                                                    ? "max-[425px]:object-[center_75%]"
                                                    : image.src ===
                                                    "public/images/gallery/photo/heritage/sigiriya-rock.webp"
                                                        ? "max-[450px]:object-[center_20%]"
                                                        : image.src ===
                                                        "public/images/gallery/photo/heritage/galle-fort-sri-lanka.webp"
                                                            ? "max-[425px]:object-[center_30%]"
                                                            : image.src ===
                                                            "public/images/gallery/photo/heritage/temple-of-the-tooth.webp"
                                                                ? "max-[450px]:object-[center_35%]"
                                                                : image.src ===
                                                                "/public/images/gallery/photo/heritage/anuradhapura-dagoba.webp"
                                                                    ? "max-[475px]:object-[center_40%]"
                                                                    : image.src ===
                                                                    "public/images/gallery/photo/wildlife/udawalawe-safari.webp"
                                                                        ? "max-[450px]:object-[center_30%]"
                                                                        : "object-center"
                                }
        `}
                            />

                            <div
                                className="absolute inset-0 z-10 bg-gradient-to-t from-[#6938D3]/80 to-transparent opacity-0
        group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
                            >
                                <div
                                    className="text-white translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                                    <p className="text-sm">{image.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tablet Layout 768px → 1024px */}
                <div className="hidden md:grid lg:hidden grid-cols-3 gap-4 px-4">
                    {galleryImages.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => handleCardClick(image.id)}
                            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white  transition-all duration-300 cursor-pointer"
                        >
                            <Image
                                src={getImageUrl(image.src)}
                                alt={image.alt}
                                fill
                                className={`object-cover transition-transform duration-500
    ${tappedCard === image.id ? "scale-105" : "scale-100"}
    ${
                                    image.src === "/images/elephant.jpg"
                                        ? "max-[425px]:object-[center_20%]"
                                        : image.src ===
                                        "public/images/gallery/photo/cultural/kandyan-dancers.webp"
                                            ? "max-[450px]:object-[center_25%]"
                                            : image.src ===
                                            "public/images/gallery/photo/beaches/unawatuna-beach.webp"
                                                ? "max-[425px]:object-[center_80%]"
                                                : image.src === "public/images/gallery/photo/beaches/arugam-bay.webp"
                                                    ? "max-[425px]:object-[center_75%]"
                                                    : image.src ===
                                                    "public/images/gallery/photo/heritage/sigiriya-rock.webp"
                                                        ? "max-[450px]:object-[center_20%]"
                                                        : image.src ===
                                                        "public/images/gallery/photo/heritage/galle-fort-sri-lanka.webp"
                                                            ? "max-[425px]:object-[center_30%]"
                                                            : image.src ===
                                                            "public/images/gallery/photo/heritage/temple-of-the-tooth.webp"
                                                                ? "max-[450px]:object-[center_35%]"
                                                                : image.src ===
                                                                "/public/images/gallery/photo/heritage/anuradhapura-dagoba.webp"
                                                                    ? "max-[475px]:object-[center_40%]"
                                                                    : image.src ===
                                                                    "public/images/gallery/photo/wildlife/udawalawe-safari.webp"
                                                                        ? "max-[450px]:object-[center_30%]"
                                                                        : "object-center"
                                }
  `}
                            />

                            {/* Tablet Hover/Tap Effect */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-[#6938D3]/80 to-transparent flex items-end p-4 transition-opacity duration-300
                  ${tappedCard === image.id ? "opacity-100" : "opacity-0"}`}
                            >
                                <div
                                    className={`text-white transition-transform duration-300
                  ${
                                        tappedCard === image.id ? "translate-y-0" : "translate-y-2"
                                    }`}
                                >
                                    <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                                    <p className="text-sm">{image.subtitle}</p>
                                </div>
                            </div>

                            {/* Shadow effect when active */}
                            <div
                                className={`absolute inset-0 transition-all duration-300
                  ${
                                    tappedCard === image.id
                                        ? "shadow-[inset_0_0_15px_rgba(105,56,211,0.4)]"
                                        : ""
                                }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Layout */}
                <div className="max-md:block md:hidden">
                    {/* First Row */}
                    <div
                        ref={firstRowRef}
                        className="flex flex-nowrap items-stretch gap-4 px-2 overflow-x-auto scrollbar-hide mb-4 pb-2 touch-pan-x z-10 relative"
                    >
                        {firstRowImages.map((image) => (
                            <div
                                key={image.id}
                                onClick={() => handleCardClick(image.id)}
                                className="relative w-[200px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-white  transition-all duration-300 cursor-pointer"
                            >
                                <Image
                                    src={getImageUrl(image.src)}
                                    alt={image.alt}
                                    fill
                                    className={`object-cover transition-transform duration-500
                    ${tappedCard === image.id ? "scale-105" : "scale-100"}
                    ${
                                        image.src === "/images/elephant.jpg"
                                            ? "max-[425px]:object-[center_20%]"
                                            : image.src ===
                                            "public/images/gallery/photo/cultural/kandyan-dancers.webp"
                                                ? "max-[450px]:object-[center_25%]"
                                                : image.src ===
                                                "public/images/gallery/photo/beaches/unawatuna-beach.webp"
                                                    ? "max-[425px]:object-[center_80%]"
                                                    : image.src ===
                                                    "public/images/gallery/photo/beaches/arugam-bay.webp"
                                                        ? "max-[425px]:object-[center_75%]"
                                                        : image.src ===
                                                        "public/images/gallery/photo/heritage/sigiriya-rock.webp"
                                                            ? "max-[450px]:object-[center_20%]"
                                                            : image.src ===
                                                            "public/images/gallery/photo/heritage/galle-fort-sri-lanka.webp"
                                                                ? "max-[425px]:object-[center_30%]"
                                                                : image.src ===
                                                                "public/images/gallery/photo/heritage/temple-of-the-tooth.webp"
                                                                    ? "max-[450px]:object-[center_35%]"
                                                                    : image.src ===
                                                                    "/public/images/gallery/photo/heritage/anuradhapura-dagoba.webp"
                                                                        ? "max-[475px]:object-[center_40%]"
                                                                        : image.src ===
                                                                        "public/images/gallery/photo/wildlife/udawalawe-safari.webp"
                                                                            ? "max-[450px]:object-[center_30%]"
                                                                            : "object-center"
                                    }
                  `}
                                />

                                {/* Mobile Hover/Tap Effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-[#6938D3]/80 to-transparent flex items-end p-3 transition-opacity duration-300
                    ${tappedCard === image.id ? "opacity-100" : "opacity-0"}`}
                                >
                                    <div
                                        className={`text-white transition-transform duration-300
                    ${
                                            tappedCard === image.id
                                                ? "translate-y-0"
                                                : "translate-y-2"
                                        }`}
                                    >
                                        <h3 className="text-sm font-bold mb-0.5 leading-tight">
                                            {image.title}
                                        </h3>
                                        <p className="text-[10px] leading-tight opacity-90">
                                            {image.subtitle}
                                        </p>
                                    </div>
                                </div>


                                <div
                                    className={`absolute inset-0 transition-all duration-300
                    ${
                                        tappedCard === image.id
                                            ? "shadow-[inset_0_0_15px_rgba(105,56,211,0.4)]"
                                            : ""
                                    }`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Second Row */}
                    <div
                        ref={secondRowRef}
                        className="flex flex-nowrap items-stretch gap-4 px-2 overflow-x-auto scrollbar-hide mb-4 pb-2 touch-pan-x z-10 relative"
                    >
                        {secondRowImages.map((image) => (
                            <div
                                key={image.id}
                                onClick={() => handleCardClick(image.id)}
                                className="relative w-[200px] h-[100px] flex-shrink-0 rounded-xl overflow-hidden bg-white  transition-all duration-300 cursor-pointer"
                            >
                                <Image
                                    src={getImageUrl(image.src)}
                                    alt={image.alt}
                                    fill
                                    className={`object-cover transition-transform duration-500
                    ${tappedCard === image.id ? "scale-105" : "scale-100"}
                    ${
                                        image.src === "/images/elephant.jpg"
                                            ? "max-[425px]:object-[center_20%]"
                                            : image.src ===
                                            "public/images/gallery/photo/cultural/kandyan-dancers.webp"
                                                ? "max-[450px]:object-[center_25%]"
                                                : image.src ===
                                                "public/images/gallery/photo/beaches/unawatuna-beach.webp"
                                                    ? "max-[425px]:object-[center_80%]"
                                                    : image.src ===
                                                    "public/images/gallery/photo/beaches/arugam-bay.webp"
                                                        ? "max-[425px]:object-[center_75%]"
                                                        : image.src ===
                                                        "public/images/gallery/photo/heritage/sigiriya-rock.webp"
                                                            ? "max-[450px]:object-[center_20%]"
                                                            : image.src ===
                                                            "public/images/gallery/photo/heritage/galle-fort-sri-lanka.webp"
                                                                ? "max-[425px]:object-[center_30%]"
                                                                : image.src ===
                                                                "public/images/gallery/photo/heritage/temple-of-the-tooth.webp"
                                                                    ? "max-[450px]:object-[center_35%]"
                                                                    : image.src ===
                                                                    "/public/images/gallery/photo/heritage/anuradhapura-dagoba.webp"
                                                                        ? "max-[475px]:object-[center_40%]"
                                                                        : image.src ===
                                                                        "public/images/gallery/photo/wildlife/udawalawe-safari.webp"
                                                                            ? "max-[450px]:object-[center_30%]"
                                                                            : "object-center"
                                    }
                  `}
                                />

                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-[#6938D3]/80 to-transparent flex items-end p-3 transition-opacity duration-300
                    ${tappedCard === image.id ? "opacity-100" : "opacity-0"}`}
                                >
                                    <div
                                        className={`text-white transition-transform duration-300
                    ${
                                            tappedCard === image.id
                                                ? "translate-y-0"
                                                : "translate-y-2"
                                        }`}
                                    >
                                        <h3 className="text-sm font-bold mb-0.5 leading-tight">
                                            {image.title}
                                        </h3>
                                        <p className="text-[10px] leading-tight opacity-90">
                                            {image.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`absolute inset-0 transition-all duration-300
                    ${
                                        tappedCard === image.id
                                            ? "shadow-[inset_0_0_15px_rgba(105,56,211,0.4)]"
                                            : ""
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhotoGallery;
