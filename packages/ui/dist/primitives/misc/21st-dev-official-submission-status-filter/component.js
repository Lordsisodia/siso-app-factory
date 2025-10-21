import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const SubmissionStatusFilter = ({ value, onChange, onRefresh, }) => {
    return (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Select, { value: value, onValueChange: onChange, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All" }), _jsx(SelectItem, { value: "null", children: "No Status" }), _jsx(SelectItem, { value: "on_review", children: "On Review" }), _jsx(SelectItem, { value: "posted", children: "Posted" }), _jsx(SelectItem, { value: "featured", children: "Featured" })] })] }), _jsx(Button, { onClick: onRefresh, children: "Refresh" })] }));
};
export default SubmissionStatusFilter;
//# sourceMappingURL=component.js.map