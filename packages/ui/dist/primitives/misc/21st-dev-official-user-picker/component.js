"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Spinner } from "@/components/icons/spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { useDebouncedState } from "@/hooks/use-debounced-state";
import { getUsersAction } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";
import { CommandLoading } from "cmdk";
import { useMemo, useState } from "react";
export function UserPicker({ onSelect, disabled, }) {
    const [open, setOpen] = useState(false);
    const [search, debouncedSearch, setSearch] = useDebouncedState("", 1000);
    const { data: users, isLoading } = useQuery({
        queryKey: ["users", debouncedSearch],
        queryFn: async () => {
            if (debouncedSearch.length === 0) {
                return [];
            }
            return await getUsersAction({
                searchQuery: debouncedSearch,
            });
        },
    });
    const options = useMemo(() => {
        return (users?.map((user) => ({
            value: user.id,
            user,
        })) ?? []);
    }, [users]);
    const handleUserSelect = async (value) => {
        onSelect(value);
        setOpen(false);
    };
    // Editable dropdown with search
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", disabled: disabled, children: "Transfer ownership" }) }), _jsx(PopoverContent, { align: "end", className: "p-0 w-[300px]", children: _jsxs(Command, { shouldFilter: false, className: "max-h-[200px]", children: [_jsx(CommandInput, { placeholder: "Search...", value: search, onValueChange: (value) => setSearch(value) }), _jsxs(CommandList, { children: [!isLoading && (_jsx(CommandEmpty, { children: "No users or empty search" })), isLoading && (_jsx(CommandLoading, { className: "flex items-center justify-center p-4", children: _jsx(Spinner, { size: 16 }) })), _jsx(CommandGroup, { children: options.map((option) => {
                                        return (_jsx(CommandItem, { value: option.value, onSelect: (value) => {
                                                handleUserSelect(value);
                                            }, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Avatar, { className: "h-6 w-6", children: _jsx(AvatarImage, { src: option.user.display_image_url ??
                                                                option.user.image_url ??
                                                                "" }) }), _jsxs("div", { className: "flex flex-row gap-2", children: [_jsx("p", { children: option.user.username }), _jsx("p", { className: "text-muted-foreground", children: option.user.display_username })] })] }) }, option.value));
                                    }) })] })] }) })] }));
}
//# sourceMappingURL=component.js.map