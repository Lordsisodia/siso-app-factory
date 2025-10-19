import React from 'react';
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
import { LogOut, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export interface AdminSidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  badge?: number;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  sidebarItems: AdminSidebarItem[];
  brandName?: string;
  brandLogo?: React.ReactNode;
  user?: {
    email?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
  };
  onSignOut?: () => void;
  profileLink?: string;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  sidebarItems,
  brandName = 'Admin Panel',
  brandLogo,
  user,
  onSignOut,
  profileLink = '/admin/profile',
  className = ''
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
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

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full bg-gray-50 ${className}`}>
        <Sidebar>
          <SidebarContent>
            {/* Logo */}
            <div className="p-6 flex items-center">
              <Link to="/admin" className="text-2xl font-bold text-primary flex items-center">
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
                      <Link to={item.href} className="relative">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
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
                  <Link to={profileLink}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
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

export default AdminLayout;
