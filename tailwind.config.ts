import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(circle, rgba(0,0,0,0), rgba(0,0,0,0.5))",
                "gradient-linear": "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5) 95%)",
            },
        },
    },
    plugins: [],
};
export default config;
