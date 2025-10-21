import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Authentication Context Provider
 * Generic auth context that can be adapted to any auth system (Supabase, Firebase, etc.)
 */
import { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, authService, profileService, adminRoleCheck = (profile) => profile?.role === 'admin' }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const fetchProfile = async (userId) => {
        if (!profileService)
            return null;
        try {
            const profileData = await profileService.fetchProfile(userId);
            return profileData;
        }
        catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    };
    const refreshProfile = async () => {
        if (!user)
            return;
        try {
            const profileData = await fetchProfile(user.id);
            if (profileData) {
                setProfile(profileData);
                setIsAdmin(adminRoleCheck(profileData));
            }
        }
        catch (error) {
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
            }
            else {
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
    const signIn = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const { error: signInError } = await authService.signIn(email, password);
            if (signInError)
                throw signInError;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const signUp = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const { error: signUpError } = await authService.signUp(email, password);
            if (signUpError)
                throw signUpError;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const signOut = async () => {
        try {
            setLoading(true);
            const { error: signOutError } = await authService.signOut();
            if (signOutError)
                throw signOutError;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            profile,
            signIn,
            signUp,
            signOut,
            loading,
            error,
            isAdmin,
            refreshProfile
        }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export default AuthProvider;
//# sourceMappingURL=component.js.map