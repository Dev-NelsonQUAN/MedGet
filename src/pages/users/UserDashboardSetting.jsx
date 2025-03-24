import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';

const UserDashboardSetting = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <nav className="w-64 p-4 bg-gray-100">
        <ul className="space-y-2">
          <li>
            <Link
              to="/user-dashboard/settings/profile"
              className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/profile' ? 'bg-blue-200' : ''}`}
            >
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard/settings/password"
              className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/password' ? 'bg-blue-200' : ''}`}
            >
              Password Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
      {location.pathname === "/user-dashboard/settings" && <Navigate to="/user-dashboard/settings/profile" />}
    </div>
  );
};

export default UserDashboardSetting;
