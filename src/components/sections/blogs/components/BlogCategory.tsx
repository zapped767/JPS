import React, {useRef} from "react";
import {ArrowRight} from "lucide-react";
import {getImageUrl} from "@/lib/utils";
import {useRouter} from "next/router";
import Image from "next/image";

interface BlogCategoryProps {
    category: any;
}

const BlogCategory = ({category}: BlogCategoryProps) => {
    const router = useRouter();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const isMouseDownRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isMouseDownRef.current = true;
        isScrollingRef.current = true; // Prevent scroll event handler from updating index
        scrollContainerRef.current.style.cursor = 'grabbing';
        scrollContainerRef.current.style.userSelect = 'none';
        startXRef.current = e.pageX;
        scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isMouseDownRef.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
            scrollContainerRef.current.style.userSelect = 'auto';
        }
        // Re-enable scroll event handler after a delay
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 100);
    };

    const handleMouseUp = () => {
        isMouseDownRef.current = false;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
            scrollContainerRef.current.style.userSelect = 'auto';
        }
        // Re-enable scroll event handler after a delay
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 100);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDownRef.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startXRef.current) * 1.5;
        scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };


    const handleSeeMore = async (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        sessionStorage.setItem("prev", "/blogs");
        try {
            await router.push(`/view-blog/${slug}`);
        } catch (error) {
            console.error("Error navigating to blog:", error);
        }
    };

    if (!category) {
        return (
            <section className="mb-16 text-center py-10">
                <p className="text-gray-500">Loading...</p>
            </section>
        );
    }

    return (
        <section className="mb-9 lg:mb-12 scroll-mt-20">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-3">
                    <span className="text-[#6938D3]">{category.name.split(" ")[0]}</span>{" "}
                    <span className="text-gray-900">
              {category.name.split(" ").slice(1).join(" ")}
            </span>
                </h2>
                <p className="text-gray-600 text-sm lg:text-base px-4 lg:px-0 ">
                    {category.subTitle}
                </p>
            </div>

            {/* Desktop Layout */}
            <div className=" py-2 max-sm:py-0">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-scroll packages-scroll scrollbar-hide py-3  sm:py-6 px-5"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {category.blogsAndNews.map((blog: any) => (

                        <div
                            key={blog.id}
                            id={`blog-${blog.id}`}
                            className="bg-white rounded-2xl transition-transform hover:-translate-y-1 shadow-md sm:shadow-lg overflow-hidden flex flex-col max-[425px]:!min-h-[280px] max-[425px]:!max-h-[280px] min-h-[320px] max-h-[320px] sm:min-h-[380px] sm:max-h-[380px] lg:min-h-[420px] max-[425px]:!max-w-[200px] max-[425px]:!min-w-[200px] max-w-[230px] min-w-[230px] sm:max-w-[280px] sm:min-w-[280px] lg:max-w-[320px]">
                            {/* Image */}
                            <div className="max-[425px]:h-30 h-40 sm:h-48 bg-gray-300 relative">
                                <Image
                                    src={getImageUrl(blog.image)}
                                    alt={blog.title}
                                    width={640}
                                    height={278}
                                    quality={75}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute top-2 right-2 p-2 rounded-full text-white bg-primary-500 text-xs">{blog.badgeTag}</div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6 flex flex-col flex-1 relative">
                                <h3 className="max-[425px]:text-xs text-sm sm:text-md lg:text-lg font-bold text-gray-900 mb-1 sm:mb-3">{blog.title}</h3>
                                <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm mb-4 flex-grow">{blog.description}</p>

                                {/* Button always at bottom */}
                                <button
                                    className="absolute bottom-4 left-4 sm:left-6 mt-auto text-[#6938D3] max-[425px]:text-[10px] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSeeMore(e, blog.slug);
                                    }}
                                >
                                    Read more <ArrowRight size={12}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogCategory;
