import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, LogOut, Settings, CalendarClock } from 'lucide-react';
export const NavBar = ({ brandName = 'Brand', brandLogo, navLinks = [], user, onSignOut, onSignIn, showAuthButton = true, className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleSignOut = async () => {
        if (onSignOut) {
            await onSignOut();
        }
        navigate('/');
    };
    const handleSignIn = () => {
        if (onSignIn) {
            onSignIn();
        }
        else {
            navigate('/auth');
        }
    };
    const getInitials = () => {
        if (!user?.email)
            return 'U';
        return user.email.substring(0, 2).toUpperCase();
    };
    // Filter links based on auth requirement
    const visibleLinks = navLinks.filter(link => !link.authRequired || (link.authRequired && user));
    return (_jsxs("nav", { className: `bg-white border-b ${className}`, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between h-16", children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0 flex items-center", children: _jsx(Link, { to: "/", className: "font-bold text-xl flex items-center", children: brandLogo || brandName }) }), _jsx("div", { className: "hidden sm:ml-6 sm:flex sm:space-x-8", children: visibleLinks.map((link) => (_jsx(Link, { to: link.href, className: "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary", children: link.label }, link.href))) })] }), _jsx("div", { className: "hidden sm:ml-6 sm:flex sm:items-center", children: user && showAuthButton ? (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: user.avatar, alt: "User" }), _jsx(AvatarFallback, { children: getInitials() })] }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => navigate('/bookings'), children: [_jsx(CalendarClock, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "My Bookings" })] }), _jsxs(DropdownMenuItem, { onClick: () => navigate('/dashboard/profile'), children: [_jsx(User, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Profile" })] }), _jsxs(DropdownMenuItem, { onClick: () => navigate('/dashboard/settings'), children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: handleSignOut, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Sign out" })] })] })] })) : showAuthButton ? (_jsx(Button, { onClick: handleSignIn, variant: "default", children: "Sign In" })) : null }), _jsx("div", { className: "-mr-2 flex items-center sm:hidden", children: _jsxs("button", { onClick: toggleMenu, className: "inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary", children: [_jsx("span", { className: "sr-only", children: "Open main menu" }), isMenuOpen ? (_jsx(X, { className: "block h-6 w-6" })) : (_jsx(Menu, { className: "block h-6 w-6" }))] }) })] }) }), isMenuOpen && (_jsxs("div", { className: "sm:hidden", children: [_jsx("div", { className: "pt-2 pb-3 space-y-1", children: visibleLinks.map((link) => (_jsx(Link, { to: link.href, className: "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900", onClick: toggleMenu, children: link.label }, link.href))) }), _jsx("div", { className: "pt-4 pb-3 border-t border-gray-200", children: user && showAuthButton ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center px-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs(Avatar, { className: "h-10 w-10", children: [_jsx(AvatarImage, { src: user.avatar, alt: "User" }), _jsx(AvatarFallback, { children: getInitials() })] }) }), _jsx("div", { className: "ml-3", children: _jsx("div", { className: "text-base font-medium text-gray-800 truncate max-w-[200px]", children: user.email }) })] }), _jsxs("div", { className: "mt-3 space-y-1", children: [_jsx("button", { onClick: () => {
                                                navigate('/bookings');
                                                toggleMenu();
                                            }, className: "block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100", children: "My Bookings" }), _jsx("button", { onClick: () => {
                                                navigate('/dashboard/profile');
                                                toggleMenu();
                                            }, className: "block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100", children: "Profile" }), _jsx("button", { onClick: () => {
                                                navigate('/dashboard/settings');
                                                toggleMenu();
                                            }, className: "block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100", children: "Settings" }), _jsx("button", { onClick: () => {
                                                handleSignOut();
                                                toggleMenu();
                                            }, className: "block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100", children: "Sign out" })] })] })) : showAuthButton ? (_jsx("div", { className: "mt-3 space-y-1", children: _jsx("button", { onClick: () => {
                                    handleSignIn();
                                    toggleMenu();
                                }, className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90", children: "Sign In" }) })) : null })] }))] }));
};
export default NavBar;
//# sourceMappingURL=component.js.map