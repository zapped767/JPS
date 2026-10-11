import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

interface TravelThemeCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    className?: string;
}

export default function DayTourTravelThemeCard({
                                                   title,
                                                   description,
                                                   imageSrc,
                                                   imageAlt,
                                                   className = "",
                                               }: TravelThemeCardProps) {
    return (
        <div
            className={`flex bg-white rounded-2xl min-w-[200px] sm:min-w-[48%] h-[100px] md:h-[150px] overflow-hidden shadow-md md:shadow-lg group hover:scale-105 transition-all duration-300 hover:shadow-xl ${className}`}
        >
            {/* Image */}
            <div className="w-[50%] h-full bg-gray-300 bg-cover bg-center relative">
                <Image
                    src={getImageUrl(imageSrc)}
                    alt={imageAlt}
                    width={640}
                    height={278}
                    quality={75}
                    loading="lazy"
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-5 max-md:p-3 text-center w-[50%] flex flex-col justify-center items-center">
                <h3 className="font-extrabold text-xs md:text-lg  text-[#6938d3] mb-1 md:mb-4">
                    {title}
                </h3>
                <p className="font-medium text-[10px] md:text-sm text-[#525252] text-center">
                    {description}
                </p>
            </div>
        </div>
    );
}
