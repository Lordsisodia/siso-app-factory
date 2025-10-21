"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, forwardRef, useCallback, useContext, useEffect, useState, } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
const TreeContext = createContext(null);
const useTree = () => {
    const context = useContext(TreeContext);
    if (!context) {
        throw new Error("useTree must be used within a TreeProvider");
    }
    return context;
};
const Tree = forwardRef(({ className, elements, initialSelectedId, initialExpandedItems, children, indicator = true, openIcon, closeIcon, dir, ...props }, ref) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);
    const [expandedItems, setExpandedItems] = useState(initialExpandedItems);
    const selectItem = useCallback((id) => {
        setSelectedId(id);
    }, []);
    const handleExpand = useCallback((id) => {
        setExpandedItems((prev) => {
            if (prev?.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            return [...(prev ?? []), id];
        });
    }, []);
    const expandSpecificTargetedElements = useCallback((elements, selectId) => {
        if (!elements || !selectId)
            return;
        const findParent = (currentElement, currentPath = []) => {
            const isSelectable = currentElement.isSelectable ?? true;
            const newPath = [...currentPath, currentElement.id];
            if (currentElement.id === selectId) {
                if (isSelectable) {
                    setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
                }
                else {
                    if (newPath.includes(currentElement.id)) {
                        newPath.pop();
                        setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
                    }
                }
                return;
            }
            if (isSelectable &&
                currentElement.children &&
                currentElement.children.length > 0) {
                currentElement.children.forEach((child) => {
                    findParent(child, newPath);
                });
            }
        };
        elements.forEach((element) => {
            findParent(element);
        });
    }, []);
    useEffect(() => {
        if (initialSelectedId) {
            expandSpecificTargetedElements(elements, initialSelectedId);
        }
    }, [initialSelectedId, elements]);
    const direction = dir === "rtl" ? "rtl" : "ltr";
    return (_jsx(TreeContext.Provider, { value: {
            selectedId,
            expandedItems,
            handleExpand,
            selectItem,
            setExpandedItems,
            indicator,
            openIcon,
            closeIcon,
            direction,
        }, children: _jsx("div", { className: cn("size-full", className), children: _jsx(ScrollArea, { ref: ref, className: "relative h-full px-2", dir: dir, children: _jsx(AccordionPrimitive.Root, { ...props, type: "multiple", defaultValue: expandedItems, value: expandedItems, className: "flex flex-col gap-1", onValueChange: (value) => setExpandedItems((prev) => [...(prev ?? []), value[0]]), dir: dir, children: children }) }) }) }));
});
Tree.displayName = "Tree";
const TreeIndicator = forwardRef(({ className, ...props }, ref) => {
    const { direction } = useTree();
    return (_jsx("div", { dir: direction, ref: ref, className: cn("bg-muted absolute left-1.5 h-full w-px rounded-md py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5", className), ...props }));
});
TreeIndicator.displayName = "TreeIndicator";
const Folder = forwardRef(({ className, element, value, isSelectable = true, isSelect, children, ...props }, ref) => {
    const { direction, handleExpand, expandedItems, indicator, setExpandedItems, openIcon, closeIcon, } = useTree();
    return (_jsxs(AccordionPrimitive.Item, { ...props, value: value, className: "relative h-full overflow-hidden", children: [_jsxs(AccordionPrimitive.Trigger, { className: cn(`flex items-center gap-1 rounded-md text-sm`, className, {
                    "bg-muted rounded-md": isSelect && isSelectable,
                    "cursor-pointer": isSelectable,
                    "cursor-not-allowed opacity-50": !isSelectable,
                }), disabled: !isSelectable, onClick: () => handleExpand(value), children: [expandedItems?.includes(value)
                        ? (openIcon ?? _jsx(FolderOpenIcon, { className: "size-4" }))
                        : (closeIcon ?? _jsx(FolderIcon, { className: "size-4" })), _jsx("span", { children: element })] }), _jsxs(AccordionPrimitive.Content, { className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative h-full overflow-hidden text-sm", children: [element && indicator && _jsx(TreeIndicator, { "aria-hidden": "true" }), _jsx(AccordionPrimitive.Root, { dir: direction, type: "multiple", className: "ml-5 flex flex-col gap-1 py-1 rtl:mr-5", defaultValue: expandedItems, value: expandedItems, onValueChange: (value) => {
                            setExpandedItems?.((prev) => [...(prev ?? []), value[0]]);
                        }, children: children })] })] }));
});
Folder.displayName = "Folder";
const File = forwardRef(({ value, className, handleSelect, isSelectable = true, isSelect, fileIcon, children, ...props }, ref) => {
    const { direction, selectedId, selectItem } = useTree();
    const isSelected = isSelect ?? selectedId === value;
    return (_jsxs("button", { ref: ref, type: "button", disabled: !isSelectable, className: cn("flex w-fit items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1", {
            "bg-muted": isSelected && isSelectable,
        }, isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50", direction === "rtl" ? "rtl" : "ltr", className), onClick: () => selectItem(value), ...props, children: [fileIcon ?? _jsx(FileIcon, { className: "size-4" }), children] }));
});
File.displayName = "File";
const CollapseButton = forwardRef(({ className, elements, expandAll = false, children, ...props }, ref) => {
    const { expandedItems, setExpandedItems } = useTree();
    const expendAllTree = useCallback((elements) => {
        const expandTree = (element) => {
            const isSelectable = element.isSelectable ?? true;
            if (isSelectable && element.children && element.children.length > 0) {
                setExpandedItems?.((prev) => [...(prev ?? []), element.id]);
                element.children.forEach(expandTree);
            }
        };
        elements.forEach(expandTree);
    }, []);
    const closeAll = useCallback(() => {
        setExpandedItems?.([]);
    }, []);
    useEffect(() => {
        console.log(expandAll);
        if (expandAll) {
            expendAllTree(elements);
        }
    }, [expandAll]);
    return (_jsxs(Button, { variant: "ghost", className: "absolute right-2 bottom-1 h-8 w-fit p-1", onClick: expandedItems && expandedItems.length > 0
            ? closeAll
            : () => expendAllTree(elements), ref: ref, ...props, children: [children, _jsx("span", { className: "sr-only", children: "Toggle" })] }));
});
CollapseButton.displayName = "CollapseButton";
export { CollapseButton, File, Folder, Tree };
//# sourceMappingURL=component.js.map