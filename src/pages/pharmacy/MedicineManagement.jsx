import React from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

const MedicineManagement = () => {
    const location = useLocation();

    return (
        <div className="flex">
            <nav className="w-64 p-4 bg-gray-100">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/pharmacy-dashboard/medicine-page/medicine-details"
                            className={`block p-2 rounded ${
                                location.pathname === "/pharmacy-dashboard/medicine-page/medicine-details/${med.id}" ? "bg-blue-200" : ""
                            }`}
                        >
                            Medicine Details
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pharmacy-dashboard/medicine-page/add-medicine"
                            className={`block p-2 rounded ${
                                location.pathname === "/pharmacy-dashboard/medicines-page/add-medicine" ? "bg-blue-200" : ""
                            }`}
                        >
                            Add Medicine
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 p-4">
                <Outlet />
            </div>

            {location.pathname === "/pharmacy-dashboard/medicines" && <Navigate to="/pharmacy-dashboard/medicines" />}
        </div>
    );
};

export default MedicineManagement;
