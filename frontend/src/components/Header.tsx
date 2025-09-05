import Button from "./Button.tsx";
import useTheme from "../hooks/theme.ts";

export default function Header() {
    const { isDark, toggle } = useTheme();

    return (
        <header className="flex items-center justify-between py-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Expense tracker</h1>
                <p className="text-lg">React · TypeScript · Tailwind · NestJS · Apollo · GraphQL · MongoDB</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={toggle}>{isDark ? "Light" : "Dark"} mode</Button>
            </div>
        </header>
    )
}