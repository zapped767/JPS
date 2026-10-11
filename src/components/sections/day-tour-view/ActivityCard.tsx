import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import React from "react";

export interface Activity {
    id: number,
    active: boolean,
    name: string,
    description: string,
    activityType: string,
    durationMinutes: number,
    adultPrice: number,
    childPrice: number,
    image: string
}

interface ActivityCardProps {
    activity: Activity
}

export const ActivityCard = ({activity}: ActivityCardProps) => {
    return (
        <div className="shadow-lg border border-slate-200 rounded-2xl overflow-hidden flex items-stretch h-[100px]">
            <div className="w-[100px] h-full">
                <Image
                    src={getImageUrl(activity.image)}
                    alt={activity.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                    quality={85}
                    loading="eager"
                    priority
                    fetchPriority="high"
                />
            </div>
            <div className="flex flex-col gap-2 p-2 flex-1 h-full">
                <h3 className="text-sm font-bold text-center mt-1">{activity.name}</h3>
                <p className="text-center text-xs mt-1 line-clamp-2">{activity.description}</p>
            </div>
        </div>

    )
}