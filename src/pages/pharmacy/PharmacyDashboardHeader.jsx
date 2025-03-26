import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PharmacyDashboardHeader = ({ toggleSidebar }) => {
    const Nav = useNavigate();
    const user = useSelector((state) => state.medGet.user);
    let firstName = '';

    if (user && user.fullname) {
        const nameParts = user.fullname.split(' ');
        firstName = nameParts[0];
    }

    return (
        <div className="w-full p-4 flex justify-between items-center bg-blue-500 text-white">
            <div className="flex items-center">
                <button
                    className="lg:hidden mr-4 text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
                <div>
                    <h2 className="text-lg font-semibold">
                        Welcome, {firstName || 'User'}
                    </h2>
                    <p className="text-sm text-gray-200">Here's your dashboard overview.</p>
                </div>
            </div>
            <div
                className="bg-blue-600 rounded-full p-2 cursor-pointer"
                onClick={() => Nav('/user-dashboard/user-details')}
            >
                <CgProfile className="text-white text-lg" />
            </div>
        </div>
    );
};

export default PharmacyDashboardHeader;
