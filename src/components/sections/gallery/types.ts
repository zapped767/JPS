export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
    title: string;
    subtitle: string;
}

export interface VideoTour {
    id: number;
    videoSrc: string;
    title: string;
    descriptionLine1: string;
    descriptionLine2: string;
}

export interface FAQ {
    question: string;
    answer: string | string[];
}


export type TabType = "All" | "Cultural" | "Wildlife" | "Beaches" | "Heritage";