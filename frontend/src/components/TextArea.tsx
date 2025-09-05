import React from "react";

export default function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const { className = "", ...rest } = props;
    return (
        <textarea
            {...rest}
            className={
                "w-full rounded-xl border border-gray-300 dark:border-grey bg-white/80 dark:bg-grey-light px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm min-h-[88px] " +
                className
            }
        />
    );
}