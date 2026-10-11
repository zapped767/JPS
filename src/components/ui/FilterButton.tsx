import React from "react";

interface FilterButtonProps {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function FilterButton({
                                         label,
                                         isActive = false,
                                         onClick,
                                         className = "",
                                     }: FilterButtonProps) {
    const baseClasses =
        "rounded-[100px] px-8 sm:py-3 max-md:px-4 max-md:text-center max-md:text-[12px] flex items-center justify-center transition-colors cursor-pointer";

    const activeClasses = "bg-[#6938d3]";
    const inactiveClasses = "border border-[#b492ff] hover:bg-gray-50";

    const textClasses = isActive
        ? "font-plus-jakarta-sans font-bold text-[22px] leading-[30px] max-md:text-[12px] text-center text-white"
        : "font-plus-jakarta-sans font-semibold text-[22px] leading-[30px] max-md:text-[12px] text-center text-[#383838]";

    return (
        <button
            className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
            } ${className}`}
            onClick={onClick}
        >
            <span className={textClasses}>{label}</span>
        </button>
    );
}
