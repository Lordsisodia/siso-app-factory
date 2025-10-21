"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useId } from "react";
import { CheckIcon, ChevronDownIcon, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
const visibilityOptions = [
    {
        value: "public",
        label: "Public",
        icon: Globe,
        className: "text-green-500",
    },
    {
        value: "private",
        label: "Private",
        icon: Lock,
        className: "",
    },
];
export function VisibilityToggle({ isPrivate, onToggle, disabled = false, readonly = false, }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [open, setOpen] = useState(false);
    const id = useId();
    const handleVisibilityChange = async (value) => {
        if (!onToggle || readonly)
            return;
        try {
            setIsUpdating(true);
            await onToggle(value === "private");
        }
        catch (error) {
            console.error("Failed to update visibility:", error);
        }
        finally {
            setIsUpdating(false);
        }
    };
    // Read-only view
    if (readonly) {
        return (_jsx("div", { className: "flex items-center", children: _jsxs("div", { className: cn("bg-muted text-muted-foreground rounded-md px-2 py-1 flex items-center gap-1.5 text-xs", !isPrivate && "text-green-500"), children: [isPrivate ? _jsx(Lock, { size: 12 }) : _jsx(Globe, { size: 12 }), _jsx("span", { children: isPrivate ? "Private" : "Public" })] }) }));
    }
    const currentValue = isPrivate ? "private" : "public";
    const currentOption = visibilityOptions.find((option) => option.value === currentValue);
    // Editable dropdown with search
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: id, variant: "outline", role: "combobox", "aria-expanded": open, disabled: disabled || isUpdating, className: "bg-card text-card-foreground border-border rounded-md w-[100px] h-7 focus:ring-0 text-xs px-2 justify-between shadow-none", children: [_jsxs("div", { className: cn("flex items-center gap-2", !isPrivate && "text-green-500"), children: [isPrivate ? (_jsx(Lock, { size: 12, className: "min-w-3 min-h-3" })) : (_jsx(Globe, { size: 12, className: "min-w-3 min-h-3" })), _jsx("span", { children: isPrivate ? "Private" : "Public" })] }), _jsx(ChevronDownIcon, { size: 14, className: "text-muted-foreground/80 shrink-0", "aria-hidden": "true" })] }) }), _jsx(PopoverContent, { className: "bg-popover text-popover-foreground border-border w-[160px] p-0", align: "start", children: _jsxs(Command, { className: "text-xs", children: [_jsx(CommandInput, { placeholder: "Search...", className: "text-xs h-7 py-1" }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No option found." }), _jsx(CommandGroup, { children: visibilityOptions.map((option) => {
                                        const Icon = option.icon;
                                        return (_jsxs(CommandItem, { value: option.value, onSelect: (value) => {
                                                handleVisibilityChange(value);
                                                setOpen(false);
                                            }, className: cn("cursor-pointer text-xs py-1", option.value === "public" && "text-green-500"), children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Icon, { size: 12, className: "min-w-3 min-h-3" }), _jsx("span", { children: option.label })] }), currentValue === option.value && (_jsx(CheckIcon, { size: 14, className: "ml-auto" }))] }, option.value));
                                    }) })] })] }) })] }));
}
//# sourceMappingURL=component.js.map