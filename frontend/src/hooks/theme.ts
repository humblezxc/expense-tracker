import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme-preference";

export default function useTheme() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "dark") return true;
            if (stored === "light") return false;
        } catch {}
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        root.classList.toggle("dark", isDark);
        try {
            localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
        } catch {}
    }, [isDark]);

    const toggle = useCallback(() => setIsDark((v) => !v), []);

    return { isDark, setIsDark, toggle } as const;
}