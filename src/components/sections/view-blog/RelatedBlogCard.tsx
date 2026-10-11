import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import {useRouter} from "next/router";
import React from "react";

interface RelatedBlogCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
}

export const RelatedBlogCard = ({id, title, description, image, slug}: RelatedBlogCardProps) => {

    const router = useRouter();

    const handleSeeMore = async (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        sessionStorage.setItem("prev", "/blogs");
        try {
            await router.push(`/view-blog/${slug}`);
        } catch (error) {
            console.error("Error navigating to blog:", error);
        }
    };
    return (
        <div
            key={id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow max-[425px]:!max-w-[180px] max-[425px]:!min-w-[180px] max-lg:min-w-[250px] max-lg:max-w-[250px] relative"
        >
            <div className="relative max-[425px]:!h-[120px] h-[180px] sm:h-[200px]">
                <Image src={getImageUrl(image) || "/placeholder.svg"} alt={title} fill className="object-cover"/>
            </div>
            <div className="p-5 max-[425px]:!p-3">
                <h3 className="font-bold text-[#1c1c1c] mb-2 max-[425px]:!mb-1 line-clamp-2 max-[425px]:!text-sm">{title}</h3>
                <p className="text-sm text-[#707487] mb-4 max-[425px]:!text-xs line-clamp-2">{description}</p>
                <button onClick={(e) => handleSeeMore(e, slug)}
                        className="text-sm max-[425px]:!text-xs font-medium text-[#872bff] hover:underline absolute bottom-2 cursor-pointer">
                    Read More
                </button>
            </div>
        </div>
    )
}