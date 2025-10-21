import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { FullScreenButton } from "../../ui/full-screen-button";
import { LoadingSpinner } from "../../ui/loading-spinner";
import { useState } from "react";
export function NewFlowPreviewRender({ demo }) {
    const { resolvedTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    return (_jsxs(motion.div, { className: "relative flex-grow h-full rounded-lg overflow-hidden", children: [_jsx(FullScreenButton, {}), isLoading && (_jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center h-full gap-3 bg-background/80", children: [_jsx(LoadingSpinner, {}), _jsx("p", { className: "text-muted-foreground text-sm", children: "Loading preview..." })] })), _jsx("iframe", { src: `${demo.bundle_html_url}?theme=${resolvedTheme}`, className: "w-full h-full", onLoad: () => setIsLoading(false), onError: () => setIsLoading(false) })] }));
}
//# sourceMappingURL=component.js.map