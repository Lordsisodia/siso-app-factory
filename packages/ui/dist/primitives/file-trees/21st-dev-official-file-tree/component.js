import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FolderIcon, FolderOpenIcon, FileIcon, Loader2Icon, TrashIcon, FilePlusIcon, FolderPlusIcon, PencilIcon, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import React from "react";
// Reusable input form for file/directory creation and renaming
function InlineInputForm({ placeholder, value, onChange, onSubmit, onCancel, buttonText = "Create", autoFocus = true, }) {
    return (_jsxs("div", { className: "flex gap-1 py-1", children: [_jsx(Input, { placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter")
                        onSubmit();
                    if (e.key === "Escape")
                        onCancel();
                }, className: "h-6 text-xs", autoFocus: autoFocus, onBlur: () => setTimeout(onCancel, 150) }), _jsx(Button, { size: "sm", onClick: onSubmit, disabled: !value, children: buttonText })] }));
}
// Simple inline input without button - for renaming files/directories
function SimpleInlineInput({ value, onChange, onSubmit, onCancel, autoFocus = true, }) {
    const inputRef = React.useRef(null);
    const selectionAppliedRef = React.useRef(false);
    // Set selection to select text before dot only when first mounted
    useEffect(() => {
        if (!selectionAppliedRef.current && autoFocus && inputRef.current) {
            const dotIndex = value.lastIndexOf(".");
            if (dotIndex > 0) {
                // Select text before the dot
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.setSelectionRange(0, dotIndex);
                        selectionAppliedRef.current = true;
                    }
                }, 0);
            }
            selectionAppliedRef.current = true;
        }
    }, []); // Empty dependency array to run only once on mount
    return (_jsxs(_Fragment, { children: [_jsx("style", { jsx: true, global: true, children: `
        .filename-input::selection {
          background-color: rgba(
            0,
            0,
            0,
            0.3
          ); /* Black with opacity for light theme */
          color: inherit; /* Maintain text color */
        }

        /* Dark theme specific styling */
        [data-theme="dark"] .filename-input::selection {
          background-color: rgba(
            255,
            255,
            255,
            0.3
          ); /* White with opacity for dark theme */
          color: white;
        }
      ` }), _jsx(Input, { ref: inputRef, value: value, onChange: (e) => onChange(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter")
                        onSubmit();
                    if (e.key === "Escape")
                        onCancel();
                }, className: "h-5 pl-1 text-[14px] rounded-none border-0 focus-visible:ring-1 bg-muted filename-input", autoFocus: autoFocus, onBlur: onSubmit })] }));
}
// Action buttons for file/directory operations
function TreeItemActions({ showActions, onRename, onDelete, onCreateFile, onCreateDirectory, itemType, itemName, }) {
    const actionClasses = `transition-opacity ${showActions ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"}`;
    return (_jsxs("div", { className: `flex items-center gap-1 action-icon ${actionClasses}`, children: [onRename && itemType === "file" && (_jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: onRename, title: `Rename ${itemType}`, children: _jsx(PencilIcon, { className: "h-3 w-3 text-muted-foreground" }) })), itemType === "dir" && onCreateFile && (_jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: onCreateFile, title: "Create file", children: _jsx(FilePlusIcon, { className: "h-3 w-3 text-muted-foreground" }) })), itemType === "dir" && onCreateDirectory && (_jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: onCreateDirectory, title: "Create directory", children: _jsx(FolderPlusIcon, { className: "h-3 w-3 text-muted-foreground" }) })), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { size: "icon", variant: "ghost", className: "h-5 w-5", onClick: (e) => e.stopPropagation(), children: _jsx(TrashIcon, { className: "h-3 w-3 text-muted-foreground" }) }) }), _jsx(DropdownMenuContent, { align: "end", children: _jsxs(DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: onDelete, children: ["Delete ", itemType] }) })] })] }));
}
// Component for file entries
function FileItem({ entry, level, onSelect, selectedPath, onDelete, onRename, }) {
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState(entry.name);
    const [showActions, setShowActions] = useState(false);
    const handleRename = async () => {
        if (newName && newName !== entry.name && onRename) {
            try {
                await onRename(entry.path, newName);
            }
            catch (error) {
                // Error handling is done in the hook
            }
        }
        setIsRenaming(false);
    };
    const startRename = (e) => {
        e.stopPropagation();
        setNewName(entry.name);
        setIsRenaming(true);
    };
    const cancelRename = () => {
        setIsRenaming(false);
    };
    return (_jsx("li", { className: "py-0.5 group/item relative select-none", onMouseEnter: () => setShowActions(true), onMouseLeave: () => !isRenaming && setShowActions(false), style: { paddingLeft: `${level * 1}rem` }, children: isRenaming ? (_jsxs("div", { className: "flex items-center px-2 py-1", children: [_jsx(FileIcon, { className: "h-4 w-4 mr-0.5 text-gray-500 flex-shrink-0" }), _jsx("div", { className: "flex-1", children: _jsx(SimpleInlineInput, { value: newName, onChange: setNewName, onSubmit: handleRename, onCancel: cancelRename }) })] })) : (_jsx("div", { className: "flex items-center justify-between", children: _jsxs("button", { className: `flex items-center flex-1 text-left px-2 py-1 hover:bg-muted rounded truncate select-none ${selectedPath === entry.path ? "bg-accent" : ""}`, onClick: () => onSelect(entry), onDoubleClick: startRename, title: entry.path, children: [_jsx(FileIcon, { className: "h-4 w-4 mr-[6px] text-gray-500 flex-shrink-0" }), _jsx("span", { children: entry.name })] }) })) }));
}
// Component for directory entries
function DirectoryItem({ entry, level, onSelect, selectedPath, onDelete, onCreateFile, onCreateDirectory, onRename, expandedDirs, setExpandedDirs, }) {
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [isCreatingDirectory, setIsCreatingDirectory] = useState(false);
    const [newDirectoryName, setNewDirectoryName] = useState("");
    const [showActions, setShowActions] = useState(false);
    const toggleExpanded = (e) => {
        if (e.target.closest(".action-icon")) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        setExpandedDirs((prev) => ({
            ...prev,
            [entry.path]: !prev[entry.path],
        }));
    };
    const handleCreateFile = () => {
        if (newFileName) {
            const parentPath = entry.path === "/" ? "" : entry.path;
            onCreateFile(`${parentPath}/${newFileName}`);
            setNewFileName("");
            setIsCreatingFile(false);
        }
    };
    const handleCreateDirectory = () => {
        if (newDirectoryName) {
            const parentPath = entry.path === "/" ? "" : entry.path;
            onCreateDirectory(`${parentPath}/${newDirectoryName}`);
            setNewDirectoryName("");
            setIsCreatingDirectory(false);
        }
    };
    const startCreateFile = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsCreatingFile(true);
        setIsCreatingDirectory(false);
    };
    const startCreateDirectory = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsCreatingDirectory(true);
        setIsCreatingFile(false);
    };
    const cancelCreate = () => {
        setIsCreatingFile(false);
        setNewFileName("");
        setIsCreatingDirectory(false);
        setNewDirectoryName("");
    };
    const indentStyle = { paddingLeft: `${level * 1 + 0.5}rem` };
    const childIndentStyle = { paddingLeft: `${(level + 1) * 1 + 0.5}rem` };
    const isExpanded = expandedDirs[entry.path];
    return (_jsx("li", { className: "py-0.5 group/item relative select-none", onMouseEnter: () => setShowActions(true), onMouseLeave: () => {
            if (!isCreatingFile && !isCreatingDirectory) {
                setShowActions(false);
            }
        }, children: _jsxs("details", { className: "group select-none", open: isExpanded, children: [_jsx("summary", { className: `flex items-center justify-between px-2 py-1 cursor-pointer hover:bg-muted rounded list-none select-none ${selectedPath === entry.path ? "bg-accent" : ""} relative z-10`, onClick: toggleExpanded, style: indentStyle, children: _jsxs("div", { className: "flex items-center overflow-hidden", children: [_jsxs("div", { className: "relative h-4 w-4 mr-[6px] flex-shrink-0", children: [_jsx(motion.div, { className: "absolute inset-0 flex items-center justify-center", initial: false, animate: { opacity: isExpanded ? 0 : 1 }, transition: { duration: 0.2 }, children: _jsx(FolderIcon, { className: "h-4 w-4 text-blue-500" }) }), _jsx(motion.div, { className: "absolute inset-0 flex items-center justify-center", initial: false, animate: { opacity: isExpanded ? 1 : 0 }, transition: { duration: 0.2 }, children: _jsx(FolderOpenIcon, { className: "h-4 w-4 text-blue-500" }) })] }), _jsx("span", { className: "truncate", title: entry.name, children: entry.name })] }) }), isCreatingFile && (_jsx("div", { className: "flex gap-1 py-1", style: childIndentStyle, children: _jsx(InlineInputForm, { placeholder: "filename.js", value: newFileName, onChange: setNewFileName, onSubmit: handleCreateFile, onCancel: cancelCreate }) })), isCreatingDirectory && (_jsx("div", { className: "flex gap-1 py-1", style: childIndentStyle, children: _jsx(InlineInputForm, { placeholder: "folder-name", value: newDirectoryName, onChange: setNewDirectoryName, onSubmit: handleCreateDirectory, onCancel: cancelCreate }) })), _jsxs("div", { className: "mt-0.5 relative", children: [isExpanded && entry.children && entry.children.length > 0 && (_jsx("div", { className: "absolute left-3 top-0 bottom-0 w-px bg-gray-200/0 dark:bg-gray-700/0 transition-colors duration-200 group-hover:bg-gray-200 group-hover:dark:bg-gray-700", style: { left: `${level * 16 + 10}px` } })), entry.children && entry.children.length > 0 ? (_jsx(FileList, { items: entry.children, level: level + 1, onSelect: onSelect, selectedPath: selectedPath, onDelete: onDelete, onCreateFile: onCreateFile, onCreateDirectory: onCreateDirectory, onRename: onRename, expandedDirs: expandedDirs, setExpandedDirs: setExpandedDirs })) : (!isCreatingFile &&
                            !isCreatingDirectory && (_jsx("div", { className: "text-xs text-muted-foreground px-2 py-1", style: childIndentStyle, children: "Empty directory" })))] })] }) }));
}
// Renamed from FileTreeRecursive to FileList for clarity
function FileList({ items, level, onSelect, selectedPath, onDelete, onCreateFile, onCreateDirectory, onRename, expandedDirs, setExpandedDirs, }) {
    return (_jsx("ul", { className: "text-sm py-0.5 relative group/tree select-none", children: items.map((entry, index) => (_jsxs("div", { className: "relative", children: [index < items.length - 1 && level > 0 && (_jsx("div", { className: "absolute left-0 top-4 bottom-0 w-px bg-gray-200/0 dark:bg-gray-700/0 transition-colors duration-200 group-hover/tree:bg-gray-200 group-hover/tree:dark:bg-gray-700", style: { left: `${(level - 1) * 16 + 10}px` } })), level > 0 && (_jsx("div", { className: "absolute w-4 h-px bg-gray-200/0 dark:bg-gray-700/0 transition-colors duration-200 group-hover/tree:bg-gray-200 group-hover/tree:dark:bg-gray-700", style: {
                        left: `${(level - 1) * 16 + 10}px`,
                        top: "14px",
                        zIndex: 0,
                    } })), entry.type === "dir" ? (_jsx(DirectoryItem, { entry: entry, level: level, onSelect: onSelect, selectedPath: selectedPath, onDelete: onDelete, onCreateFile: onCreateFile, onCreateDirectory: onCreateDirectory, onRename: onRename, expandedDirs: expandedDirs, setExpandedDirs: setExpandedDirs })) : (_jsx(FileItem, { entry: entry, level: level, onSelect: onSelect, selectedPath: selectedPath, onDelete: onDelete, onRename: onRename }))] }, entry.path))) }));
}
export function FileTree({ entries, onSelect, selectedPath, onDelete, isLoading, onCreateFile, onCreateDirectory, onRename, }) {
    const [expandedDirs, setExpandedDirs] = useState({});
    useEffect(() => {
        if (entries.length > 0 && !isLoading) {
            const allDirPaths = getAllDirectoryPaths(entries);
            const initialExpandedState = allDirPaths.reduce((acc, path) => {
                acc[path] = true;
                return acc;
            }, {});
            const currentDirPaths = Object.keys(expandedDirs);
            const entriesChanged = allDirPaths.length !== currentDirPaths.length ||
                allDirPaths.some((path) => !currentDirPaths.includes(path));
            if (Object.keys(expandedDirs).length === 0 || entriesChanged) {
                setExpandedDirs(initialExpandedState);
            }
        }
    }, [entries, isLoading]);
    const getAllDirectoryPaths = (items) => {
        let paths = [];
        for (const item of items) {
            if (item.type === "dir") {
                paths.push(item.path);
                if (item.children) {
                    paths = paths.concat(getAllDirectoryPaths(item.children));
                }
            }
        }
        return paths;
    };
    if (isLoading && entries.length === 0) {
        return (_jsx("div", { className: "flex justify-center items-center py-8 select-none", children: _jsx(Loader2Icon, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }));
    }
    return (_jsx("div", { className: "select-none", children: entries.length === 0 && !isLoading ? (_jsx("div", { className: "px-2 text-muted-foreground py-4 text-sm", children: "No files found" })) : (_jsx(FileList, { items: entries, level: 0, onSelect: onSelect, selectedPath: selectedPath, onDelete: onDelete, onCreateFile: onCreateFile, onCreateDirectory: onCreateDirectory, onRename: onRename, expandedDirs: expandedDirs, setExpandedDirs: setExpandedDirs })) }));
}
//# sourceMappingURL=component.js.map