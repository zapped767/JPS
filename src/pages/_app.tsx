import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import { useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import Script from "next/script";
import dynamic from "next/dynamic";
import Head from "next/head";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

// Enable SSR for Layout to improve LCP - critical for hero section rendering
const Layout = dynamic(
  () =>
    import("@/components/layout/Layout").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false, // Enable SSR for better LCP performance
  }
);

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Only load weights actually used
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"], // Only load weights actually used
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export default function App({ Component, pageProps, router }: AppProps) {
  const { asPath } = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loadGTM, setLoadGTM] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Track page navigation loading state (only for route changes, not initial load)
  useEffect(() => {
    // Mark initial mount as complete after first render
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    const handleStart = (url: string) => {
      if (url !== asPath) {
        requestAnimationFrame(() => setIsPageLoading(true));
      }
    };
    const handleComplete = () => {
      requestAnimationFrame(() => setIsPageLoading(false));
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [asPath, router, isInitialMount]);

  // Load GTM only after user interaction or 5 second delay
  useEffect(() => {
    const handleInteraction = () => {
      setLoadGTM(true);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    const timer = setTimeout(() => setLoadGTM(true), 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* GA4 - Deferred until user interaction or 5s delay */}
        {process.env.NODE_ENV === "production" && loadGTM && (
          <>
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
                                    page_path: window.location.pathname,
                                });
                            `,
              }}
            />
          </>
        )}
      </Head>

      <QueryClientProvider client={queryClient}>
        <DefaultSeo {...SEO} />

        <div className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>

        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}
