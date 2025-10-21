import React from 'react';
export interface AuthTabbedFormProps {
    onSignIn: (email: string, password: string) => Promise<void>;
    onSignUp: (email: string, password: string) => Promise<void>;
    brandName?: string;
    brandDescription?: string;
    loading?: boolean;
    error?: string;
    returnTo?: string;
    showBackButton?: boolean;
    className?: string;
}
export declare const AuthTabbedForm: React.FC<AuthTabbedFormProps>;
export default AuthTabbedForm;
//# sourceMappingURL=component.d.ts.map