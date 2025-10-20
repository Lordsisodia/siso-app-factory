
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
} from '@siso/ui';
import { cn } from "@siso/ui/lib/utils";
import { BarChart3, CalendarDays, Car, LogOut, MessageSquare, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@siso/ui';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@siso/ui';

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, signOut, profile } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin' },
    { icon: Car, label: 'Manage Cars', href: '/admin/cars' },
    { icon: CalendarDays, label: 'Bookings', href: '/admin/bookings', badge: 3 },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages', badge: 5 },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Extract user initials for avatar fallback
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
    }
    if (!user || !user.email) return 'A';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            {/* Logo */}
            <div className="p-6 flex items-center">
              <Link to="/admin" className="text-2xl font-bold text-primary flex items-center">
                <span className="mr-1">ADMIN</span>
                <span className="text-accent font-light">PANEL</span>
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
                      <Link to={item.href} className="relative">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full text-xs px-0.5"
                          >
                            {item.badge}
                          </Badge>
                        )}
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
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3 group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium">{user?.email || 'Admin'}</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile">
                        <Users className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
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
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Admin
              </Badge>
              <Avatar className="cursor-pointer">
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

export default AdminLayout;
