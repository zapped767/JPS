import React, {useRef} from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {getImageUrl} from "@/lib/utils";

export const AboutWhyChoose = () => {

    const services = [
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/map.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Local Expertise",
            description:
                "Our team knows Sri Lanka intimately and can guide you to authentic experiences.",
        },
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/tag.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Transparent Pricing",
            description:
                "All-inclusive rates with no hidden costs or surprise charges.",
        },
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/star.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Vetted Partners",
            description:
                "We work only with the best hotels, vehicles, and licensed guides.",
        },
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/headset.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Responsive Support",
            description:
                "Flight booking support through our trusted partners to ensure seamless travel.",
        },
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/slider.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Flexible Options",
            description:
                "Customize your journey with add-ons and special experiences.",
        },
        {
            image: <Image
                src={getImageUrl("public/images/about/whyChoose/medal.webp")}
                alt="World"
                width={40}
                height={40}
                className="text-[#6938d3]"
            />,
            title: "Proven Track Record",
            description:
                "Consistently positive reviews and many returning guests.",
        },
    ];

    const useDragScroll = () => {
        const ref = useRef<HTMLDivElement | null>(null);
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const handleMouseDown = (e: React.MouseEvent) => {
            isDown = true;
            ref.current?.classList.add("cursor-grabbing");
            startX = e.pageX - ref.current!.offsetLeft;
            scrollLeft = ref.current!.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
            ref.current?.classList.remove("cursor-grabbing");
        };

        const handleMouseUp = () => {
            isDown = false;
            ref.current?.classList.remove("cursor-grabbing");
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - ref.current!.offsetLeft;
            const walk = (x - startX) * 1.5;
            ref.current!.scrollLeft = scrollLeft - walk;
        };

        return {ref, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove};
    };

    const row1 = useDragScroll();
    const row2 = useDragScroll();


    return (
        <section
            className="relative pt-5 pb-4 sm:py-10 lg:pt-16 lg:pb-20 px-4 md:px-10 lg:px-[100px] text-center z-10   ">
            {/* Heading */}
            <motion.h2
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="font-plus-jakarta-sans font-extrabold text-[52px] text-[#303030] max-md:text-[36px] cursor-default"
            >
                <span className="text-[#6938d3]">Why </span>Travelers Choose Us
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                className="mt-4 text-[#2B2B2B] text-sm sm:text-base lg:text-xl max-w-[900px] mx-auto cursor-default"
            >
                Discover the ZephyraTravels difference&nbsp;&nbsp;we're committed to making your Sri Lankan journey
                exceptional
            </motion.p>

            {/* Desktop & Tablet grid */}
            <div className="max-[1024px]:hidden grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8 sm:mt-12 px-4 lg:px-0">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                        transition={{duration: 0.6, delay: index * 0.1}}
                        viewport={{once: true}}
                        className="relative bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300
                 rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center"
                    >
                        <div className="flex items-center justify-center mb-4 text-[#6938d3] text-4xl">
                            {service.image}
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">{service.title}</h3>
                        <p className="text-sm xl:w-[300px] text-[#2B2B2B] leading-relaxed">{service.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile version */}
            <div className="hidden max-[1024px]:block mt-6 md:mt-10 cursor-default">
                {/* Row 1: first 3 cards */}
                <div
                    ref={row1.ref}
                    className="flex gap-6 px-4 sm:gap-8 max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              cursor-grab"
                    onMouseDown={row1.handleMouseDown}
                    onMouseLeave={row1.handleMouseLeave}
                    onMouseUp={row1.handleMouseUp}
                    onMouseMove={row1.handleMouseMove}
                >
                    {services.slice(0, 3).map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            className="relative bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300
                   rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0
                   w-[63%] max-[425px]:w-[63%] max-[640px]:w-[65%] max-[768px]:w-[45%]
                   max-[1024px]:w-[53%] p-4 md:p-6 lg:p-8"
                        >
                            <div className="flex items-center justify-center mb-4 text-[#6938d3] text-4xl
                            max-[640px]:h-8 max-[640px]:w-8 max-[1024px]:h-9 max-[1024px]:w-9 z-10">
                                {service.image}
                            </div>
                            <h3 className="text-base md:text-lg font-semibold  max-[375px]:w-[100px] text-black mb-2">{service.title}</h3>
                            <p className={`text-[12px] md:text-sm text-[#2B2B2B] max-[640px]:w-[170px] leading-relaxed
                                ${service.title === "Local Expertise" ?
                                `
                            max-[375px]:w-[150px]
                              `
                                :
                                `
                            max-[375px]:w-[110px]
                                 `
                            }`}>
                                {service.description}
                            </p>

                        </motion.div>
                    ))}
                </div>

                {/* Row 2: next 3 cards */}
                <div
                    ref={row2.ref}
                    className="flex gap-6 px-4 sm:gap-8 max-[640px]:p-4 max-[1024px]:p-5 overflow-x-auto overflow-y-hidden
           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
              cursor-grab"
                    onMouseDown={row2.handleMouseDown}
                    onMouseLeave={row2.handleMouseLeave}
                    onMouseUp={row2.handleMouseUp}
                    onMouseMove={row2.handleMouseMove}
                >
                    {services.slice(3, 6).map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            whileHover={{y: -8, scale: 1.05, transition: {duration: 0.3}}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            className="relative bg-[#fafafa] shadow-md hover:shadow-lg transition-shadow duration-300
                   rounded-2xl flex flex-col items-center justify-center text-center flex-shrink-0
                   w-[63%] max-[425px]:w-[63%] max-[640px]:w-[65%] max-[768px]:w-[45%]
                   max-[1024px]:w-[53%] p-4 md:p-6 lg:p-8"
                        >
                            <div className="flex items-center justify-center mb-4 text-[#6938d3] text-4xl
                            max-[640px]:h-8 max-[640px]:w-8 max-[1024px]:h-9 max-[1024px]:w-9 z-10">
                                {service.image}
                            </div>
                            <h3 className="text-base md:text-lg font-semibold max-[375px]:w-[100px] text-black mb-2">{service.title}</h3>
                            <p className={`text-[12px] md:text-sm text-[#2B2B2B] max-[640px]:w-[160px]  leading-relaxed
                                ${service.title === "Responsive Support" ?
                                `
                            max-[375px]:w-[150px] 
                              `
                                :
                                `
                            max-[375px]:w-[110px] 
                                 `
                            }`}>
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
};
