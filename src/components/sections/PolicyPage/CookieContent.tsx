import React from "react";
import SectionHeading from "../PolicyPage/SectionHeading";

interface CookieContentProps {
    setActiveTab: (tab: string) => void;
}

const CookieContent = ({setActiveTab}: CookieContentProps) => {
    return (
        <div className="text-left sm:text-justify">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#872BFF] mb-6 sm:mb-8">
                COOKIE POLICY
            </h2>

            <div className="space-y-8 sm:space-y-10">
                <div>
                    <SectionHeading>What are Cookies?</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        Cookies are small text files placed on your device (computer, phone, or tablet) by the websites
                        you visit.
                        They are widely used to make websites function properly, improve user experience, and provide
                        analytical
                        and advertising information.
                    </p>
                </div>

                <div>
                    <SectionHeading>How Zephyra Travels Uses Cookies</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze
                        site traffic,
                        and personalize content and advertisements related to our travel services.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3 mt-4">
                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Strictly Necessary Cookies:</strong> Essential for website functionality and core
                            features,
                            such as accessing secure areas and processing booking sessions. These may also include
                            cookies that store
                            your consent preferences.
                        </li>

                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Performance / Analytics Cookies:</strong> Help us understand how visitors use our
                            website
                            by collecting aggregated information such as the number of visitors, pages viewed, and
                            general usage patterns.
                            This allows us to improve website performance and user experience. These include Google
                            Analytics cookies
                            such as <strong>_ga</strong> and <strong>_ga_KMW2RXXBK9</strong>.
                        </li>

                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Functionality Cookies:</strong> Allow us to remember your preferences (e.g.,
                            language or region)
                            and provide enhanced features to improve your browsing experience.
                        </li>

                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Targeting / Advertising Cookies:</strong> Used to deliver relevant ads and track the
                            effectiveness
                            of our marketing campaigns. These include Google Ads cookies such
                            as <strong>_gcl_au</strong>, which help measure
                            ad interactions and conversions.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Third-Party Cookies</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        In addition to our own cookies, we use third-party cookies to report usage statistics, improve
                        our services,
                        and deliver personalized advertisements. <strong>Specifically, we use Google Analytics (_ga,
                        _ga_KMW2RXXBK9) and
                        Google Ads (_gcl_au)</strong> to understand user behavior and measure marketing performance.
                        These third parties may also set cookies when you interact with features such as embedded
                        content or social media tools.
                    </p>
                </div>

                <div>
                    <SectionHeading>Your Choices Regarding Cookies</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        When you visit our site, you may be presented with a cookie consent banner. You have the right
                        to accept or decline
                        non-essential cookies at any time.
                    </p>

                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3 mt-4">
                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Browser Settings:</strong> You can configure your browser to refuse cookies or
                            notify you when a cookie
                            is being stored. However, disabling certain cookies may affect the availability and
                            functionality of some website sections.
                        </li>

                        <li className="text-gray-700 marker:text-purple-600">
                            <strong>Consent Management:</strong> If a cookie consent tool is available on our website,
                            you can update your
                            preferences at any time using the link provided in the footer.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>More Information</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        For more details about how we handle your personal data, please read our{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab("privacy-policy");
                                window.history.replaceState(null, "", `#privacy-policy`);
                            }}
                            className="inline text-[#872BFF] font-medium hover:text-[#A56BFF] hover:underline transition-all duration-300 cursor-pointer"
                            aria-label="View refund and cancellation policy"
                        >
                            Privacy Policy
                        </button>
                        . If you have any questions, you can contact us at{" "}
                        <a
                            href="mailto:info@zephyratravels.com"
                            className="text-[#872BFF] font-medium hover:text-[#A56BFF] hover:underline transition-all duration-300 cursor-pointer"
                        >
                            info@zephyratravels.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>

    );
};

export default CookieContent;