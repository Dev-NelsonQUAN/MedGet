import React, { useState } from 'react';
import PharmacySideBar from '../pages/pharmacy/PharmacySideBar';
import PharmacyDashboardHeader from '../pages/pharmacy/PharmacyDashboardHeader';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setShowLogoutPopup(false);
        navigate("/pharmacy-login"); 
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`fixed top-0 left-0 h-full z-40 bg-blue-600 text-white transform ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 w-64 lg:translate-x-0 lg:static lg:block`}
            >
                <PharmacySideBar toggleSidebar={toggleSidebar} onLogout={() => setShowLogoutPopup(true)} />
            </div>

            <div className={`flex flex-col flex-1 transition-all duration-300 w-full`}>
                <PharmacyDashboardHeader toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet/>
                </main>
            </div>

            {showLogoutPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
                    <div className="bg-white px-10 py-10 rounded-lg shadow-lg">
                        <p className="text-lg font-medium">Do you want to logout?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowLogoutPopup(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;


