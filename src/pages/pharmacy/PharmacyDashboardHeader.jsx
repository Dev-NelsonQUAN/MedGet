import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PharmacyDashboardHeader = ({ toggleSidebar }) => {
    const Nav = useNavigate();
    const user = useSelector((state) => state.medGet.user);
    let pharmacyName = '';

    if (user && user.pharmacyName) {
        const nameParts = user.pharmacyName.split(' ');
        pharmacyName = nameParts[0];
    }

    return (
        <div className="w-full p-4 flex justify-between items-center shadow-2xl  text-black">
            <div className="flex items-center">
                <button
                    className="lg:hidden mr-4 text-black text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
                <div>
                    <h2 className="text-lg font-semibold">
                        Welcome, {pharmacyName || 'Pharmacy'}
                    </h2>
                    <p className="lg:text-[16px] text-black max-[769px]:text-[14px] max-[576px]:text-[10px]">Here's your dashboard overview.</p>
                </div>
            </div>
            <div
                className="bg-blue-600 rounded-full p-2 cursor-pointer"
                onClick={() => Nav('/pharmacy-dashboard/settings/pharmacy-profile')}
            >
                <CgProfile className="text-white text-lg" />
            </div>
        </div>
    );
};

export default PharmacyDashboardHeader;
