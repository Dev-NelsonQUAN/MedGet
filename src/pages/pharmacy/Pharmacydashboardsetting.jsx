import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';

const PharmacyDashboardSetting = () => {
    const location = useLocation();

    return (
        <div className="flex">
            <nav className="w-64 p-4 bg-gray-100">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/pharmacy-dashboard/settings/pharmacy-profile"
                            className={`block p-2 rounded ${location.pathname === '/pharmacy-dashboard/settings/pharmacy-profile' ? 'bg-blue-200' : ''}`}
                        >
                            Profile Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pharmacy-dashboard/settings/password-setting"
                            className={`block p-2 rounded ${location.pathname === '/pharmacy-dashboard/settings/password-setting' ? 'bg-blue-200' : ''}`}
                        >
                            Password Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pharmacy-dashboard/settings/pharmacy-location"
                            className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/pharmacy-location' ? 'bg-blue-200' : ''}`}
                        >
                            Location Settings
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
            {location.pathname === "/pharmacy-dashboard/settings/pharmacy-" && <Navigate to="/pharmacy-dashboard/settings/pharmacy-location" />}
        </div>
    );
};

export default PharmacyDashboardSetting;
