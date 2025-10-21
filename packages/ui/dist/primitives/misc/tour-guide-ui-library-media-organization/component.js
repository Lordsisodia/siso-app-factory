"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderIcon, TagIcon, ImageIcon, VideoIcon, UploadIcon, CheckCircle, Play } from "lucide-react";
import { getActivitiesForAssignmentAction, assignMediaToActivityAction } from "@/actions/db/media-actions";
// Video Preview Component for Organization
function VideoPreview({ url, name, isSmall = true }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };
    if (hasError) {
        return (_jsxs("div", { className: "flex size-full flex-col items-center justify-center rounded-lg bg-gray-900 text-gray-400", children: [_jsx(VideoIcon, { className: `mb-1 ${isSmall ? "size-4" : "size-8"}` }), _jsx("span", { className: `text-center ${isSmall ? "text-xs" : "text-sm"}`, children: "Video unavailable" })] }));
    }
    return (_jsxs("div", { className: "relative size-full overflow-hidden rounded-lg bg-gray-900", children: [isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: _jsxs("div", { className: "flex flex-col items-center text-gray-400", children: [_jsx("div", { className: `mb-1 animate-spin rounded-full border-2 border-orange-500 border-t-transparent ${isSmall ? "size-4" : "size-6"}` }), _jsx("span", { className: isSmall ? "text-xs" : "text-sm", children: "Loading..." })] }) })), _jsx("video", { src: url, className: "size-full object-cover", muted: true, preload: "metadata", onLoadStart: handleLoadStart, onCanPlay: handleCanPlay, onError: handleError, poster: "" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100", children: _jsx(Play, { className: `text-white drop-shadow-lg ${isSmall ? "size-4" : "size-6"}` }) })] }));
}
export default function MediaOrganization({ mediaFiles }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [newActivityName, setNewActivityName] = useState("");
    const [newTags, setNewTags] = useState("");
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);
    const { toast } = useToast();
    // Suggested categories based on file names and types
    const suggestedCategories = [
        "Beach Activities",
        "Mountain Adventures",
        "Water Sports",
        "Cultural Tours",
        "Wildlife Excursions",
        "Food & Wine",
        "Photography Tours",
        "Adventure Sports",
        "Family Activities",
        "Romantic Experiences"
    ];
    const unassignedFiles = mediaFiles.filter(file => file.activityName === "Unassigned Media" ||
        file.activityName === "root media");
    // Load activities on component mount
    useEffect(() => {
        async function loadActivities() {
            setIsLoading(true);
            try {
                const result = await getActivitiesForAssignmentAction();
                if (result.isSuccess) {
                    setActivities(result.data);
                }
                else {
                    toast({
                        title: "Error",
                        description: "Failed to load activities",
                        variant: "destructive"
                    });
                }
            }
            catch (error) {
                console.error("Error loading activities:", error);
                toast({
                    title: "Error",
                    description: "Failed to load activities",
                    variant: "destructive"
                });
            }
            finally {
                setIsLoading(false);
            }
        }
        loadActivities();
    }, [toast]);
    const handleBulkAssign = async () => {
        if (!newActivityName || selectedFiles.length === 0) {
            toast({
                title: "Error",
                description: "Please select files and choose an activity",
                variant: "destructive"
            });
            return;
        }
        setIsAssigning(true);
        try {
            // Find the selected activity
            const selectedActivity = activities.find(a => a.title === newActivityName);
            const activityId = selectedActivity?.id || "custom";
            // Parse tags
            const tags = newTags
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean);
            const result = await assignMediaToActivityAction(selectedFiles, activityId, tags);
            if (result.isSuccess) {
                toast({
                    title: "Success",
                    description: `Successfully assigned ${result.data.assigned} file(s) to ${newActivityName}`,
                    variant: "default"
                });
                // Reset form
                setSelectedFiles([]);
                setNewActivityName("");
                setNewTags("");
            }
            else {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive"
                });
            }
        }
        catch (error) {
            console.error("Error assigning media:", error);
            toast({
                title: "Error",
                description: "Failed to assign media to activity",
                variant: "destructive"
            });
        }
        finally {
            setIsAssigning(false);
        }
    };
    const toggleFileSelection = (fileId) => {
        setSelectedFiles(prev => prev.includes(fileId)
            ? prev.filter(id => id !== fileId)
            : [...prev, fileId]);
    };
    const selectAllFiles = () => {
        setSelectedFiles(unassignedFiles.map(file => file.id));
    };
    const clearSelection = () => {
        setSelectedFiles([]);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "border-gray-700 bg-gray-800", children: _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-orange-500", children: [_jsx(FolderIcon, { className: "size-5" }), "Media Organization"] }), _jsxs("p", { className: "text-gray-400", children: ["Organize your ", unassignedFiles.length, " unassigned media files into activities and add relevant tags"] })] }) }), unassignedFiles.length > 0 && (_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: selectAllFiles, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: ["Select All (", unassignedFiles.length, ")"] }), selectedFiles.length > 0 && (_jsx(Button, { variant: "outline", size: "sm", onClick: clearSelection, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Clear Selection" })), _jsxs("div", { className: "text-sm text-gray-400", children: [selectedFiles.length, " of ", unassignedFiles.length, " files selected"] })] })), selectedFiles.length > 0 && (_jsx(Card, { className: "border-orange-500/30 bg-gray-800", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-orange-500", children: [_jsx(TagIcon, { className: "size-4" }), _jsxs("span", { className: "font-medium", children: ["Assign ", selectedFiles.length, " selected file", selectedFiles.length !== 1 ? "s" : ""] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium text-gray-300", children: "Activity/Category" }), _jsxs(Select, { value: newActivityName, onValueChange: setNewActivityName, disabled: isLoading, children: [_jsx(SelectTrigger, { className: "border-gray-600 bg-gray-700 text-white", children: _jsx(SelectValue, { placeholder: isLoading
                                                                ? "Loading activities..."
                                                                : "Choose or create activity" }) }), _jsxs(SelectContent, { className: "border-gray-600 bg-gray-700", children: [activities.length > 0 && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "", disabled: true, className: "font-medium text-gray-500", children: "\u2014 Existing Activities \u2014" }), activities.map(activity => (_jsx(SelectItem, { value: activity.title, children: activity.title }, activity.id)))] })), _jsx(SelectItem, { value: "", disabled: true, className: "font-medium text-gray-500", children: "\u2014 Suggested Categories \u2014" }), suggestedCategories.map(category => (_jsx(SelectItem, { value: category, children: category }, category)))] })] }), _jsx(Input, { placeholder: "Or type custom activity name", value: newActivityName, onChange: e => setNewActivityName(e.target.value), className: "mt-2 border-gray-600 bg-gray-700 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm font-medium text-gray-300", children: "Tags (comma-separated)" }), _jsx(Input, { placeholder: "beach, adventure, family, etc.", value: newTags, onChange: e => setNewTags(e.target.value), className: "border-gray-600 bg-gray-700 text-white" })] }), _jsx("div", { className: "flex items-end", children: _jsx(Button, { onClick: handleBulkAssign, disabled: !newActivityName ||
                                                selectedFiles.length === 0 ||
                                                isAssigning, className: "w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50", children: isAssigning ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" }), "Assigning..."] })) : (_jsxs(_Fragment, { children: [_jsx(UploadIcon, { className: "mr-2 size-4" }), "Assign to Activity"] })) }) })] })] }) }) })), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-white", children: ["Unassigned Media (", unassignedFiles.length, " files)"] }), unassignedFiles.length === 0 ? (_jsx(Card, { className: "border-gray-700 bg-gray-800", children: _jsx(CardContent, { className: "p-8 text-center", children: _jsxs("div", { className: "text-gray-400", children: [_jsx(CheckCircle, { className: "mx-auto mb-4 size-12 text-green-500" }), _jsx("p", { className: "text-lg font-medium", children: "All media files have been organized!" }), _jsx("p", { className: "text-sm", children: "Every file has been assigned to an activity." })] }) }) })) : (_jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6", children: unassignedFiles.map(file => (_jsx(Card, { className: `cursor-pointer border-gray-700 bg-gray-800 transition-all hover:border-gray-600 ${selectedFiles.includes(file.id)
                                ? "ring-2 ring-orange-500"
                                : ""}`, onClick: () => toggleFileSelection(file.id), children: _jsxs(CardContent, { className: "p-3", children: [_jsx("div", { className: "mb-3 aspect-square overflow-hidden rounded-lg bg-gray-900", children: file.type === "image" ? (_jsx("img", { src: file.url, alt: file.name, className: "size-full object-cover", onError: e => {
                                                const target = e.target;
                                                target.src =
                                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='10' fill='%23D1D5DB' text-anchor='middle' dy='0.3em'%3EError%3C/text%3E%3C/svg%3E";
                                            } })) : (_jsx(VideoPreview, { url: file.url, name: file.name, isSmall: true })) }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Badge, { variant: "outline", className: `w-full justify-center text-xs ${file.type === "image"
                                                    ? "border-blue-500 text-blue-400"
                                                    : "border-purple-500 text-purple-400"}`, children: [file.type === "image" ? (_jsx(ImageIcon, { className: "mr-1 size-3" })) : (_jsx(VideoIcon, { className: "mr-1 size-3" })), file.type.toUpperCase()] }), _jsx("h4", { className: "truncate text-xs font-medium text-white", title: file.name, children: file.name }), selectedFiles.includes(file.id) && (_jsx("div", { className: "flex items-center justify-center text-orange-500", children: _jsx(CheckCircle, { className: "size-4" }) }))] })] }) }, file.id))) }))] })] }));
}
//# sourceMappingURL=component.js.map