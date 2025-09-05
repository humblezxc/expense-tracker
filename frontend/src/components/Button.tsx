import React from "react";

export default function Button({ variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" | "outline" }) {
    const base = "rounded-lg cursor-pointer px-4 py-2 font-medium shadow-sm transition active:scale-[0.99]";
    const variants: Record<string, string> = {
        primary: "bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-sky-900",
        outline: "bg-transparent border border-gray-400 dark:border-grey hover:opacity-80",
        danger: "bg-red text-white hover:opacity-80",
    };
    return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}