import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

const HeroSection = dynamic(
  () =>
    import("@/components/sections/home/HeroSection").then((mod) => ({
      default: mod.HeroSection,
    })),
  {
    ssr: true,
  }
);
const DayToursSection = dynamic(
  () =>
    import("@/components/sections/home/DayToursSection").then((mod) => ({
      default: mod.DayToursSection,
    })),
  { ssr: true }
);

const ImageScrollSection = dynamic(
  () =>
    import("@/components/sections/home/ImageScrollSection").then((mod) => ({
      default: mod.ImageScrollSection,
    })),
  {
    ssr: true,
  }
);



const InfinityScroll = dynamic(
  () =>
    import("@/components/sections/home/InfinityScroll").then((mod) => ({
      default: mod.InfinityScroll,
    })),
  {
    ssr: true,
  }
);



const ServicesSection = dynamic(
  () =>
    import("@/components/sections/home/ServicesSection").then((mod) => ({
      default: mod.ServicesSection,
    })),
  {
    ssr: true,
  }
);

const PackagesSection = dynamic(
  () =>
    import("@/components/sections/home/PackagesSection").then((mod) => ({
      default: mod.PackagesSection,
    })),
  {
    ssr: false,
  }
);

const InfiniteScroll = dynamic(
  () =>
    import("@/components/ui/InfiniteScroll").then((mod) => ({
      default: mod.InfiniteScroll,
    })),
  { ssr: true }
);

const TrustUs = dynamic(() => import("@/components/sections/home/TrustUs"), {
  ssr: true,
});


const ExperiencesSection = dynamic(
  () =>
    import("@/components/sections/home/ExperiencesSection").then((mod) => ({
      default: mod.ExperiencesSection,
    })),
  { ssr: true }
);

const MemberShipSection = dynamic(
  () => import("@/components/sections/home/MemberShipSection"),
  { ssr: true }
);

const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"), {
  ssr: true,
});

