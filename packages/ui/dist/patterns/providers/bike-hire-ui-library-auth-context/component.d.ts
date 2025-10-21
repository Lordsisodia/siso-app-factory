/**
 * Authentication Context Provider
 * Generic auth context that can be adapted to any auth system (Supabase, Firebase, etc.)
 */
import React from 'react';
export interface UserProfile {
    id: string;
    role?: 'admin' | 'user' | string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    [key: string]: any;
}
export interface AuthContextValue {
    user: any | null;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}
export interface AuthProviderProps {
    children: React.ReactNode;
    authService: {
        onAuthStateChange: (callback: (user: any) => void) => () => void;
        getSession: () => Promise<any>;
        signIn: (email: string, password: string) => Promise<{
            user: any;
            error?: any;
        }>;
        signUp: (email: string, password: string) => Promise<{
            user: any;
            error?: any;
        }>;
        signOut: () => Promise<{
            error?: any;
        }>;
    };
    profileService?: {
        fetchProfile: (userId: string) => Promise<UserProfile | null>;
    };
    adminRoleCheck?: (profile: UserProfile | null) => boolean;
}
export declare const AuthProvider: React.FC<AuthProviderProps>;
export declare const useAuth: () => AuthContextValue;
export default AuthProvider;
//# sourceMappingURL=component.d.ts.map