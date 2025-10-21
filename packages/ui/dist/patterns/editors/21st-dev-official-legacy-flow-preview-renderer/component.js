"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SandpackPreview, SandpackProvider as SandpackProviderUnstyled, } from "@codesandbox/sandpack-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useBundleDemo } from "@/hooks/use-bundle-demo";
import { generateBundleFiles } from "@/lib/sandpack";
import { useTheme } from "next-themes";
import { FullScreenButton } from "../../ui/full-screen-button";
import { LoadingSpinner } from "../../ui/loading-spinner";
const LoadingDisplay = ({ message }) => (_jsxs("div", { className: "flex flex-col items-center justify-center h-full gap-3", children: [_jsx(LoadingSpinner, {}), _jsx("p", { className: "text-muted-foreground text-sm", children: message })] }));
const LoadingOverlay = ({ text }) => (_jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center h-full gap-3 bg-background/80", children: [_jsx(LoadingSpinner, {}), _jsx("p", { className: "text-muted-foreground text-sm", children: text })] }));
export function LegacyFlowPreviewRenderer({ providerProps, component, code, demoCode, demoComponentNames, registryDependencies, tailwindConfig, globalCss, demo, css, shellCode, allDependencies, }) {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";
    const [contentLoading, setContentLoading] = useState(true);
    const [contentError, setContentError] = useState(false);
    const [showLongLoadMessage, setShowLongLoadMessage] = useState(false);
    const bundleFiles = useMemo(() => ({
        ...registryDependencies,
        ...generateBundleFiles({
            demoComponentNames,
            componentSlug: component.component_slug,
            relativeImportPath: `/components/${component.registry}`,
            code,
            demoCode,
            css: css || "",
            customTailwindConfig: tailwindConfig,
            customGlobalCss: globalCss,
        }),
    }), [
        registryDependencies,
        demoComponentNames,
        component.component_slug,
        component.registry,
        code,
        demoCode,
        css,
        tailwindConfig,
        globalCss,
    ]);
    const { bundle, error: bundleError } = useBundleDemo({
        files: bundleFiles,
        dependencies: allDependencies,
        component,
        shellCode,
        demoId: demo.id,
        tailwindConfig,
        globalCss,
    });
    const demoBundleHash = demo?.bundle_hash;
    const urls = useMemo(() => {
        if ((code === "" || demoCode === "") && demo.bundle_html_url) {
            return {
                html: demo.bundle_html_url,
            };
        }
        if (bundle?.html) {
            return bundle;
        }
        return null;
    }, [bundle?.html, demo.bundle_html_url, code, demoCode]);
    useEffect(() => {
        let timer;
        const isPreviewDefinitelyUnavailable = !!(bundle?.html &&
            demoBundleHash === "0" &&
            !bundleError);
        if (isPreviewDefinitelyUnavailable) {
            if (contentLoading) {
                setContentLoading(false);
            }
            setShowLongLoadMessage(false);
        }
        else if (contentLoading) {
            setShowLongLoadMessage(false);
            timer = setTimeout(() => {
                if (contentLoading && !isPreviewDefinitelyUnavailable) {
                    setShowLongLoadMessage(true);
                }
            }, 10000);
        }
        else {
            setShowLongLoadMessage(false);
        }
        return () => {
            if (timer)
                clearTimeout(timer);
        };
    }, [contentLoading, bundle, demoBundleHash, bundleError]);
    const derivedErrorFromBundle = bundleError;
    const shouldShowErrorState = contentError || !!derivedErrorFromBundle;
    const getCurrentLoadingMessage = () => {
        if (showLongLoadMessage) {
            return "Loading is taking longer than usual... you may want to refresh the page";
        }
        return "Starting preview...";
    };
    let displayContent;
    if (shouldShowErrorState) {
        displayContent = (_jsxs(_Fragment, { children: [contentLoading && !contentError && (_jsx(LoadingOverlay, { text: getCurrentLoadingMessage() })), _jsx(SandpackProviderUnstyled, { ...providerProps, children: _jsx(SandpackPreview, { showSandpackErrorOverlay: false, showOpenInCodeSandbox: process.env.NODE_ENV === "development", showRefreshButton: false, onLoad: () => setContentLoading(false), onError: () => {
                            setContentError(true);
                            setContentLoading(false);
                        } }) })] }));
    }
    else if (urls?.html && demoBundleHash !== "0") {
        displayContent = (_jsxs(_Fragment, { children: [contentLoading && _jsx(LoadingOverlay, { text: getCurrentLoadingMessage() }), _jsx("iframe", { src: isDarkTheme ? `${urls.html}?dark=true` : urls.html, className: "w-full h-full", onLoad: () => setContentLoading(false), onError: () => {
                        setContentError(true);
                        setContentLoading(false);
                    } })] }));
    }
    else {
        let message;
        const isPreviewUnavailableNonError = !!(bundle?.html &&
            demoBundleHash === "0" &&
            !bundleError);
        if (isPreviewUnavailableNonError) {
            message = "Preview is not available for this specific demo version.";
            if (contentLoading)
                setContentLoading(false);
        }
        else if ((bundle === null || bundle?.html === null) &&
            !bundleError &&
            contentLoading) {
            message = getCurrentLoadingMessage();
        }
        else if (!bundleError &&
            !bundle?.html &&
            !contentLoading &&
            demoBundleHash !== "0") {
            message = "Preview content is unavailable.";
        }
        else {
            message = getCurrentLoadingMessage();
        }
        if (contentLoading &&
            !shouldShowErrorState &&
            !(bundle?.html && demoBundleHash !== "0")) {
            displayContent = _jsx(LoadingDisplay, { message: getCurrentLoadingMessage() });
        }
        else {
            displayContent = _jsx(LoadingDisplay, { message: message });
        }
    }
    return (_jsxs(motion.div, { className: "relative flex-grow h-full rounded-lg overflow-hidden", children: [_jsx(FullScreenButton, {}), displayContent] }));
}
//# sourceMappingURL=component.js.map