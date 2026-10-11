import {RelatedBlogCard} from "@/components/sections/view-blog/RelatedBlogCard";
import {useQuery} from "@tanstack/react-query";
import {blogsService} from "@/lib/services";
import React, {useRef} from "react";

type RelatedPostType = {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
};

export function RelatedPosts() {

    const scrollRef = useRef<HTMLDivElement | null>(null);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const {data: blogsData, isLoading, error} = useQuery({
        queryKey: ["blogs"],
        queryFn: blogsService.getBlogs,
    });

    const relatedPosts: RelatedPostType[] = React.useMemo(() => {
        if (!blogsData?.content) return [];

        return blogsData.content
            .filter((cat: any) => cat.blogsAndNews?.length > 0)
            .slice(0, 3)
            .map((cat: any) => {
                const blog = cat.blogsAndNews[0];
                if (!blog) return null; // safety
                return {
                    id: blog.id,
                    title: blog.title ?? "",
                    description: blog.description ?? "",
                    image: blog.image ?? "",
                    slug: blog.slug ?? "",
                };
            })
            .filter(Boolean) as RelatedPostType[]; // remove nulls
    }, [blogsData]);

    if (isLoading) return <p className="text-center">Loading related posts...</p>;
    if (error) return <p className="text-center text-red-500">Failed to load related posts</p>;

    if (relatedPosts.length === 0) return null;

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
        <section className="py-5 rounded-2xl px-6">
            <div className="max-w-7xl mx-auto flex flex-col justify-center">
                <h2 className="text-2xl sm:text-3xl !font-bold text-[#1c1c1c] text-center mb-10">
                    <span className="text-[#872bff]">You</span> Might Also Like
                </h2>
                <div className="hidden lg:flex flex-col gap-10">
                    {relatedPosts.map((post) => (
                        <RelatedBlogCard key={post.id} {...post} />
                    ))}
                </div>

                <div
                    ref={scrollRef}
                    className="lg:hidden flex min-[850px]:justify-center gap-6 pb-4 max-lg:overflow-y-hidden max-lg:overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab lg:cursor-default"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {relatedPosts.map((post) => (
                        <RelatedBlogCard key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
