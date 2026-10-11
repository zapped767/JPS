import {motion} from "framer-motion";

export const BusinessHowItWorks = () => {
    const steps = [
        {number: "1", title: "Submit Inquiry", description: "Fill out our partnership form with your details"},
        {number: "2", title: "Receive Proposal", description: "Get customized proposals and competitive B2B rates"},
        {
            number: "3",
            title: "Begin Collaboration",
            description: "Start working together while we manage local operations"
        },
    ];

    return (
        <section className="relative mb-8 py-4 md:py-4 px-4 md:px-12 lg:px-[100px] text-center   ">
            {/* Heading */}
            <motion.h2
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="font-plus-jakarta-sans font-extrabold text-[36px] sm:text-[44px] lg:text-[52px] text-[#303030] cursor-default"
            >
                <span className="text-[#6938d3]">How </span>It Works
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                className="mt-2 sm:mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto cursor-default"
            >
                Simple steps to start a successful partnership with us
            </motion.p>

            {/* Progress Bar Section */}
            <motion.div
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.4}}
                className="mt-8 lg:mt-16 max-w-4xl mx-auto"
            >
                {/* Progress Bar Container */}
                <div className="flex flex-wrap justify-between items-start relative">
                    {/* Connecting Line */}
                    <div
                        className="
                        absolute
                        top-6 sm:top-8 lg:top-8  /* responsive top for mobile/tablet/desktop */
                        left-0 right-0
                        h-1 bg-gradient-to-r from-[#6938d3] via-[#6938d3] to-[#6938d3] z-0
                        "
                    />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="
                            relative z-10 flex flex-col items-center flex-1 min-w-[80px] max-w-[120px] mx-auto
                            mb-4 sm:mb-6 lg:mb-0  /* responsive bottom margin for spacing */
                            "
                        >
                            {/* Step Circle */}
                            <div
                                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#6938d3] to-[#872BFF] flex items-center justify-center shadow-lg mb-2 sm:mb-3 lg:mb-4">
                                <span className="text-white font-bold text-base sm:text-xl lg:text-3xl">
                                    {step.number}
                                </span>
                            </div>

                            {/* Step Title */}
                            <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-center text-[#000] mb-1 sm:mb-2 lg:mb-2">
                                {step.title}
                            </h3>

                            {/* Step Description */}
                            <p className="text-[#2B2B2B] text-xs sm:text-sm lg:text-sm mt-0 sm:mt-1 lg:mt-1 text-center">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};
