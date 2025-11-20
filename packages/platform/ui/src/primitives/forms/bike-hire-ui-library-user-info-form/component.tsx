import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  disabled = false,
  nameLabel = 'Full Name',
  emailLabel = 'Email',
  phoneLabel = 'Phone',
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="col-span-2">
        <Label htmlFor="name">{nameLabel}</Label>
        <Input
          id="name"
          className="mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="email">{emailLabel}</Label>
        <Input
          id="email"
          type="email"
          className="mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="phone">{phoneLabel}</Label>
        <Input
          id="phone"
          className="mt-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
};

export default UserInfoForm;
