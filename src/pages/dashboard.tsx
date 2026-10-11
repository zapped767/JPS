import React from "react";
import {motion} from "framer-motion";


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-white font-plus-jakarta-sans antialiased overflow-x-hidden">
            <div className="">
                {/* Geometric shapes */}
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1, delay: 0.4}}
                    className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                />
            </div>
            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto pt-20">

                {/* Content Sections */}
                <div className="relative z-10">
                    {/* Hero Section */}

                </div>
            </main>
        </div>
    );
}
