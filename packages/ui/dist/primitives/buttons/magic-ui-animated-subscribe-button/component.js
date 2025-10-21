"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
export const AnimatedSubscribeButton = React.forwardRef(({ subscribeStatus, onClick, className, children, ...props }, ref) => {
    const isControlled = subscribeStatus !== undefined; // controlled vs uncontrolled check
    const [isSubscribed, setIsSubscribed] = useState(subscribeStatus ?? false);
    useEffect(() => {
        if (isControlled) {
            setIsSubscribed(subscribeStatus);
        }
    }, [subscribeStatus, isControlled]);
    if (React.Children.count(children) !== 2 ||
        !React.Children.toArray(children).every((child) => React.isValidElement(child) && child.type === "span")) {
        throw new Error("AnimatedSubscribeButton expects two children, both of which must be <span> elements.");
    }
    const childrenArray = React.Children.toArray(children);
    const initialChild = childrenArray[0];
    const changeChild = childrenArray[1];
    return (_jsx(AnimatePresence, { mode: "wait", children: isSubscribed ? (_jsx(motion.button, { ref: ref, className: cn("bg-primary text-primary-foreground relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg px-6", className), onClick: (e) => {
                if (!isControlled) {
                    setIsSubscribed(false); // Only toggle manually if uncontrolled
                }
                onClick?.(e);
            }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, ...props, children: _jsxs(motion.span, { className: "relative flex h-full w-full items-center justify-center font-semibold", initial: { y: -50 }, animate: { y: 0 }, children: [changeChild, " "] }, "action") })) : (_jsx(motion.button, { ref: ref, className: cn("bg-primary text-primary-foreground relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none px-6", className), onClick: (e) => {
                if (!isControlled) {
                    setIsSubscribed(true); // Only toggle manually if uncontrolled
                }
                onClick?.(e);
            }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, ...props, children: _jsxs(motion.span, { className: "relative flex items-center justify-center font-semibold", initial: { x: 0 }, exit: { x: 50, transition: { duration: 0.1 } }, children: [initialChild, " "] }, "reaction") })) }));
});
AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";
//# sourceMappingURL=component.js.map