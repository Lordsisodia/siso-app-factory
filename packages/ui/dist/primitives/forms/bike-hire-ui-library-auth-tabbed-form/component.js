import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export const AuthTabbedForm = ({ onSignIn, onSignUp, brandName = 'Welcome', brandDescription = 'Sign in to your account', loading = false, error, returnTo = '/', showBackButton = true, className = '' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await onSignIn(email, password);
            if (returnTo) {
                navigate(returnTo);
            }
        }
        catch (err) {
            // Error handled by parent
        }
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await onSignUp(email, password);
            if (returnTo) {
                navigate(returnTo);
            }
        }
        catch (err) {
            // Error handled by parent
        }
    };
    return (_jsx("div", { className: `flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${className}`, children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: brandName }), _jsx("p", { className: "text-muted-foreground mt-2", children: brandDescription })] }), _jsxs(Tabs, { defaultValue: "signin", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-6", children: [_jsx(TabsTrigger, { value: "signin", children: "Sign In" }), _jsx(TabsTrigger, { value: "signup", children: "Sign Up" })] }), _jsx(TabsContent, { value: "signin", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Sign In" }), _jsx(CardDescription, { children: "Enter your credentials to access your account" })] }), _jsx(CardContent, { children: _jsx("form", { onSubmit: handleSignIn, children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "name@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: loading })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: loading })] }), error && (_jsx("div", { className: "text-sm text-destructive mt-2", children: error })), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Signing in..." : "Sign In" })] }) }) })] }) }), _jsx(TabsContent, { value: "signup", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Sign Up" }), _jsx(CardDescription, { children: "Create a new account to get started" })] }), _jsx(CardContent, { children: _jsx("form", { onSubmit: handleSignUp, children: _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "signup-email", children: "Email" }), _jsx(Input, { id: "signup-email", type: "email", placeholder: "name@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: loading })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "signup-password", children: "Password" }), _jsx(Input, { id: "signup-password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: loading })] }), error && (_jsx("div", { className: "text-sm text-destructive mt-2", children: error })), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Creating account..." : "Create Account" })] }) }) })] }) })] }), showBackButton && (_jsx("div", { className: "mt-6 text-center", children: _jsx(Button, { variant: "link", onClick: () => navigate('/'), children: "Back to Home" }) }))] }) }));
};
export default AuthTabbedForm;
//# sourceMappingURL=component.js.map