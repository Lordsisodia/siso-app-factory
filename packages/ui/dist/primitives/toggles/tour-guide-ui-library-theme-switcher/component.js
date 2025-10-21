/*
<ai_context>
This client component provides a theme switcher for the app.
</ai_context>
*/
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export const ThemeSwitcher = ({ children, ...props }) => {
    const { setTheme, theme } = useTheme();
    const handleChange = (theme) => {
        localStorage.setItem("theme", theme);
        setTheme(theme);
    };
    return (_jsx("div", { className: cn("p-1 hover:cursor-pointer hover:opacity-50", props.className), onClick: () => handleChange(theme === "light" ? "dark" : "light"), children: theme === "dark" ? (_jsx(Moon, { className: "size-6" })) : (_jsx(Sun, { className: "size-6" })) }));
};
//# sourceMappingURL=component.js.map