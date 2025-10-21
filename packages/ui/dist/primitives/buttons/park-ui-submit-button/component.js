import { jsx as _jsx } from "react/jsx-runtime";
import { useFormStatus } from 'react-dom';
import { Button } from './button';
export const SubmitButton = (props) => {
    const { pending } = useFormStatus();
    return _jsx(Button, { type: "submit", loading: pending, ...props });
};
//# sourceMappingURL=component.js.map