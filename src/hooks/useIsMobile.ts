import {useEffect, useState} from "react";

export function useIsMobile(breakpoint = 768) {
    // Default to false for SSR (desktop-first approach)
    // This prevents hydration mismatches and ensures content renders immediately
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined") return;
        
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
}
