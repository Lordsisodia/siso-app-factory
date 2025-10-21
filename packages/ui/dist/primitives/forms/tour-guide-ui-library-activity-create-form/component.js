"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createActivityAction } from "@/actions/db/activities-actions";
export default function ActivityCreateForm() {
    const router = useRouter();
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
        cancellationPolicy: "",
        safetyRequirements: "",
        weatherDependent: false,
        instantConfirmation: true,
        featured: false,
        status: "draft",
        videoUrl: ""
    });
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
            const createData = {
                operatorId: "default-operator", // TODO: Get from auth context
                title: formData.title.trim(),
                slug: formData.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
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
                includedItems: [],
                excludedItems: [],
                whatToBring: [],
                cancellationPolicy: formData.cancellationPolicy.trim(),
                safetyRequirements: formData.safetyRequirements.trim(),
                weatherDependent: formData.weatherDependent,
                instantConfirmation: formData.instantConfirmation,
                featured: formData.featured,
                status: formData.status,
                videoUrl: formData.videoUrl.trim() || null
            };
            const response = await createActivityAction(createData);
            if (response.isSuccess) {
                alert("Activity created successfully");
                router.push("/admin/activities");
            }
            else {
                alert("Failed to create activity");
            }
        }
        catch (error) {
            console.error("Error creating activity:", error);
            alert("Error creating activity");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-gray-700 pb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Create New Activity" }), _jsx("p", { className: "text-gray-400", children: "Fill in the details for your new activity" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { type: "button", variant: "outline", onClick: () => router.push("/admin/activities"), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(ArrowLeft, { className: "mr-2 size-4" }), "Back to Activities"] }), _jsxs(Button, { type: "submit", disabled: isLoading, className: "bg-orange-600 text-white hover:bg-orange-700", children: [_jsx(Save, { className: "mr-2 size-4" }), isLoading ? "Creating..." : "Create Activity"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-3", children: [_jsx("div", { className: "space-y-8 lg:col-span-2", children: _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Basic Information" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", className: "text-gray-300", children: "Activity Title *" }), _jsx(Input, { id: "title", value: formData.title, onChange: e => setFormData({ ...formData, title: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Enter activity title" }), errors.title && (_jsx("p", { className: "text-sm text-red-400", children: errors.title }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "shortDescription", className: "text-gray-300", children: "Short Description *" }), _jsx(Textarea, { id: "shortDescription", value: formData.shortDescription, onChange: e => setFormData({
                                                        ...formData,
                                                        shortDescription: e.target.value
                                                    }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Brief description for listings", rows: 3 }), errors.shortDescription && (_jsx("p", { className: "text-sm text-red-400", children: errors.shortDescription }))] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", className: "text-gray-300", children: "Full Description" }), _jsx(Textarea, { id: "description", value: formData.description, onChange: e => setFormData({ ...formData, description: e.target.value }), className: "border-gray-600 bg-gray-900 text-white", placeholder: "Detailed activity description", rows: 6 })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "category", className: "text-gray-300", children: "Category *" }), _jsxs(Select, { value: formData.category, onValueChange: value => setFormData({ ...formData, category: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-900 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { className: "border-gray-600 bg-gray-800", children: [_jsx(SelectItem, { value: "water_sports", children: "Water Sports" }), _jsx(SelectItem, { value: "land_adventures", children: "Land Adventures" }), _jsx(SelectItem, { value: "cultural", children: "Cultural" }), _jsx(SelectItem, { value: "nightlife", children: "Nightlife" }), _jsx(SelectItem, { value: "family_fun", children: "Family Fun" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "status", className: "text-gray-300", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: value => setFormData({ ...formData, status: value }), children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-900 text-white", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { className: "border-gray-600 bg-gray-800", children: [_jsx(SelectItem, { value: "draft", children: "Draft" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] })] })] }) }), _jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-orange-500", children: "Settings" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "featured", checked: formData.featured, onCheckedChange: checked => setFormData({ ...formData, featured: checked }) }), _jsx(Label, { htmlFor: "featured", className: "text-gray-300", children: "Featured Activity" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "weatherDependent", checked: formData.weatherDependent, onCheckedChange: checked => setFormData({
                                                        ...formData,
                                                        weatherDependent: checked
                                                    }) }), _jsx(Label, { htmlFor: "weatherDependent", className: "text-gray-300", children: "Weather Dependent" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "instantConfirmation", checked: formData.instantConfirmation, onCheckedChange: checked => setFormData({
                                                        ...formData,
                                                        instantConfirmation: checked
                                                    }) }), _jsx(Label, { htmlFor: "instantConfirmation", className: "text-gray-300", children: "Instant Confirmation" })] })] })] }) })] })] }));
}
//# sourceMappingURL=component.js.map