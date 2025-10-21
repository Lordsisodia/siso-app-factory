"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Briefcase, Calendar, Home, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
const defaultItems = [
    { label: "home", icon: Home },
    { label: "strategy", icon: Briefcase },
    { label: "period", icon: Calendar },
    { label: "security", icon: Shield },
    { label: "settings", icon: Settings },
];
const MENU_STYLES = `
[data-interactive-menu] {
  --component-active-color: var(--component-active-color-default);
}

[data-interactive-menu] .menu__item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.65rem 0.75rem;
  border-radius: 1rem;
  color: hsl(var(--muted-foreground));
  transition: transform 0.2s ease, color 0.2s ease, background-color 0.2s ease;
}

[data-interactive-menu] .menu__item::after {
  content: "";
  position: absolute;
  bottom: 0.35rem;
  left: 50%;
  transform: translateX(-50%);
  width: var(--lineWidth, 0px);
  height: 3px;
  border-radius: 999px;
  background: var(--component-active-color);
  opacity: 0;
  transition: width 0.25s ease, opacity 0.2s ease;
}

[data-interactive-menu] .menu__item.active {
  color: var(--component-active-color);
  background-color: color-mix(in srgb, var(--component-active-color) 12%, transparent);
}

[data-interactive-menu] .menu__item.active::after {
  opacity: 1;
}

[data-interactive-menu] .menu__icon .icon {
  width: 1.25rem;
  height: 1.25rem;
}

[data-interactive-menu] .menu__text {
  font-size: 0.75rem;
  text-transform: capitalize;
  letter-spacing: 0.02em;
}

[data-interactive-menu] .menu__text.active {
  color: var(--component-active-color);
}
`;
export function InteractiveMenu({ items, accentColor, className }) {
    const validatedItems = useMemo(() => {
        if (!items || !Array.isArray(items) || items.length < 2 || items.length > 5) {
            console.warn("InteractiveMenu: 'items' prop is invalid or missing. Using default items.", items);
            return defaultItems;
        }
        return items;
    }, [items]);
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef([]);
    const textRefs = useRef([]);
    useEffect(() => {
        if (activeIndex >= validatedItems.length) {
            setActiveIndex(0);
        }
    }, [activeIndex, validatedItems.length]);
    useEffect(() => {
        const updateLineWidths = () => {
            itemRefs.current.forEach((button, index) => {
                const text = textRefs.current[index];
                if (!button || !text)
                    return;
                button.style.setProperty("--lineWidth", `${text.offsetWidth}px`);
            });
        };
        updateLineWidths();
        window.addEventListener("resize", updateLineWidths);
        return () => window.removeEventListener("resize", updateLineWidths);
    }, [validatedItems]);
    const navStyle = React.useMemo(() => ({
        "--component-active-color": accentColor ?? "var(--component-active-color-default)",
    }), [accentColor]);
    return (_jsxs("div", { "data-interactive-menu": "", className: "flex justify-center", children: [_jsx("style", { children: MENU_STYLES }), _jsx("nav", { role: "navigation", style: navStyle, className: cn("flex w-full max-w-md justify-between gap-1 rounded-2xl border border-border/60 bg-card/70 p-2 shadow-inner backdrop-blur", className), children: validatedItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = index === activeIndex;
                    return (_jsxs("button", { ref: (node) => {
                            itemRefs.current[index] = node;
                        }, type: "button", className: cn("menu__item", isActive && "active"), onClick: () => setActiveIndex(index), "aria-pressed": isActive, children: [_jsx("div", { className: "menu__icon", children: _jsx(Icon, { className: cn("icon", isActive ? "text-[color:var(--component-active-color)]" : undefined) }) }), _jsx("span", { ref: (node) => {
                                    textRefs.current[index] = node;
                                }, className: cn("menu__text", isActive && "active"), children: item.label })] }, item.label));
                }) })] }));
}
export default InteractiveMenu;
//# sourceMappingURL=component.js.map