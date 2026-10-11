import Image from "next/image"
import {Calendar, User} from "lucide-react"
import {getImageUrl} from "@/lib/utils";

interface BlogHeroProps {
    blogTitle: string
    image: string
    createdAt: string
    author: string
}

export function BlogHero({blogTitle, createdAt, author}: BlogHeroProps) {

    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


    return (
        <section className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
            <Image
                src={getImageUrl("public/images/view-blog/blog-hero.webp")}
                alt={blogTitle}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 flex flex-wrap justify-center items-center">
                    <div className="min-w-fit">{blogTitle}</div>
                </h1>
                <div className="flex items-center gap-4 sm:gap-6 text-white/90 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                        <Calendar size={16}/>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User size={16}/>
                        <span>By {author}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
