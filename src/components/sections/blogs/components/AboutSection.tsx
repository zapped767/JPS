import React from "react";
import CountUp from "./CountUp";

const AboutSection: React.FC = () => {
    return (
        <section className="bg-[#872BFF] text-white py-12 lg:py-16 mb-0">
            <div className="max-w-6xl mx-auto px-4 lg:px-6">
                <h2 className="text-2xl lg:text-4xl font-bold text-center mb-6 lg:mb-8">
                    About ZephyraTravels
                </h2>

                <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
                    <p className="mb-4 text-sm lg:text-base leading-relaxed">
                        Founded in 2025, ZephyraTravels began as a small travel blog among
                        friends. Today, we've grown into a comprehensive resource for
                        travelers worldwide, offering expert advice, detailed destination
                        guides, and the latest industry news.
                    </p>
                    <p className="text-sm lg:text-base leading-relaxed">
                        Our mission is to inspire and enable people to explore the world
                        responsibly and authentically. We believe that travel has the power
                        to broaden perspectives, create connections, and foster understanding
                        across cultures.
                    </p>
                </div>

                {/* Responsive CountUp Grid */}
                <div
                    className="
            grid grid-cols-2 grid-rows-2 gap-4 
            sm:grid-cols-2 sm:grid-rows-2 
            md:grid-cols-4 md:grid-rows-1 
            lg:gap-8
          "
                >
                    {/* Card 1 */}
                    <div className="bg-[#8559EB] rounded-2xl py-5 md:py-6 lg:py-8 px-4 text-center shadow-md">
                        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 lg:mb-2">
                            <CountUp end={1}/> +
                        </div>
                        <div className="text-white text-[10px] sm:text-xs md:text-[11px] lg:text-sm">
                            Years of Experience
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#8559EB] rounded-2xl py-5 md:py-6 lg:py-8 px-4 text-center shadow-md">
                        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 lg:mb-2">
                            <CountUp end={40}/> +
                        </div>
                        <div className="text-white text-[10px] sm:text-xs md:text-[11px] lg:text-sm">
                            Team Members
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#8559EB] rounded-2xl py-5 md:py-6 lg:py-8 px-4 text-center shadow-md">
                        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 lg:mb-2">
                            <CountUp end={1.5} duration={2000}/>M +
                        </div>
                        <div className="text-white text-[10px] sm:text-xs md:text-[11px] lg:text-sm">
                            Monthly Readers
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#8559EB] rounded-2xl py-5 md:py-6 lg:py-8 px-4 text-center shadow-md">
                        <div className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 lg:mb-2">
                            <CountUp end={250}/> +
                        </div>
                        <div className="text-white text-[10px] sm:text-xs md:text-[11px] lg:text-sm">
                            Destination Guides
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
