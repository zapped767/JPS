import React from "react";
import SectionHeading from "../PolicyPage/SectionHeading";

interface TermsContentProps {
    setActiveTab: (tab: string) => void;
}

const TermsContent: React.FC<TermsContentProps> = ({setActiveTab}) => {
    return (
        <div className="text-left sm:text-justify">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#872BFF] mb-6 sm:mb-8">
                TERMS & CONDITIONS
            </h2>

            <div className="space-y-8 sm:space-y-10">
                <div>
                    <SectionHeading>Introduction</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-4">
                        Welcome to ZephyraTravels. By using our website or booking our
                        services, you agree to comply with these Terms & Conditions. Please
                        read them carefully before making your booking.
                    </p>
                </div>

                <div>
                    <SectionHeading>Our Services</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-4">
                        We provide customised travel and tour packages within Sri Lanka. All
                        itinerary details,inclusions,and exclusions will be clearly
                        specified in your booking confirmation.
                    </p>
                </div>

                <div>
                    <SectionHeading>Pricing</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-4">
                        All prices are quoted in United States Dollars (USD). Prices are
                        subject to change without notice due to currency fluctuations,
                        government taxes, or other factors.
                    </p>
                </div>

                <div>
                    <SectionHeading>Booking & Payment</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3">
                        <li className="text-gray-700 marker:text-purple-600">
                            A deposit or full payment is required at the time of
                            booking,unless otherwise agreed.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">We confirm bookings only after successful
                            payment receipt.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">Payment is securely processed via Stripe.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Cancellations & Refunds</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-4">
                        Please refer to our separate{" "}
                        <button
                            type="button"
                            onClick={() => {
                                setActiveTab("refund-cancellation-policy")
                                window.history.replaceState(null, "", `#refund-cancellation-policy`);
                            }}
                            className="inline text-[#872BFF] font-medium hover:text-[#A56BFF] hover:underline transition-all duration-300 cursor-pointer"
                            aria-label="View refund and cancellation policy"
                        >
                            Refund & Cancellation Policy
                        </button>
                        {" "}
                        for full details.
                    </p>
                </div>

                <div>
                    <SectionHeading>Your Responsibilities</SectionHeading>
                    <ul className="list-disc pl-6 text-black leading-relaxed sm:leading-loose space-y-3">
                        <li className="text-gray-700 marker:text-purple-600">
                            At ZephyraTravels, we take full responsibility for ensuring a
                            smooth, safe, and enjoyable travel experience during your time in
                            Sri Lanka. Our team coordinates and monitors all arrangements
                            closely to maintain the highest service standards.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            However, in rare cases of unforeseen circumstances beyond our
                            control — such as hotel operational issues or third-party service
                            delays — we will make every possible effort to assist and resolve
                            the situation promptly.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Guests are responsible for ensuring valid travel documents, visas,
                            and insurance.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            We understand travel plans may change unexpectedly. Refunds or
                            adjustments will be considered in cases where cancellations or
                            missed services occur due to valid reasons within the eligible
                            period.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            In situations such as flight delays or missed hotel check-ins
                            beyond our operational control, our team will do its best to
                            assist with alternative arrangements whenever possible.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Governing Law</SectionHeading>
                    <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words pl-4">
                        These Terms & Conditions are governed by the laws of Sri Lanka, and
                        any disputes will be subject to the jurisdiction of the Sri Lankan courts.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsContent;