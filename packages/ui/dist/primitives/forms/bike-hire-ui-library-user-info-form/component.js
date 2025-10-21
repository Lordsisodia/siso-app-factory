import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
export const UserInfoForm = ({ name, setName, email, setEmail, phone, setPhone, disabled = false, nameLabel = 'Full Name', emailLabel = 'Email', phoneLabel = 'Phone', className = '' }) => {
    return (_jsxs("div", { className: `grid grid-cols-2 gap-4 ${className}`, children: [_jsxs("div", { className: "col-span-2", children: [_jsx(Label, { htmlFor: "name", children: nameLabel }), _jsx(Input, { id: "name", className: "mt-2", value: name, onChange: (e) => setName(e.target.value), disabled: disabled, required: true })] }), _jsxs("div", { className: "col-span-2 sm:col-span-1", children: [_jsx(Label, { htmlFor: "email", children: emailLabel }), _jsx(Input, { id: "email", type: "email", className: "mt-2", value: email, onChange: (e) => setEmail(e.target.value), disabled: disabled, required: true })] }), _jsxs("div", { className: "col-span-2 sm:col-span-1", children: [_jsx(Label, { htmlFor: "phone", children: phoneLabel }), _jsx(Input, { id: "phone", className: "mt-2", value: phone, onChange: (e) => setPhone(e.target.value), disabled: disabled, required: true })] })] }));
};
export default UserInfoForm;
//# sourceMappingURL=component.js.map