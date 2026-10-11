"use client";
import React, {useState} from "react";
import {Search} from "lucide-react";

interface SearchSectionProps {
    onSearch: (searchQuery: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchQuery);
        }
    };

    const handleButtonClick = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 lg:px-0">
            <div className="flex items-center w-full">
                <input
                    type="text"
                    placeholder="Search for destinations, tips, or guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="
            flex-1
            px-3 sm:px-4 md:px-5 lg:px-6
            py-2.5 sm:py-2 md:py-2 lg:py-2.5
            rounded-l-full
            bg-white shadow-lg
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-[#6938D3]
            text-xs sm:text-sm md:text-base lg:text-base
          "
                />
                <button
                    onClick={handleButtonClick}
                    className="cursor-pointer px-4 lg:px-6 py-3 bg-[#872BFF] text-white rounded-r-full font-medium shadow-md hover:bg-[#6938D3]-700 transition flex items-center gap-2 text-sm lg:text-base"
                >
                    <Search size={16} className="lg:w-5"/>
                    <span className="hidden sm:inline">Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchSection;
