import { Head, Html, Main, NextScript } from "next/document";
import { getImageUrl } from "@/lib/utils";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicons */}
        <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")} />
        <link
          rel="apple-touch-icon"
          href={getImageUrl("public/apple-touch-icon.avif")}
        />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#3b82f6" />

        <meta property="og:country-name" content="Sri Lanka" />
        <meta property="og:region" content="Asia" />
        <meta property="place:location:latitude" content="6.876764962224119" />
        <meta property="place:location:longitude" content="79.8766838976908" />

        {/* Preconnect / DNS Prefetch */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://dev.api.zephyratravels.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.zephyratravels.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
          crossOrigin="anonymous"
        />

        <link
          rel="preload"
          as="image"
          href="https://cdn.zephyratravels.com/public/images/home/hero/temple.avif"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.zephyratravels.com/public/images/home/hero/fishing.avif"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.zephyratravels.com/public/images/home/hero/surfing.avif"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.zephyratravels.com/public/images/home/hero/lotus-tower.avif"
        />
        <link
          rel="preload"
          as="image"
          href="https://cdn.zephyratravels.com/public/images/home/hero/nine-arch.avif"
        />

        {/* Robots */}
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["TravelAgency", "LocalBusiness", "Organization"],
                  "@id": "https://www.zephyratravels.com/#organization",
                  name: "Zephyra Travels",
                  legalName: "Zephyra Travels Pvt Ltd",
                  alternateName: "ZephyraTravels",
                  url: "https://www.zephyratravels.com/",
                  logo: {
                    "@type": "ImageObject",
                    url: getImageUrl("public/logo.avif"),
                    width: "512",
                    height: "512",
                  },
                  image: getImageUrl("public/logo.avif"),
                  description:
                    "SLTDA registered Sri Lankan tour operator offering budget-friendly customized travel packages. Direct booking with local experts. Specialized in family tours, honeymoon packages, wildlife safaris, cultural experiences. 24/7 support, free insurance, eSIM included.",

                  foundingDate: "2025-01-01",
                  slogan: "Fall In Love With Sri Lanka",

                  priceRange: "$$",
                  currenciesAccepted: "USD, EUR, GBP",
                  paymentAccepted: "Cash, Credit Card, Bank Transfer, PayPal",

                  telephone: "+94 76 134 5718",
                  email: "info@zephyratravels.com",

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

                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ],
                      opens: "00:00",
                      closes: "23:59",
                    },
                  ],

                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+94 76 134 5718",
                      contactType: "customer support",
                      email: "info@zephyratravels.com",
                      areaServed: "LK",
                      availableLanguage: ["English", "Sinhala", "Tamil"],
                      contactOption: "TollFree",
                      hoursAvailable: {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: [
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ],
                        opens: "00:00",
                        closes: "23:59",
                      },
                    },
                    {
                      "@type": "ContactPoint",
                      telephone: "+94 76 134 5718",
                      contactType: "reservations",
                      contactOption: "TollFree",
                      availableLanguage: ["English", "Sinhala", "Tamil"],
                    },
                  ],

                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "1200",
                    bestRating: "5",
                    worstRating: "1",
                  },

                  knowsAbout: [
                    "Sri Lanka Tourism",
                    "Budget Family Tours",
                    "Honeymoon Packages",
                    "Wildlife Safaris",
                    "Cultural Heritage Tours",
                    "Beach Holidays",
                    "Adventure Travel",
                    "Destination Management",
                    "Ella Train Rides",
                    "Yala National Park",
                  ],

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
                  "@type": "WebSite",
                  "@id": "https://www.zephyratravels.com/#website",
                  url: "https://www.zephyratravels.com/",
                  name: "Zephyra Travels",
                  alternateName: "ZephyraTravels Sri Lanka Tours",
                  description:
                    "Book affordable Sri Lanka tour packages from $499. Budget family tours, honeymoon packages, wildlife safaris. Local experts, 24/7 support.",
                  publisher: {
                    "@id": "https://www.zephyratravels.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://www.zephyratravels.com/packages?search={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
      </Head>

      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
