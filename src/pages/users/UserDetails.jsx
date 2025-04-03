import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../service/UserRTK'; 

const UserDetails = () => {
    const { userId } = useParams();
    const { data: user, isLoading, isError, error } = useGetUserByIdQuery(userId);

    useEffect(() => {
        console.log('User Details:', user);
    }, [user]);

    if (isLoading) {
        return <div className="p-4">Loading user details...</div>;
    }

    if (isError) {
        return <div className="p-4">Error loading user details: {error.message || 'Unknown error'}</div>;
    }

    if (!user) {
        return <div className="p-4">User not found.</div>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <img
                        src={user.image || 'https://via.placeholder.com/150'}
                        alt={user.fullname}
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-center">{user.fullname}</h3>
                </div>
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                    <p><strong>Rating:</strong> {user.rating}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;