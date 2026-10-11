"use client";

import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import {Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions,} from "@headlessui/react";
import {countries} from "@/lib/countries";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";
import {formatCurrency} from "@/utils/util";
import {useBookDayTour} from "@/hooks/useApi";
import {toast} from "react-toastify";
import {Check, ChevronDown, ChevronRight} from "lucide-react";
import {CountInput} from "@/components/ui/CountInput";
import {FaMoneyCheckDollar} from "react-icons/fa6";
import {motion} from "framer-motion";
import {MdEventAvailable} from "react-icons/md";

// Lazy imports
const DatePicker = dynamic(
    () =>
        import("@/components/ui/DateTimePicker").then((mod) => ({
            default: mod.DatePicker,
        })),
    {
        ssr: false,
        loading: () => <div className="h-12 bg-gray-100 animate-pulse rounded-lg"/>,
    }
);

// ---------------- VALIDATION ----------------

const bookingSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phoneCode: z.string(),
    phoneNumber: z.string().min(6, "Phone number must be at least 6 characters"),
    adults: z.string().min(1),
    children: z.string().min(1),
    arrivalDate: z.string().min(1, "Please select an arrival date"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Dropdown component using Headless UI Listbox
interface DropdownProps {
    label?: string;
    value?: string;
    options: { value: string; label: string; flag?: string }[];
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
                                               label,
                                               value,
                                               options,
                                               onChange,
                                               placeholder,
                                               className = "",
                                               error,
                                           }) => {
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <Field className={cn("space-y-2", className)}>
            {label && (
                <Label className="text-sm lg:text-base font-medium text-gray-700">
                    {label}
                </Label>
            )}
            <Listbox value={value || ""} onChange={onChange || (() => {
            })}>
                <div className="relative">
                    <ListboxButton
                        className={cn(
                            "w-full px-4 py-2 lg:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-left flex items-center justify-between text-sm lg:text-base data-open:border-primary-500 data-focus:border-primary-500 data-open:ring-2 data-open:ring-primary-500/20 hover:border-gray-400",
                            error
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            {selectedOption?.flag && <span>{selectedOption.flag}</span>}
                            <span
                                className={cn(
                                    selectedOption?.label ? "text-gray-900" : "text-gray-500"
                                )}
                            >
                                {selectedOption?.label || placeholder || "Select..."}
                            </span>
                        </span>
                        <ChevronDown
                            size={16}
                            className="text-gray-400 transition-transform duration-200 data-open:rotate-180 data-open:text-primary-500 ml-1"
                        />
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150 data-enter:ease-out data-leave:ease-in"
                    >
                        {options.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className="group relative px-4 py-3 text-left cursor-pointer flex items-center gap-2 text-sm lg:text-base border-b border-gray-100 last:border-b-0 transition-colors duration-150 data-focus:bg-primary-50 data-selected:bg-primary-100 data-focus:text-primary-900 hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    {option.flag && <span>{option.flag}</span>}
                                    <span className="truncate">{option.label}</span>
                                </div>
                                {value === option.value && (
                                    <Check size={16} className="text-primary-500 shrink-0"/>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </Field>
    );
};

// Input field component
interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   type = "text",
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                   required = false,
                                                   className = "",
                                                   error,
                                               }) => (
    <Field className={cn("space-y-2", className)}>
        <Label className="text-sm lg:text-base font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Input
            type={type}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={cn(
                "w-full px-4 py-2 text-black lg:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm lg:text-base hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-800 disabled:cursor-not-allowed placeholder:text-gray-500 data-focus:border-primary-500",
                error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
            )}
            required={required}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </Field>
);


// Price Summary Component
const PriceSummary: React.FC<{
    adults: number;
    children: number;
    dayTourData: any;
    advancedPayment: boolean;
}> = ({adults, children, dayTourData, advancedPayment}) => {
    const adultPrice = (dayTourData?.adultPrice ?? 0) * adults;
    const childPrice = (dayTourData?.childPrice ?? 0) * children;
    const subtotal = adultPrice + childPrice;

    let discount = 0;
    if (dayTourData?.promotion && dayTourData.promotion.type === "PERCENTAGE") {
        discount = subtotal * (dayTourData.promotion.value / 100);
    }

    const total = subtotal - discount;
    const paymentAmount = total * 0.4;
    const remainingAmount = total * 0.6;

    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                    <FaMoneyCheckDollar className="w-full h-full text-secondary-500"/>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                    Price Summary
                </h3>
            </div>

            <div className="space-y-3 text-sm lg:text-base">
                {adults > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Adult Price</span>
                        <div className="flex items-center gap-2">
                            <span className="text-primary-600 font-bold text-xs">
                                ({adults} × {formatCurrency(dayTourData?.adultTotalPrice || 0)})
                            </span>
                            <span className="font-medium">{formatCurrency(adultPrice)}</span>
                        </div>
                    </div>
                )}

                {children > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Child Price</span>
                        <div className="flex items-center gap-2">
                            <span className="text-primary-600 font-bold text-xs">
                                ({children} × {formatCurrency(dayTourData?.childTotalPrice || 0)})
                            </span>
                            <span className="font-medium">{formatCurrency(childPrice)}</span>
                        </div>
                    </div>
                )}

                <div className="border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Sub Total</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                </div>

                {discount > 0 && (
                    <div className="border-gray-200">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Discount</span>
                            <span className="font-medium text-secondary-600">
                                <b>-</b> {formatCurrency(discount)}
                            </span>
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total Price</span>
                        <span className="font-bold text-secondary-600 text-lg">
                            {formatCurrency(total)}
                        </span>
                    </div>
                </div>

                {advancedPayment && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">
                                    Pay Now (40%)
                                </span>
                                <span className="font-bold text-primary-600 text-lg">
                                    {formatCurrency(paymentAmount)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Remaining (60%)</span>
                                <span className="text-gray-600 text-sm">
                                    {formatCurrency(remainingAmount)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ---------------- MAIN COMPONENT ------------------

export const BookingSection = ({
                                   setProceedRef,
                                   dayTourData,
                               }: {
    setProceedRef: (el: HTMLDivElement | null) => void;
    dayTourData: any;
}) => {
    const {mutateAsync: bookAsync, isPending} = useBookDayTour();
    const [advancedPayment, setAdvancedPayment] = useState(false);

    const {
        control,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneCode: "+94",
            phoneNumber: "",
            adults: "1",
            children: "0",
            arrivalDate: "",
        },
    });

    const adults = Number(watch("adults"));
    const children = Number(watch("children"));

    // ---------------- SUBMIT ----------------

    const onSubmit = async (data: BookingFormData) => {
        const payload = {
            bookingDate: new Date(data.arrivalDate)?.toISOString(),

            contactPerson: {
                name: data.fullName,
                passengerTypeCode: null,
                passportNumber: null,
                email: data.email,
                phone: `${data.phoneCode}${data.phoneNumber}`,
                gender: null,
                country: null,
            },

            adults: Number(data.adults),
            children: Number(data.children),

            dayTourSlug: dayTourData?.slug,

            addOnIds: [],
            promotionId: Number(dayTourData?.promotion?.id),
            promotionCode: dayTourData?.promotion?.code,

            advancedPayment: advancedPayment,
        };

        try {
            const res = await bookAsync(payload);
            toast.success("Booking created successfully! Redirecting to payment...");
            window.location.href = res?.paymentLink ?? "";
        } catch (err: any) {
            toast.error(err?.response?.data?.error || "Booking failed");
        }
    };

    return (
        <section id="booking" className="px-4 lg:px-6 py-6 lg:py-8 scroll-offset">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 lg:gap-8">
                    {/* Main form */}
                    <div className="xl:col-span-2 space-y-4 lg:space-y-6">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-2 lg:space-y-6"
                        >
                            {/* Booking Details */}
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                className="bg-white rounded-2xl p-4 lg:p-8 border-2 border-[#8E59FF] space-y-4 lg:space-y-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                                        <MdEventAvailable className="w-5 h-5 text-white"/>
                                    </div>
                                    <h2 className="text-lg lg:text-xl font-bold text-primary-600">
                                        Booking Details
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-2 lg:gap-6">
                                    <Controller
                                        name="fullName"
                                        control={control}
                                        render={({field}) => (
                                            <InputField
                                                label="Full Name"
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                placeholder="e.g. John Doe"
                                                required
                                                className="lg:col-span-2"
                                                error={errors.fullName?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({field}) => (
                                            <InputField
                                                label="Email"
                                                type="email"
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                placeholder="you@example.com"
                                                required
                                                error={errors.email?.message}
                                            />
                                        )}
                                    />

                                    <Field className="space-y-2">
                                        <Label className="text-sm lg:text-base font-medium text-gray-700">
                                            Phone Number
                                        </Label>
                                        <div className="flex gap-2">
                                            <div className="w-fit lg:w-fit">
                                                <Controller
                                                    name="phoneCode"
                                                    control={control}
                                                    render={({field}) => (
                                                        <Dropdown
                                                            label=""
                                                            value={field.value}
                                                            onChange={(value) => field.onChange(value)}
                                                            options={countries.map((c) => ({
                                                                value: c.code,
                                                                label: c.code,
                                                                flag: c.flag,
                                                            }))}
                                                            placeholder="+94"
                                                            error={errors.phoneCode?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Controller
                                                    name="phoneNumber"
                                                    control={control}
                                                    render={({field}) => (
                                                        <div>
                                                            <Input
                                                                type="tel"
                                                                value={field.value}
                                                                onChange={(e) =>
                                                                    field.onChange(e.target.value)
                                                                }
                                                                placeholder="77 567 6667"
                                                                className={cn(
                                                                    "w-full px-4 py-2 lg:py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm lg:text-base hover:border-gray-400 placeholder:text-gray-400 data-focus:border-primary-500 data-focus:ring-2 data-focus:ring-primary-500/20",
                                                                    errors.phoneNumber
                                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                                        : "border-gray-300"
                                                                )}
                                                            />
                                                            {errors.phoneNumber && (
                                                                <p className="text-sm text-red-600 mt-1">
                                                                    {errors.phoneNumber.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-4 lg:gap-6">

                                    <Controller
                                        name="children"
                                        control={control}
                                        render={({field}) => (
                                            <CountInput
                                                label="Children Count"
                                                value={Number(field.value)}
                                                onChange={(value) => field.onChange(String(value))}
                                                min={0}
                                                max={99}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name="adults"
                                        control={control}
                                        render={({field}) => (
                                            <CountInput
                                                label="Adult Count"
                                                value={Number(field.value)}
                                                onChange={(value) => field.onChange(String(value))}
                                                min={0}
                                                max={99}
                                            />
                                        )}
                                    />
                                </div>

                                <Controller
                                    name="arrivalDate"
                                    control={control}
                                    render={({field}) => (
                                        <div className="space-y-2">
                                            <DatePicker
                                                label="Arrival Date"
                                                value={field.value ?? ""}
                                                onChange={(value) => field.onChange(value)}
                                                required
                                                placeholder="Select your arrival date"
                                            />
                                            {errors.arrivalDate && (
                                                <p className="text-sm text-red-600">
                                                    {errors.arrivalDate.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </motion.div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        <PriceSummary
                            adults={adults}
                            children={children}
                            dayTourData={dayTourData}
                            advancedPayment={advancedPayment}
                        />

                        {/* Advanced Payment Checkbox */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Field>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="advancedPayment"
                                        checked={advancedPayment}
                                        onChange={(e) => setAdvancedPayment(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary-500 outline-none cursor-pointer accent-primary-500"
                                    />
                                    <Label
                                        htmlFor="advancedPayment"
                                        className="text-sm lg:text-base text-gray-700 cursor-pointer font-medium"
                                    >
                                        Reserve with 40% payment
                                    </Label>
                                </div>
                            </Field>
                        </div>

                        {/* Submit button */}
                        <div ref={setProceedRef} className="min-h-14">
                            <Button
                                type="button"
                                variant="primary"
                                size="lg"
                                className="w-full h-12 lg:h-14 text-base lg:text-lg font-bold"
                                icon={<ChevronRight size={20}/>}
                                iconPosition="right"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isPending}
                            >
                                {isPending ? "Processing..." : "Proceed to Payment"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


BookingSection.displayName = "BookingSection";