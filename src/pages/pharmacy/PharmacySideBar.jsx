import React from 'react';
import {
    FaHome,
    FaHospital,
    FaCog,
    FaStore,
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const PharmacySideBar = ({ toggleSidebar }) => {
    const sideBarData = [
        { title: 'Dashboard', icon: <FaHome />, link: '/user-dashboard/home' },
        { title: 'Pharmacies', icon: <FaStore />, link: '/user-dashboard/pharmacies' },
        { title: 'Medicines', icon: <GiMedicines />, link: '/user-dashboard/medicines' },
        { title: 'Hospitals', icon: <FaHospital />, link: '/user-dashboard/hospitals' },
        { title: 'Settings', icon: <FaCog />, link: '/user-dashboard/settings' },
    ];

    return (
        <div className="w-64 h-full bg-blue-600 text-white flex flex-col relative">
            {/* Close Button for small screens */}
            <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 text-white text-2xl lg:hidden"
            >
                <IoClose />
            </button>

            <div className="p-4 mt-10 lg:mt-4">
                <h1 className="text-2xl font-bold mb-6">User Panel</h1>

                <nav className="pt-4">
                    <ul className="list-none">
                        {sideBarData.map((item, index) => (
                            <li
                                key={index}
                                className="pl-2 py-3 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
                            >
                                <Link to={item.link} className="flex items-center">
                                    <span className="mr-2">{item.icon}</span>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default PharmacySideBar;
