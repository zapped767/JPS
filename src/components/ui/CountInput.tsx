import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CountInputProps {
    label?: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export const CountInput = ({
                               label = "Choose quantity",
                               value,
                               onChange,
                               min = 0,
                               max = 99
                           }: CountInputProps) => {

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || min;
        const clampedValue = Math.max(min, Math.min(max, newValue));
        onChange(clampedValue);
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <label className="block mb-3 text-sm font-semibold text-gray-900">
                {label}
            </label>
            <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={value <= min}
                    className="flex items-center justify-center h-8 w-12 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-l-xl transition-all duration-150 focus:outline-none"
                    aria-label="Decrease quantity"
                >
                    <Minus className="w-5 h-5" />
                </button>

                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    className="flex-1 h-8 text-center text-sm font-semibold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label="Quantity"
                />

                <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={value >= max}
                    className="flex items-center justify-center h-8 w-12 text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-r-xl transition-all duration-150 focus:outline-none"
                    aria-label="Increase quantity"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center">
                Range: {min} - {max}
            </div>
        </div>
    );
};