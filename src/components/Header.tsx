import { useEffect, useState } from "react";

export default function Header() {
    const [theme, setTheme] = useState<"blue" | "dark" | "indigo">("blue");

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove("blue", "dark", "indigo");
        html.classList.add(theme);
    }, [theme]);

    return (
        <nav className="bg-background-header text-foreground py-4 flex justify-between items-center w-full px-10 shadow">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="flex gap-2">
                <button
                    onClick={() => setTheme("blue")}
                    className="px-3 py-1 rounded-lg border bg-button-bg text-text-header"
                >
                    Blue
                </button>
                <button
                    onClick={() => setTheme("dark")}
                    className="px-3 py-1 rounded-lg border bg-button-bg text-text-header"
                >
                    Dark
                </button>
                <button
                    onClick={() => setTheme("indigo")}
                    className="px-3 py-1 rounded-lg border bg-button-bg text-text-header"
                >
                    Indigo
                </button>
            </div>
        </nav>
    );
}
