import React from 'react';
export interface UserInfoFormProps {
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    disabled?: boolean;
    nameLabel?: string;
    emailLabel?: string;
    phoneLabel?: string;
    className?: string;
}
export declare const UserInfoForm: React.FC<UserInfoFormProps>;
export default UserInfoForm;
//# sourceMappingURL=component.d.ts.map