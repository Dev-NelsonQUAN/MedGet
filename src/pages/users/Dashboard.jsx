import React, { useState } from 'react';
import UserDashboardHeader from './UserDashboardHeader';
import UserSideBar from './UserSideBar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`fixed top-0 left-0 h-full z-40 bg-blue-600 text-white transform ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 w-64 lg:translate-x-0 lg:static lg:block`}
            >
                <UserSideBar toggleSidebar={toggleSidebar} />
            </div>

            <div className={`flex flex-col flex-1 transition-all duration-300 w-full`}>
                <UserDashboardHeader toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;