"use client"

import {motion} from "framer-motion"

interface ScrollIndicatorProps {
    onScroll: () => void
    sectionName: string
    className?: string
}

export function ScrollIndicatorNew({onScroll, sectionName, className}: ScrollIndicatorProps) {
    return (
        <div className={`!flex !flex-col !items-center !justify-center z-40 ${className}`}>
            <span className="text-[11px] text-black/70 font-medium">SCROLL TO {sectionName}</span>
            <div
                onClick={onScroll}
                className="relative w-9 h-16 bg-white rounded-full flex items-start justify-center pt-3 shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out active:scale-90">
                <motion.div
                    className="w-2.5 bg-secondary-500 rounded-full will-change-transform"
                    style={{willChange: 'transform, height'}}
                    animate={{
                        y: [0, 16, 32, 16, 0],
                        height: ['10px', '30px', '10px', '10px', '10px'],
                    }}
                    transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        ease: "linear",
                        times: [0, 0.2, 0.45, 0.7, 1],
                    }}
                />
            </div>
        </div>

    );
}