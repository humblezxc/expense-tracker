import Button from "./Button.tsx";
import useTheme from "../hooks/theme.ts";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const { pathname } = useLocation();
    const { isDark, toggle } = useTheme();

    return (
        <header className="flex items-center justify-between py-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Expense tracker</h1>
                <p className="list-none lg:block text-lg">React · TypeScript · Tailwind · NestJS · Apollo · GraphQL · MongoDB</p>
            </div>
            <div className="flex items-center gap-2">
                <Link
                    to="/expenses"
                    className={`hover:underline ${pathname === "/expenses" ? "font-semibold" : ""}`}
                >
                    Expenses
                </Link>
                <Link
                    to="/analytics"
                    className={`hover:underline ${pathname === "/analytics" ? "font-semibold" : ""}`}
                >
                    Analytics
                </Link>
                <Button variant="outline" onClick={toggle}>{isDark ? "Light" : "Dark"} mode</Button>
            </div>
        </header>
    )
}