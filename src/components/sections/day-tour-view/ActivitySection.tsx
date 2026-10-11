import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import {Activity, ActivityCard} from "@/components/sections/day-tour-view/ActivityCard";

interface ActivitySectionProps {
    activities: Activity[]
}

export const ActivitySection = ({activities}: ActivitySectionProps) => {
    return (
        <section className="px-4 mb-5">
            <div
                className="w-full px-5 py-1 flex items-center justify-center text-left mb-2 md:mb-4"
            >
                <span className="font-bold text-md lg:text-xl xl:text-2xl text-secondary-600 text-center">What to Expect</span>
            </div>
            <div className="w-full activity-swiper md:hidden">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={1}
                    autoplay={{
                        delay: 0, // continuous scroll
                        disableOnInteraction: false,
                    }}
                    speed={3000}
                    pagination={{
                        el: ".activities-pagination",
                        clickable: true,
                    }}
                >
                    {activities.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="flex items-center justify-center p-2 pb-4"
                        >
                            <ActivityCard activity={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* pagination BELOW slider */}
                <div className="activities-pagination flex justify-center" />
            </div>

            <div className="hidden md:flex flex-col gap-4">
                {activities.map((item) => (
                        <ActivityCard activity={item} />
                ))}
            </div>
        </section>
    )
}