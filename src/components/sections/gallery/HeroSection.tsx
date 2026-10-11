import React from "react";

const HeroSection = () => {
    return (
        <section className="pt-20 sm:pt-20 pb-0 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h1
                    className="text-black font-bold mb-4
                              text-[28px]      /* default mobile XS */
                              sm:text-[35px]   /* S - 320px+ */
                              md:text-[40px]   /* M - 375px+ */
                              lg:text-[65px]   /* L - 425px+ */
                              xl:text-[70px]   /* desktop */
"
                >
                    Discover Sri Lanka's
                    <span className="block md:inline text-[#EB00A5]"> Beauty</span>
                </h1>

                <p className="text-gray-800 text-[12px] sm:text-[16px] md:text-[14px] lg:text-[18px] mb-4 sm:mb-8 -ml-[10px]">
                    Explore our collection of stunning photos
                    <span className="block sm:inline">
            and online videos from across the island paradise
          </span>
                </p>

                <div className="flex justify-center relative z-20 mb-[5px]">
                    <button
                        onClick={() => {
                            let scrollDistance = 250;

                            if (window.innerWidth <= 320) {
                                scrollDistance = 200;
                            } else if (window.innerWidth <= 375) {
                                scrollDistance = 205;
                            } else if (window.innerWidth <= 425) {
                                scrollDistance = 95;
                            } else if (window.innerWidth <= 768) {
                                scrollDistance = 210;
                            }

                            window.scrollBy({
                                top: scrollDistance,
                                behavior: "smooth",
                            });
                        }}
                        className="w-[40px] h-[50px] sm:w-[49px] sm:h-[62px]
      rounded-full bg-gray-100 shadow-md flex items-center justify-center 
      hover:shadow-lg transition-all duration-300 cursor-pointer relative z-30"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-[22px] h-[22px] sm:w-[30px] sm:h-[30px] transition-transform duration-300 animate-float "
                        >
                            <path
                                d="M12 4v16m0 0l6-6m-6 6l-6-6"
                                stroke="#7C3AED"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
