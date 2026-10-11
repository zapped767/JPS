import React from "react";
import {Field, Label, Radio, RadioGroup} from "@headlessui/react";
import {cn} from "@/lib/utils";

interface RadioOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

interface RadioButtonProps {
    label: string;
    name?: string;
    value: string;
    options: RadioOption[];
    onChange: (value: string) => void;
    className?: string;
    variant?: "default" | "card" | "inline";
    size?: "sm" | "md" | "lg";
    required?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
                                                            label,
                                                            name,
                                                            value,
                                                            options,
                                                            onChange,
                                                            className = "",
                                                            variant = "default",
                                                            size = "md",
                                                            required = false,
                                                        }) => {
    const sizeClasses = {
        sm: {
            container: "gap-2",
            radio: "px-3 py-2 text-sm",
            dot: "w-4 h-4",
            innerDot: "w-2 h-2",
            label: "text-sm",
        },
        md: {
            container: "gap-3",
            radio: "px-1 py-3 text-sm lg:text-[12px]",
            dot: "w-5 h-5",
            innerDot: "w-2.5 h-2.5",
            label: "text-sm lg:text-base",
        },
        lg: {
            container: "gap-4",
            radio: "px-5 py-4 text-base lg:text-xl",
            dot: "w-6 h-6",
            innerDot: "w-3 h-3",
            label: "text-base lg:text-lg",
        },
    };

    const sizes = sizeClasses[size];

    const getRadioStyles = () => {
        const baseStyles = `group relative flex items-center cursor-pointer transition-all duration-200 gap-2`;

        switch (variant) {
            case "card":
                return cn(
                    baseStyles,
                    sizes.radio,
                    "border-2 border-gray-200 bg-white rounded-xl hover:border-primary-300 hover:bg-primary-50/50 data-[checked]:border-primary-500 data-[checked]:bg-primary-50 shadow-sm min-w-0 flex-1 sm:flex-initial"
                );
            case "inline":
                return cn(baseStyles, "gap-2 p-1 rounded-lg hover:bg-gray-50");
            default:
                return cn(baseStyles, sizes.radio);
        }
    };

    const getDotStyles = () => {
        return cn(
            "rounded-full border-2 transition-all duration-200 bg-white shadow-sm",
            sizes.dot,
            variant === "card"
                ? "border-gray-300 group-hover:border-primary-400 group-data-[checked]:border-primary-600"
                : "border-gray-300 group-hover:border-primary-400 group-data-[checked]:border-primary-500 group-data-[checked]:bg-primary-500"
        );
    };

    const getInnerDotStyles = () => {
        return cn(
            "rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 group-data-[checked]:opacity-100 group-data-[checked]:scale-100 transition-all duration-200",
            sizes.innerDot,
            variant === "card" ? "bg-primary-600" : "bg-white"
        );
    };

    return (
        <Field className={cn("space-y-3", className)}>
            <Label className={cn("font-medium text-gray-700", sizes.label)}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <RadioGroup
                value={value}
                onChange={onChange}
                className={cn(
                    "flex",
                    sizes.container,
                    variant === "card" ? "gap-3" : "gap-4"
                )}
            >
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        value={option.value}
                        className={getRadioStyles()}
                    >
                        {/* Radio dot */}
                        <div className="relative flex-shrink-0">
                            <div className={getDotStyles()}>
                                <div className={getInnerDotStyles()}/>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Icon (if provided) */}
                            {option.icon && (
                                <div className="flex-shrink-0 mr-3">{option.icon}</div>
                            )}

                            {/* Label */}
                            <span
                                className={cn(
                                    "font-medium transition-colors duration-200   ",
                                    sizes.label,
                                    variant === "card"
                                        ? "text-gray-700 group-hover:text-gray-900 group-data-[checked]:text-primary-700"
                                        : "text-gray-700 group-hover:text-gray-900 group-data-[checked]:text-gray-900"
                                )}
                            >
                {option.label}
              </span>

                            {/* Description (if provided) */}
                            {option.description && (
                                <p className="text-xs text-gray-500 mt-1   ">
                                    {option.description}
                                </p>
                            )}
                        </div>

                        {/* Card variant background overlay */}
                        {variant === "card" && (
                            <div
                                className="absolute inset-0 rounded-xl bg-primary-500/5 opacity-0 group-data-[checked]:opacity-100 transition-opacity duration-200 pointer-events-none"/>
                        )}
                    </Radio>
                ))}
            </RadioGroup>
        </Field>
    );
};
