import React from "react";
import SectionHeading from "../PolicyPage/SectionHeading";

const RefundContent = () => {
    return (
        <div className="text-left sm:text-justify max-md:px-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#872BFF] mb-6 sm:mb-8 max-md:text-center">
                REFUND & CANCELLATION POLICY
            </h2>

            <div className="space-y-8 sm:space-y-10">
                <div>
                    <SectionHeading>Advanced Booking Cancellations</SectionHeading>
                    <div className="bg-purple-50 rounded-lg p-6 space-y-3 max-md:p-4">
                        <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words max-md:text-sm">
              <span className="font-semibold text-gray-900">
                Cancellations made 30 days before the travel date
              </span>{" "}
                            → 100% refund of total booking.
                        </p>
                        <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words max-md:text-sm">
              <span className="font-semibold text-gray-900">
                Cancellations made 20 to 29 days before the travel date
              </span>{" "}
                            → 75% refund of total booking.
                        </p>
                        <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words max-md:text-sm">
              <span className="font-semibold text-gray-900">
                Cancellations made 10 to 19 days before the travel date
              </span>{" "}
                            → 30% refund of total booking.
                        </p>
                        <p className="text-gray-700 leading-relaxed sm:leading-loose tracking-normal break-words max-md:text-sm">
              <span className="font-semibold text-gray-900">
                Cancellations made less than 10 days before the travel date
              </span>{" "}
                            → No refund.
                        </p>
                    </div>
                </div>

                <div>
                    <SectionHeading>Process & Timing</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3 max-md:text-sm">
                        <li className="text-gray-700 marker:text-purple-600">
                            Refunds will be processed within 14 business days from
                            cancellation confirmation.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Refunds will be issued in USD via the original payment method.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">Any transaction or bank fees will be borne
                            by the customer.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Non-Refundable Cases</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3 max-md:text-sm">
                        <li className="text-gray-700 marker:text-purple-600">No-shows, incomplete participation, or
                            early departures.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Delays or cancellations caused by external providers (airlines,
                            hotels, transport).
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">Any services unused due to personal changes
                            or decisions.
                        </li>
                    </ul>
                </div>

                <div>
                    <SectionHeading>Rescheduling & Credits</SectionHeading>
                    <ul className="list-disc pl-6 text-gray-700 leading-relaxed sm:leading-loose space-y-3 max-md:text-sm">
                        <li className="text-gray-700 marker:text-purple-600">
                            We may offer credit for future travel instead of refund at our
                            discretion, especially when rebooking is viable.
                        </li>
                        <li className="text-gray-700 marker:text-purple-600">
                            Rescheduling requests must be made in writing; subject to
                            availability and may incur additional charges.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RefundContent;