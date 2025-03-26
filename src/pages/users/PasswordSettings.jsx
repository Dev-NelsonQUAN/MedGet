import React, { useState } from 'react';
import Input from '../../ui/Input';
import Btn from '../../ui/Btn';
import { useUpdateUserPasswordMutation } from '../../service/UserRTK';

const PasswordSettings = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateUserPassword, { isLoading, isError, error, isSuccess }] = useUpdateUserPasswordMutation();

    const handleSavePassword = async () => {
        try {
            await updateUserPassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <div className="mb-4">
                <Input
                    labelText="Old Password"htmlFor="oldPassword"
                    type="password"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>
            <div className="mb-4">
                <Input
                    labelText="New Password"
                    htmlFor="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>
            <div className="mb-4">
                <Input
                    labelText="Confirm Password"
                    htmlFor="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            {isError && <p className="text-red-500">{error?.data?.message || 'Failed to update password.'}</p>}
            {isSuccess && <p className = "text-green-500">Password changed successfully!</p>}

            <Btn
                btnText={isLoading ? 'Saving...' : 'Save Password'}
                bg="bg-blue-500"
                color="text-white"
                px="px-4"
                py="py-2"
                mt="mt-4"
                hoverBg="hover:bg-blue-600"
                onClick={handleSavePassword}
                disabled={isLoading}
            />
        </div>
    );
};

export default PasswordSettings;