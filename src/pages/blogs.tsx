import React, {useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {blogsService} from "@/lib/services";
import SearchSection from "@/components/sections/blogs/components/SearchSection";
import ScrollIndicator from "@/components/sections/blogs/components/ScrollIndicator";
import dynamic from "next/dynamic";
import Head from "next/head";
import {getImageUrl} from "@/lib/utils";

const BlogCategory = dynamic(
    () => import("@/components/sections/blogs/components/BlogCategory"),
    {
        loading: () => <div className="h-32 animate-pulse bg-gray-100"></div>,
    }
);

const AboutSection = dynamic(
    () => import("@/components/sections/blogs/components/AboutSection"),
    {
        loading: () => <div className="h-32 animate-pulse bg-gray-100"></div>,
    }
);

export default function Blogs() {

    const {
        data: blogsData,
        isLoading,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: blogsService.getBlogs,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(blogsData?.content || []);
    const blogsRef = useRef<HTMLDivElement>(null);

    const blogsListSchema = {
        "@context": "https://schema.org",
        "@graph": [

            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.zephyratravels.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Blogs",
                        "item": "https://www.zephyratravels.com/blogs"
                    }
                ]
            },

            {
                "@type": "WebPage",
                "@id": "https://www.zephyratravels.com/blogs/#webpage",
                "url": "https://www.zephyratravels.com/blogs",
                "name": "Zephyra Travels Blog",
                "description": "Sri Lanka travel guides, tips, itineraries, and stories categorized for easy browsing.",
                "publisher": {
                    "@type": "Organization",
                    "name": "Zephyra Travels",
                    "logo": {
                        "@type": "ImageObject",
                        "url": getImageUrl("public/logo.avif")
                    }
                }
            },

            {
                "@type": "ItemList",
                "name": "Blog Categories",
                // Guard against undefined blogsData during initial render
                "itemListElement": (blogsData?.content ?? []).map((category: any, catIndex: number) => ({
                    "@type": "ListItem",
                    "position": catIndex + 1,
                    "name": category?.name ?? "",
                    "item": {
                        "@type": "ItemList",
                        "name": `${category?.name ?? "Category"} Blogs`,
                        "itemListElement": (category?.blogsAndNews ?? []).map(
                            (blog: any, blogIndex: number) => ({
                                "@type": "ListItem",
                                "position": blogIndex + 1,
                                "url": `https://www.zephyratravels.com/view-blog/${blog?.slug}`,
                                "item": {
                                    "@type": "BlogPosting",
                                    "@id": `https://www.zephyratravels.com/view-blog/${blog?.slug}`,
                                    "headline": blog?.title ?? "",
                                    "description": blog?.description || "",
                                    "image": blog?.image || "",
                                    "author": {
                                        "@type": "Organization",
                                        "name": "Zephyra Travels"
                                    },
                                    "datePublished": blog?.createdAt,
                                    "mainEntityOfPage": {
                                        "@type": "WebPage",
                                        "@id": `https://www.zephyratravels.com/view-blog/${blog?.slug}`
                                    }
                                }
                            })
                        )
                    }
                }))
            }
        ]
    };

    const ScrollToBlogs = () => {
        if (blogsRef.current && typeof (blogsRef.current as any).scrollIntoView === "function") {
            blogsRef.current.scrollIntoView({behavior: "smooth", block: "start"});
            return;
        }
        // fallback: use id lookup
        const el = document.getElementById("blogs-section");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    useEffect(() => {
        if (!blogsData) return;

        if (!searchQuery.trim()) {
            setFilteredData(blogsData.content);
            return;
        }

        const query = searchQuery.toLowerCase();

        const results = blogsData.content
            .map((category: any) => ({
                ...category,
                blogsAndNews: category.blogsAndNews.filter(
                    (blog: any) =>
                        blog.title.toLowerCase().includes(query) ||
                        blog.badgeTag.toLowerCase().includes(query)
                ),
            }))
            .filter(
                (category: any) =>
                    category.blogsAndNews.length > 0 ||
                    category.name.toLowerCase().includes(query) ||
                    category.subTitle.toLowerCase().includes(query)
            );

        setFilteredData(results);
    }, [searchQuery, blogsData]);


    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title>Sri Lanka Travel Blog 2025 | Guides, Tips & Itineraries | Zephyra Travels</title>
                <meta
                    name="description"
                    content="Expert Sri Lanka travel guides by local experts. Budget travel tips, best time to visit, Ella train ride guide, Yala safari tips, Kandy itineraries, beach recommendations. Updated 2025."
                />
                <meta
                    name="keywords"
                    content="Sri Lanka travel blog, Sri Lanka travel tips, Sri Lanka itineraries, Travel Bloggers, Travel blogger names, Travel blog page, Travel blog examples, Travel blog websites, colombo sri lanka travel blog, sri lanka travel blog, travel blog sri lanka, ella sri lanka travel blog, sri lanka travel blog 2019, sri lanka travel blog 2024, sri lanka travel blogs, best travel blog sri lanka, blog sri lanka travel, east coast sri lanka travel blog"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Sri Lanka"/>

                {/* Canonical & Language */}
                <link rel="canonical" href="https://www.zephyratravels.com/blogs"/>
                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/blogs"/>
                <link rel="alternate" hrefLang="x-default" href="https://www.zephyratravels.com/blogs"/>

                {/* Favicons */}
                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                {/* Open Graph */}
                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title"
                      content="Sri Lanka Travel Blog 2025 | Guides, Tips & Itineraries | Zephyra Travels"/>
                <meta
                    property="og:description"
                    content="Expert Sri Lanka travel guides by local experts. Budget tips, best times to visit, Ella train guide, Yala safari tips, destination itineraries. Updated 2025."
                />
                <meta property="og:url" content="https://www.zephyratravels.com/blogs"/>
                <meta property="og:image" content={getImageUrl("public/images/view-blog/blog-hero.webp")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Sri Lanka Travel Blog - Expert Guides and Tips"/>

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title" content="Sri Lanka Travel Blog 2025 | Expert Guides & Tips"/>
                <meta
                    name="twitter:description"
                    content="Local expert guides for Sri Lanka: budget tips, best times, Ella train, Yala safaris, destination itineraries. Updated 2025."
                />
                <meta name="twitter:image" content={getImageUrl("public/images/view-blog/blog-hero.webp")}/>
                <meta name="twitter:image:alt" content="Sri Lanka Travel Blog - Expert Guides and Tips"/>

                {/* Structured Data JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(blogsListSchema)
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white">

                <div
                    className="block absolute top-0 left-0 w-[300px] h-[300px] sm:w-[800px] sm:h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,200,1)_0%,rgba(255,0,200,0.3)_40%,transparent_70%)] blur-3xl opacity-40 -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div
                    className="hidden lg:block absolute top-1/2 right-40 w-[400px] h-[400px] bg-[#872BFF] opacity-40 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-4 lg:px-6 py-20 lg:py-28 relative z-10 pt-26 lg:pt-28 ">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Explore the World with
                            <p className="text-3xl lg:text-5xl font-bold text-[#EB00A5] mt-2">Zephyra Travels</p>
                        </h1>
                        <p className="text-gray-600 text-sm lg:text-base px-4 lg:px-0">
                            Discover hidden gems, travel smarter, and stay updated with the
                            latest in the travel industry
                        </p>
                    </div>

                    <SearchSection onSearch={setSearchQuery}/>

                    <div className="relative max-md:h-20 h-[120px] max-w-7xl mx-auto flex justify-center">
                        <ScrollIndicator OnClick={ScrollToBlogs} className="top-1/2 -translate-y-1/2"/>
                    </div>

                    {isLoading && <div className="text-center">Loading...</div>}

                    {/* Sections with refs and IDs */}
                    {blogsData &&
                        <div ref={blogsRef} id="blogs-section" className="scroll-offset">
                            {filteredData?.map((category: any) => (
                                <section key={category.id} className="scroll-mt-21" id={`section-${category.id}`}>
                                    <BlogCategory category={category}/>
                                </section>
                            ))}
                        </div>}

                </div>

                <section
                    id="section-about"
                    className="scroll-mt-20"
                >
                    <AboutSection/>
                </section>
            </div>
        </>
    );
}