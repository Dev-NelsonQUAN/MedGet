import React from 'react'
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboardHeader = ({toggleSidebar}) => {
    const Nav = useNavigate();
    const admin = useSelector((state) => state.medGet.admin);
    let firstName = '';

    if (admin && admin.fullname) {
        const nameParts = admin.fullname.split(' ');
        firstName = nameParts[0];
    }

    return (
        <div className="w-full p-4 flex justify-between lg:items-center 
        shadow-2xl text-black bg-white sm:items-center">

            <div className="flex items-center">
                <button
                    className="lg:hidden mr-4 text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaBars color='black' />
                </button>
                <div className="mb-2 sm:mb-0">
                    <h2 className="text-lg font-semibold">
                        Welcome, {firstName ? firstName : 'Admin'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Here's your dashboard overview.
                    </p>
                </div>
            </div>
            {/* <div className="ml-0 sm:ml-4"> */}
                <div className="bg-blue-600 rounded-full p-2 cursor-pointer"
                onClick={() => Nav("/admin-dashboard/admin-details")} >
                    <CgProfile className="text-white text-lg" />
                </div>
            {/* </div> */}
        </div>
    )
}

export default AdminDashboardHeader