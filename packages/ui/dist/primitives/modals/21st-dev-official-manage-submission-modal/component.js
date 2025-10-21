import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
const ManageSubmissionModal = ({ submission, feedback, onFeedbackChange, onStatusChange, onClose, onSave, }) => {
    const feedbackTemplates = {
        on_review: `Your component is currently under review. We'll get back to you soon with feedback.`,
        posted: `Your component has been published and is now available via direct link. However, it's not featured in public listings yet as it doesn't fully meet our quality guidelines. It's still accessible through your profile and direct links.`,
        featured: `Congratulations! Your component has been featured and is now visible on the homepage and in public listings.`,
        rejected: `Your component does not follow our quality guidelines. Please review our guidelines at https://github.com/serafimcloud/21st?tab=readme-ov-file#quality-guidelines and consider resubmitting after making the necessary improvements.`,
    };
    const hotkeyMap = {
        "1": "on_review",
        "2": "posted",
        "3": "featured",
        "4": "rejected",
    };
    const applyTemplate = (status) => {
        onStatusChange(status);
        onFeedbackChange(feedbackTemplates[status]);
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            if (hotkeyMap[key]) {
                event.preventDefault(); // Prevent default to avoid number being typed
                applyTemplate(hotkeyMap[key]);
            }
            else if (key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSave();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [onSave]);
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "on_review":
                return "bg-yellow-200 text-yellow-800";
            case "posted":
                return "bg-green-200 text-green-800";
            case "featured":
                return "bg-blue-200 text-blue-800";
            case "rejected":
                return "bg-red-200 text-red-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };
    const getHotkeyForStatus = (status) => {
        for (const [key, value] of Object.entries(hotkeyMap)) {
            if (value === status)
                return key;
        }
        return "";
    };
    return (_jsx(Dialog, { open: true, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "max-w-2xl", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { children: ["Manage Submission: ", submission.component_data.name, " ", submission.name && `| ${submission.name}`] }) }), _jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Status" }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: Object.keys(feedbackTemplates).map((status) => (_jsx(Badge, { variant: "outline", className: cn("cursor-pointer pl-1 pr-2 py-1.5", getStatusBadgeClass(status), (submission.submission_status || "on_review") === status
                                            ? "ring-2 ring-offset-2 ring-primary"
                                            : ""), onClick: () => applyTemplate(status), children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("kbd", { className: "h-4 w-4 flex items-center justify-center p-3 bg-background/80 rounded-full text-[10px] border border-border", children: getHotkeyForStatus(status) }), _jsx("span", { className: "text-sm", children: status === "on_review"
                                                        ? "On Review"
                                                        : status === "posted"
                                                            ? "Posted"
                                                            : status === "featured"
                                                                ? "Featured"
                                                                : "Rejected" })] }) }, status))) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Feedback to Author" }), _jsx(Textarea, { value: feedback, onChange: (e) => onFeedbackChange(e.target.value), onKeyDown: (e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            onSave();
                                        }
                                    }, placeholder: "Provide feedback to the author", className: "h-32 mt-2" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { onClick: onSave, children: "Save Changes" })] })] }) }));
};
export default ManageSubmissionModal;
//# sourceMappingURL=component.js.map