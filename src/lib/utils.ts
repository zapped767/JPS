import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getImageUrl = (img: string) => {
    const R2_CDN = process.env.NEXT_PUBLIC_R2_CDN;
    return `${R2_CDN}/${img}`;
};
