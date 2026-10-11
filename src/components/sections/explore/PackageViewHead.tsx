import Head from "next/head";
import React from "react";

interface PackageDetails {
  id: number;
  active: boolean;
  name: string;
  description: string;
  rating: number;
  durationDays: number;
  durationNights: number;
  inclusion: string[];
  exclusion: string[];
  adultTotalPrice: number;
  childTotalPrice: number;
  image: string;
  slug: string;
  itineraries: any[];
  promotion?: {
    active: boolean;
    name: string;
    value: number;
    startDate: string;
    endDate: string;
  } | null;
}

interface PackageViewHeadProps {
  apiResponse: PackageDetails;
  getImageUrl: (path: string) => string;
}

const generateStructuredData = (
  packageData: PackageDetails,
  getImageUrl: (path: string) => string
) => {
  const packageUrl = `https://www.zephyratravels.com/explore/${packageData.slug}`;
  const imagePath = getImageUrl(packageData.image);

  const isPromotional =
    packageData.promotion &&
    packageData.promotion.active &&
    new Date(packageData.promotion.endDate) > new Date();

  let finalPrice = packageData.adultTotalPrice;
  if (isPromotional) {
    finalPrice =
      packageData.adultTotalPrice * (1 - packageData.promotion!.value / 100);
  }

  const durationISO = `P${packageData.durationDays}D`;

  const itineraryItems = packageData.itineraries.map(
    (dayItem: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      name: dayItem.title,
      item: {
        "@type": "Trip",
        name: dayItem.title,
        description: dayItem.description,
        itinerary: dayItem.destination,
      },
    })
  );

  return [
    {
      "@context": "https://schema.org",
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
          name: "Tour Packages",
          item: "https://www.zephyratravels.com/packages",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: packageData.name,
          item: packageUrl,
        },
      ],
    },

    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: packageData.name,
      url: packageUrl,
      description: packageData.description,
      image: imagePath,
      duration: durationISO,
      provider: {
        "@type": "Organization",
        "@id": "https://www.zephyratravels.com/#Organization",
        name: "Zephyra Travels",
      },

      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: packageData.rating,
        reviewCount: 100,
      },

      offers: {
        "@type": isPromotional ? "AggregateOffer" : "Offer",
        name: isPromotional
          ? `Special Offer: ${packageData.promotion!.name}`
          : packageData.name,
        priceCurrency: "USD",
        price: finalPrice.toFixed(2),
        availability: "https://schema.org/InStock",
        validFrom: isPromotional ? packageData.promotion!.startDate : undefined,
        validThrough: isPromotional
          ? packageData.promotion!.endDate
          : undefined,
        url: packageUrl,
      },

      itinerary: {
        "@type": "ItemList",
        name: "Daily Itinerary",
        itemListElement: itineraryItems,
      },
    },
  ];
};

const PackageViewHead = ({
  apiResponse,
  getImageUrl,
}: PackageViewHeadProps) => {
  const packageData = apiResponse;

  if (!packageData) {
    return (
      <Head>
        <title>Loading Sri Lanka Tour Package...</title>
      </Head>
    );
  }

  const packageUrl = `https://www.zephyratravels.com/explore/${packageData.slug}`;
  const imagePath = getImageUrl(packageData.image);

  const metaDescription = packageData.description.substring(0, 155) + "...";

  const tourKeywords = `${packageData.name}, ${packageData.name} Sri Lanka, ${packageData.durationDays} day Sri Lanka tour, Sri Lanka ${packageData.durationDays}D${packageData.durationNights}N package, book ${packageData.name} online, customizable Sri Lanka tour, private driver Sri Lanka tour, budget Sri Lanka package ${packageData.durationDays} days`;

  return (
    <Head>
      <title>{`${packageData.name} | ${packageData.durationDays}D${packageData.durationNights}N from $${packageData.adultTotalPrice} | Zephyra Travels`}</title>

      <meta
        name="description"
        content={`${metaDescription} Book ${packageData.durationDays} days ${packageData.durationNights} nights tour from $${packageData.adultTotalPrice}. Customizable itinerary, private driver, SLTDA registered.`}
      />
      <meta name="keywords" content={tourKeywords} />
      <meta name="application-name" content="Zephyra Travels" />
      <meta name="author" content="Zephyra Travels Pvt Ltd" />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="geo.region" content="LK" />
      <meta name="geo.placename" content="Sri Lanka" />

      <link rel="canonical" href={packageUrl} />
      <link rel="alternate" hrefLang="en" href={packageUrl} />
      <link rel="manifest" href="/manifest.json" />

      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Zephyra Travels" />
      <meta property="og:locale" content="en_US" />
      <meta
        property="og:title"
        content={`${packageData.name} | ${packageData.durationDays}D${packageData.durationNights}N from $${packageData.adultTotalPrice}`}
      />
      <meta
        property="og:description"
        content={`${metaDescription} Book ${packageData.durationDays} days tour from $${packageData.adultTotalPrice}. Customizable itinerary, private driver.`}
      />
      <meta property="og:url" content={packageUrl} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`${packageData.name} - Sri Lanka Tour Package`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zephyratravels" />
      <meta name="twitter:creator" content="@zephyratravels" />
      <meta
        name="twitter:title"
        content={`${packageData.name} | ${packageData.durationDays}D${packageData.durationNights}N from $${packageData.adultTotalPrice}`}
      />
      <meta
        name="twitter:description"
        content={`${metaDescription} Book ${packageData.durationDays} days from $${packageData.adultTotalPrice}.`}
      />
      <meta name="twitter:image" content={imagePath} />
      <meta
        name="twitter:image:alt"
        content={`${packageData.name} - Sri Lanka Tour`}
      />

      <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")} />
      <link
        rel="apple-touch-icon"
        href={getImageUrl("public/apple-touch-icon.avif")}
      />
      <link rel="manifest" href="/manifest.json" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData(packageData, getImageUrl)
          ),
        }}
      />
    </Head>
  );
};

export default PackageViewHead;
