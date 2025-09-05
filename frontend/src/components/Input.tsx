import React from "react";

export default function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const { className = "", ...rest } = props;
    return (
        <input
            {...rest}
            className={
                "w-full rounded-lg border border-gray-300 dark:border-grey bg-white/80 dark:bg-grey-light px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm " +
                className
            }
        />
    );
}