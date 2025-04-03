// UserDashboardHeader.jsx
import React, { useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../service/UserRTK';

const UserDashboardHeader = ({ toggleSidebar }) => {
    const Nav = useNavigate();
    const { data: user, isLoading, isError, error } = useGetUserQuery();

    useEffect(() => {
        console.log('GetUser Query Status:', { isLoading, isError, error, user });
    }, [isLoading, isError, error, user]);

    let firstName = '';

    if (user && user.fullname) {
        const nameParts = user.fullname.split(' ');
        firstName = nameParts[0];
    }

    console.log("User Object in Header:", user);

    return (
        <div className="w-full p-4 flex justify-between items-center shadow-2xl text-black">
            <div className="flex items-center">
                <button
                    className="lg:hidden mr-4 text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaBars color='black' />
                </button>
                <div>
                    <h2 className="text-lg font-semibold">
                        Welcome, {firstName || 'User'}
                    </h2>
                    <p className="lg:text-[16px] text-black max-[769px]:text-[14px] max-[576px]:text-[10px]">Here's your dashboard overview.</p>
                </div>
            </div>

            <div
                className="border-1 border-blue-600 rounded-full size-12 cursor-pointer relative overflow-hidden flex items-center justify-center"
                onClick={() => Nav('/user-dashboard/user-details')}
            >
                {user && user.profile && user?.profile?.profilePicture ? (
                    <img
                        src={user.profile.profilePicture}
                        alt="Profile"
                        className="rounded-full object-cover size-full"
                    />
                ) : (
                    <CgProfile className="text-black outline-1 outline-black text-lg" />
                )}
            </div>
        </div>
    );
};

export default UserDashboardHeader;