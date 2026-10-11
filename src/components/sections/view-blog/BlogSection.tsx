import Image from "next/image";
import type React from "react";
import {getImageUrl} from "@/lib/utils";

interface BlogSectionProps {
    title?: string;
    content?: string;
    image?: string;
}

export const BlogSection = ({title, content, image}: BlogSectionProps) => {
    return (
        <section>
            {title &&
                <h2 className="text-xl sm:text-2xl font-bold text-primary-600 mt-8 mb-4">
                    {title}
                </h2>}
            {content &&
                <p className="text-[#353535] leading-relaxed">
                    {content}
                </p>}

            {image &&
                <div className="my-8 not-prose">
                    <div className="relative w-full h-[250px] sm:h-[350px] rounded-2xl overflow-hidden">
                        <Image
                            src={getImageUrl(image)}
                            alt="Sigiriya Rock Fortress"
                            fill
                            className="object-cover object-bottom"
                        />
                    </div>
                </div>}
        </section>
    )
}