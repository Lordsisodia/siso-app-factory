/**
 * Authentication Context Provider
 * Generic auth context that can be adapted to any auth system (Supabase, Firebase, etc.)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

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

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
  authService: {
    onAuthStateChange: (callback: (user: any) => void) => () => void;
    getSession: () => Promise<any>;
    signIn: (email: string, password: string) => Promise<{ user: any; error?: any }>;
    signUp: (email: string, password: string) => Promise<{ user: any; error?: any }>;
    signOut: () => Promise<{ error?: any }>;
  };
  profileService?: {
    fetchProfile: (userId: string) => Promise<UserProfile | null>;
  };
  adminRoleCheck?: (profile: UserProfile | null) => boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authService,
  profileService,
  adminRoleCheck = (profile) => profile?.role === 'admin'
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (userId: string) => {
    if (!profileService) return null;

    try {
      const profileData = await profileService.fetchProfile(userId);
      return profileData;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (!user) return;

    try {
      const profileData = await fetchProfile(user.id);
      if (profileData) {
        setProfile(profileData);
        setIsAdmin(adminRoleCheck(profileData));
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = authService.onAuthStateChange(async (authUser) => {
      setUser(authUser);

      if (authUser && profileService) {
        const profileData = await fetchProfile(authUser.id);
        if (profileData) {
          setProfile(profileData);
          setIsAdmin(adminRoleCheck(profileData));
        }
      } else {
        setProfile(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    // Check for existing session
    authService.getSession().then(async ({ user: sessionUser }) => {
      setUser(sessionUser);

      if (sessionUser && profileService) {
        const profileData = await fetchProfile(sessionUser.id);
        if (profileData) {
          setProfile(profileData);
          setIsAdmin(adminRoleCheck(profileData));
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { error: signInError } = await authService.signIn(email, password);
      if (signInError) throw signInError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { error: signUpError } = await authService.signUp(email, password);
      if (signUpError) throw signUpError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error: signOutError } = await authService.signOut();
      if (signOutError) throw signOutError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading,
        error,
        isAdmin,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
