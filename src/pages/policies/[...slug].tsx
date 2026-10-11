import React, {useEffect, useState} from "react";
import PolicyHeader from "../../components/sections/PolicyPage/PolicyHeader";
import PolicyTabs from "../../components/sections/PolicyPage/PolicyTabs";
import PolicyContent from "../../components/sections/PolicyPage/PolicyContent";
import {motion} from "framer-motion";
import {getImageUrl} from "@/lib/utils";
import Head from "next/head";
import {useRouter} from "next/router";

const PolicyPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("terms-and-conditions");
    const {slug} = router.query;

// On page load, read URL hash to set tab
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash && ["terms-and-conditions", "privacy-policy", "refund-cancellation-policy", "cookie-policy"].includes(hash)) {
            setActiveTab(hash);
        }
    }, []);

    useEffect(() => {
        if (slug && slug[0]) {
            const tabId = slug[0];
            const validTabs = ["terms-and-conditions", "privacy-policy", "refund-cancellation-policy", "cookie-policy"];
            if (validTabs.includes(tabId)) {
                setActiveTab(tabId);
                window.history.replaceState(null, "", `#${tabId}`);
            }
        }
    }, [slug]);


    const getPageTitle = () => {
        switch (activeTab) {
            case 'terms-and-conditions':
                return 'Terms & Conditions';
            case 'privacy-policy':
                return 'Privacy Policy';
            case 'refund-cancellation-policy':
                return 'Refund & Cancellation';
            case 'cookie-policy':
                return 'Cookie Policy';
            default:
                return 'Policies';
        }
    };

    const title = getPageTitle();

    return (
        <>
            <Head>
                <title>{title} – Zephyra Travels Sri Lanka | Legal Information</title>
                <meta
                    name="description"
                    content={`Read Zephyra Travels' ${title}. Transparent booking terms, privacy protection, refund policies for Sri Lanka tour packages. SLTDA registered travel agency.`}
                />
                <meta
                    name="keywords"
                    content="privacy policy Zephyra Travels, Sri Lanka travel privacy policy, data protection Sri Lanka, user data policy, Travel privacy and policy, Travel privacy policy, Travel Security policy, Privacy policy of travel agency, privacy policy for travel website"
                />

                <meta name="application-name" content="Zephyra Travels"/>
                <meta name="author" content="Zephyra Travels Pvt Ltd"/>
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="bingbot" content="index, follow"/>
                <meta name="geo.region" content="LK"/>
                <meta name="geo.placename" content="Colombo, Sri Lanka"/>

                <link rel="canonical" href="https://www.zephyratravels.com/policies#privacy-policy"/>

                <link rel="alternate" hrefLang="en" href="https://www.zephyratravels.com/policies#privacy-policy"/>
                <link rel="alternate" hrefLang="x-default"
                      href="https://www.zephyratravels.com/policies#privacy-policy"/>

                <meta property="og:type" content="website"/>
                <meta property="og:site_name" content="Zephyra Travels"/>
                <meta property="og:title" content={`${title} – Zephyra Travels`}/>
                <meta property="og:description"
                      content="Read Zephyra Travels' official Terms of Service, Privacy Policy, and Cookie Policy. Learn how we handle your data and ensure a safe and secure browsing experience."/>
                <meta property="og:url" content="https://www.zephyratravels.com/policies#privacy-policy"/>
                <meta property="og:image" content={getImageUrl("public/logo.avif")}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:image:alt" content="Zephyra Travels – Privacy & Terms"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={`${title} – Zephyra Travels`}/>
                <meta name="twitter:description"
                      content="Read Zephyra Travels' official Terms of Service, Privacy Policy, and Cookie Policy. Learn how we handle your data and ensure a safe and secure browsing experience."/>
                <meta name="twitter:image" content={getImageUrl("public/logo.avif")}/>

                <link rel="icon" href={getImageUrl("public/favicon-32x32.avif")}/>
                <link rel="apple-touch-icon" href={getImageUrl("public/apple-touch-icon.avif")}/>
                <link rel="manifest" href="/manifest.json"/>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "Organization",
                                "@id": "https://www.zephyratravels.com/#Organization",
                                "name": "Zephyra Travels",
                                "url": "https://www.zephyratravels.com",
                                "logo": "https://www.zephyratravels.com/images/logo.avif"
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "WebPage",
                                "name": "Privacy Policy and Terms of Service",
                                "url": "https://www.zephyratravels.com/policies#privacy-policy",
                                "description": "Zephyra Travels' comprehensive legal page covering Terms of Service, Privacy Policy, and Cookie Policy.",
                                "about": {
                                    "@type": "Organization",
                                    "@id": "https://www.zephyratravels.com/#Organization"
                                }
                            }
                        ]),
                    }}
                />
            </Head>

            <div className="min-h-screen bg-white">
                <div className="">
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute z-20 top-40 max-sm:top-14 left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-linear-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl pointer-events-none"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <PolicyHeader activeTab={activeTab}/>
                    <PolicyTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <PolicyContent activeTab={activeTab} setActiveTab={setActiveTab}/>
                </div>
            </div>
        </>
    );
};

export default PolicyPage;
