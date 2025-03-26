import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../service/UserRTK'; 
import { FaCamera } from 'react-icons/fa';

const ProfileDetails = () => {
    const { data: user, isLoading, isError, error } = useGetUserQuery();
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);

    useEffect(() => {
        if (user && user.profilePicture) {
            setProfilePictureUrl(user.profilePicture);
        }
    }, [user]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error?.data?.message || error?.error || 'Failed to fetch user data.'}</p>;
    }

    if (!user) {
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

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                <p className="mt-1">{user.fullName || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <p className="mt-1">{user.email || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
                <p className="mt-1">{user.phoneNo || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Age:</label>
                <p className="mt-1">{user.age || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                <p className="mt-1">{user.dateOfBirth || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                <p className="mt-1">{user.gender || 'Not available'}</p>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bio:</label>
                <p className="mt-1">{user.bio || 'Not available'}</p>
            </div>
        </div>
    );
};

export default ProfileDetails;