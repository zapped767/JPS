"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {getImageUrl} from "@/lib/utils";
import Link from "next/link";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        functionality: true,
        security: true,
        advertising: false,
        personalization: false,
        analytics: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        setTimeout(() => {
            if (!consent) setVisible(true);
        }, 30000);
    }, []);

    const saveConsent = (
        choice: "allow" | "reject" | "custom",
        prefs?: typeof preferences
    ) => {
        const data = {
            choice,
            preferences:
                choice === "allow"
                    ? {
                        functionality: true,
                        security: true,
                        advertising: true,
                        personalization: true,
                        analytics: true,
                    }
                    : choice === "reject"
                        ? {
                            functionality: true,
                            security: true,
                            advertising: false,
                            personalization: false,
                            analytics: false,
                        }
                        : {
                            ...prefs,
                            functionality: true,
                            security: true,
                        },
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem("cookieConsent", JSON.stringify(data));
        setVisible(false);
        setShowSettings(false);
    };

    const handleConsent = (choice: "allow" | "reject") => saveConsent(choice);
    const handleManageCookies = () => setShowSettings(true);
    const handleSavePreferences = () => saveConsent("custom", preferences);
    const handleCloseSettings = () => setShowSettings(false);
    const togglePreference = (key: keyof typeof preferences) =>
        setPreferences((prev) => ({...prev, [key]: !prev[key]}));

    if (!visible) return null;

    const cookieText =
        "We use cookies to make your experience smoother, from showing you relevant offers to understanding how our site is used. You can manage your preferences anytime.";

    return (
        <>
            {!showSettings && (
                <div
                    className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[96%] sm:w-[90%] lg:w-[90%] xl:w-[85%] max-w-7xl bg-white/95 shadow-lg rounded-2xl p-5 lg:p-6 z-50 border border-gray-200">
                    {/* Close Button (slightly higher) */}
                    <button
                        onClick={() => setVisible(false)}
                        className="absolute top-1.5 right-4 text-gray-400 hover:text-gray-600 text-lg"
                        aria-label="Close cookie consent"
                    >
                        ×
                    </button>

                    <div
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-[2px] xl:gap-[1px]">
                        {/* Icon */}
                        <div className="flex justify-center mb-3 lg:mb-0 lg:justify-start">
                            <Image
                                src={getImageUrl("public/images/purple-cookie.webp")}
                                alt="Cookie Icon"
                                width={48}
                                height={48}
                                className="rounded-lg"
                            />
                        </div>

                        {/* Text */}
                        <div className="text-center lg:text-left max-w-full lg:max-w-[53%] xl:max-w-[53%]">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify line-clamp-6 sm:line-clamp-5 lg:line-clamp-none">
                                {cookieText}{" "}
                                <span>
                  Learn more in our{" "}
                                    <Link
                                        href="/policies#cookie-policy"
                                        className="text-purple-600 font-medium hover:underline"
                                    >
                    Cookie Policy
                  </Link>
                  .
                </span>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div
                            className="buttons-container flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0 w-full lg:w-auto">
                            <div className="flex gap-2 lg:gap-4 xl:gap-5 w-full lg:w-auto justify-center">
                                <button
                                    onClick={() => handleConsent("reject")}
                                    className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-2xl text-sm hover:bg-gray-300 transition flex-1 lg:flex-none lg:min-w-[130px] xl:min-w-[135px]"
                                >
                                    Reject All
                                </button>
                                <button
                                    onClick={handleManageCookies}
                                    className="manage-btn bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-2xl text-sm hover:bg-gray-300 transition lg:mt-0 flex-1 lg:flex-none lg:min-w-[160px] xl:min-w-[165px]"
                                >
                                    Manage Cookies
                                </button>
                            </div>

                            <button
                                onClick={() => handleConsent("allow")}
                                className="lg:ml-4 bg-purple-600 text-white font-semibold px-6 py-2 rounded-2xl text-sm hover:bg-purple-700 transition flex-1 lg:flex-none min-w-[160px] xl:min-w-[135px]"
                            >
                                Allow All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Responsive Styles (Minified) */}
            <style jsx>{`
        @media (min-width: 768px) and (max-width: 1023px) {
          .buttons-container {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            flex-wrap: nowrap !important;
            gap: 10px !important;
          }
          .buttons-container > div {
            display: flex !important;
            justify-content: center !important;
            gap: 10px !important;
          }
          .buttons-container > .manage-btn {
            margin-top: 0 !important;
            margin-left: 10px !important;
            width: auto !important;
            flex: none !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1280px) {
          .buttons-container {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .buttons-container > div {
            display: flex !important;
            justify-content: center !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .buttons-container > .manage-btn {
            margin-top: 10px !important;
            max-width: 280px !important;
            width: 100% !important;
            justify-content: center !important;
            align-self: center !important;
            margin-left: 0 !important;
          }
        }
      `}</style>

            {/* Settings Modal */}
            {showSettings && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6 sm:py-10">
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl w-[95%] sm:w-[90%] max-w-md border border-gray-100 flex flex-col max-h-[95vh] overflow-y-auto p-5 sm:p-7">
                        <button
                            onClick={handleCloseSettings}
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl transition"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center mt-6 sm:mt-0">
                            Manage Cookie Preferences
                        </h2>

                        <div className="space-y-5 text-gray-700 text-sm">
                            {[
                                {
                                    key: "functionality",
                                    label: "Functionality",
                                    desc: "These cookies store essential site settings and language preferences. Required for basic operation.",
                                    locked: true,
                                },
                                {
                                    key: "security",
                                    label: "Security",
                                    desc: "Helps prevent fraud and ensure secure access. Always enabled.",
                                    locked: true,
                                },
                                {
                                    key: "advertising",
                                    label: "Advertising",
                                    desc: "Used by partners to show relevant ads.",
                                },
                                {
                                    key: "personalization",
                                    label: "Personalization",
                                    desc: "Tailors your content and experience.",
                                },
                                {
                                    key: "analytics",
                                    label: "Analytics",
                                    desc: "Helps us understand how users interact with our website.",
                                },
                            ].map(({key, label, desc, locked}) => (
                                <div
                                    key={key}
                                    className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-0"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{label}</p>
                                        <p className="text-gray-500 text-xs mt-1">{desc}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={
                                            locked
                                                ? true
                                                : preferences[key as keyof typeof preferences]
                                        }
                                        onChange={
                                            locked
                                                ? undefined
                                                : () =>
                                                    togglePreference(key as keyof typeof preferences)
                                        }
                                        readOnly={locked}
                                        className={`accent-purple-600 mt-1 ${
                                            locked
                                                ? "opacity-60 cursor-not-allowed"
                                                : "cursor-pointer"
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white pt-3">
                            <button
                                onClick={handleSavePreferences}
                                className="bg-purple-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-purple-700 transition w-full"
                            >
                                Save Preferences
                            </button>
                            <button
                                onClick={() => saveConsent("allow")}
                                className="bg-gray-100 text-gray-800 font-medium py-2 rounded-lg text-sm hover:bg-gray-200 transition w-full"
                            >
                                Allow All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
