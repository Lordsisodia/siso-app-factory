"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const Command = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive, { ref: ref, className: cn("bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md", className), ...props })));
Command.displayName = CommandPrimitive.displayName;
const CommandDialog = ({ children, ...props }) => {
    return (_jsx(Dialog, { ...props, children: _jsx(DialogContent, { className: "overflow-hidden p-0 shadow-lg", children: _jsx(Command, { className: "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5", children: children }) }) }));
};
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (_jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [_jsx(Search, { className: "mr-2 size-4 shrink-0 opacity-50" }), _jsx(CommandPrimitive.Input, { ref: ref, className: cn("placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50", className), ...props })] })));
CommandInput.displayName = CommandPrimitive.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.List, { ref: ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props })));
CommandList.displayName = CommandPrimitive.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => (_jsx(CommandPrimitive.Empty, { ref: ref, className: "py-6 text-center text-sm", ...props })));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Group, { ref: ref, className: cn("text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", className), ...props })));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Separator, { ref: ref, className: cn("bg-border -mx-1 h-px", className), ...props })));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Item, { ref: ref, className: cn("data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className), ...props })));
CommandItem.displayName = CommandPrimitive.Item.displayName;
const CommandShortcut = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className), ...props }));
};
CommandShortcut.displayName = "CommandShortcut";
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator };
//# sourceMappingURL=component.js.map