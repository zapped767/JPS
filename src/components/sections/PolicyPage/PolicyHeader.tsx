import React from "react";

interface PolicyHeaderProps {
    activeTab: string;
}

const PolicyHeader: React.FC<PolicyHeaderProps> = ({activeTab}) => {
    const getTitle = () => {
        switch (activeTab) {
            case "terms-and-conditions":
                return "Terms & Conditions";
            case "privacy-policy":
                return "Privacy Policy";
            case "refund-cancellation-policy":
                return "Refund & Cancellation Policy";
            case "cookie-policy":
                return "Cookie Policy";
            default:
                return "";
        }
    };

    return (
        <div className="text-center mb-8 sm:mb-12 px-2 mt-[22px]">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {getTitle()}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center gap-2">
                <span className="text-[#872BFF]">●</span>
                Last updated: March 2025
            </p>
        </div>
    );
};

export default PolicyHeader;