const Home = React.memo(function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Show scroll indicator after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  //position scroll - deferred to not block initial render/LCP
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Defer scroll restoration to not block LCP
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem("scrollPosition");
      const navEntries = performance?.getEntriesByType?.("navigation") as
        | PerformanceNavigationTiming[]
        | undefined;
      const isReload = navEntries?.[0]?.type === "reload";

      if (savedPosition && isReload) {
        const target = Math.max(0, parseInt(savedPosition, 10) - 5);
        // Use double RAF to ensure it runs after paint
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (document.body.scrollHeight - window.innerHeight >= target) {
              window.scrollTo({ top: target, left: 0, behavior: "instant" });
              sessionStorage.removeItem("scrollPosition");
            }
          });
        });
      } else {
        // Only scroll to top if not a reload, and defer it
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0 });
        });
      }
    };

    // Defer execution to next tick to not block initial render
    setTimeout(restoreScroll, 0);

    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      passive: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>
          Zephyra Travels | Sri Lanka Tour Packages from Colombo | Local Travel
          Experts 2025
        </title>
        <meta
          name="description"
          content="Book affordable Sri Lanka tours with local experts. Budget family packages from $499, honeymoon tours with Ella train ride, Yala wildlife safaris, Kandy cultural tours. Direct booking, no middleman, 24/7 support. SLTDA registered."
        />
        <meta
          name="keywords"
          content="budget Sri Lanka tour packages, affordable Sri Lanka holidays Colombo, family tours Sri Lanka from $499, honeymoon package Ella train ride, Yala wildlife safari booking, Kandy cultural heritage tours, Sigiriya day trips from Colombo, Galle fort guided tours, customized Sri Lanka itineraries, local travel agency Colombo, SLTDA registered tour operator, private driver Sri Lanka, airport transfers Colombo, whale watching Mirissa tours, Nine Arch Bridge Ella, Sri Lanka beach holidays Bentota, adventure tours Sri Lanka, luxury Sri Lanka vacation packages, B2B DMC Sri Lanka"
        />
        <meta name="application-name" content="Zephyra Travels" />
        <meta name="author" content="Zephyra Travels Pvt Ltd" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Colombo, Sri Lanka" />
        <meta
          name="geo.position"
          content="6.876764962224119;79.8766838976908"
        />
        <meta name="ICBM" content="6.876764962224119, 79.8766838976908" />

        {/* Canonical & Language */}
        <link rel="canonical" href="https://www.zephyratravels.com" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.zephyratravels.com"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.zephyratravels.com"
        />

        {/* Favicons */}
        <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")} />
        <link
          rel="apple-touch-icon"
          href={getImageUrl("public/apple-touch-icon.avif")}
        />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zephyra Travels" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:title"
          content="Zephyra Travels | Sri Lanka Tour Packages from Colombo | Local Travel Experts"
        />
        <meta
          property="og:description"
          content="Book affordable Sri Lanka tours with local experts. Budget family packages from $499, honeymoon tours with Ella train ride, Yala wildlife safaris. Direct booking, no middleman, 24/7 support. SLTDA registered."
        />
        <meta property="og:url" content="https://www.zephyratravels.com" />
        <meta property="og:image" content={getImageUrl("public/logo.avif")} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Zephyra Travels - Affordable Sri Lanka Tour Packages"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zephyratravels" />
        <meta name="twitter:creator" content="@zephyratravels" />
        <meta
          name="twitter:title"
          content="Zephyra Travels | Sri Lanka Tour Packages from Colombo"
        />
        <meta
          name="twitter:description"
          content="Book affordable Sri Lanka tours from $499. Honeymoon packages, wildlife safaris, cultural tours. Local experts, direct booking, 24/7 support."
        />
        <meta name="twitter:image" content={getImageUrl("public/logo.avif")} />
        <meta
          name="twitter:image:alt"
          content="Zephyra Travels - Affordable Sri Lanka Tour Packages"
        />

        <link
          rel="preconnect"
          href="https://cdn.zephyratravels.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://dev.api.zephyratravels.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://www.zephyratravels.com",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Packages",
                      item: "https://www.zephyratravels.com/packages",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "Partners",
                      item: "https://www.zephyratravels.com/partners",
                    },
                    {
                      "@type": "ListItem",
                      position: 4,
                      name: "About Us",
                      item: "https://www.zephyratravels.com/about",
                    },
                    {
                      "@type": "ListItem",
                      position: 5,
                      name: "Gallery",
                      item: "https://www.zephyratravels.com/gallery",
                    },
                    {
                      "@type": "ListItem",
                      position: 6,
                      name: "Blogs",
                      item: "https://www.zephyratravels.com/blogs",
                    },
                    {
                      "@type": "ListItem",
                      position: 7,
                      name: "Privacy Policy",
                      item: "https://www.zephyratravels.com/policies#privacy-policy",
                    },
                    {
                      "@type": "ListItem",
                      position: 8,
                      name: "Terms & Conditions",
                      item: "https://www.zephyratravels.com/policies#terms-and-conditions",
                    },
                    {
                      "@type": "ListItem",
                      position: 9,
                      name: "Refund & Cancellation",
                      item: "https://www.zephyratravels.com/policies#refund-cancellation-policy",
                    },
                  ],
                },
                {
                  "@type": "TravelAgency",
                  "@id": "https://www.zephyratravels.com/#Organization",
                  name: "Zephyra Travels",
                  legalName: "Zephyra Travels Pvt Ltd",
                  description:
                    "SLTDA registered Sri Lankan tour operator offering budget-friendly customized travel packages with local expert guides. Direct booking with no middleman. Specialized in family tours, honeymoon packages, wildlife safaris, and cultural experiences.",
                  url: "https://www.zephyratravels.com",
                  logo: getImageUrl("public/logo.avif"),
                  image: [
                    getImageUrl("public/images/home/hero/nine-arch.avif"),
                    getImageUrl("public/images/home/hero/fishing.avif"),
                    getImageUrl("public/images/home/hero/surfing.avif"),
                  ],

                  foundingDate: "2025-01-01",
                  slogan: "Fall In Love With Sri Lanka",

                  telephone: "+94 76 134 5718",
                  priceRange: "$$",

                  knowsAbout: [
                    "Sri Lanka Tourism",
                    "Budget Family Tours",
                    "Honeymoon Packages",
                    "Wildlife Safaris Yala",
                    "Cultural Heritage Tours Kandy",
                    "Ella Train Rides",
                    "Beach Holidays",
                    "Adventure Travel",
                    "Destination Management",
                  ],

                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "No 41, Robert Gunawardena Mawatha, Kirulapone",
                    addressLocality: "Colombo 06",
                    addressRegion: "Western Province",
                    postalCode: "00600",
                    addressCountry: "LK",
                  },

                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: "6.876764962224119",
                    longitude: "79.8766838976908",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "1200",
                  },
                  sameAs: [
                    "https://maps.app.goo.gl/Mh87Yi8FNU6fXbTm7",
                    "https://www.facebook.com/zephyratravelslk",
                    "https://www.instagram.com/zephyratravels/",
                    "https://www.linkedin.com/company/zephyratravels",
                    "https://x.com/zephyratravels",
                    "https://www.tiktok.com/@zephyratravels",
                    "https://www.youtube.com/@ZephyraTravels",
                    "https://www.pinterest.com/zephyratravels/",
                    "https://www.tripadvisor.com/Attraction_Review-g293962-d33675398-Reviews-ZephyraTravels-Colombo_Western_Province.html",
                    "https://wa.me/94761345718",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Sri Lankan Travel Packages",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "TouristTrip",
                          name: "Sri Lankan Cultural Tours",
                          description:
                            "Authentic cultural experiences in Sri Lanka",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "TouristTrip",
                          name: "Sri Lankan Adventure Tours",
                          description:
                            "Adventure and outdoor activities in Sri Lanka",
                        },
                      },
                    ],
                  },
                  areaServed: [
                    { "@type": "Country", name: "India", identifier: "IN" },
                    {
                      "@type": "Country",
                      name: "Russian Federation",
                      identifier: "RU",
                    },
                    {
                      "@type": "Country",
                      name: "United Kingdom",
                      identifier: "GB",
                    },
                    { "@type": "Country", name: "Germany", identifier: "DE" },
                    { "@type": "Country", name: "France", identifier: "FR" },
                    { "@type": "Country", name: "Italy", identifier: "IT" },
                    {
                      "@type": "Country",
                      name: "Netherlands",
                      identifier: "NL",
                    },
                    { "@type": "Country", name: "Spain", identifier: "ES" },
                    {
                      "@type": "Country",
                      name: "Switzerland",
                      identifier: "CH",
                    },
                    { "@type": "Country", name: "Belgium", identifier: "BE" },
                    { "@type": "Country", name: "Austria", identifier: "AT" },
                    { "@type": "Country", name: "Norway", identifier: "NO" },
                    { "@type": "Country", name: "Sweden", identifier: "SE" },
                    { "@type": "Country", name: "Denmark", identifier: "DK" },
                    { "@type": "Country", name: "Portugal", identifier: "PT" },
                    { "@type": "Country", name: "Ukraine", identifier: "UA" },
                    {
                      "@type": "Country",
                      name: "United States",
                      identifier: "US",
                    },
                    { "@type": "Country", name: "Canada", identifier: "CA" },
                    { "@type": "Country", name: "Australia", identifier: "AU" },
                    { "@type": "Country", name: "China", identifier: "CN" },
                    { "@type": "Country", name: "Japan", identifier: "JP" },
                    { "@type": "Country", name: "Malaysia", identifier: "MY" },
                    { "@type": "Country", name: "Singapore", identifier: "SG" },
                    {
                      "@type": "Country",
                      name: "New Zealand",
                      identifier: "NZ",
                    },
                    { "@type": "Country", name: "Thailand", identifier: "TH" },
                    {
                      "@type": "Country",
                      name: "Philippines",
                      identifier: "PH",
                    },
                    {
                      "@type": "Country",
                      name: "Bangladesh",
                      identifier: "BD",
                    },
                    { "@type": "Country", name: "Maldives", identifier: "MV" },
                    { "@type": "Country", name: "Poland", identifier: "PL" },
                    {
                      "@type": "Country",
                      name: "Czech Republic",
                      identifier: "CZ",
                    },
                    { "@type": "Country", name: "Israel", identifier: "IL" },
                    { "@type": "Country", name: "Lithuania", identifier: "LT" },
                    { "@type": "Country", name: "Slovakia", identifier: "SK" },
                    { "@type": "Country", name: "Turkey", identifier: "TR" },
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What's included in Zephyra Travels tour packages?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Every package includes: Travel Insurance up to USD 10,000, Free eSIM with data, Daily breakfast, Unlimited bottled water, 24/7 travel support, Pre-trip consultation, Private chauffeur-guide, All transportation, and Accommodation.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How much do Sri Lanka tour packages cost?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Budget family packages start from $499. Prices vary based on duration (3-14 days), accommodation type, and inclusions. All packages are customizable to your budget and preferences.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is Zephyra Travels a registered travel agency?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, Zephyra Travels is officially registered with the Sri Lanka Tourism Development Authority (SLTDA) and licensed under the Companies Act of Sri Lanka (Reg. No. P V 00339254). We maintain a 4.9/5 rating from over 1200 travelers.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I customize my Sri Lanka tour itinerary?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely! All our packages are fully customizable. You can add or remove destinations, upgrade accommodations, extend durations, and include special experiences. Our local experts will help design the perfect itinerary for your interests and budget.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the best time to visit Sri Lanka?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sri Lanka is a year-round destination. December to March is best for the west and south coasts. May to September is ideal for the east coast and Cultural Triangle. We can help plan your visit based on your preferred regions and activities.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you provide airport pickup in Colombo?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, complimentary airport pickup is included in all our tour packages. Your private chauffeur-guide will meet you at Bandaranaike International Airport with a name board and assist with luggage and currency exchange.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
        <div className="">
          {/* Geometric shapes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
            style={{ willChange: "opacity" }}
          />
        </div>
        {/* Main Content */}
        <main className="pt-12 md:pt-24 overflow-x-hidden">
          {/* Hero Section */}
          <HeroSection />


          <div className="px-6 lg:px-8 hidden">
            <InfinityScroll />
          </div>

          <div className="absolute w-full sm:hidden">
            {/* Geometric shapes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-14 right-0 transform -translate-y-1/2 max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] h-40 bg-linear-to-l from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
              style={{ willChange: "opacity" }}
            />
          </div>

          {/* Packages Section */}
          <PackagesSection />

          {/*Day tours section*/}
          <DayToursSection />

          {/*Services section*/}
          <ServicesSection />

          {/* Trust Us Section */}
          <TrustUs />

          <ImageScrollSection />

          {/* MemberShip Section */}
          <MemberShipSection />

          {/* Infinite Scroll Section */}
          <InfiniteScroll />

          <ExperiencesSection />
        </main>

        {/* Floating WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </>
  );
});

Home.displayName = "Home";

export default Home;
