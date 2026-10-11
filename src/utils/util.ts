export default function formatTwoDigits(num: number) {
    return num < 10 ? `0${num}` : `${num}`;
}

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
