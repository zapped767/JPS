import {ReactNode} from "react";
import {Header} from "@/components/layout/Header";
import Footer_new from "@/components/layout/Footer_new";
import CookieConsent from "../CookieConsent";
import {useRouter} from "next/router";
import Head from 'next/head';

interface LayoutProps {
    children: ReactNode;
}

const SiteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "url": "https://www.zephyratravels.com",
    "potentialAction": [
        {"@type": "Action", "name": "Home", "target": "https://www.zephyratravels.com"},
        {"@type": "Action", "name": "Packages", "target": "https://www.zephyratravels.com/packages"},
        {"@type": "Action", "name": "Partners", "target": "https://www.zephyratravels.com/partners"},
        {"@type": "Action", "name": "About Us", "target": "https://www.zephyratravels.com/about"},
        {"@type": "Action", "name": "Blogs", "target": "https://www.zephyratravels.com/blogs"},
        {"@type": "Action", "name": "Gallery", "target": "https://www.zephyratravels.com/gallery"},
        {
            "@type": "Action",
            "name": "Privacy Policy",
            "target": "https://www.zephyratravels.com/policies/privacy-policy"
        },
    ]
};

export default function Layout({children}: LayoutProps) {
    const router = useRouter();
    const pathname = router.asPath;
    const isBookingSuccess = pathname?.includes("/booking/success");
    
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(SiteNavigationSchema)}}
                    key="site-navigation-schema" // Unique key is good practice
                />
            </Head>

            {!isBookingSuccess && <Header/>}
            <main className="flex-grow w-full mx-auto bg-white overflow-x-hidden">{children}</main>

            {!isBookingSuccess && <Footer_new/>}
            <CookieConsent/>
        </div>
    );
}