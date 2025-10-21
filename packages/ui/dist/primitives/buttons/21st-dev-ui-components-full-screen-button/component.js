import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAtom } from "jotai";
import { Maximize2, Minimize2 } from "lucide-react";
import { motion } from "motion/react";
import { isFullScreenAtom } from "../../app/[username]/[component_slug]/page.client";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
export function FullScreenButton() {
    const [isFullScreen, setIsFullScreen] = useAtom(isFullScreenAtom);
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, className: "absolute top-4 right-4 z-50", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(motion.button, { onClick: () => setIsFullScreen(!isFullScreen), className: "h-8 w-8 flex items-center justify-center hover:bg-accent rounded-md bg-background/80 backdrop-blur-sm border border-border relative", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs("div", { className: "relative w-4 h-4", children: [_jsx(motion.div, { className: "absolute inset-0", initial: { opacity: 0, scale: 0 }, animate: {
                                        opacity: isFullScreen ? 1 : 0,
                                        scale: isFullScreen ? 1 : 0,
                                    }, transition: { duration: 0.2 }, children: _jsx(Minimize2, { size: 16 }) }), _jsx(motion.div, { className: "absolute inset-0", initial: { opacity: 0, scale: 0 }, animate: {
                                        opacity: !isFullScreen ? 1 : 0,
                                        scale: !isFullScreen ? 1 : 0,
                                    }, transition: { duration: 0.2 }, children: _jsx(Maximize2, { size: 16 }) })] }) }) }), _jsx(TooltipContent, { side: "right", className: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", children: _jsxs("p", { className: "flex items-center gap-1.5", children: [isFullScreen ? "Exit full screen" : "Full screen", _jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: isFullScreen ? "Esc" : "F" })] }) })] }) }));
}
//# sourceMappingURL=component.js.map