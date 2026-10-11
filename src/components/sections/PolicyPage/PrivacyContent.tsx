import React from "react";
import SectionHeading from "../PolicyPage/SectionHeading";

const PrivacyContent = () => {
    return (
        <div className="text-left sm:text-justify">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#872BFF] mb-6 sm:mb-8">
                PRIVACY POLICY
            </h2>

            <div className="space-y-8 sm:space-y-10">
                <div>
                    <SectionHeading>Introduction</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        We respect your privacy and are committed to protecting your
                        personal data. This policy explains how we collect, use, and
                        safeguard your information.
                    </p>
                </div>

                <div>
                    <SectionHeading>Information We Collect</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3">
                        <li className="text-gray-700 marker:text-purple-600">
                            Personal details: name, email, phone number, passport information.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Payment information (processed securely through Stripe).
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Travel preferences and booking history.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>How We Use Your Information</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3">
                        <li className="text-gray-700 marker:text-purple-600">
                            To process and confirm bookings including train tickets, hotel
                            reservations, excursions, and other travel-related services.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            To send you confirmations, updates, and personalized offers.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            To improve our services, website experience, and customer support
                            efficiency.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            To ensure smooth coordination between our operations team and
                            service partners during your journey.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Data Security</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        We implement industry-standard encryption and security practices to
                        protect your personal data.
                    </p>
                </div>

                <div>
                    <SectionHeading>Data Sharing</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        We may share your information only with trusted third-party
                        providers (e.g., hotels, transport, payment gateways) strictly for
                        fulfilling your booking. We will never sell your data.
                    </p>
                </div>

                <div>
                    <SectionHeading>User Rights</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-5">
                        You may request access to,correction of, or deletion of your
                        personal data at any time by contacting us at{" "}
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

export default PrivacyContent;