import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/Button";
import dynamic from "next/dynamic";

// Lazy load heavy form components only on booking page
const DatePicker = dynamic(() => import("@/components/ui/DateTimePicker").then(mod => ({default: mod.DatePicker})), {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-100 animate-pulse rounded-lg"/>
});

const TimePicker = dynamic(() => import("@/components/ui/DateTimePicker").then(mod => ({default: mod.TimePicker})), {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-100 animate-pulse rounded-lg"/>
});

const RadioButton = dynamic(() => import("@/components/ui/RadioButton").then(mod => ({default: mod.RadioButton})), {
    ssr: false,
    loading: () => <div className="h-12 bg-gray-100 animate-pulse rounded-lg"/>
});
import {Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions,} from "@headlessui/react";
import {Check, ChevronDown, ChevronRight, Plane, Plus, Trash2, User,} from "lucide-react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {useRouter} from "next/router";
import {useBook, usePackage} from "@/hooks/useApi";
import {formatCurrency} from "@/utils/util";
import {BiSolidBookBookmark} from "react-icons/bi";
import {FaMoneyCheckDollar} from "react-icons/fa6";
import {toast} from "react-toastify";
import {countries} from "@/lib/countries";

// Validation schema using zod
const passengerSchema = z.object({
    id: z.string(),
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must be less than 100 characters"),
    passportNumber: z.string(),
    email: z.string().email("Please enter a valid email address"),
    country: z.string().optional(),
    phoneCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    passengerType: z.enum(["adult", "child"]),
    gender: z.enum(["male", "female", "other"]),
});

const bookingFormSchema = z.object({
    arrivalDate: z.string().min(1, "Please select an arrival date"),
    arrivalTime: z.string().optional(),
    passengers: z
        .array(passengerSchema)
        .min(1, "At least one passenger is required"),
});

// Types for form data
type PassengerData = z.infer<typeof passengerSchema>;
type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingResponse extends Record<string, unknown> {
    checkoutSessionId?: string;
    paymentLink?: string;
    sessionUrl?: string;
    url?: string;
    paymentUrl?: string;
    clientSecret?: string;
    packageId?: number;
}

const requireStripePublishableKey = (): string => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
        throw new Error(
            "Stripe publishable key is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY."
        );
    }

    return publishableKey;
};

const resolveCheckoutUrl = (booking: BookingResponse): string | undefined => {
    return [
        booking.checkoutSessionUrl,
        booking.sessionUrl,
        booking.url,
        booking.paymentUrl,
    ].find(
        (value): value is string => typeof value === "string" && value.length > 0
    );
};

const redirectToStripeCheckout = async (booking: BookingResponse) => {
    requireStripePublishableKey();

    const checkoutUrl = resolveCheckoutUrl(booking);

    if (checkoutUrl) {
        window.location.assign(checkoutUrl);
        return;
    }

    if (booking?.clientSecret) {
        throw new Error(
            "Checkout session URL is missing. The booking response returned a client secret, but no Checkout URL to redirect to."
        );
    }

    throw new Error(
        "Checkout session details are missing from the booking response."
    );
};

// Breadcrumb component
const Breadcrumb: React.FC = () => (
    <div className="flex items-center gap-2 text-sm lg:text-lg font-medium text-gray-600 mb-6">
        <Link
            href="/"
            className="text-primary-500 hover:text-primary-600 transition-colors"
        >
            Home
        </Link>
        <ChevronRight size={16} className="text-gray-400"/>
        <Link
            href="/packages"
            className="text-gray-600 hover:text-primary-500 transition-colors"
        >
            Package explore
        </Link>
        <ChevronRight size={16} className="text-gray-400"/>
        <span className="text-primary-500 font-semibold">Booking</span>
    </div>
);

// Input field component using Headless UI with react-hook-form support
interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    icon?: React.ReactNode;
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
                                                   icon,
                                                   error,
                                               }) => (
    <Field className={cn("space-y-2", className)}>
        <Label className="text-sm lg:text-base font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="relative">
            <Input
                type={type}
                value={value || ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full px-4 py-3 text-black lg:py-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm lg:text-base hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-800 disabled:cursor-not-allowed placeholder:text-gray-500 data-focus:border-primary-500",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                )}
                required={required}
            />
            {icon && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </div>
            )}
        </div>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </Field>
);

