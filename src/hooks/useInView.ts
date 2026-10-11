import { useEffect, useState } from "react";

export const useInView = (
    element: Element | null,
    options?: IntersectionObserverInit
) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0, ...options }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [element, options]);

    return inView;
};
