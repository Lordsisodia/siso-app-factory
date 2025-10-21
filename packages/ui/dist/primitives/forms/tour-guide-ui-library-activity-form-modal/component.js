"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createActivityAction, updateActivityAction } from "@/actions/db/activities-actions";
export default function ActivityFormModal({ show, onClose, activity, onSave }) {
    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        description: "",
        category: "water_sports",
        location: "",
        meetingPoint: "",
        durationMinutes: 120,
        maxParticipants: 8,
        minParticipants: 1,
        minAge: null,
        maxAge: null,
        includedItems: [],
        excludedItems: [],
        whatToBring: [],
        cancellationPolicy: "",
        safetyRequirements: "",
        weatherDependent: false,
        instantConfirmation: true,
        featured: false,
        status: "draft",
        videoUrl: ""
    });
    const [includedItemInput, setIncludedItemInput] = useState("");
    const [excludedItemInput, setExcludedItemInput] = useState("");
    const [whatToBringInput, setWhatToBringInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    // Initialize form data when activity changes
    useEffect(() => {
        if (activity) {
            setFormData({
                title: activity.title || "",
                shortDescription: activity.shortDescription || "",
                description: activity.description || "",
                category: activity.category || "water_sports",
                location: activity.location || "",
                meetingPoint: activity.meetingPoint || "",
                durationMinutes: activity.durationMinutes || 120,
                maxParticipants: activity.maxParticipants || 8,
                minParticipants: activity.minParticipants || 1,
                minAge: activity.minAge,
                maxAge: activity.maxAge,
                includedItems: activity.includedItems || [],
                excludedItems: activity.excludedItems || [],
                whatToBring: activity.whatToBring || [],
                cancellationPolicy: activity.cancellationPolicy || "",
                safetyRequirements: activity.safetyRequirements || "",
                weatherDependent: activity.weatherDependent || false,
                instantConfirmation: activity.instantConfirmation !== false,
                featured: activity.featured || false,
                status: activity.status || "draft",
                videoUrl: activity.videoUrl || ""
            });
        }
        else {
            // Reset form for new activity
            setFormData({
                title: "",
                shortDescription: "",
                description: "",
                category: "water_sports",
                location: "",
                meetingPoint: "",
                durationMinutes: 120,
                maxParticipants: 8,
                minParticipants: 1,
                minAge: null,
                maxAge: null,
                includedItems: [],
                excludedItems: [],
                whatToBring: [],
                cancellationPolicy: "",
                safetyRequirements: "",
                weatherDependent: false,
                instantConfirmation: true,
                featured: false,
                status: "draft",
                videoUrl: ""
            });
        }
        setErrors({});
        setIncludedItemInput("");
        setExcludedItemInput("");
        setWhatToBringInput("");
    }, [activity]);
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
            const activityData = {
                operatorId: "temp-operator-id", // This should come from the logged-in user
                title: formData.title,
                slug: formData.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                shortDescription: formData.shortDescription,
                description: formData.description,
                category: formData.category,
                location: formData.location,
                meetingPoint: formData.meetingPoint || null,
                durationMinutes: formData.durationMinutes,
                maxParticipants: formData.maxParticipants,
                minParticipants: formData.minParticipants,
                minAge: formData.minAge,
                maxAge: formData.maxAge,
                includedItems: formData.includedItems,
                excludedItems: formData.excludedItems,
                whatToBring: formData.whatToBring,
                cancellationPolicy: formData.cancellationPolicy || null,
                safetyRequirements: formData.safetyRequirements || null,
                weatherDependent: formData.weatherDependent,
                instantConfirmation: formData.instantConfirmation,
                featured: formData.featured,
                status: formData.status,
                videoUrl: formData.videoUrl || null
            };
            let response;
            if (activity) {
                // Update existing activity
                response = await updateActivityAction(activity.id, activityData);
            }
            else {
                // Create new activity
                response = await createActivityAction(activityData);
            }
            if (response.isSuccess) {
                // Transform the response to include the required fields
                const savedActivity = {
                    ...response.data,
                    images: activity?.images || [],
                    pricing: activity?.pricing || []
                };
                onSave(savedActivity);
            }
            else {
                setErrors({ general: response.message });
            }
        }
        catch (error) {
            console.error("Error saving activity:", error);
            setErrors({ general: "Failed to save activity" });
        }
        finally {
            setIsLoading(false);
        }
    };
    // Array management helpers
    const addItem = (array, item, setter) => {
        if (item.trim() && !array.includes(item.trim())) {
            setter([...array, item.trim()]);
        }
    };
    const removeItem = (array, index, setter) => {
        setter(array.filter((_, i) => i !== index));
    };
    const categories = [
        { value: "water_sports", label: "Water Sports" },
        { value: "land_adventures", label: "Land Adventures" },
        { value: "cultural", label: "Cultural" },
        { value: "nightlife", label: "Nightlife" },
        { value: "family_fun", label: "Family Fun" }
    ];
    const statuses = [
        { value: "draft", label: "Draft" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "suspended", label: "Suspended" }
    ];
    if (!show)
        return null;
    return (_jsx(Dialog, { open: show, onOpenChange: onClose, children: _jsx(DialogContent, { className: "h-[95vh] max-h-[95vh] max-w-5xl border-gray-700 bg-gray-900 p-0 text-white", children: _jsxs("div", { className: "flex h-full flex-col", children: [_jsx(DialogHeader, { className: "shrink-0 border-b border-gray-700 bg-gray-900 px-6 py-4", children: _jsx(DialogTitle, { className: "text-xl font-bold text-orange-500", children: activity ? "Edit Activity" : "Create New Activity" }) }), _jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: _jsx("div", { className: "px-6 py-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [errors.general && (_jsx("div", { className: "rounded-lg border border-red-600 bg-red-600/20 p-3 text-sm text-red-400", children: errors.general })), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Basic Information" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", className: "text-gray-300", children: "Title *" }), _jsx(Input, { id: "title", value: formData.title, onChange: e => setFormData({ ...formData, title: e.target.value }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Activity title..." }), errors.title && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.title }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "category", className: "text-gray-300", children: "Category *" }), _jsxs(Select, { value: formData.category, onValueChange: value => setFormData({ ...formData, category: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-700 text-white", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { className: "border-gray-700 bg-gray-800", children: categories.map(cat => (_jsx(SelectItem, { value: cat.value, children: cat.label }, cat.value))) })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "shortDescription", className: "text-gray-300", children: "Short Description *" }), _jsx(Textarea, { id: "shortDescription", value: formData.shortDescription, onChange: e => setFormData({
                                                                    ...formData,
                                                                    shortDescription: e.target.value
                                                                }), className: "resize-none border-gray-600 bg-gray-700 text-white", placeholder: "Brief description for cards and previews...", rows: 2 }), errors.shortDescription && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.shortDescription }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", className: "text-gray-300", children: "Full Description" }), _jsx(Textarea, { id: "description", value: formData.description, onChange: e => setFormData({
                                                                    ...formData,
                                                                    description: e.target.value
                                                                }), className: "resize-none border-gray-600 bg-gray-700 text-white", placeholder: "Detailed description of the activity...", rows: 4 })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Location & Logistics" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "location", className: "text-gray-300", children: "Location *" }), _jsx(Input, { id: "location", value: formData.location, onChange: e => setFormData({
                                                                            ...formData,
                                                                            location: e.target.value
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "e.g., Palma de Mallorca" }), errors.location && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.location }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "meetingPoint", className: "text-gray-300", children: "Meeting Point" }), _jsx(Input, { id: "meetingPoint", value: formData.meetingPoint, onChange: e => setFormData({
                                                                            ...formData,
                                                                            meetingPoint: e.target.value
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Specific meeting location..." })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "duration", className: "text-gray-300", children: "Duration (minutes) *" }), _jsx(Input, { id: "duration", type: "number", value: formData.durationMinutes, onChange: e => setFormData({
                                                                            ...formData,
                                                                            durationMinutes: parseInt(e.target.value) || 0
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", min: "15" }), errors.durationMinutes && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.durationMinutes }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "maxParticipants", className: "text-gray-300", children: "Max Participants *" }), _jsx(Input, { id: "maxParticipants", type: "number", value: formData.maxParticipants, onChange: e => setFormData({
                                                                            ...formData,
                                                                            maxParticipants: parseInt(e.target.value) || 0
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", min: "1" }), errors.maxParticipants && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.maxParticipants }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "minAge", className: "text-gray-300", children: "Min Age" }), _jsx(Input, { id: "minAge", type: "number", value: formData.minAge || "", onChange: e => setFormData({
                                                                            ...formData,
                                                                            minAge: e.target.value
                                                                                ? parseInt(e.target.value)
                                                                                : null
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", min: "0", placeholder: "No limit" }), errors.minAge && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.minAge }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "maxAge", className: "text-gray-300", children: "Max Age" }), _jsx(Input, { id: "maxAge", type: "number", value: formData.maxAge || "", onChange: e => setFormData({
                                                                            ...formData,
                                                                            maxAge: e.target.value
                                                                                ? parseInt(e.target.value)
                                                                                : null
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", min: "0", placeholder: "No limit" })] })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Items & Requirements" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-gray-300", children: "What's Included" }), _jsxs("div", { className: "mt-1 flex gap-2", children: [_jsx(Input, { value: includedItemInput, onChange: e => setIncludedItemInput(e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Add included item...", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.includedItems, includedItemInput, items => setFormData({
                                                                                    ...formData,
                                                                                    includedItems: items
                                                                                }));
                                                                                setIncludedItemInput("");
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", onClick: () => {
                                                                            addItem(formData.includedItems, includedItemInput, items => setFormData({
                                                                                ...formData,
                                                                                includedItems: items
                                                                            }));
                                                                            setIncludedItemInput("");
                                                                        }, className: "bg-green-600 hover:bg-green-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: formData.includedItems.map((item, index) => (_jsxs(Badge, { variant: "outline", className: "border-green-600 bg-green-600/20 text-green-400", children: [item, _jsx("button", { type: "button", onClick: () => removeItem(formData.includedItems, index, items => setFormData({
                                                                                ...formData,
                                                                                includedItems: items
                                                                            })), className: "ml-2 hover:text-green-200", children: _jsx(X, { className: "size-3" }) })] }, index))) })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-gray-300", children: "Not Included" }), _jsxs("div", { className: "mt-1 flex gap-2", children: [_jsx(Input, { value: excludedItemInput, onChange: e => setExcludedItemInput(e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Add excluded item...", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.excludedItems, excludedItemInput, items => setFormData({
                                                                                    ...formData,
                                                                                    excludedItems: items
                                                                                }));
                                                                                setExcludedItemInput("");
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", onClick: () => {
                                                                            addItem(formData.excludedItems, excludedItemInput, items => setFormData({
                                                                                ...formData,
                                                                                excludedItems: items
                                                                            }));
                                                                            setExcludedItemInput("");
                                                                        }, className: "bg-red-600 hover:bg-red-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: formData.excludedItems.map((item, index) => (_jsxs(Badge, { variant: "outline", className: "border-red-600 bg-red-600/20 text-red-400", children: [item, _jsx("button", { type: "button", onClick: () => removeItem(formData.excludedItems, index, items => setFormData({
                                                                                ...formData,
                                                                                excludedItems: items
                                                                            })), className: "ml-2 hover:text-red-200", children: _jsx(X, { className: "size-3" }) })] }, index))) })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-gray-300", children: "What to Bring" }), _jsxs("div", { className: "mt-1 flex gap-2", children: [_jsx(Input, { value: whatToBringInput, onChange: e => setWhatToBringInput(e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Add item to bring...", onKeyPress: e => {
                                                                            if (e.key === "Enter") {
                                                                                e.preventDefault();
                                                                                addItem(formData.whatToBring, whatToBringInput, items => setFormData({
                                                                                    ...formData,
                                                                                    whatToBring: items
                                                                                }));
                                                                                setWhatToBringInput("");
                                                                            }
                                                                        } }), _jsx(Button, { type: "button", onClick: () => {
                                                                            addItem(formData.whatToBring, whatToBringInput, items => setFormData({ ...formData, whatToBring: items }));
                                                                            setWhatToBringInput("");
                                                                        }, className: "bg-blue-600 hover:bg-blue-700", children: _jsx(Plus, { className: "size-4" }) })] }), _jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: formData.whatToBring.map((item, index) => (_jsxs(Badge, { variant: "outline", className: "border-blue-600 bg-blue-600/20 text-blue-400", children: [item, _jsx("button", { type: "button", onClick: () => removeItem(formData.whatToBring, index, items => setFormData({
                                                                                ...formData,
                                                                                whatToBring: items
                                                                            })), className: "ml-2 hover:text-blue-200", children: _jsx(X, { className: "size-3" }) })] }, index))) })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Policies & Requirements" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "cancellationPolicy", className: "text-gray-300", children: "Cancellation Policy" }), _jsx(Textarea, { id: "cancellationPolicy", value: formData.cancellationPolicy, onChange: e => setFormData({
                                                                    ...formData,
                                                                    cancellationPolicy: e.target.value
                                                                }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Describe cancellation terms...", rows: 3 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "safetyRequirements", className: "text-gray-300", children: "Safety Requirements" }), _jsx(Textarea, { id: "safetyRequirements", value: formData.safetyRequirements, onChange: e => setFormData({
                                                                    ...formData,
                                                                    safetyRequirements: e.target.value
                                                                }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Safety requirements and restrictions...", rows: 3 })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Settings" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "status", className: "text-gray-300", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: value => setFormData({ ...formData, status: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-700 text-white", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { className: "border-gray-700 bg-gray-800", children: statuses.map(status => (_jsx(SelectItem, { value: status.value, children: status.label }, status.value))) })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "videoUrl", className: "text-gray-300", children: "Video URL" }), _jsx(Input, { id: "videoUrl", value: formData.videoUrl, onChange: e => setFormData({
                                                                            ...formData,
                                                                            videoUrl: e.target.value
                                                                        }), className: "border-gray-600 bg-gray-700 text-white", placeholder: "https://..." })] })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "weatherDependent", checked: formData.weatherDependent, onCheckedChange: checked => setFormData({
                                                                            ...formData,
                                                                            weatherDependent: !!checked
                                                                        }) }), _jsx(Label, { htmlFor: "weatherDependent", className: "text-gray-300", children: "Weather Dependent" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "instantConfirmation", checked: formData.instantConfirmation, onCheckedChange: checked => setFormData({
                                                                            ...formData,
                                                                            instantConfirmation: !!checked
                                                                        }) }), _jsx(Label, { htmlFor: "instantConfirmation", className: "text-gray-300", children: "Instant Confirmation" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "featured", checked: formData.featured, onCheckedChange: checked => setFormData({ ...formData, featured: !!checked }) }), _jsx(Label, { htmlFor: "featured", className: "text-gray-300", children: "Featured Activity" })] })] })] })] }), _jsxs("div", { className: "flex justify-end space-x-3 border-t border-gray-700 pt-6", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isLoading, className: "bg-orange-600 text-white hover:bg-orange-700", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "mr-2 size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "mr-2 size-4" }), activity ? "Update Activity" : "Create Activity"] })) })] })] }) }) })] }) }) }));
}
//# sourceMappingURL=component.js.map