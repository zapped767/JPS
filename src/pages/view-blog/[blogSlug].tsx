import React, {useRef} from "react";
import {useRouter} from "next/router";
import {useBlogSlug} from "@/hooks/useApi";
import {motion} from "framer-motion";
import {BlogHero} from "@/components/sections/view-blog/BlogHero";
import BlogContent from "@/components/sections/view-blog/BlogContent";
import {BlogSidebar} from "@/components/sections/view-blog/BlogSideBar";
import ScrollIndicator from "@/components/sections/view-blog/ScrollIndicator";
import {getImageUrl} from "@/lib/utils";
import Head from "next/head";


export default function BlogSlug() {
    const router = useRouter();
    const {blogSlug} = router.query;

    const contentRef = useRef<HTMLDivElement>(null);

    const {
        data: blogData,
        isLoading,
        error,
    } = useBlogSlug(blogSlug as string, {
        enabled: !!blogSlug,
    });

    const ScrollToContent = () => {
        if (contentRef.current && typeof (contentRef.current as any).scrollIntoView === "function") {
            contentRef.current.scrollIntoView({behavior: "smooth", block: "start"});
            return;
        }
        // fallback: use id lookup
        const el = document.getElementById("content");
        el?.scrollIntoView({behavior: "smooth", block: "start"});
    };


    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-10">
                    <p className="text-red-500 text-xl mb-4">{error.message as string}</p>
                    <button
                        onClick={() => router.push("/blogs")}
                        className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Back to Blogs
                    </button>
                </div>
            </div>
        );

    const blogViewSchema = {
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
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": blogData?.title || "Blog Post",
                        "item": blogData?.slug
                            ? `https://www.zephyratravels.com/view-blog/${blogData?.slug}`
                            : "https://www.zephyratravels.com/blogs"
                    }
                ]
            },

            {
                "@type": "WebPage",
                "@id": blogData?.slug
                    ? `https://www.zephyratravels.com/view-blog/${blogData?.slug}#webpage`
                    : "https://www.zephyratravels.com/blogs#webpage",
                "url": blogData?.slug
                    ? `https://www.zephyratravels.com/view-blog/${blogData?.slug}`
                    : "https://www.zephyratravels.com/blogs",
                "name": blogData?.title || "Sri Lanka Travel Blog",
                "description":
                    blogData?.description ||
                    "Sri Lanka travel guides, tips, itineraries, and stories by ZephyraTravels.",
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://www.zephyratravels.com/#organization",
                    "name": "ZephyraTravels"
                }
            },

            {
                "@type": "BlogPosting",
                "@id": blogData?.slug
                    ? `https://www.zephyratravels.com/view-blog/${blogData?.slug}#blogposting`
                    : "https://www.zephyratravels.com/blogs#blogposting",

                "headline": blogData?.title || "Sri Lanka Travel Article",

                "description":
                    blogData?.description ||
                    "Travel guide article about Sri Lanka by ZephyraTravels.",

                "image": blogData?.image
                    ? {
                        "@type": "ImageObject",
                        "url": getImageUrl(blogData.image),
                        "width": 1200,
                        "height": 630
                    }
                    : {
                        "@type": "ImageObject",
                        "url": getImageUrl("public/logo.avif"),
                        "width": 1200,
                        "height": 630
                    },

                "author": {
                    "@type": "Organization",
                    "name": "ZephyraTravels",
                    "@id": "https://www.zephyratravels.com/#organization"
                },

                "publisher": {
                    "@type": "Organization",
                    "name": "ZephyraTravels",
                    "logo": {
                        "@type": "ImageObject",
                        "url": getImageUrl("public/logo.avif"),
                        "width": 512,
                        "height": 512
                    }
                },

                "datePublished": blogData?.createdAt || undefined,
                "dateModified": blogData?.createdAt || undefined,

                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": blogData?.slug
                        ? `https://www.zephyratravels.com/view-blog/${blogData?.slug}`
                        : "https://www.zephyratravels.com/blogs"
                },

                "articleSection": blogData?.category?.name || "Sri Lanka Travel",
                "keywords": "Sri Lanka travel, blog, ZephyraTravels"
            }
        ]
    };


    return (
        <>
            <Head>
                {/* Primary SEO */}
                <title>
                    {blogData?.title
                        ? `${blogData.title} | Sri Lanka Travel Guide 2025 | Zephyra Travels`
                        : "Sri Lanka Travel Blog 2025 | Expert Guides | Zephyra Travels"}
                </title>
                <meta
                    name="description"
                    content={
                        blogData?.description ||
                        "Expert Sri Lanka travel guide by local experts. Destination tips, budget advice, best times to visit, itineraries, and insider recommendations. Updated 2025."
                    }
                />
                <meta
                    name="keywords"
                    content={`${blogData?.title || 'Sri Lanka travel guide'}, Sri Lanka travel tips 2025, ${blogData?.category?.name || 'travel'} guide Sri Lanka, Sri Lanka destination guide, budget travel tips Sri Lanka, best time visit Sri Lanka, Sri Lanka itinerary planning, local expert tips Sri Lanka`}
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Sri Lanka"/>
                <meta name="article:published_time" content={blogData?.createdAt}/>
                <meta name="article:modified_time" content={blogData?.createdAt}/>
                <meta name="article:author" content="Zephyra Travels"/>
                <meta name="article:section" content={blogData?.category?.name || "Sri Lanka Travel"}/>

                {/* Canonical & Language */}
                <link
                    rel="canonical"
                    href={
                        blogData?.slug
                            ? `https://www.zephyratravels.com/view-blog/${blogData.slug}`
                            : "https://www.zephyratravels.com/blogs"
                    }
                />
                <link
                    rel="alternate"
                    hrefLang="en"
                    href={
                        blogData?.slug
                            ? `https://www.zephyratravels.com/view-blog/${blogData.slug}`
                            : "https://www.zephyratravels.com/blogs"
                    }
                />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href={
                        blogData?.slug
                            ? `https://www.zephyratravels.com/view-blog/${blogData.slug}`
                            : "https://www.zephyratravels.com/blogs"
                    }
                />

                {/* Preload hero image */}
                <link rel="preload" as="image" href={getImageUrl("public/images/view-blog/blog-hero.webp")}/>

                {/* Favicons */}
                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                {/* Open Graph */}
                <meta property="og:type" content="article"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:title" content={blogData?.title
                    ? `${blogData.title} | Sri Lanka Travel Guide 2025`
                    : "Sri Lanka Travel Blog 2025 | Expert Guides"}/>
                <meta
                    property="og:description"
                    content={
                        blogData?.description ||
                        "Expert Sri Lanka travel guide by local experts. Destination tips, budget advice, best times to visit, insider recommendations. Updated 2025."
                    }
                />

                <meta property="og:url" content={`https://www.zephyratravels.com/view-blog/${blogData?.slug}`}/>
                <meta property="og:image" content={getImageUrl(blogData?.image)}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt"
                      content={`${blogData?.title || 'Sri Lanka Travel Guide'} - Zephyra Travels Blog`}/>
                <meta property="article:published_time" content={blogData?.createdAt}/>
                <meta property="article:modified_time" content={blogData?.createdAt}/>
                <meta property="article:author" content="Zephyra Travels"/>
                <meta property="article:section" content={blogData?.category?.name || "Sri Lanka Travel"}/>

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@zephyratravels"/>
                <meta name="twitter:creator" content="@zephyratravels"/>
                <meta name="twitter:title" content={blogData?.title
                    ? `${blogData?.title} | Sri Lanka Guide 2025`
                    : "Sri Lanka Travel Blog 2025"}/>
                <meta
                    name="twitter:description"
                    content={
                        blogData?.description ||
                        "Explore Sri Lanka travel tips, guides, itineraries, and helpful insights from ZephyraTravels."
                    }
                />
                <meta name="twitter:image" content={getImageUrl(blogData?.image)}/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(blogViewSchema)
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased overflow-x-hidden w-full">
                <div className="overflow-x-hidden">
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>
                {/* Main Content */}
                <main className="pt-20 max-md:pt-16 w-full overflow-x-hidden">
                    <div className="relative max-w-7xl mx-auto max-2xl:mx-10 max-sm:mx-4">

                        {blogData &&
                            <BlogHero blogTitle={blogData?.title} image={blogData?.image}
                                      createdAt={blogData?.createdAt}
                                      author={blogData?.author}/>
                        }
                    </div>
                    <div className="relative max-md:h-[80px] h-[120px] max-w-7xl mx-auto flex justify-center">
                        <ScrollIndicator
                            OnClick={ScrollToContent}
                            className="top-1/2 -translate-y-1/2"
                        />
                    </div>

                    {isLoading && <div className="h-96 animate-pulse bg-gray-100">
                        Loading...
                    </div>}


                    <div className="max-w-7xl mx-auto pb-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {blogData && blogData.sections.length > 0 &&
                                <div className="flex-1 p-4 pt-0 xl:p-0">
                                    <BlogContent sections={blogData?.sections}/>
                                </div>
                            }

                            {!blogData || blogData.sections.length <= 0 &&
                                <div className="flex-1 p-4 pt-0 xl:p-0">

                                </div>
                            }

                            <aside className="w-full lg:w-[380px] shrink-0">
                                <BlogSidebar author={blogData?.author || ""} aboutAuthor={blogData?.aboutAuthor || ""}
                                             bestTimeToVisit={blogData?.bestTimeToVisit || []}/>
                            </aside>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
