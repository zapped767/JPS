import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {toast} from "react-toastify";
import {Listbox} from "@headlessui/react";
import {FaAngleDown} from "react-icons/fa";
import {Check} from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {inquiryService} from "@/lib/services";
import {countries} from "@/lib/countries";

// Validation schema using zod
const inquiryFormSchema = z.object({
    fullName: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    mobileNumber: z
        .string()
        .min(1, "Phone number is required")
        .min(7, "Phone number must be at least 7 digits"),

    travelType: z.string().min(1, "Travel type is required"),

    travelCategory: z
        .array(z.string())
        .min(1, "At least one travel category is required"),

    numberOfDays: z.string().optional(),

    preferredActivities: z.array(z.string()).optional(),

    additionalNotes: z
        .string()
        .max(1000, "Message must be less than 1000 characters")
        .optional(),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

// Multi-select dropdown component
interface MultiSelectDropdownProps {
    value: string[];
    onChange: (value: string[]) => void;
    options: string[];
    error?: string;
    placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
                                                                     value,
                                                                     onChange,
                                                                     options,
                                                                     error,
                                                                     placeholder = "Select...",
                                                                 }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = (option: string) => {
        const isSelected = value.includes(option);
        const newValues = isSelected
            ? value.filter((v) => v !== option)
            : [...value, option];
        onChange(newValues);
    };

    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full cursor-pointer px-4 py-3 border rounded-lg bg-white text-left focus:ring-1 focus:ring-[#00000050] outline-none flex justify-between items-center text-sm sm:text-base min-h-[48px] ${
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-[#00000050] focus:border-[#00000050]"
                }`}
            >
        <span className="text-black flex-1 text-left">
          {selectedValues.length === 0
              ? placeholder
              : selectedValues.length === 1
                  ? selectedValues[0]
                  : `${selectedValues.length} selected`}
        </span>
                <FaAngleDown
                    className={`w-4 h-4 text-[#EB00A5] flex-shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute mt-1 w-full max-h-56 overflow-auto bg-white border border-[#00000050] rounded-lg shadow-lg text-sm sm:text-base z-10">
                    {options.map((option) => {
                        const isSelected = selectedValues.includes(option);
                        return (
                            <div
                                key={option}
                                onClick={() => handleToggle(option)}
                                className="cursor-pointer px-4 py-2 flex items-center gap-2 hover:bg-[#f3e8ff] hover:text-[#EB00A5] text-gray-700"
                            >
                                <div
                                    className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                                        isSelected
                                            ? "bg-primary-600 border-primary-600"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {isSelected && <Check size={12} className="text-white"/>}
                                </div>
                                <span>{option}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>
    );
};

export const InquirySection = () => {
    const travelTypeOptions = ["Family", "Solo", "Couple", "Group", "Other"];

    const travelCategoryOptions = [
        "Cultural Exploration",
        "Wildlife Adventures",
        "Beach Getaways",
        "Adventure & Trekking",
        "Luxury & Relaxation",
        "Food & Culinary",
        "Heritage & History",
        "Romance & Honeymoons",
        "Other",
    ];

    const preferredActivitiesOptions = [
        "Temple Visits",
        "National Parks / Safari",
        "Beach & Water Sports",
        "Hiking / Trekking",
        "Wellness & Spa",
        "Culinary Experiences",
        "Sightseeing / Photography",
        "Other",
    ];

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        reset,
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquiryFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobileNumber: "",
            travelType: "",
            travelCategory: [],
            numberOfDays: undefined,
            preferredActivities: [],
            additionalNotes: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const [countryCode, setCountryCode] = React.useState("+94");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const handlePhoneNumberChange = (value: string) => {
        let formattedValue = value.replace(/\D/g, ""); // Remove non-digits

        if (formattedValue.length > 2 && formattedValue.length <= 5)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(
                2
            )}`;
        else if (formattedValue.length > 5 && formattedValue.length <= 8)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(
                2,
                5
            )} ${formattedValue.slice(5)}`;
        else if (formattedValue.length > 8)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(
                2,
                5
            )} ${formattedValue.slice(5, 9)}`;

        // Update state
        setPhoneNumber(formattedValue);

        // Update the form value (without spaces)
        const rawPhoneNumber = formattedValue.replace(/\s/g, "");
        const fullPhone = countryCode + rawPhoneNumber;
        setValue("mobileNumber", fullPhone, {shouldValidate: true});
    };

    const handleCountryCodeChange = (newCode: string) => {
        setCountryCode(newCode);

        // Update phone field with new country code
        const rawPhoneNumber = phoneNumber.replace(/\s/g, "");
        const fullPhone = newCode + rawPhoneNumber;
        setValue("mobileNumber", fullPhone, {shouldValidate: true});
    };

    const onSubmit = async (data: InquiryFormData) => {
        const numberOfDaysValue = data.numberOfDays
            ? (() => {
                const parsed = parseInt(data.numberOfDays, 10);
                return isNaN(parsed) ? undefined : parsed;
            })()
            : undefined;

        const payload = {
            fullName: data.fullName,
            email: data.email,
            mobileNumber: data.mobileNumber,
            travelType: data.travelType,
            travelCategory: Array.isArray(data.travelCategory)
                ? data.travelCategory.join(", ")
                : data.travelCategory,
            numberOfDays: numberOfDaysValue,
            preferredActivities: Array.isArray(data.preferredActivities)
                ? data.preferredActivities.join(", ")
                : data.preferredActivities || "",
            additionalNotes: data.additionalNotes,
        };

        try {
            const response = await inquiryService.submitInquiry(payload);

            // Show success toast
            toast.success(response, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });

            // Reset form
            reset();
            setCountryCode("+94");
            setPhoneNumber("");
        } catch (error: any) {
            toast.error(error.response.data.error, {
                position: window.innerWidth < 768 ? "top-center" : "bottom-right",
            });
        }
    };

    const onError = () => {
        // No toast for validation errors - let the form show inline errors
        // Auto-focus on first error field
        const firstErrorField = document.querySelector('[class*="border-red-500"]');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({behavior: "smooth", block: "center"});
        }
    };

    return (
        <section
            id="inquiry-section"
            className="relative pb-12 lg:pb-10 max-w-7xl mx-auto"
        >
            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.h2
                    initial={{opacity: 0, y: -20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="font-plus-jakarta-sans font-extrabold text-3xl md:text-5xl mb-4 cursor-default text-[#262626] text-center"
                >
                    <span className="text-secondary-600">Plan Your </span> Perfect Sri
                    Lanka Journey
                </motion.h2>

                <motion.p
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className=" text-base text-[#525252] md:text-lg mb-8 max-w-4xl mx-auto cursor-default text-center"
                >
                    Tell us your preferences, and we’ll craft a fully customized itinerary
                    just for you. Whether it’s a family adventure, romantic getaway, or
                    solo exploration, we’ll design the perfect Sri Lankan experience.
                </motion.p>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 border-l-2 border-[#872BFF] mx-4"
                >
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="space-y-6 md:space-y-8"
                    >
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 min-[769px]:grid-cols-2 gap-4 min-[769px]:gap-6">
                            {/*full name*/}
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                    Full Name<span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="text"
                                                {...field}
                                                className={`w-full px-4 text-black py-3 border rounded-lg focus:ring-1 focus:ring-[#00000050] outline-none transition-all duration-200 placeholder:text-[#00000080] ${
                                                    errors.fullName
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#00000050] focus:border-[#00000050]"
                                                }`}
                                                placeholder="Full Name"
                                            />
                                            {errors.fullName && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.fullName.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/*email*/}
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                    Email Address<span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="text"
                                                {...field}
                                                className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#00000050] outline-none transition-all duration-200 placeholder:text-[#00000080] ${
                                                    errors.email
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#00000050] focus:border-[#00000050]"
                                                }`}
                                                placeholder="Email Address"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Row 2 - Phone */}
                        <div className="grid grid-cols-1 min-[769px]:grid-cols-2 gap-4 min-[769px]:gap-6">
                            {/*Mobile number*/}
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                    Mobile Number<span className="text-red-500">*</span>
                                </label>
                                <div className="flex space-x-3">
                                    <div className="w-fit">
                                        <Listbox
                                            value={countryCode}
                                            onChange={handleCountryCodeChange}
                                        >
                                            <div className="relative">
                                                <Listbox.Button
                                                    className="w-full cursor-pointer text-black px-3 py-4 border border-[#00000050] rounded-lg bg-white text-center focus:ring-1 focus:ring-[#00000050] outline-none flex justify-around items-center text-sm sm:text-base">
                          <span>
                            {
                                countries.find((c) => c.code === countryCode)
                                    ?.flag
                            }
                              &nbsp;&nbsp;&nbsp;
                              {countryCode}
                          </span>
                                                    <FaAngleDown className="w-4 h-4 text-[#EB00A5] ml-1"/>
                                                </Listbox.Button>
                                                <Listbox.Options
                                                    className="absolute mt-1 w-full max-h-56 overflow-auto bg-white border border-[#00000050] rounded-lg shadow-lg text-sm sm:text-base z-10">
                                                    {countries.map((item) => (
                                                        <Listbox.Option
                                                            key={item.code}
                                                            value={item.code}
                                                            className={({active}) =>
                                                                `cursor-pointer    px-4 py-2 ${
                                                                    active
                                                                        ? "bg-[#f3e8ff] text-[#EB00A5]"
                                                                        : "text-black"
                                                                }`
                                                            }
                                                        >
                                                            {item.flag} {item.code}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </div>
                                        </Listbox>
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => handlePhoneNumberChange(e.target.value)}
                                            placeholder="Mobile Number"
                                            className={`text-black w-full px-4 py-4 border rounded-lg focus:ring-1 focus:ring-[#00000050] outline-none text-sm sm:text-base placeholder:text-[#00000080] ${
                                                errors.mobileNumber
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-[#00000050] focus:border-[#00000050]"
                                            }`}
                                        />
                                        {errors.mobileNumber && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.mobileNumber.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {/* travel type */}
                                <div className="text-left">
                                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                        Travel Type<span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="travelType"
                                        control={control}
                                        render={({field}) => (
                                            <div>
                                                <Listbox value={field.value} onChange={field.onChange}>
                                                    <div className="relative">
                                                        <Listbox.Button
                                                            className={`w-full cursor-pointer px-4 py-3 border rounded-lg bg-white text-left focus:ring-1 focus:ring-[#00000050] outline-none flex justify-between items-center text-sm sm:text-base ${
                                                                errors.travelType
                                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                                    : "border-[#00000050] focus:border-[#00000050]"
                                                            }`}
                                                        >
                              <span className="text-black">
                                {field.value || "Travel Type"}
                              </span>
                                                            <FaAngleDown className="w-4 h-4 text-[#EB00A5]"/>
                                                        </Listbox.Button>

                                                        <Listbox.Options
                                                            className="absolute mt-1 w-full max-h-56 overflow-auto bg-white border border-[#00000050] rounded-lg shadow-lg text-sm sm:text-base z-10">
                                                            {travelTypeOptions.map((option) => (
                                                                <Listbox.Option
                                                                    key={option}
                                                                    value={option}
                                                                    className={({active}) =>
                                                                        `cursor-pointer    px-4 py-2 ${
                                                                            active
                                                                                ? "bg-[#f3e8ff] text-[#EB00A5]"
                                                                                : "text-gray-700"
                                                                        }`
                                                                    }
                                                                >
                                                                    {option}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </div>
                                                </Listbox>
                                                {errors.travelType && (
                                                    <p className="text-sm text-red-600 mt-1">
                                                        {errors.travelType.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/*  Travel Category*/}
                                <div className="text-left">
                                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                        Travel Category<span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name="travelCategory"
                                        control={control}
                                        render={({field}) => (
                                            <MultiSelectDropdown
                                                value={
                                                    Array.isArray(field.value)
                                                        ? field.value
                                                        : field.value
                                                            ? [field.value]
                                                            : []
                                                }
                                                onChange={field.onChange}
                                                options={travelCategoryOptions}
                                                error={errors.travelCategory?.message}
                                                placeholder="Travel Category"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 3 - Country & Partnership */}
                        <div className="grid grid-cols-1 min-[769px]:grid-cols-2 gap-4 min-[769px]:gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {/* Number of days */}
                                <div className="text-left">
                                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                        Number of Days
                                    </label>
                                    <Controller
                                        name="numberOfDays"
                                        control={control}
                                        render={({field}) => (
                                            <div>
                                                <input
                                                    type="number"
                                                    {...field}
                                                    className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#00000050] outline-none transition-all duration-200 placeholder:text-[#00000080] ${
                                                        errors.numberOfDays
                                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                            : "border-[#00000050] focus:border-[#00000050]"
                                                    }`}
                                                    placeholder="Number Of Days"
                                                />
                                                {errors.numberOfDays && (
                                                    <p className="text-sm text-red-600 mt-1">
                                                        {errors.numberOfDays.message}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/*  Preferred Activities */}
                                <div className="text-left">
                                    <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                        Preferred Activities
                                    </label>
                                    <Controller
                                        name="preferredActivities"
                                        control={control}
                                        render={({field}) => (
                                            <MultiSelectDropdown
                                                value={
                                                    Array.isArray(field.value)
                                                        ? field.value
                                                        : field.value
                                                            ? [field.value]
                                                            : []
                                                }
                                                onChange={field.onChange}
                                                options={preferredActivitiesOptions}
                                                error={errors.preferredActivities?.message}
                                                placeholder="Preferred Activities"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="text-left ">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2 pl-2">
                                    Additional Notes
                                </label>
                                <Controller
                                    name="additionalNotes"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                      <textarea
                          {...field}
                          rows={1}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#00000050] text-black outline-none placeholder:text-[#00000080] ${
                              errors.additionalNotes
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-[#00000050] focus:border-[#00000050]"
                          }`}
                          placeholder="Aditional Notes"
                      />
                                            {errors.additionalNotes && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.additionalNotes.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-end">
                            <Button
                                type="submit"
                                size="md"
                                variant="primary"
                                className="cursor-pointer px-8 py-3"
                                aria-label="Submit Inquiry"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Request Your Custom Itinerary"}
                            </Button>
                        </div>
                    </form>

                    <div className="pt-6">
                        <p className="text-sm text-[#00000080] text-center">
                            Our travel experts will review your request and get back to you
                            within 24 hours.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
