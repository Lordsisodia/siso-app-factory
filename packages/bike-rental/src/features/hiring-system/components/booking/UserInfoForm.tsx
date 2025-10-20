
import React from 'react';
import { Label } from '@siso/ui';
import { Input } from '@siso/ui';

interface UserInfoFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  name, setName,
  email, setEmail,
  phone, setPhone
}) => {
  return (
    <>
      <div className="col-span-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          className="mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          className="mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          className="mt-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
    </>
  );
};

export default UserInfoForm;
