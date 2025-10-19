import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { cn } from "@/lib/utils";
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  brandName?: string;
  brandLogo?: React.ReactNode;
  user?: {
    email?: string;
    avatar?: string;
  };
  onSignOut?: () => void;
  profileLink?: string;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarItems,
  brandName = 'Dashboard',
  brandLogo,
  user,
  onSignOut,
  profileLink = '/dashboard/profile',
  className
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Extract user initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className={cn("min-h-screen flex w-full bg-gray-50", className)}>
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            {/* Logo */}
            <div className="p-6 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary flex items-center">
                {brandLogo || brandName}
              </Link>
            </div>

            {/* Navigation */}
            <div className="px-3 py-2">
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>

          {/* User Profile at Bottom */}
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium">{user?.email || 'My Account'}</p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={profileLink}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    {onSignOut && (
                      <DropdownMenuItem onClick={onSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm h-16 flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
