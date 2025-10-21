"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateActivitySupabaseAction } from "@/actions/supabase-activities-actions";
export default function ActivityEditForm({ activity }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: activity.title || "",
        shortDescription: activity.short_description || "",
        description: activity.description || "",
        category: activity.category || "water_sports",
        location: activity.location || "",
        meetingPoint: activity.meeting_point || "",
        durationMinutes: activity.duration_minutes || 120,
        maxParticipants: activity.max_participants || 8,
        minParticipants: activity.min_participants || 1,
        minAge: activity.min_age,
        maxAge: activity.max_age,
        includedItems: activity.included_items || [],
        excludedItems: activity.excluded_items || [],
        whatToBring: activity.what_to_bring || [],
        cancellationPolicy: activity.cancellation_policy || "",
        safetyRequirements: activity.safety_requirements || "",
        weatherDependent: activity.weather_dependent || false,
        instantConfirmation: activity.instant_confirmation !== false,
        featured: activity.featured || false,
        status: activity.status || "draft",
        videoUrl: activity.video_url || ""
    });
    const [includedItemInput, setIncludedItemInput] = useState("");
    const [excludedItemInput, setExcludedItemInput] = useState("");
    const [whatToBringInput, setWhatToBringInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }
        if (!formData.shortDescription.trim()) {
            newErrors.shortDescription = "Short description is required";
        }
        if (!formData.location.trim()) {
            newErrors.location = "Location is required";
        }
        if (formData.durationMinutes <= 0) {
            newErrors.durationMinutes = "Duration must be greater than 0";
        }
        if (formData.maxParticipants <= 0) {
            newErrors.maxParticipants = "Max participants must be greater than 0";
        }
        if (formData.minParticipants > formData.maxParticipants) {
            newErrors.minParticipants =
                "Min participants cannot exceed max participants";
        }
        if (formData.minAge &&
            formData.maxAge &&
            formData.minAge > formData.maxAge) {
            newErrors.minAge = "Min age cannot exceed max age";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            // Send camelCase data - the updateActivitySupabaseAction will handle the mapping
            const updateData = {
                title: formData.title.trim(),
                shortDescription: formData.shortDescription.trim(),
                description: formData.description.trim(),
                category: formData.category,
                location: formData.location.trim(),
                meetingPoint: formData.meetingPoint.trim(),
                durationMinutes: formData.durationMinutes,
                maxParticipants: formData.maxParticipants,
                minParticipants: formData.minParticipants,
                minAge: formData.minAge,
                maxAge: formData.maxAge,
                includedItems: formData.includedItems,
                excludedItems: formData.excludedItems,
                whatToBring: formData.whatToBring,
                cancellationPolicy: formData.cancellationPolicy.trim(),
                safetyRequirements: formData.safetyRequirements.trim(),
                weatherDependent: formData.weatherDependent,
                instantConfirmation: formData.instantConfirmation,
                featured: formData.featured,
                status: formData.status,
                videoUrl: formData.videoUrl.trim() || null
            };
            const response = await updateActivitySupabaseAction(activity.id, updateData);
            if (response.isSuccess) {
                alert("Activity updated successfully");
                router.push("/admin/activities");
            }
            else {
                alert("Failed to update activity");
            }
        }
        catch (error) {
            console.error("Error updating activity:", error);
            alert("Error updating activity");
        }
        finally {
            setIsLoading(false);
        }
    }; // Helper functions for managing lists
    const addItem = (array, item, setter) => {
        if (item.trim()) {
            setter([...array, item.trim()]);
        }
    };
    const removeItem = (array, index, setter) => {
        setter(array.filter((_, i) => i !== index));
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-gray-700 pb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Edit Activity Details" }), _jsx("p", { className: "text-gray-400", children: "Update the information for this activity" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { type: "button", variant: "outline", onClick: () => router.push("/admin/activities"), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "mr-2 size-4" }), "Back to Activities"] }), _jsxs(Button, { type: "submit", disabled: isLoading, className: "bg-orange-600 text-white hover:bg-orange-700", children: [_jsx(Save, { className: "mr-2 size-4" }), isLoading ? "Saving..." : "Save Changes"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-3", children: [_jsxs("div", { className: "space-y-8 lg:col-span-2", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Basic Information" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", className: "text-gray-300", children: "Activity Title *" }), _jsx(Input, { id: "title", value: formData.title, onChange: e => setFormData({ ...formData, title: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Enter activity title" }), errors.title && (_jsx("p", { className: "text-sm text-red-400", children: errors.title }))] }), " ", _jsxs("div", { children: [_jsx(Label, { htmlFor: "shortDescription", className: "text-gray-300", children: "Short Description *" }), _jsx(Textarea, { id: "shortDescription", value: formData.shortDescription, onChange: e => setFormData({
                                                            ...formData,
                                                            shortDescription: e.target.value
                                                        }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Brief description for listings", rows: 3 }), errors.shortDescription && (_jsx("p", { className: "text-sm text-red-400", children: errors.shortDescription }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", className: "text-gray-300", children: "Full Description" }), _jsx(Textarea, { id: "description", value: formData.description, onChange: e => setFormData({ ...formData, description: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Detailed activity description", rows: 6 })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "category", className: "text-gray-300", children: "Category *" }), _jsxs(Select, { value: formData.category, onValueChange: value => setFormData({ ...formData, category: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-900 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { className: "border-gray-600 bg-gray-800", children: [_jsx(SelectItem, { value: "water_sports", children: "Water Sports" }), _jsx(SelectItem, { value: "land_adventures", children: "Land Adventures" }), _jsx(SelectItem, { value: "cultural", children: "Cultural" }), _jsx(SelectItem, { value: "nightlife", children: "Nightlife" }), _jsx(SelectItem, { value: "family_fun", children: "Family Fun" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "status", className: "text-gray-300", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: value => setFormData({ ...formData, status: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-900 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { className: "border-gray-600 bg-gray-800", children: [_jsx(SelectItem, { value: "draft", children: "Draft" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] })] })] }), " ", _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Location & Meeting Point" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "location", className: "text-gray-300", children: "Location *" }), _jsx(Input, { id: "location", value: formData.location, onChange: e => setFormData({ ...formData, location: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "e.g., Palma de Mallorca" }), errors.location && (_jsx("p", { className: "text-sm text-red-400", children: errors.location }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "meetingPoint", className: "text-gray-300", children: "Meeting Point" }), _jsx(Textarea, { id: "meetingPoint", value: formData.meetingPoint, onChange: e => setFormData({ ...formData, meetingPoint: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Detailed meeting point instructions", rows: 3 })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Activity Details" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "durationMinutes", className: "text-gray-300", children: "Duration (minutes) *" }), _jsx(Input, { id: "durationMinutes", type: "number", value: formData.durationMinutes, onChange: e => setFormData({
                                                                    ...formData,
                                                                    durationMinutes: parseInt(e.target.value) || 0
                                                                }), className: "border-gray-600 bg-gray-900 text-white", min: "0" }), errors.durationMinutes && (_jsx("p", { className: "text-sm text-red-400", children: errors.durationMinutes }))] }), " ", _jsxs("div", { children: [_jsx(Label, { htmlFor: "minParticipants", className: "text-gray-300", children: "Min Participants *" }), _jsx(Input, { id: "minParticipants", type: "number", value: formData.minParticipants, onChange: e => setFormData({
                                                                    ...formData,
                                                                    minParticipants: parseInt(e.target.value) || 0
                                                                }), className: "border-gray-600 bg-gray-900 text-white", min: "1" }), errors.minParticipants && (_jsx("p", { className: "text-sm text-red-400", children: errors.minParticipants }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "maxParticipants", className: "text-gray-300", children: "Max Participants *" }), _jsx(Input, { id: "maxParticipants", type: "number", value: formData.maxParticipants, onChange: e => setFormData({
                                                                    ...formData,
                                                                    maxParticipants: parseInt(e.target.value) || 0
                                                                }), className: "border-gray-600 bg-gray-900 text-white", min: "1" }), errors.maxParticipants && (_jsx("p", { className: "text-sm text-red-400", children: errors.maxParticipants }))] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "minAge", className: "text-gray-300", children: "Minimum Age" }), _jsx(Input, { id: "minAge", type: "number", value: formData.minAge || "", onChange: e => setFormData({
                                                                    ...formData,
                                                                    minAge: e.target.value ? parseInt(e.target.value) : null
                                                                }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "No minimum" }), errors.minAge && (_jsx("p", { className: "text-sm text-red-400", children: errors.minAge }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "maxAge", className: "text-gray-300", children: "Maximum Age" }), _jsx(Input, { id: "maxAge", type: "number", value: formData.maxAge || "", onChange: e => setFormData({
                                                                    ...formData,
                                                                    maxAge: e.target.value ? parseInt(e.target.value) : null
                                                                }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "No maximum" })] })] })] })] }), " ", _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "What's Included & Excluded" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "mb-3 block text-gray-300", children: "What's Included" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { value: includedItemInput, onChange: e => setIncludedItemInput(e.target.value), placeholder: "Add item that's included", className: "border-gray-600 bg-gray-900 text-white", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.includedItems, includedItemInput, items => {
                                                                                    setFormData({ ...formData, includedItems: items });
                                                                                    setIncludedItemInput("");
                                                                                });
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", size: "sm", onClick: () => addItem(formData.includedItems, includedItemInput, items => {
                                                                            setFormData({ ...formData, includedItems: items });
                                                                            setIncludedItemInput("");
                                                                        }), className: "bg-orange-600 hover:bg-orange-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: formData.includedItems.map((item, index) => (_jsxs(Badge, { variant: "secondary", className: "bg-green-900 text-green-100 hover:bg-green-800", children: [item, _jsx(X, { className: "ml-1 size-3 cursor-pointer", onClick: () => removeItem(formData.includedItems, index, items => setFormData({ ...formData, includedItems: items })) })] }, index))) })] })] }), " ", _jsxs("div", { children: [_jsx(Label, { className: "mb-3 block text-gray-300", children: "What's NOT Included" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { value: excludedItemInput, onChange: e => setExcludedItemInput(e.target.value), placeholder: "Add item that's not included", className: "border-gray-600 bg-gray-900 text-white", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.excludedItems, excludedItemInput, items => {
                                                                                    setFormData({ ...formData, excludedItems: items });
                                                                                    setExcludedItemInput("");
                                                                                });
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", size: "sm", onClick: () => addItem(formData.excludedItems, excludedItemInput, items => {
                                                                            setFormData({ ...formData, excludedItems: items });
                                                                            setExcludedItemInput("");
                                                                        }), className: "bg-orange-600 hover:bg-orange-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: formData.excludedItems.map((item, index) => (_jsxs(Badge, { variant: "secondary", className: "bg-red-900 text-red-100 hover:bg-red-800", children: [item, _jsx(X, { className: "ml-1 size-3 cursor-pointer", onClick: () => removeItem(formData.excludedItems, index, items => setFormData({ ...formData, excludedItems: items })) })] }, index))) })] })] }), " ", _jsxs("div", { children: [_jsx(Label, { className: "mb-3 block text-gray-300", children: "What Participants Should Bring" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { value: whatToBringInput, onChange: e => setWhatToBringInput(e.target.value), placeholder: "Add item participants should bring", className: "border-gray-600 bg-gray-900 text-white", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.whatToBring, whatToBringInput, items => {
                                                                                    setFormData({ ...formData, whatToBring: items });
                                                                                    setWhatToBringInput("");
                                                                                });
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", size: "sm", onClick: () => addItem(formData.whatToBring, whatToBringInput, items => {
                                                                            setFormData({ ...formData, whatToBring: items });
                                                                            setWhatToBringInput("");
                                                                        }), className: "bg-orange-600 hover:bg-orange-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: formData.whatToBring.map((item, index) => (_jsxs(Badge, { variant: "secondary", className: "bg-blue-900 text-blue-100 hover:bg-blue-800", children: [item, _jsx(X, { className: "ml-1 size-3 cursor-pointer", onClick: () => removeItem(formData.whatToBring, index, items => setFormData({ ...formData, whatToBring: items })) })] }, index))) })] })] })] })] })] }), " ", _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Settings" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "featured", checked: formData.featured, onCheckedChange: checked => setFormData({ ...formData, featured: checked }) }), _jsx(Label, { htmlFor: "featured", className: "text-gray-300", children: "Featured Activity" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "weatherDependent", checked: formData.weatherDependent, onCheckedChange: checked => setFormData({
                                                            ...formData,
                                                            weatherDependent: checked
                                                        }) }), _jsx(Label, { htmlFor: "weatherDependent", className: "text-gray-300", children: "Weather Dependent" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "instantConfirmation", checked: formData.instantConfirmation, onCheckedChange: checked => setFormData({
                                                            ...formData,
                                                            instantConfirmation: checked
                                                        }) }), _jsx(Label, { htmlFor: "instantConfirmation", className: "text-gray-300", children: "Instant Confirmation" })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Policies & Safety" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "cancellationPolicy", className: "text-gray-300", children: "Cancellation Policy" }), _jsx(Textarea, { id: "cancellationPolicy", value: formData.cancellationPolicy, onChange: e => setFormData({
                                                            ...formData,
                                                            cancellationPolicy: e.target.value
                                                        }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Describe cancellation terms", rows: 4 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "safetyRequirements", className: "text-gray-300", children: "Safety Requirements" }), _jsx(Textarea, { id: "safetyRequirements", value: formData.safetyRequirements, onChange: e => setFormData({
                                                            ...formData,
                                                            safetyRequirements: e.target.value
                                                        }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Important safety information", rows: 4 })] })] })] }), " ", _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Media" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { htmlFor: "videoUrl", className: "text-gray-300", children: "Video URL" }), _jsx(Input, { id: "videoUrl", value: formData.videoUrl, onChange: e => setFormData({ ...formData, videoUrl: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "YouTube, Vimeo, or direct video URL" })] }) })] })] })] }), _jsx("div", { className: "sticky bottom-0 -mx-6 -mb-8 border-t border-gray-700 bg-gray-900 p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-gray-400", children: ["Last updated: ", new Date(activity.updated_at).toLocaleDateString()] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => router.push("/admin/activities"), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Cancel" }), _jsxs(Button, { type: "submit", disabled: isLoading, className: "bg-orange-600 text-white hover:bg-orange-700", children: [_jsx(Save, { className: "mr-2 size-4" }), isLoading ? "Saving..." : "Save Changes"] })] })] }) })] }));
}
//# sourceMappingURL=component.js.map