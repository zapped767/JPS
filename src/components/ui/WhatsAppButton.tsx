import {FaWhatsapp} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {useIsMobile} from "@/hooks/useIsMobile";

const WhatsAppButton = () => {

    const isMobile = useIsMobile();

    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const whatsappLink = `https://wa.me/message/APC6K67QK43IF1`;

    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Run only on client
        if (typeof window === "undefined") return;

        const footerEl = document.getElementById("footer");
        if (!footerEl) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsFooterVisible(entry.isIntersecting);
            },
            {threshold: 0.1}
        );

        observerRef.current.observe(footerEl);

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Popup Message */}
            {!isFooterVisible && (
                <div
                    className="absolute bottom-16 right-0 max-sm:hidden bg-white shadow-lg rounded-xl p-3 text-gray-700 text-sm w-56 animate-fadeIn mb-3">
                    💬 Need help? Chat with us on WhatsApp!
                </div>
            )}

            {/* WhatsApp Floating Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="relative flex items-center justify-center bg-green-500 text-white rounded-full p-3 md:p-4 shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-green-600 animate-pulse-glow"
            >
                <FaWhatsapp size={isMobile ? 23 : 28} aria-hidden="true"/>
                {/* Glowing Ring Effect */}
                <span
                    className="absolute inset-0 rounded-full border-4 border-green-400 opacity-60 animate-glow-ring"
                    aria-hidden="true"></span>
            </a>
        </div>
    );
};

export default WhatsAppButton;
