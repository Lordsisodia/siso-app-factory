import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Spinner } from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useUser } from "@clerk/nextjs";
import { ArrowLeftIcon, BugIcon, CheckIcon, Loader2, Video, XIcon, } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { editSandbox } from "../api";
export function SandboxHeader({ sandboxId, sandboxName = "...", username, status, showEditName = true, onNameChange, customBackUrl, customBackLabel, customBackAction, customNextUrl, customNextLabel = "Continue", customNextIcon, customNextAction, hideNext = false, isNextLoading = false, isBackLoading = false, showBetaBadge = true, }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(sandboxName);
    const [editLoading, setEditLoading] = useState(false);
    const inputRef = useRef(null);
    const textRef = useRef(null);
    const { user } = useUser();
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();
    // Update local state when prop changes
    useEffect(() => {
        setName(sandboxName);
    }, [sandboxName]);
    // Set input width to match text width when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current && textRef.current) {
            // Get the computed style to calculate exact width
            const styles = window.getComputedStyle(textRef.current);
            const width = textRef.current.getBoundingClientRect().width;
            // Add a small buffer to ensure text isn't cut off
            inputRef.current.style.width = `${width + 8}px`;
            // Set min-width to avoid too narrow inputs
            inputRef.current.style.minWidth = "120px";
            // Focus after width is set
            inputRef.current.focus();
        }
    }, [isEditing]);
    const handleEditName = async () => {
        if (!sandboxId || name === sandboxName) {
            setIsEditing(false);
            return;
        }
        setEditLoading(true);
        try {
            const { success } = await editSandbox(sandboxId, { name });
            if (success) {
                toast.success("Component name updated");
                setIsEditing(false);
                onNameChange?.(name);
            }
        }
        catch (error) {
            toast.error("Failed to update component name");
            setName(sandboxName);
        }
        finally {
            setEditLoading(false);
        }
    };
    const handleCancel = () => {
        setName(sandboxName);
        setIsEditing(false);
    };
    const handleBackToStudio = () => {
        if (customBackAction) {
            customBackAction();
        }
        else if (customBackUrl) {
            router.push(customBackUrl);
        }
        else {
            router.push(`/studio/${params.username}`);
        }
    };
    const handleNextStep = () => {
        if (customNextAction) {
            customNextAction();
        }
        else if (customNextUrl) {
            router.push(customNextUrl);
        }
        else {
            router.push(`${pathname}/publish`);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEditName();
        }
        else if (e.key === "Escape") {
            handleCancel();
        }
    };
    // Update outside components when name changes
    useEffect(() => {
        onNameChange?.(name);
    }, [name, onNameChange]);
    const getStatusBadge = () => {
        switch (status) {
            case "edit":
                return (_jsx("div", { className: "text-xs bg-yellow-500 text-primary-foreground rounded-full px-2 py-0.5", children: "Edit" }));
            case "published":
                return (_jsx("div", { className: "text-xs bg-emerald-500 text-primary-foreground rounded-full px-2 py-0.5", children: "Published" }));
            case "draft":
                return (_jsx("div", { className: "text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5", children: "Draft" }));
            default:
                return (_jsx("div", { className: "text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5", children: "Loading..." }));
        }
    };
    return (_jsx("header", { className: "flex flex-col px-4 py-2 border-b", children: _jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { onClick: handleBackToStudio, className: "cursor-pointer", children: _jsx(Logo, { position: "flex", className: "w-6 h-6", hasLink: false }) }), _jsx("div", { className: "text-muted-foreground", children: "/" }), username && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(UserAvatar, { alt: " ", src: user?.imageUrl, size: 24, className: "mr-1" }), _jsx("span", { className: "text-sm font-medium", children: username }), _jsx("div", { className: "text-muted-foreground mx-1", children: "/" })] })), _jsx("div", { className: "flex items-center gap-2 group relative", children: isEditing && showEditName ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { ref: inputRef, value: name, onChange: (e) => setName(e.target.value), className: "text-sm font-medium bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none p-0 h-auto shadow-none  ", autoFocus: true, onKeyDown: handleKeyDown, onBlur: handleEditName }), _jsx("div", { className: "absolute left-0 right-0 bottom-0 h-[1px] bg-black opacity-100 -mb-[2px]" })] }), _jsxs("div", { className: "flex absolute right-0 top-1/2 -translate-y-1/2 opacity-70 -mr-16", children: [_jsx(Button, { size: "icon", variant: "ghost", onClick: handleEditName, disabled: editLoading, className: "h-7 w-7", children: editLoading ? (_jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" })) : (_jsx(CheckIcon, { className: "h-3.5 w-3.5" })) }), _jsx(Button, { size: "icon", variant: "ghost", onClick: handleCancel, disabled: editLoading, className: "h-7 w-7", children: _jsx(XIcon, { className: "h-3.5 w-3.5" }) })] })] })) : (_jsxs(_Fragment, { children: [showEditName ? (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { delayDuration: 1, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("h1", { ref: textRef, className: "text-sm font-medium py-0.5 px-0 cursor-text transition-colors relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-black after:opacity-0 hover:after:opacity-100 group-hover:after:opacity-100", onClick: () => setIsEditing(true), children: name }) }), _jsx(TooltipContent, { side: "bottom", children: _jsx("p", { children: "Rename component" }) })] }) })) : (_jsx("h1", { className: "text-sm font-medium py-0.5 px-0", children: name })), getStatusBadge()] })) })] }), _jsxs("div", { className: "ml-auto flex items-center gap-4", children: [showBetaBadge && (_jsxs("div", { className: "flex flex-row rounded-md overflow-hidden border border-blue-200 dark:border-blue-800 shadow-sm max-w-[400px]", children: [_jsx("div", { className: "flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 px-2.5 py-2", children: _jsxs("a", { href: "https://www.loom.com/share/790ed2081db5476f84355e06dec878c4", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 text-xs text-blue-700 dark:text-blue-300 hover:underline transition-colors", children: [_jsx(Video, { className: "h-4 w-4", "aria-hidden": "true" }), "Watch Tutorial"] }) }), _jsx("div", { className: "flex items-center justify-between gap-1.5 px-2.5 py-1.5 bg-white dark:bg-gray-900", children: _jsxs("a", { href: "https://discord.gg/Qx4rFunHfm", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors", children: [_jsx(BugIcon, { className: "h-4 w-4", "aria-hidden": "true" }), "Report Issue"] }) })] })), customBackLabel && (_jsx(Button, { variant: "outline", onClick: handleBackToStudio, className: "gap-1", disabled: isBackLoading, children: isBackLoading ? (_jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx(Spinner, { size: 16, color: "currentColor" }), customBackLabel] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowLeftIcon, { className: "h-4 w-4" }), customBackLabel] })) })), !hideNext && (_jsx(Button, { onClick: handleNextStep, disabled: isNextLoading, className: "relative transition-all duration-200", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [isNextLoading && _jsx(Spinner, { size: 16, color: "white" }), customNextLabel, customNextIcon && !isNextLoading && customNextIcon] }) }))] })] }) }));
}
//# sourceMappingURL=component.js.map