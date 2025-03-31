import React, { useEffect, useState } from 'react';
import { useGetUserQuery, useUpdateUserProfileMutation } from '../../service/UserRTK';
import { FaCamera } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Btn from '../../ui/Btn';
import Input from '../../ui/Input';

const ProfileDetails = () => {
    const { data, isLoading, isError, error, refetch } = useGetUserQuery();
    const [updateUserProfile, { isLoading: isUpdateLoading }] = useUpdateUserProfileMutation();
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        age: '',
        dateOfBirth: '',
        phoneNo: '',
        gender: '',
        bio: '',
    });

    useEffect(() => {
        console.log("User Data from getUser:", data);

        if (data && data.profile) {
            setProfilePictureUrl(data.profile.profilePicture || null);
            setEditedProfile({
                age: data.profile.age || '',
                dateOfBirth: data.profile.dateOfBirth || '',
                phoneNo: data.profile.phoneNo || '',
                gender: data.profile.gender || '',
                bio: data.profile.bio || '',
            });
        }
    }, [data]);

    const handleSave = async () => {
        try {
            await updateUserProfile(editedProfile).unwrap();
            setIsEditing(false);
            refetch();
            Swal.fire('Profile Saved!', '', 'success');
        } catch (updateError) {
            console.error('Save Error:', updateError);
            Swal.fire('Save Failed!', '', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prev) => ({ ...prev, [name]: value }));
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error?.data?.message || error?.error || 'Failed to fetch user data.'}</p>;
    }

    if (!data) {
        return <p>User data not available.</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

            <div className="flex justify-center mb-4">
                <div className="relative">
                    {profilePictureUrl ? (
                        <img
                            src={profilePictureUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaCamera className="text-gray-500 text-2xl" />
                        </div>
                    )}
                </div>
            </div>

            {isEditing ? (
                <>
                    <Input
                        labelText="Phone Number"
                        name="phoneNo"
                        value={editedProfile.phoneNo}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        border="border"
                        px="px-3"
                        py="py-2"
                        rounded="rounded-md"
                        w="w-full"
                        mt="mt-2"
                    />
                    <Input
                        labelText="Age"
                        name="age"
                        value={editedProfile.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        border="border"
                        px="px-3"
                        py="py-2"
                        rounded="rounded-md"
                        w="w-full"
                        mt="mt-2"
                    />
                    <Input
                        labelText="Date of Birth"
                        name="dateOfBirth"
                        value={editedProfile.dateOfBirth}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                        border="border"
                        px="px-3"
                        py="py-2"
                        rounded="rounded-md"
                        w="w-full"
                        mt="mt-2"
                    />
                    <Input
                        labelText="Gender"
                        name="gender"
                        value={editedProfile.gender}
                        onChange={handleInputChange}
                        placeholder="Gender"
                        border="border"
                        px="px-3"
                        py="py-2"
                        rounded="rounded-md"
                        w="w-full"
                        mt="mt-2"
                    />
                    <Input
                        labelText="Bio"
                        name="bio"
                        value={editedProfile.bio}
                        onChange={handleInputChange}
                        placeholder="Bio"
                        border="border"
                        px="px-3"
                        py="py-2"
                        rounded="rounded-md"
                        w="w-full"
                        mt="mt-2"
                    />
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                        <p className="mt-1">{data.profile?.phoneNo || 'Not available'}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Age:</label>
                        <p className="mt-1">{data.profile?.age || 'Not available'}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                        <p className="mt-1">{data.profile?.dateOfBirth || 'Not available'}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <p className="mt-1">{data.profile?.gender || 'Not available'}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Bio:</label>
                        <p className="mt-1">{data.profile?.bio || 'Not available'}</p>
                    </div>
                </>
            )}

            <Btn
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                btnText={isEditing ? 'Save' : 'Edit'}
                bg="bg-blue-500"
                color="text-white"
                px="px-4"
                py="py-2"
                mt="mt-4"
                txtSize="text-base"
                fontWeight="font-semibold"
                hoverBg="hover:bg-blue-600"
            />
        </div>
    );
};

export default ProfileDetails;


