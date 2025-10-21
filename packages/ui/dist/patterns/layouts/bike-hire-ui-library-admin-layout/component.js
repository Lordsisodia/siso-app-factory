import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarProvider, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
export const AdminLayout = ({ children, sidebarItems, brandName = 'Admin Panel', brandLogo, user, onSignOut, profileLink = '/admin/profile', className = '' }) => {
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const getInitials = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'A';
    };
    return (_jsx(SidebarProvider, { children: _jsxs("div", { className: `min-h-screen flex w-full bg-gray-50 ${className}`, children: [_jsxs(Sidebar, { children: [_jsxs(SidebarContent, { children: [_jsx("div", { className: "p-6 flex items-center", children: _jsx(Link, { to: "/admin", className: "text-2xl font-bold text-primary flex items-center", children: brandLogo || brandName }) }), _jsx("div", { className: "px-3 py-2", children: _jsx(SidebarMenu, { children: sidebarItems.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, isActive: isActive(item.href), tooltip: item.label, children: _jsxs(Link, { to: item.href, className: "relative", children: [_jsx(item.icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label }), item.badge !== undefined && item.badge > 0 && (_jsx(Badge, { variant: "destructive", className: "absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full text-xs px-0.5", children: item.badge }))] }) }) }, item.label))) }) })] }), _jsx("div", { className: "mt-auto p-4 border-t", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs("div", { className: "flex items-center cursor-pointer", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: user?.avatar }), _jsx(AvatarFallback, { children: getInitials() })] }), _jsxs("div", { className: "ml-3 group-data-[collapsible=icon]:hidden", children: [_jsx("p", { className: "text-sm font-medium", children: user?.email || 'Admin' }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Administrator" })] })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "Admin Panel" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: profileLink, children: [_jsx(Users, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "My Profile" })] }) }), onSignOut && (_jsxs(DropdownMenuItem, { onClick: onSignOut, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Sign out" })] }))] })] }) })] }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "bg-white shadow-sm h-16 flex items-center px-6 sticky top-0 z-10", children: [_jsx(SidebarTrigger, {}), _jsxs("div", { className: "ml-auto flex items-center space-x-4", children: [_jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary border-primary/20", children: "Admin" }), _jsxs(Avatar, { className: "cursor-pointer", children: [_jsx(AvatarImage, { src: user?.avatar }), _jsx(AvatarFallback, { children: getInitials() })] })] })] }), _jsx("main", { className: "flex-1 overflow-auto", children: children })] })] }) }));
};
export default AdminLayout;
//# sourceMappingURL=component.js.map