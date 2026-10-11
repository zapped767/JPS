import React from "react";
import {motion} from "framer-motion";

interface PolicyTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const PolicyTabs: React.FC<PolicyTabsProps> = ({activeTab, setActiveTab}) => {

    const tabs = [
        {id: "terms-and-conditions", label: "Terms & Conditions", mobileWidth: "w-[30%]"},
        {id: "privacy-policy", label: "Privacy Policy", mobileWidth: "w-[20%]"},
        {id: "refund-cancellation-policy", label: "Refund & Cancellation", mobileWidth: "w-[30%]"},
        {id: "cookie-policy", label: "Cookie Policy", mobileWidth: "w-[20%]"},
    ];

    return (
        <div className="flex justify-center mb-6 sm:mb-10 px-2">
            <div
                className="relative flex bg-gray-50 overflow-hidden border border-gray-200 max-w-2xl mx-auto w-full sm:w-auto rounded-[20px] sm:rounded-[16px] h-[52px] sm:h-[73px]">
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id;
                    const radiusClass =
                        tab.id === "terms"
                            ? "rounded-l-[20px] sm:rounded-l-[16px]"
                            : tab.id === "refund"
                                ? "rounded-r-[20px] sm:rounded-r-[16px]"
                                : "rounded-none";
                    const dividerClass = index !== 0 ? "border-l border-purple-600" : "";

                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id)
                                window.history.replaceState(null, "", `#${tab.id}`);
                            }}
                            className={`relative cursor-pointer ${tab.mobileWidth} sm:flex-1 py-2 sm:py-3 px-2 sm:px-4 font-medium text-[10px] sm:text-base transition-all text-center ${radiusClass} ${dividerClass} ${
                                isActive ? "text-white" : "text-[#872BFF]"
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`absolute inset-0 bg-[#872BFF] ${radiusClass}`}
                                    transition={{
                                        type: "tween",
                                        duration: 0.15,
                                        ease: "easeOut",
                                    }}
                                />
                            )}
                            <span className="relative z-10 leading-tight">
        {/* Only for Refund tab on small mobile screens */}
                                {tab.id === "refund-cancellation-policy" ? (
                                    <>
                                        <span className="block sm:inline">Refund &</span>
                                        <span className="block sm:inline">Cancellation</span>
                                    </>
                                ) : (
                                    tab.label
                                )}
      </span>
                        </button>
                    );
                })}

            </div>
        </div>
    );
};

export default PolicyTabs;
