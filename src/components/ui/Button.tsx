import React from "react";
import {cn} from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "xsm" | "ssm" | "sm" | "md" | "lg";
    children: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = "primary",
                                                  size = "md",
                                                  children,
                                                  icon,
                                                  iconPosition = "left",
                                                  loading = false,
                                                  className,
                                                  disabled,
                                                  onDrag,
                                                  onDragEnd,
                                                  onDragStart,
                                                  ...props
                                              }) => {
    const baseClasses =
        "font-semibold rounded-full transition-all duration-300 ease-in-out inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";

    const variants = {
        primary:
            "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl",
        secondary:
            "bg-secondary-500 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl",
        outline:
            "border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-300",
    };

    const sizes = {
        xsm: "px-2 py-1 text-[10px]",
        ssm: "px-3 py-1 text-[12px]",
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base h-12 max-sm:px-4 max-sm:py-2 max-sm:text-sm",
        lg: "px-8 py-4 text-lg h-14",
    };
    return (
        <button
            className={cn(
                baseClasses,
                variants[variant],
                sizes[size],
                disabled && "opacity-50 cursor-not-allowed",
                loading && "cursor-wait",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            ) : (
                <>
                    {icon && iconPosition === "left" && icon}
                    {children}
                    {icon && iconPosition === "right" && icon}
                </>
            )}
        </button>
    );
};