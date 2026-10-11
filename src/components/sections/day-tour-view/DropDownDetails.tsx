import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccessibilityProps {
    listName: string,
    details: string,
}

export const DropDownDetails = ({listName, details}: AccessibilityProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const detailsArray = details.split(',');

    return (
        <div className="">
            <div className="rounded-2xl overflow-hidden">
                {/* Header - Always Visible */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full px-2 py-1 flex items-center justify-between gap-10 text-left rounded-2xl focus:outline-none"
                >
                    <span className="font-bold text-sm text-black">{listName}</span>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 text-black ${
                            isExpanded ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {/* Expandable Content */}
                <div
                    className={`transition-all rounded-2xl duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100 pb-6 shadow-lg' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                >
                    <div className="space-y-1 px-4 py-2 rounded-2xl">
                        <div className="flex flex-col items-start">
                            {detailsArray.map((item, index) => (
                                <div key={index} className="text-gray-700 leading-relaxed text-sm">• {item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}