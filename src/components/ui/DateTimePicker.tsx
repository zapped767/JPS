import React, {useMemo, useState} from "react";
import {Button, Field, Label, Popover, PopoverButton, PopoverPanel,} from "@headlessui/react";
import {Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock,} from "lucide-react";
import {cn} from "@/lib/utils";

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    className?: string;
    placeholder?: string;
}

interface TimePickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    className?: string;
    placeholder?: string;
}

// Enhanced Date Picker with advanced calendar UI using Headless UI components
export const DatePicker: React.FC<DatePickerProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                          required = false,
                                                          className = "",
                                                          placeholder = "Select date",
                                                      }) => {
    const [currentMonth, setCurrentMonth] = useState(() => {
        if (value) {
            const date = new Date(value);
            return new Date(date.getFullYear(), date.getMonth(), 1);
        }
        return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    });

    const formatDisplayDate = (dateValue: string) => {
        if (!dateValue) return placeholder;
        const date = new Date(dateValue);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const today = useMemo(() => new Date(), []);
    const todayStr = useMemo(() => today.toISOString().split("T")[0], [today]);

    // Calendar logic
    const {days, monthYear} = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay(); // 0 = Sunday

        const days: Array<{
            date: number;
            dateStr: string;
            isCurrentMonth: boolean;
            isToday: boolean;
            isSelected: boolean;
            isPast: boolean;
        }> = [];

        // Previous month's trailing days
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = startDay - 1; i >= 0; i--) {
            const date = prevMonth.getDate() - i;
            const dateStr = new Date(year, month - 1, date)
                .toISOString()
                .split("T")[0];
            days.push({
                date,
                dateStr,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                isPast: new Date(year, month - 1, date) < today,
            });
        }

        // Current month days
        for (let date = 1; date <= daysInMonth; date++) {
            const dateStr = new Date(year, month, date).toISOString().split("T")[0];
            const dateObj = new Date(year, month, date);
            days.push({
                date,
                dateStr,
                isCurrentMonth: true,
                isToday: dateStr === todayStr,
                isSelected: dateStr === value,
                isPast: dateObj < today,
            });
        }

        // Next month's leading days
        const remainingDays = 42 - days.length; // 6 rows × 7 days
        for (let date = 1; date <= remainingDays; date++) {
            const dateStr = new Date(year, month + 1, date)
                .toISOString()
                .split("T")[0];
            days.push({
                date,
                dateStr,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                isPast: false,
            });
        }

        return {
            days,
            monthYear: firstDay.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            }),
        };
    }, [currentMonth, value, today, todayStr]);

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentMonth((prev) => {
            const newMonth = new Date(prev);
            if (direction === "prev") {
                newMonth.setMonth(prev.getMonth() - 1);
            } else {
                newMonth.setMonth(prev.getMonth() + 1);
            }
            return newMonth;
        });
    };

    const selectDate = (dateStr: string, close: () => void) => {
        onChange(dateStr);
        close();
    };

    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    return (
        <Field className={cn("space-y-2", className)}>
            <Label className="text-sm lg:text-base font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <Popover className="relative">
                {({close}) => (
                    <>
                        <PopoverButton
                            className="w-full px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-left flex items-center justify-between text-sm lg:text-base hover:border-gray-400 data-[open]:border-primary-500 data-[focus]:border-primary-500 data-[focus]:ring-2 data-[focus]:ring-primary-500/20">
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-gray-400"/>
                                <span
                                    className={cn(
                                        "transition-colors duration-200",
                                        value ? "text-gray-900" : "text-gray-400"
                                    )}
                                >
                  {formatDisplayDate(value)}
                </span>
                            </div>
                            <ChevronDown
                                size={16}
                                className="text-gray-400 transition-transform duration-200 data-open:rotate-180"
                            />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition duration-200 ease-in-out data-[closed]:scale-95 data-[closed]:opacity-0 min-w-80"
                        >
                            <div className="p-4">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <Button
                                        type="button"
                                        onClick={() => navigateMonth("prev")}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                    >
                                        <ChevronLeft size={16} className="text-gray-600"/>
                                    </Button>

                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {monthYear}
                                    </h3>

                                    <Button
                                        type="button"
                                        onClick={() => navigateMonth("next")}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                    >
                                        <ChevronRight size={16} className="text-gray-600"/>
                                    </Button>
                                </div>

                                {/* Week Days Header */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {weekDays.map((day) => (
                                        <div
                                            key={day}
                                            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500"
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {days.map((day, index) => (
                                        <Button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                day.isCurrentMonth &&
                                                !day.isPast &&
                                                selectDate(day.dateStr, close)
                                            }
                                            disabled={!day.isCurrentMonth || day.isPast}
                                            className={cn(
                                                "h-8 w-8 flex items-center justify-center text-sm rounded-lg transition-all duration-200",
                                                day.isCurrentMonth
                                                    ? day.isPast
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : day.isSelected
                                                            ? "bg-primary-500 text-white font-semibold"
                                                            : day.isToday
                                                                ? "bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                    : "text-gray-400",
                                                "focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                            )}
                                        >
                                            {day.date}
                                        </Button>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="mt-4 pt-3 border-t border-gray-200 flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => selectDate(todayStr, close)}
                                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            onChange("");
                                            close();
                                        }}
                                        className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </Field>
    );
};

// Enhanced Time Picker with advanced UI using Headless UI components
export const TimePicker: React.FC<TimePickerProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                          required = false,
                                                          className = "",
                                                          placeholder = "Select time",
                                                      }) => {
    const [hours, setHours] = useState(() => {
        if (value) {
            return parseInt(value.split(":")[0]) || 0;
        }
        return 0;
    });

    const [minutes, setMinutes] = useState(() => {
        if (value) {
            return parseInt(value.split(":")[1]) || 0;
        }
        return 0;
    });

    const formatDisplayTime = (timeValue: string) => {
        if (!timeValue) return placeholder;
        const [hours, minutes] = timeValue.split(":");
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    };

    const updateTime = (newHours: number, newMinutes: number) => {
        const timeString = `${newHours.toString().padStart(2, "0")}:${newMinutes
            .toString()
            .padStart(2, "0")}`;
        onChange(timeString);
    };

    const adjustTime = (type: "hours" | "minutes", direction: "up" | "down") => {
        if (type === "hours") {
            const newHours =
                direction === "up"
                    ? hours === 23
                        ? 0
                        : hours + 1
                    : hours === 0
                        ? 23
                        : hours - 1;
            setHours(newHours);
            updateTime(newHours, minutes);
        } else {
            const newMinutes =
                direction === "up"
                    ? minutes === 59
                        ? 0
                        : minutes + 1
                    : minutes === 0
                        ? 59
                        : minutes - 1;
            setMinutes(newMinutes);
            updateTime(hours, newMinutes);
        }
    };

    const selectQuickTime = (timeStr: string) => {
        const [timeHours, timeMinutes] = timeStr.split(":");
        const newHours = parseInt(timeHours) || 0;
        const newMinutes = parseInt(timeMinutes) || 0;
        setHours(newHours);
        setMinutes(newMinutes);
        onChange(timeStr);
    };

    // Common time options for quick selection
    const timeOptions = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "00:00",
    ];

    return (
        <Field className={cn("space-y-2", className)}>
            <Label className="text-sm lg:text-base font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <Popover className="relative">
                {({close}) => (
                    <>
                        <PopoverButton
                            className="w-full px-4 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-left flex items-center justify-between text-sm lg:text-base hover:border-gray-400 data-[open]:border-primary-500 data-[focus]:border-primary-500 data-[focus]:ring-2 data-[focus]:ring-primary-500/20">
                            <div className="flex items-center gap-3">
                                <Clock size={18} className="text-gray-400"/>
                                <span
                                    className={cn(
                                        "transition-colors duration-200",
                                        value ? "text-gray-900" : "text-gray-400"
                                    )}
                                >
                  {formatDisplayTime(value)}
                </span>
                            </div>
                            <ChevronDown
                                size={16}
                                className="text-gray-400 transition-transform duration-200 data-[open]:rotate-180"
                            />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 transition duration-200 ease-in-out data-[closed]:scale-95 data-[closed]:opacity-0 min-w-80"
                        >
                            <div className="p-4">
                                {/* Time Spinner */}
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    {/* Hours */}
                                    <div className="flex flex-col items-center">
                                        <Button
                                            type="button"
                                            onClick={() => adjustTime("hours", "up")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            <ChevronUp size={16} className="text-gray-600"/>
                                        </Button>
                                        <div
                                            className="w-12 h-12 flex items-center justify-center text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg">
                                            {hours.toString().padStart(2, "0")}
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => adjustTime("hours", "down")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            <ChevronDown size={16} className="text-gray-600"/>
                                        </Button>
                                        <span className="text-xs text-gray-500 mt-1">
                      Hours (24h)
                    </span>
                                    </div>

                                    <div className="text-2xl font-bold text-gray-400">:</div>

                                    {/* Minutes */}
                                    <div className="flex flex-col items-center">
                                        <Button
                                            type="button"
                                            onClick={() => adjustTime("minutes", "up")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            <ChevronUp size={16} className="text-gray-600"/>
                                        </Button>
                                        <div
                                            className="w-12 h-12 flex items-center justify-center text-lg font-semibold text-gray-900 border border-gray-300 rounded-lg">
                                            {minutes.toString().padStart(2, "0")}
                                        </div>
                                        <Button
                                            type="button"
                                            onClick={() => adjustTime("minutes", "down")}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            <ChevronDown size={16} className="text-gray-600"/>
                                        </Button>
                                        <span className="text-xs text-gray-500 mt-1">Minutes</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-4"></div>

                                {/* Quick Time Selection */}
                                <div className="space-y-2">
                                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                                        Quick Select
                                    </h4>
                                    <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
                                        {timeOptions.map((time) => (
                                            <Button
                                                key={time}
                                                type="button"
                                                onClick={() => selectQuickTime(time)}
                                                className={cn(
                                                    "px-2 py-1 text-xs rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30",
                                                    value === time
                                                        ? "bg-primary-500 text-white"
                                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                                )}
                                            >
                                                {formatDisplayTime(time)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 pt-3 border-t border-gray-200 flex gap-2 justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => selectQuickTime("12:00")}
                                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                    >
                                        12:00
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                setHours(0);
                                                setMinutes(0);
                                                onChange("");
                                            }}
                                            className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                updateTime(hours, minutes);
                                                close();
                                            }}
                                            className="px-3 py-1.5 text-xs bg-primary-500 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                                        >
                                            Done
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </Field>
    );
};
