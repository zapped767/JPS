import React from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {Listbox} from "@headlessui/react";
import {FaAngleDown} from "react-icons/fa";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {partnershipInquiryService} from "@/lib/services";
import {countries} from "@/lib/countries";

// Validation schema using zod
const partnershipFormSchema = z.object({
    companyName: z
        .string().min(1, "Company name is required"),

    yourName: z
        .string().optional(),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    phone: z
        .string().optional(),

    country: z
        .string()
        .optional(),

    partnershipType: z.string().optional(),

    message: z
        .string()
        .max(1000, "Message must be less than 1000 characters")
        .optional(),
});

type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

export const BusinessPartnershipForm = () => {
    const router = useRouter();

    const partnershipOptions = [
        "Destination Management Services",
        "Travel Agency Partnerships",
        "Corporate Travel Solutions",
        "OTA Connectivity",
        "Hotel & Resort Tie-ups",
        "Affiliate Partnerships",
    ];

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        reset,
    } = useForm<PartnershipFormData>({
        resolver: zodResolver(partnershipFormSchema),
        defaultValues: {
            companyName: "",
            yourName: "",
            email: "",
            phone: "",
            country: "",
            partnershipType: "",
            message: "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const [countryCode, setCountryCode] = React.useState("+94");
    const [phoneNumber, setPhoneNumber] = React.useState("");


    const handlePhoneNumberChange = (value: string) => {
        let formattedValue = value.replace(/\D/g, ""); // Remove non-digits

        if (formattedValue.length > 2 && formattedValue.length <= 5)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(2)}`;
        else if (formattedValue.length > 5 && formattedValue.length <= 8)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(2, 5)} ${formattedValue.slice(5)}`;
        else if (formattedValue.length > 8)
            formattedValue = `${formattedValue.slice(0, 2)} ${formattedValue.slice(2, 5)} ${formattedValue.slice(5, 9)}`;

        // Update state
        setPhoneNumber(formattedValue);

        // Update the form value (without spaces)
        const rawPhoneNumber = formattedValue.replace(/\s/g, "");
        const fullPhone = countryCode + rawPhoneNumber;
        setValue("phone", fullPhone, {shouldValidate: true});
    };

    const handleCountryCodeChange = (newCode: string) => {
        setCountryCode(newCode);

        // Update phone field with new country code
        const rawPhoneNumber = phoneNumber.replace(/\s/g, "");
        const fullPhone = newCode + rawPhoneNumber;
        setValue("phone", fullPhone, {shouldValidate: true});
    };

    const onSubmit = async (data: PartnershipFormData) => {
        const payload = {
            companyName: data.companyName,
            yourName: data.yourName,
            email: data.email,
            phoneNumber: data.phone,
            country: data.country,
            partnershipType: data.partnershipType,
            partnershipNeeds: data.message,
        };

        try {
            const res = await partnershipInquiryService.submitInquiry(payload);

            toast.success(res, {
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
            id="partnership-form"
            className="relative py-12 lg:py-10 px-4 md:px-12 lg:px-[100px] text-center    bg-[#6938d3]"
        >
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.h2
                    initial={{opacity: 0, y: -20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                    className="font-plus-jakarta-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-4 cursor-default"
                >
                    Ready to Partner with Us?
                </motion.h2>

                <motion.p
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="text-white text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto cursor-default"
                >
                    Join our network of trusted partners and start offering exceptional
                    Sri Lanka travel experiences to your clients.
                </motion.p>

                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10"
                >
                    <h3 className="font-plus-jakarta-sans text-[#000] font-bold text-2xl md:text-3xl mb-6 md:mb-8">
                        Partnership Inquiry Form
                    </h3>

                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        className="space-y-6 md:space-y-8"
                    >
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Company Name<span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="companyName"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="text"
                                                {...field}
                                                className={`w-full text-black placeholder:text-[#00000080] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none transition-all duration-200 ${
                                                    errors.companyName
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#bfa1ff] focus:border-[#6938d3]"
                                                }`}
                                                placeholder="Enter company name"
                                            />
                                            {errors.companyName && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.companyName.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Your Name
                                </label>
                                <Controller
                                    name="yourName"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="text"
                                                {...field}
                                                className={`w-full text-black placeholder:text-[#00000080] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none transition-all duration-200 ${
                                                    errors.yourName
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#bfa1ff] focus:border-[#6938d3]"
                                                }`}
                                                placeholder="Enter your full name"
                                            />
                                            {errors.yourName && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.yourName.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Row 2 - Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Email Address<span className="text-red-500">*</span>
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="email"
                                                {...field}
                                                className={`w-full text-black placeholder:text-[#00000080] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none transition-all duration-200 ${
                                                    errors.email
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#bfa1ff] focus:border-[#6938d3]"
                                                }`}
                                                placeholder="you@example.com"
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

                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Phone Number
                                </label>
                                <div className="flex space-x-3">
                                    <div className="w-fit">
                                        <Listbox
                                            value={countryCode}
                                            onChange={handleCountryCodeChange}
                                        >
                                            <div className="relative">
                                                <Listbox.Button
                                                    className="w-full text-black  px-3 py-4 border border-[#bfa1ff] rounded-lg bg-white text-center focus:ring-2 focus:ring-[#6938d3] outline-none flex justify-between items-center text-sm sm:text-base">
                                                      <span>
                                                        {
                                                            countries.find((c) => c.code === countryCode)
                                                                ?.flag
                                                        }&nbsp;&nbsp;
                                                          {countryCode}
                                                      </span>
                                                    <FaAngleDown className="w-4 h-4 text-[#6938d3] ml-1"/>
                                                </Listbox.Button>
                                                <Listbox.Options
                                                    className="absolute mt-1 w-full max-h-56 overflow-auto bg-white border border-[#bfa1ff] rounded-lg shadow-lg text-sm sm:text-base z-10">
                                                    {countries.map((item) => (
                                                        <Listbox.Option
                                                            key={item.code}
                                                            value={item.code}
                                                            className={({active}) =>
                                                                `cursor-pointer    px-4 py-2 ${
                                                                    active
                                                                        ? "bg-[#f3e8ff] text-[#6938d3]"
                                                                        : "text-black "
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
                                            placeholder="77 567 6667"
                                            className={`w-full text-black placeholder:text-[#00000080] px-4 py-4 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none text-sm sm:text-base ${
                                                errors.phone
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : "border-[#bfa1ff] focus:border-[#6938d3]"
                                            }`}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 3 - Country & Partnership */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Country
                                </label>
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <input
                                                type="text"
                                                {...field}
                                                className={`w-full text-black placeholder:text-[#00000080] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none ${
                                                    errors.country
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-[#bfa1ff] focus:border-[#6938d3]"
                                                }`}
                                                placeholder="Enter your country"
                                            />
                                            {errors.country && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.country.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="text-left">
                                <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                    Partnership Type
                                </label>
                                <Controller
                                    name="partnershipType"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <Listbox value={field.value} onChange={field.onChange}>
                                                <div className="relative">
                                                    <Listbox.Button
                                                        className={`w-full text-black  px-4 py-3 border rounded-lg bg-white text-left focus:ring-2 focus:ring-[#6938d3] outline-none flex justify-between items-center text-sm sm:text-base ${
                                                            errors.partnershipType
                                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                                : "border-[#bfa1ff] focus:border-[#6938d3]"
                                                        }`}
                                                    >
                                                        <span>{field.value || "Select option"}</span>
                                                        <FaAngleDown className="w-4 h-4 text-[#6938d3]"/>
                                                    </Listbox.Button>

                                                    <Listbox.Options
                                                        className="absolute mt-1 w-full max-h-56 overflow-auto bg-white border border-[#bfa1ff] rounded-lg shadow-lg text-sm sm:text-base z-10">
                                                        {partnershipOptions.map((option) => (
                                                            <Listbox.Option
                                                                key={option}
                                                                value={option}
                                                                className={({active}) =>
                                                                    `cursor-pointer    px-4 py-2 ${
                                                                        active
                                                                            ? "bg-[#f3e8ff] text-[#6938d3]"
                                                                            : "text-black "
                                                                    }`
                                                                }
                                                            >
                                                                {option}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                            {errors.partnershipType && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {errors.partnershipType.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="text-left">
                            <label className="block text-sm font-medium text-[#2B2B2B] mb-2">
                                Tell us about your partnership needs
                            </label>
                            <Controller
                                name="message"
                                control={control}
                                render={({field}) => (
                                    <div>
                    <textarea
                        {...field}
                        rows={4}
                        className={`w-full text-black placeholder:text-[#00000080] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#6938d3] outline-none resize-none ${
                            errors.message
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-[#bfa1ff] focus:border-[#6938d3]"
                        }`}
                        placeholder="Describe your partnership requirements..."
                    />
                                        {errors.message && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-center">
                            <Button
                                type="submit"
                                size="md"
                                variant="primary"
                                className="cursor-pointer px-8 py-3"
                                aria-label="Submit Inquiry"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
