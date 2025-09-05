import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "background-header": "var(--background-header)",
                "background-input": "var(--background-input)",
                "bg-card": "var(--bg-card)",
                "button-bg": "var(--button-bg)",

                "text-header": "var(--text-header)",
                "text-body": "var(--text-body)",
                "text-caption": "var(--text-caption)",
                "text-link": "var(--text-link)",
                icon: "var(--icon)",
                "scroll-bar": "var(--scroll-bar)",

                "divider-primary": "var(--divider-primary)",
                "divider-secondary": "var(--divider-secondary)",

                disabled: "var(--disabled)",
                "disabled-text": "var(--disabled-text)",

                "alarm-critical-400": "var(--alarm-critical-400)",
                "alarm-critical-700": "var(--alarm-critical-700)",
                "alarm-error-400": "var(--alarm-error-400)",
                "alarm-error-700": "var(--alarm-error-700)",
                "alarm-warning-400": "var(--alarm-warning-400)",
                "alarm-warning-700": "var(--alarm-warning-700)",
                "alarm-attention-400": "var(--alarm-attention-400)",
                "alarm-attention-700": "var(--alarm-attention-700)",

                "safe-normal-400": "var(--safe-normal-400)",
                "safe-normal-700": "var(--safe-normal-700)",

                /* Data Viz */
                "chart-violet": "var(--chart-violet)",
                "chart-cyan": "var(--chart-cyan)",
                "chart-yellow": "var(--chart-yellow)",
                "chart-yellowgreen": "var(--chart-yellowgreen)",
                "chart-pink": "var(--chart-pink)",
                "chart-green": "var(--chart-green)",
                "chart-purple": "var(--chart-purple)",
                "chart-olive": "var(--chart-olive)",
            },
        },
    },
    plugins: [],
};