// Dropdown component using Headless UI Listbox with react-hook-form support
interface DropdownProps {
    label: string;
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
                            "w-full px-4 py-3 lg:py-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-left flex items-center justify-between text-sm lg:text-base data-[open]:border-primary-500 data-[focus]:border-primary-500 data-[open]:ring-2 data-[open]:ring-primary-500/20 hover:border-gray-400",
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
                            className="text-gray-400 transition-transform duration-200 data-[open]:rotate-180 data-[open]:text-primary-500 ml-1"
                        />
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        {options.map((option) => (
                            <ListboxOption
                                key={option.value}
                                value={option.value}
                                className="group relative px-4 py-3 text-left cursor-pointer flex items-center gap-2 text-sm lg:text-base border-b border-gray-100 last:border-b-0 transition-colors duration-150 data-[focus]:bg-primary-50 data-[selected]:bg-primary-100 data-[focus]:text-primary-900 hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    {option.flag && <span>{option.flag}</span>}
                                    <span className="truncate">{option.label}</span>
                                </div>
                                {value === option.value && (
                                    <Check size={16} className="text-primary-500 flex-shrink-0"/>
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

// Passenger form component with react-hook-form integration
interface PassengerFormProps {
    passenger: PassengerData;
    onUpdate: (passenger: PassengerData) => void;
    onRemove: () => void;
    index: number;
    canRemove: boolean;
    errors?: any;
    control: any;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
                                                         passenger,
                                                         onUpdate,
                                                         onRemove,
                                                         index,
                                                         canRemove,
                                                         errors,
                                                         control,
                                                     }) => {
    const updateField = (field: keyof PassengerData, value: string) => {
        onUpdate({...passenger, [field]: value});
    };

    const passengerErrors = errors?.passengers?.[index];

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="bg-white border-2 border-[#8E59FF] rounded-2xl p-4 lg:p-8 space-y-4 lg:space-y-4"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-700">
                    Passenger {index + 1}
                </h3>
                {canRemove && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onRemove}
                            type="button"
                            className="!px-3 !py-1 !text-xs !bg-primary-500 !text-white !border-primary-500"
                        >
                            <Trash2 size={12}/>
                        </Button>
                    </div>
                )}
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
                <Controller
                    name={`passengers.${index}.fullName`}
                    control={control}
                    render={({field}) => (
                        <InputField
                            label="Full Name"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                updateField("fullName", value);
                            }}
                            placeholder="e.g. Jane Doe"
                            required
                            className="lg:col-span-2"
                            error={passengerErrors?.fullName?.message}
                        />
                    )}
                />

                <Controller
                    name={`passengers.${index}.passportNumber`}
                    control={control}
                    render={({field}) => (
                        <InputField
                            label="Passport Number"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                updateField("passportNumber", value);
                            }}
                            placeholder="AB1234567"
                            error={passengerErrors?.passportNumber?.message}
                        />
                    )}
                />

                <Controller
                    name={`passengers.${index}.email`}
                    control={control}
                    render={({field}) => (
                        <InputField
                            label="Email"
                            type="email"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                updateField("email", value);
                            }}
                            placeholder="you@example.com"
                            required
                            error={passengerErrors?.email?.message}
                        />
                    )}
                />

                <Controller
                    name={`passengers.${index}.country`}
                    control={control}
                    render={({field}) => (
                        <Dropdown
                            label="Country"
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);
                                updateField("country", value);
                            }}
                            options={countries.map((c) => ({
                                value: c.country,
                                label: c.country,
                                flag: c.flag,
                            }))}
                            placeholder="Select country"
                            error={passengerErrors?.country?.message}
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
                                name={`passengers.${index}.phoneCode`}
                                control={control}
                                render={({field}) => (
                                    <Dropdown
                                        label=""
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            updateField("phoneCode", value);
                                        }}
                                        options={countries.map((c) => ({
                                            value: c.code,
                                            label: c.code,
                                            flag: c.flag,
                                        }))}
                                        placeholder="+94"
                                        error={passengerErrors?.phoneCode?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <Controller
                                name={`passengers.${index}.phoneNumber`}
                                control={control}
                                render={({field}) => (
                                    <div>
                                        <Input
                                            type="tel"
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                updateField("phoneNumber", e.target.value);
                                            }}
                                            placeholder="77 567 6667"
                                            className={cn(
                                                "w-full px-4 py-3 lg:py-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm lg:text-base hover:border-gray-400 placeholder:text-gray-400 data-[focus]:border-primary-500 data-[focus]:ring-2 data-[focus]:ring-primary-500/20",
                                                passengerErrors?.phoneNumber
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-gray-300"
                                            )}
                                        />
                                        {passengerErrors?.phoneNumber && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {passengerErrors.phoneNumber.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </Field>
            </div>

            {/* Passenger type and gender */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4">
                <Controller
                    name={`passengers.${index}.passengerType`}
                    control={control}
                    render={({field}) => (
                        <div>
                            <RadioButton
                                label="Passenger Type"
                                name={`passengerType-${passenger.id}`}
                                value={field.value}
                                onChange={(value: string) => {
                                    field.onChange(value);
                                    updateField("passengerType", value as "adult" | "child");
                                }}
                                options={[
                                    {
                                        value: "adult",
                                        label: "Adult (12 and up)",
                                    },
                                    {
                                        value: "child",
                                        label: "Child (Under 12)",
                                    },
                                ]}
                                variant="default"
                            />
                            {passengerErrors?.passengerType && (
                                <p className="text-sm text-red-600 mt-1">
                                    {passengerErrors.passengerType.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                <Controller
                    name={`passengers.${index}.gender`}
                    control={control}
                    render={({field}) => (
                        <div>
                            <RadioButton
                                label="Gender"
                                name={`gender-${passenger.id}`}
                                value={field.value}
                                onChange={(value: string) => {
                                    field.onChange(value);
                                    updateField("gender", value as "male" | "female" | "other");
                                }}
                                options={[
                                    {value: "male", label: "Male"},
                                    {value: "female", label: "Female"},
                                    {value: "other", label: "Other"},
                                ]}
                                variant="default"
                            />
                            {passengerErrors?.gender && (
                                <p className="text-sm text-red-600 mt-1">
                                    {passengerErrors.gender.message}
                                </p>
                            )}
                        </div>
                    )}
                />
            </div>
        </motion.div>
    );
};

interface PackageData {
    name: string;
    durationDays: string;
    durationNights: string;
    adultTotalPrice: number;
    childTotalPrice: number;
    promotion?: {
        id: number;
        name: string;
        value: number;
        type?: "PERCENTAGE" | "FLAT";
        startDate?: string;
        endDate?: string;
    } | null;
}

// Package Details Skeleton
const PackageDetailsSkeleton: React.FC = () => (
    <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-40"></div>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                </div>
            </div>
        </div>
    </div>
);

// Package details component
const PackageDetails: React.FC<{ packageData: PackageData }> = ({
                                                                    packageData,
                                                                }) => (
    <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8  flex items-center justify-center">
                <BiSolidBookBookmark className="w-full h-full text-secondary-500"/>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                Package Details
            </h3>
        </div>

        <div className="border-b border-gray-200 pb-4 mb-4">
            <h4 className="text-primary-600 font-medium mb-4">
                {packageData?.name || "Package Name"}
            </h4>

            <div className="space-y-3 text-sm lg:text-base ">
                <div className="flex justify-between">
          <span className="text-gray-600">
            Adult Price (<strong>12+</strong>)
          </span>
                    <span className=" font-semibold">
            {formatCurrency(packageData?.adultTotalPrice || 0)}
          </span>
                </div>
                <div className="flex justify-between">
          <span className="text-gray-600">
            Child Price (<strong>Under 12</strong>)
          </span>
                    <span className=" font-semibold">
            {formatCurrency(packageData?.childTotalPrice || 0)}
          </span>
                </div>
                {packageData?.promotion && (
                    <div className="flex justify-between">
            <span className="text-gray-600">
              {packageData?.promotion?.name}
            </span>
                        <span className="font-medium text-secondary-600">
              Save {packageData?.promotion?.value || "0"}%
            </span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">
            {packageData?.durationDays || "0"} Days &{" "}
                        {packageData?.durationNights || "0"} Night
          </span>
                </div>
            </div>
        </div>
    </div>
);

/**
 * Validate that the promotion is active and within its date range.
 */
const isPromotionValid = (promotion: PackageData["promotion"]): boolean => {
    if (!promotion) return false;

    const now = new Date();

    if (promotion.startDate) {
        const start = new Date(promotion.startDate);
        if (start > now) return false;
    }

    if (promotion.endDate) {
        const end = new Date(promotion.endDate);
        if (end < now) return false;
    }

    return true;
};

/**
 * Calculate the discount amount for a valid promotion.
 */
const getPromotionDiscount = (
    promotion: PackageData["promotion"],
    subtotal: number
): number => {
    if (!promotion || subtotal <= 0) return 0;

    const promotionType = promotion.type || "PERCENTAGE";

    if (promotionType === "PERCENTAGE") {
        // Apply percentage discount (max 49%)
        const percent = Math.min(promotion.value, 49);
        const discountAmount = subtotal * (percent / 100.0);
        return Math.floor(discountAmount * 100) / 100; // Round down to 2 decimal places
    }

    // FLAT discount type
    const flatValue = promotion.value;
    const maxAllowed = subtotal / 2.0; // Max 50% of subtotal
    return Math.min(flatValue, maxAllowed);
};

/**
 * Calculate promotion value for the booking.
 */
const calculatePromotionValue = (
    promotion: PackageData["promotion"],
    subtotal: number
): number => {
    if (!promotion || subtotal <= 0) return 0;

    if (!isPromotionValid(promotion)) {
        return 0;
    }

    return getPromotionDiscount(promotion, subtotal);
};

// Price Summary Skeleton
const PriceSummarySkeleton: React.FC = () => (
    <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-40"></div>
        </div>

        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="border-gray-200">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
            </div>
        </div>
    </div>
);

// Price summary component
const PriceSummary: React.FC<{
    passengers: PassengerData[];
    packageData: PackageData;
    advancedPayment?: boolean;
}> = ({passengers, packageData, advancedPayment = false}) => {
    const adultCount = passengers.filter(
        (p) => p.passengerType === "adult"
    ).length;
    const childCount = passengers.filter(
        (p) => p.passengerType === "child"
    ).length;

    const adultPrice = adultCount * (packageData?.adultTotalPrice || 0);
    const childPrice = childCount * (packageData?.childTotalPrice || 0);
    const subtotal = adultPrice + childPrice;

    // Calculate discount using promotion logic
    const discount = calculatePromotionValue(packageData?.promotion, subtotal);
    const total = subtotal - discount;

    // Calculate 40% payment and remaining 60%
    const paymentAmount = total * 0.4;
    const remainingAmount = total * 0.6;

    return (
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8  flex items-center justify-center">
                    <FaMoneyCheckDollar className="w-full h-full text-secondary-500"/>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                    Price Summary
                </h3>
            </div>

            <div className="space-y-3 text-sm lg:text-base">
                {adultCount > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Adult Price</span>
                        <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold text-xs">
                ({adultCount} ×{" "}
                  {formatCurrency(packageData?.adultTotalPrice || 0)})
              </span>
                            <span className="font-medium">{formatCurrency(adultPrice)}</span>
                        </div>
                    </div>
                )}

                {childCount > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Child Price</span>
                        <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold text-xs">
                ({childCount} ×{" "}
                  {formatCurrency(packageData?.childTotalPrice || 0)})
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
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

// Main booking page component
const BookingPage: React.FC = () => {
    const router = useRouter();
    const {id} = router.query;

    const {data: packageData, isLoading: isLoadingPackage} = usePackage(
        id as string,
        {enabled: !!id}
    );

    console.log("packageData", packageData);
    const {mutateAsync: bookAsync, isPending: isBooking} = useBook();
    const [advancedPayment, setAdvancedPayment] = useState(false);

    const {
        control,
        handleSubmit: handleFormSubmit,
        formState: {errors},
        watch,
        setValue,
        setFocus,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            arrivalDate: "",
            arrivalTime: "",
            passengers: [
                {
                    id: "1",
                    fullName: "",
                    passportNumber: "",
                    email: "",
                    country: "",
                    phoneCode: "+94",
                    phoneNumber: "",
                    passengerType: "adult",
                    gender: "male",
                },
            ],
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "passengers",
    });

    const watchedPassengers = watch("passengers");

    const addPassenger = () => {
        const newPassenger: PassengerData = {
            id: Date.now().toString(),
            fullName: "",
            passportNumber: "",
            email: "",
            country: "",
            phoneCode: "+94",
            phoneNumber: "",
            passengerType: "adult",
            gender: "male",
        };
        append(newPassenger);
    };

    const removePassenger = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const updatePassenger = (index: number, passenger: PassengerData) => {
        setValue(`passengers.${index}`, passenger, {shouldValidate: true});
    };

    const onSubmit = async (data: BookingFormData) => {
        if (!id) return;

        const payload = {
            bookingDate: new Date(
                data.arrivalDate + " " + data.arrivalTime
            )?.toISOString(),
            passengers: data.passengers?.map((p) => ({
                name: p.fullName,
                passengerTypeCode: p.passengerType,
                passportNumber: p.passportNumber,
                email: p.email,
                phone: `${p.phoneCode}${p.phoneNumber}`,
                gender: p.gender,
                country: p.country,
            })),
            addOnIds: [],
            packageId: Number(packageData?.id),
            promotionId: Number(packageData?.promotion?.id),
            advancedPayment: advancedPayment,
        };

        let booking: BookingResponse;

        try {
            booking = await bookAsync(payload);
            toast.success("Booking created successfully! Redirecting to payment...");
        } catch (err: any) {
            toast.error(err.response.data.error);
            return;
        }

        try {
            // await redirectToStripeCheckout(booking);
            booking.checkoutSessionUrl;
            window.location.href = booking?.paymentLink ?? "";
        } catch (err) {
            console.error("Stripe redirect error", err);
            const message =
                err instanceof Error
                    ? err.message
                    : "Unable to start payment. Please try again.";
            toast.error(message);
        }
    };

    const onError = () => {
        // Focus on first error field (arrivalDate or arrivalTime)
        if (errors.arrivalDate) {
            setFocus("arrivalDate");
            // Find and focus the PopoverButton for arrivalDate
            setTimeout(() => {
                const datePickerContainer = document.querySelector(
                    '[data-field="arrivalDate"]'
                );
                // Find the PopoverButton (first button in the container)
                const popoverButton = datePickerContainer?.querySelector(
                    "button"
                ) as HTMLElement;
                if (popoverButton) {
                    popoverButton.focus();
                    popoverButton.scrollIntoView({behavior: "smooth", block: "center"});
                }
            }, 100);
        } else if (errors.arrivalTime) {
            setFocus("arrivalTime");
            // Find and focus the PopoverButton for arrivalTime
            setTimeout(() => {
                const timePickerContainer = document.querySelector(
                    '[data-field="arrivalTime"]'
                );
                // Find the PopoverButton (first button in the container)
                const popoverButton = timePickerContainer?.querySelector(
                    "button"
                ) as HTMLElement;
                if (popoverButton) {
                    popoverButton.focus();
                    popoverButton.scrollIntoView({behavior: "smooth", block: "center"});
                }
            }, 100);
        } else {
            // Scroll to first error field
            const firstErrorField = document.querySelector(
                '[class*="border-red-500"]'
            );
            if (firstErrorField) {
                firstErrorField.scrollIntoView({behavior: "smooth", block: "center"});
            }
        }
    };

    return (
        <>
            <main className="min-h-screen bg-gray-50 pt-20 text-gray-900">
                <div className="">
                    {/* Geometric shapes */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        className="absolute  z-20 top-40 max-sm:top-14  left-1/6 transform -translate-x-1/2 -translate-y-1/2 h-[500px] max-sm:h-[200px] max-sm:w-[200px] max-sm:from-secondary-500/50 w-[600px] bg-gradient-to-br from-secondary-500/30 to-secondary-500/0 rounded-full blur-2xl"
                    />
                </div>
                {/* Decorative background elements */}
                <div className="fixed top-20 left-0 w-32 h-32 bg-secondary-500/20 rounded-full blur-3xl"/>
                <div className="fixed top-40 right-10 w-20 h-20 bg-primary-500/20 rounded-full blur-2xl"/>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                    {/* Breadcrumb */}
                    <Breadcrumb/>

                    {/* Page header */}
                    <div className="mb-8 lg:mb-12">
                        <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-2">
                            Booking Details
                        </h1>
                        <p className="text-gray-600 text-sm lg:text-base">
                            Complete your booking details
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 bg-white px-8 max-sm:px-4 py-6 rounded-[25px]">
                        {/* Main form */}
                        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
                            <div className="block xl:hidden">
                                {isLoadingPackage || !packageData ? (
                                    <PackageDetailsSkeleton/>
                                ) : (
                                    <PackageDetails packageData={packageData}/>
                                )}
                            </div>
                            <form
                                onSubmit={handleFormSubmit(onSubmit, onError)}
                                className="space-y-6 lg:space-y-8"
                                id="booking-form"
                            >
                                {/* Arrival Schedule */}
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="rounded-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                                            <Plane className="w-5 h-5 text-white"/>
                                        </div>
                                        <h2 className="text-lg lg:text-xl font-bold text-primary-600">
                                            Arrival Schedule
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                                        <Controller
                                            name="arrivalDate"
                                            control={control}
                                            render={({field}) => (
                                                <div className="space-y-2" data-field="arrivalDate">
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

                                        <Controller
                                            name="arrivalTime"
                                            control={control}
                                            render={({field}) => (
                                                <div className="space-y-2" data-field="arrivalTime">
                                                    <TimePicker
                                                        label="Arrival Time"
                                                        value={field.value ?? ""}
                                                        onChange={(value) => field.onChange(value)}
                                                        placeholder="Select your arrival time"
                                                    />
                                                    {errors.arrivalTime && (
                                                        <p className="text-sm text-red-600">
                                                            {errors.arrivalTime.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </motion.div>

                                {/* Passenger Details */}
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1}}
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                                            <User className="w-5 h-5 text-white"/>
                                        </div>
                                        <h2 className="text-lg lg:text-xl font-bold text-primary-600">
                                            Passenger Details
                                        </h2>
                                    </div>

                                    {errors.passengers &&
                                        typeof errors.passengers === "object" &&
                                        !Array.isArray(errors.passengers) && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                                <p className="text-sm text-red-600">
                                                    {errors.passengers.message}
                                                </p>
                                            </div>
                                        )}

                                    <div className="space-y-6">
                                        <AnimatePresence>
                                            {fields.map((field, index) => (
                                                <PassengerForm
                                                    key={field.id}
                                                    passenger={watchedPassengers[index]}
                                                    onUpdate={(passenger) => {
                                                        updatePassenger(index, passenger);
                                                    }}
                                                    onRemove={() => removePassenger(index)}
                                                    index={index}
                                                    canRemove={fields.length > 1}
                                                    errors={errors}
                                                    control={control}
                                                />
                                            ))}
                                        </AnimatePresence>

                                        {/* Add passenger button */}
                                        <motion.button
                                            type="button"
                                            onClick={addPassenger}
                                            whileHover={{scale: 1.02}}
                                            whileTap={{scale: 0.98}}
                                            className="w-full border-2 border-dashed border-primary-300 rounded-2xl p-4 lg:p-6 flex items-center justify-center gap-3 text-primary-600 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
                                        >
                                            <Plus size={20}/>
                                            <span className="font-medium">Add Another Passenger</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="hidden xl:block">
                                {isLoadingPackage || !packageData ? (
                                    <PackageDetailsSkeleton/>
                                ) : (
                                    <PackageDetails packageData={packageData}/>
                                )}
                            </div>
                            <div className="">
                                {isLoadingPackage || !packageData ? (
                                    <PriceSummarySkeleton/>
                                ) : (
                                    <PriceSummary
                                        passengers={watchedPassengers}
                                        packageData={packageData}
                                        advancedPayment={advancedPayment}
                                    />
                                )}
                            </div>

                            {/* Advanced Payment Checkbox */}
                            <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <Field>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="advancedPayment"
                                            checked={advancedPayment}
                                            onChange={(e) => setAdvancedPayment(e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-primary-500  outline-none cursor-pointer accent-primary-500"
                                        />
                                        <Label
                                            htmlFor="advancedPayment"
                                            className="text-sm lg:text-base text-gray-700 cursor-pointer font-medium   "
                                        >
                                            Reserve with 40% payment
                                        </Label>
                                    </div>
                                </Field>
                            </div>

                            {/* Submit button - Desktop */}
                            <div className="">
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="lg"
                                    className="w-full h-12 lg:h-14 text-base lg:text-lg font-bold"
                                    icon={<ChevronRight size={20}/>}
                                    iconPosition="right"
                                    onClick={handleFormSubmit(onSubmit, onError)}
                                    disabled={isBooking}
                                >
                                    {isBooking ? "Processing..." : "Proceed to Payment"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default BookingPage;
