import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {Download} from "lucide-react";

import {Button} from "@/components/ui/Button";
import {PageLoader} from "@/components/ui/PageLoader";
import {useBooking} from "@/hooks/useApi";
import {RiErrorWarningFill, RiVerifiedBadgeFill} from "react-icons/ri";
import {IoIosArrowBack, IoIosHome} from "react-icons/io";
import {FaCalendarCheck} from "react-icons/fa";
import {MdMarkEmailRead} from "react-icons/md";

type Nullable<T> = T | null | undefined;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const formatCurrency = (value: Nullable<string | number>) => {
    if (value == null) return null;

    const numericValue =
        typeof value === "number" ? value : Number.parseFloat(value ?? "");

    if (Number.isNaN(numericValue)) return null;

    return currencyFormatter.format(numericValue);
};

const formatDate = (value: Nullable<string | Date>) => {
    if (!value) return null;

    if (value instanceof Date) {
        return value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    const trimmed = value.trim();
    if (!trimmed) return null;

    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) {
        return trimmed;
    }

    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatTime = (value: Nullable<string | Date>) => {
    if (!value) return null;

    if (value instanceof Date) {
        return value.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    const trimmed = value.trim();
    if (!trimmed) return null;

    const normalized = trimmed.replace(/\./g, ":").replace(/\s+/g, " ");

    const match = normalized.match(
        /^(\d{1,2})(?::(\d{2}))?(?::(\d{2}))?(?:\s?(am|pm))?$/i
    );

    if (!match) {
        return normalized;
    }

    let hours = Number.parseInt(match[1] ?? "0", 10);
    const minutes = Number.parseInt(match[2] ?? "0", 10);
    const seconds = Number.parseInt(match[3] ?? "0", 10);
    const meridiem = match[4]?.toLowerCase();

    if ([hours, minutes, seconds].some(Number.isNaN)) {
        return normalized;
    }

    if (meridiem === "pm" && hours < 12) {
        hours += 12;
    }

    if (meridiem === "am" && hours === 12) {
        hours = 0;
    }

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};

const formatBookingDateCompact = (value: Nullable<string | Date>) => {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
};

const formatBookingTimeCompact = (value: Nullable<string | Date>) => {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const meridiem = hours >= 12 ? "pm" : "am";

    hours %= 12;
    if (hours === 0) {
        hours = 12;
    }

    const hourString = String(hours).padStart(2, "0");

    return `${hourString}.${minutes}.${meridiem}`;
};

interface PaymentDetailItemProps {
    label: string;
    value: string;
    highlight?: boolean;
}

const PaymentDetailItem = ({
                               label,
                               value,
                               highlight,
                           }: PaymentDetailItemProps) => (
    <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="font-medium text-[#646464]">{label}</span>
        <span
            className={`font-semibold ${
                highlight ? "text-[#EB00A5]" : "text-[#222222]"
            }`}
        >
      {value}
    </span>
    </div>
);

const PaymentSuccessPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const bookingId = Array.isArray(id) ? id[0] : id;

    const {
        data: booking,
        isLoading,
        isError,
    } = useBooking(bookingId ?? "", {
        enabled: Boolean(bookingId),
        retry: 1,
    });

    const paymentDetails = booking?.paymentDetails?.[0];

    const scheduledDate = formatBookingDateCompact(booking?.bookingDate) ?? "-";
    const scheduledTime = formatBookingTimeCompact(booking?.bookingDate) ?? "-";
    const amountPaidDisplay = formatCurrency(paymentDetails?.paidAmount) ?? "-";
    const paymentDateDisplay =
        formatDate(paymentDetails?.paymentCreatedAt) ?? "-";
    const paymentMethodDisplay = paymentDetails?.paymentMethodType
        ? paymentDetails.paymentMethodType.charAt(0).toUpperCase() +
        paymentDetails.paymentMethodType.slice(1)
        : "Online Payment";
    const amountDueDisplay =
        formatCurrency(booking?.amountDue) ??
        formatCurrency(booking?.totalAmount) ??
        amountPaidDisplay;

    const thankYouMessage = formatDate(booking?.bookingDate)
        ? `Thank you for choosing our service. We look forward to seeing you on ${formatDate(
            booking?.bookingDate
        )}!`
        : "Thank you for choosing our service. We look forward to seeing you soon!";

    const handleDownloadReceipt = () => {
        if (typeof window === "undefined") return;

        if (paymentDetails?.receiptUrl) {
            window.open(paymentDetails.receiptUrl, "_blank", "noopener,noreferrer");
            return;
        }

        window.print();
    };

    const handleDownloadInvoice = () => {
        window.print();
    };

    const handleRetryPayment = () => {
        if (!bookingId) return;

        router.push(`/booking/${bookingId}`);
    };

    const handleContactSupport = () => {
        router.push("/contact");
    };

    const goHome = () => {
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>Booking Success | Zephyra Travels</title>
            </Head>
            {isLoading && <PageLoader/>}

            <main className="relative min-h-screen overflow-hidden bg-white pt-16 pb-20">
                <div
                    className="pointer-events-none absolute -left-36 -top-48 h-[500px] w-[500px] rounded-full bg-[#FF26DC]/50  blur-[160px] max-sm:w-[300px] max-sm:h-[300px] max-sm:-left-1/2 max-sm:top-[-10%]"/>
                <div
                    className="pointer-events-none absolute -right-64 -top-56 h-[586px] w-[586px] rounded-full bg-[#6938D3] blur-[160px] max-sm:w-[300px] max-sm:h-[300px] max-sm:-top-1 "/>
                <div
                    className="pointer-events-none absolute -left-32 top-24 h-[490px] w-[490px] rounded-full bg-[#6938D3]/10 blur-[160px]"/>

                <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col px-4 sm:px-6">
                    <div className="flex justify-end">
                        <Link
                            href="/"
                            className="text-sm font-medium text-black transition hover:text-black/80 flex items-center gap-2"
                        >
                            <IoIosArrowBack className="h-4 w-4"/>
                            Back Home
                        </Link>
                    </div>

                    {!isLoading &&
                    (booking?.bookingStatus === "PAID" ||
                        booking?.bookingStatus === "PARTIALLY_PAID") ? (
                        <motion.div
                            initial={{opacity: 0, y: 24}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.4, ease: "easeOut"}}
                            className="relative mt-8 w-full overflow-hidden rounded-[25px] px-6 py-10 shadow-[0_25px_45px_rgba(135,43,255,0.08)] sm:px-12"
                        >
                            <div
                                className="pointer-events-none absolute -right-64 -bottom-40 h-[586px] w-[586px] rounded-full bg-[#6938D3]/30 blur-[160px]"/>
                            <div
                                className="absolute top-[-24%] left-[-24%] h-[490px] w-[490px] rounded-full bg-[#6938D3]/10 max-sm:-left-1/2 max-sm:top-[-10%] max-sm:h-[300px] max-sm:w-[300px]"/>
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full text-[#27AE60]">
                                    <RiVerifiedBadgeFill className="h-full w-full"/>
                                </div>
                                <h1 className="mt-6 text-[32px] font-semibold text-[#222222] sm:text-4xl">
                                    Payment Successful!
                                </h1>
                                <p className="mt-3 max-w-xl text-base text-[#222222] sm:text-lg">
                                    Your payment has been processed successfully.
                                </p>
                            </div>

                            <section className="mt-10 px-0 py-6 sm:!px-20">
                                <h2 className="text-lg font-semibold text-[#222222] sm:text-xl">
                                    Payment Details
                                </h2>
                                <div className="mt-3 h-px w-full bg-[#D8C6FF]"/>

                                <div className="mt-6 space-y-5">
                                    <PaymentDetailItem
                                        label="Booking Reference"
                                        value={`#${String(booking?.ref) ?? "-"}`}
                                    />
                                    <PaymentDetailItem
                                        label="Amount Paid"
                                        value={amountPaidDisplay}
                                        highlight
                                    />
                                    <PaymentDetailItem
                                        label="Payment Date"
                                        value={paymentDateDisplay}
                                    />
                                    <PaymentDetailItem
                                        label="Payment Method"
                                        value={paymentMethodDisplay}
                                    />
                                </div>
                            </section>

                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                <div
                                    className="flex flex-col items-center rounded-[25px] bg-[#FCC417]/15 p-6 text-center text-[#715500]">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center">
                                            <FaCalendarCheck className="h-full w-full text-[#FCC417]"/>
                                        </div>
                                        <p className="font-arial text-[16px] font-bold">
                                            We are waiting for you on
                                        </p>
                                    </div>
                                    <p className="mt-3 text-[14px] font-bold text-[#FCC417] sm:text-xl">
                                        {scheduledDate} <span className="text-black">and</span>{" "}
                                        {scheduledTime}
                                    </p>
                                    <p className="mt-4 text-xs text-[#684F00] sm:text-sm">
                                        We will provide meet and greet service upon your arrival at
                                        the airport.
                                    </p>
                                </div>

                                <div
                                    className="flex flex-col items-center rounded-[25px] bg-[#6938D3]/20 p-6 text-center text-[#6938D3]">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center">
                                            <MdMarkEmailRead className="h-full w-full text-[#6938D3]"/>
                                        </div>
                                        <p className="font-arial text-[16px] font-semibold">
                                            Confirmation Email
                                        </p>
                                    </div>
                                    <p className="mt-2 text-[14px] text-[#7B3FFF] sm:text-sm">
                                        Please check your inbox to review your itinerary and
                                        receipt.
                                    </p>
                                    <hr className="mt-10 h-px w-3/4 border-[1px] border-white"/>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-sm text-[#404040] sm:text-base">
                                {thankYouMessage}
                            </p>
                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full border-2 border-[#872BFF] bg-transparent text-sm font-bold text-[#872BFF] transition hover:bg-[#872BFF]/10 sm:text-base"
                                    onClick={goHome}
                                    icon={<IoIosHome className="h-6 w-6"/>}
                                >
                                    Back to Home
                                </Button>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full bg-[#872BFF] text-sm font-bold text-white transition hover:bg-[#6F1FFF] sm:text-base"
                                    onClick={handleDownloadReceipt}
                                    icon={<Download className="h-4 w-4"/>}
                                >
                                    Stripe Transaction
                                </Button>
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full bg-[#872BFF] px-10 text-sm font-bold text-white transition hover:bg-[#6F1FFF] sm:text-base"
                                    onClick={handleDownloadInvoice}
                                    icon={<Download className="h-4 w-4"/>}
                                >
                                    Download ZephyraTravels Booking Invoice
                                </Button>
                            </div>
                        </motion.div>
                    ) : (!isLoading && isError) ||
                    (booking &&
                        booking?.bookingStatus !== "PAID" &&
                        booking?.bookingStatus !== "PARTIALLY_PAID") ? (
                        <motion.div
                            initial={{opacity: 0, y: 24}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.4, ease: "easeOut"}}
                            className="relative mt-8 w-full overflow-hidden rounded-[25px] px-6 py-10 shadow-[0_25px_45px_rgba(242,153,74,0.18)] sm:px-12"
                        >
                            <div
                                className="pointer-events-none absolute -right-64 -bottom-40 h-[586px] w-[586px] rounded-full bg-[#FF5A5F]/20 blur-[160px]"/>
                            <div
                                className="absolute top-[-24%] left-[-24%] h-[490px] w-[490px] rounded-full bg-[#FFB347]/15 max-sm:-left-1/2 max-sm:top-[-10%] max-sm:h-[300px] max-sm:w-[300px]"/>
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF6EA] text-[#F2994A]">
                                    <RiErrorWarningFill className="h-12 w-12"/>
                                </div>
                                <h1 className="mt-6 text-[32px] font-semibold text-[#4A3410] sm:text-4xl">
                                    Payment Pending
                                </h1>
                                <p className="mt-3 max-w-xl text-base text-[#5C4200] sm:text-lg">
                                    We haven't been able to confirm your payment yet. Your booking
                                    remains reserved while we wait for the transaction to
                                    complete.
                                </p>
                            </div>

                            <section
                                className="mt-10 w-full rounded-3xl bg-[#FFF7E6] p-6 text-left text-[#8A5A00] sm:p-8">
                                <h2 className="text-lg font-semibold sm:text-xl">
                                    Booking Summary
                                </h2>
                                <div className="mt-3 h-px w-full bg-[#FFD8A8]"/>

                                <div className="mt-6 space-y-5">
                                    <PaymentDetailItem
                                        label="Booking Reference"
                                        value={`#${String(booking?.ref || router.query.id || "-")}`}
                                    />
                                    <PaymentDetailItem
                                        label="Scheduled Date"
                                        value={scheduledDate}
                                    />
                                    <PaymentDetailItem
                                        label="Scheduled Time"
                                        value={scheduledTime}
                                    />
                                    <PaymentDetailItem
                                        label="Amount Due"
                                        value={amountDueDisplay}
                                    />
                                </div>
                            </section>

                            <div className="mt-8 w-full rounded-3xl bg-[#FFF2F2] p-6 text-left text-[#7A1F1F] sm:p-8">
                                <p className="text-sm font-semibold sm:text-base">
                                    What you can do next
                                </p>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs sm:text-sm">
                                    <li>
                                        Return to the payment page to complete your transaction.
                                    </li>
                                    <li>Review the payment instructions sent to your email.</li>
                                    <li>
                                        If you believe this is a mistake, reach out to our support
                                        team.
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full border-2 border-[#872BFF] bg-transparent text-sm font-bold text-[#872BFF] transition hover:bg-[#872BFF]/10 sm:text-base"
                                    onClick={goHome}
                                    icon={<IoIosHome className="h-6 w-6"/>}
                                >
                                    Back to Home
                                </Button>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full bg-[#F2994A] text-sm font-bold text-white transition hover:bg-[#DB7A20] sm:text-base"
                                    onClick={handleRetryPayment}
                                >
                                    Retry Payment
                                </Button>
                            </div>

                            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex h-[50px] min-w-[230px] items-center justify-center rounded-full border-2 border-[#DB7A20] bg-transparent text-sm font-bold text-[#DB7A20] transition hover:bg-[#FFF2E6] sm:text-base"
                                    onClick={handleContactSupport}
                                >
                                    Contact Support
                                </Button>
                            </div>

                            <p className="mt-10 text-center text-sm text-[#5C4200] sm:text-base">
                                We'll email you as soon as the payment clears or if we need any
                                additional information.
                            </p>
                        </motion.div>
                    ) : null}
                </div>
            </main>
        </>
    );
};

export default PaymentSuccessPage;
