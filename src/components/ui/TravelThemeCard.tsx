import Image from "next/image";
import {getImageUrl} from "@/lib/utils";

interface TravelThemeCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    className?: string;
}

export default function TravelThemeCard({
                                            title,
                                            description,
                                            imageSrc,
                                            imageAlt,
                                            className = "",
                                        }: TravelThemeCardProps) {
    return (
        <div
            className={`bg-white rounded-[25px] max-[375px]:w-[200px] max-[375px]:min-w-[200px] min-w-[250px] sm:w-[300px] overflow-hidden shadow-md md:shadow-lg group hover:scale-105 transition-all duration-300 hover:shadow-xl ${className}`}
        >
            {/* Image */}
            <div className="w-full h-[250px] max-md:h-[180px] bg-gray-300 bg-cover bg-center relative">
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
            <div className="p-5 max-md:p-3 max-md:text-center">
                <h3 className="font-extrabold text-[22px] max-md:text-[18px] leading-[30px] text-[#6938d3] mb-3.5 max-md:mb-3">
                    {title}
                </h3>
                <p className="font-medium text-[14px] max-md:text-[10px] leading-[30px] max-md:leading-[18px] text-[#525252] text-left max-md:text-center">
                    {description}
                </p>
            </div>
        </div>
    );
}
