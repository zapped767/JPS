import React, {useState} from "react";
import {FAQ} from "./types";

const FAQSection = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs: FAQ[] = [
        {
            question: "What are the visa requirements for Sri Lanka?",
            answer:
                "Most visitors need an Electronic Travel Authorization (ETA) before arrival. It’s quick, online, and valid for 30 days. Apply at eta.gov.lk. Just bring your passport, return ticket, and proof of funds and relax, ZephyraTravels will take care of everything!",
        },
        {
            question: "When is the best time to visit Sri Lanka?",
            answer:
                "The best time to visit Sri Lanka depends on the region: December to March is ideal for the south and west coasts and hilly interior due to dry, sunny weather, while September to April is best for the east coast to avoid its monsoon season. You can choose a time to visit based on your preferred region, as the two coasts have opposite rainy seasons.",
        },
        {
            question: "How does the booking process work?",
            answer:
                "Our booking process is simple and personalized: Inquiry & Consultation: Reach out to us with your travel ideas. We'll schedule a brief chat to understand your preferences. Custom Itinerary: We design a detailed, day-by-day itinerary and provide you with a transparent quote. Confirmation: Once you are happy with the plan, we proceed with a deposit to confirm all your bookings. Final Preparations: The final payment is typically due 30 days before your arrival. We'll then send you all your travel documents and vouchers.",
        },
        {
            question: "What is your cancellation policy?",
            answer: [
                "Cancellations made 30 days before the travel date → 100% refund of total booking.",
                "Cancellations made 20 to 29 days before the travel date → 75% refund of total booking.",
                "Cancellations made 10 to 19 days before the travel date → 30% refund of total booking.",
                "Cancellations made less than 10 days before the travel date → No refund.",
            ],
        },
        {
            question: "Are your tours suitable for families with children?",
            answer:
                "Absolutely! We specialize in creating unforgettable family adventures. We can customize any itinerary to include child-friendly activities, family-suited accommodations, and a pace that works for all ages. From exciting wildlife safaris to fun beach days and interactive cultural experiences, we ensure your family trip is both safe and memorable.",
        },
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="py-9 md:py-16 px-4 md:-mt-8">
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-black font-extrabold mb-4 leading-tight text-[28px] sm:text-[30px] md:text-[34px] lg:text-[44px] xl:text-[50px]">
            <span className="text-[#6938D3] block lg:inline xl:inline">
              Frequently
            </span>{" "}
                        <span className="lg:inline xl:inline block">Asked Questions</span>
                    </h2>

                    <p className="text-black font-normal leading-relaxed text-[12px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
                        Find answers to common questions about{" "}
                        <span className="block lg:inline xl:inline">
              traveling to Sri Lanka
            </span>
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#F0F0F0] rounded-[20px] md:rounded-2xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className={`w-full px-6 py-5 flex items-center justify-between text-left font-medium transition-colors cursor-pointer group text-[13px] sm:text-[14px] md:text-[15px] lg:text-[17px] xl:text-[18px] ${
                                    openFaq === index
                                        ? "bg-[#6938D3] text-white"
                                        : "text-gray-800 hover:bg-gray-50"
                                }`}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${
                                        openFaq === index
                                            ? "rotate-180 text-white"
                                            : "text-gray-800 group-hover:text-purple-700"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {openFaq === index && faq.answer && (
                                <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                                    {index === 0 ? (
                                        <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed">
                                            Most visitors need an Electronic Travel Authorization
                                            (ETA) before arrival. It’s quick, online, and valid for 30
                                            days. Apply at{" "}
                                            <a
                                                href="https://eta.gov.lk"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-500 underline"
                                            >
                                                eta.gov.lk
                                            </a>
                                            . Just bring your passport, return ticket, and proof of
                                            funds and relax, ZephyraTravels will take care of
                                            everything!
                                        </p>
                                    ) : Array.isArray(faq.answer) ? (
                                        <ul className="list-disc pl-6 space-y-2 marker:text-purple-500">
                                            {faq.answer.map((line, i) => (
                                                <li
                                                    key={i}
                                                    className="text-gray-600 text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed"
                                                >
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 text-[12px] sm:text-[13px] md:text-[15px] leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
