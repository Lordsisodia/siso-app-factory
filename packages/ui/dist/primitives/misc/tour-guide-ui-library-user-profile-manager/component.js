"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Phone, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";
import { getCurrentUserProfileAction, updateUserProfileAction, syncClerkUserAction } from "@/actions/db/users-actions";
export default function UserProfileManager({ initialProfile, className = "" }) {
    const { user, isLoaded } = useUser();
    const [profile, setProfile] = useState(initialProfile || null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        preferredLanguage: "en"
    });
    // Load user profile on component mount
    useEffect(() => {
        if (isLoaded && user && !profile) {
            loadUserProfile();
        }
    }, [isLoaded, user, profile]);
    // Update form data when profile changes
    useEffect(() => {
        if (profile) {
            setFormData({
                firstName: profile.first_name || "",
                lastName: profile.last_name || "",
                phone: profile.phone || "",
                preferredLanguage: profile.preferred_language || "en"
            });
        }
    }, [profile]);
    const loadUserProfile = async () => {
        setIsLoading(true);
        try {
            const result = await getCurrentUserProfileAction();
            if (result.isSuccess) {
                setProfile(result.data);
            }
            else if (user) {
                // If no profile exists, create one from Clerk data
                await syncUserProfile();
            }
        }
        catch (error) {
            console.error("Error loading user profile:", error);
            toast.error("Failed to load user profile");
        }
        finally {
            setIsLoading(false);
        }
    };
    const syncUserProfile = async () => {
        if (!user)
            return;
        setIsSyncing(true);
        try {
            const result = await syncClerkUserAction({
                id: user.id,
                emailAddresses: user.emailAddresses || [],
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumbers: user.phoneNumbers || []
            });
            if (result.isSuccess) {
                setProfile(result.data);
                toast.success("Profile synchronized successfully");
            }
            else {
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error("Error syncing user profile:", error);
            toast.error("Failed to sync profile");
        }
        finally {
            setIsSyncing(false);
        }
    };
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!user || !profile)
            return;
        setIsLoading(true);
        try {
            const result = await updateUserProfileAction(user.id, {
                firstName: formData.firstName || null,
                lastName: formData.lastName || null,
                phone: formData.phone || null,
                preferredLanguage: formData.preferredLanguage
            });
            if (result.isSuccess) {
                setProfile(result.data);
                toast.success("Profile updated successfully");
            }
            else {
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const getUserTypeDisplay = (userType) => {
        const types = {
            customer: { label: "Customer", variant: "default" },
            salesperson: { label: "Salesperson", variant: "secondary" },
            operator: { label: "Operator", variant: "outline" },
            admin: { label: "Administrator", variant: "destructive" }
        };
        return (types[userType] || {
            label: userType,
            variant: "default"
        });
    };
    if (!isLoaded) {
        return (_jsx("div", { className: `flex items-center justify-center p-8 ${className}`, children: _jsx(Loader2, { className: "size-6 animate-spin text-orange-500" }) }));
    }
    if (!user) {
        return (_jsx(Card, { className: `border-gray-700 bg-gray-800 ${className}`, children: _jsx(CardContent, { className: "p-6", children: _jsx("p", { className: "text-center text-gray-400", children: "Please sign in to view your profile" }) }) }));
    }
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(User, { className: "size-6 text-orange-500" }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: "User Profile" }), _jsx(CardDescription, { className: "text-gray-400", children: "Manage your account information" })] })] }), profile && (_jsx(Badge, { variant: getUserTypeDisplay(profile.user_type).variant, children: getUserTypeDisplay(profile.user_type).label }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-400", children: [_jsx(Mail, { className: "size-4" }), _jsx("span", { children: user.emailAddresses?.[0]?.emailAddress })] }), profile && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-400", children: [_jsx(Calendar, { className: "size-4" }), _jsxs("span", { children: ["Member since", " ", new Date(profile.created_at).toLocaleDateString()] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-400", children: [_jsx("span", { className: `size-2 rounded-full ${profile.status === "active"
                                                    ? "bg-green-500"
                                                    : profile.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"}` }), _jsxs("span", { children: ["Status: ", profile.status] })] })] })), !profile && (_jsx(Button, { onClick: syncUserProfile, disabled: isSyncing, className: "w-full bg-orange-600 hover:bg-orange-700", children: isSyncing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 size-4 animate-spin" }), "Syncing Profile..."] })) : ("Create Profile") }))] })] }), profile && (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Profile Details" }), _jsx(CardDescription, { className: "text-gray-400", children: "Update your personal information" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "firstName", className: "text-gray-300", children: "First Name" }), _jsx(Input, { id: "firstName", value: formData.firstName, onChange: e => handleInputChange("firstName", e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Enter your first name" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "lastName", className: "text-gray-300", children: "Last Name" }), _jsx(Input, { id: "lastName", value: formData.lastName, onChange: e => handleInputChange("lastName", e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Enter your last name" })] })] }), _jsxs("div", { children: [_jsxs(Label, { htmlFor: "phone", className: "text-gray-300", children: [_jsx(Phone, { className: "mr-1 inline size-4" }), "Phone Number"] }), _jsx(Input, { id: "phone", value: formData.phone, onChange: e => handleInputChange("phone", e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Enter your phone number" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "language", className: "text-gray-300", children: "Preferred Language" }), _jsxs("select", { id: "language", value: formData.preferredLanguage, onChange: e => handleInputChange("preferredLanguage", e.target.value), className: "w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white", children: [_jsx("option", { value: "en", children: "English" }), _jsx("option", { value: "es", children: "Espa\u00F1ol" }), _jsx("option", { value: "de", children: "Deutsch" }), _jsx("option", { value: "fr", children: "Fran\u00E7ais" })] })] }), _jsx(Button, { type: "submit", disabled: isLoading, className: "w-full bg-orange-600 hover:bg-orange-700", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 size-4 animate-spin" }), "Updating..."] })) : ("Update Profile") })] }) })] }))] }));
}
//# sourceMappingURL=component.js.map