import React, { useState } from 'react';
import { CgLogOff } from 'react-icons/cg';
import {
    FaHome,
    FaCog,
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../service/GlobalState';
import { persistStore } from 'redux-persist';
import store from '../../service/store';
import medGetWhiteLogo from "../../assets/MedgetLogoNoBG2.png";
import { useDispatch } from 'react-redux';

const UserSideBar = ({ toggleSidebar }) => {
    const dispatch = useDispatch();
    const Nav = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        dispatch(clearUser());
        persistStore(store).purge(['medGet']);
        Nav("/login");
        setShowLogoutModal(false);
    };

    const confirmLogout = () => {
        setShowLogoutModal(true);
    };

    const sideBarData = [
        {
            title: 'Dashboard',
            icon: <FaHome />,
            link: '/user-dashboard',
        },
        {
            title: 'Medicines',
            icon: <GiMedicines />,
            link: '/user-dashboard/medicines',
        },
        {
            title: 'Settings',
            icon: <FaCog />,
            link: '/user-dashboard/settings',
        },
        {
            title: 'Logout',
            icon: <CgLogOff />,
            action: confirmLogout,
        },
    ];

    return (
        <div className="lg:w-65 h-full bg-blue-600 text-white flex flex-col relative">
            <button className='absolute top-4 right-4 text-white text-2xl lg:hidden'
                onClick={toggleSidebar}>
                <IoClose />
            </button>

            <div className="px-4 lg:mt-8 max-[769px]:mt-4">
                <div className='w-35 cursor-pointer pl-1.5'
                    onClick={() => Nav("/")}
                >
                    <img
                        src={medGetWhiteLogo} alt="MedGet Logo" />
                </div>

                <nav className="pt-6">
                    <ul className="list-none">
                        {sideBarData.map((item, index) => (
                            <li
                                key={index}
                                className="pl-4 py-3.5 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
                            >
                                {item.action ?
                                    (
                                        <div
                                            className="flex items-center"
                                            onClick={item.action}
                                        >
                                            <span className="mr-2">{item.icon}</span>
                                            <span>{item.title}</span>
                                        </div>
                                    ) : (
                                        <Link to={item.link} className="flex items-center">
                                            <span className="mr-2">{item.icon}</span>
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg text-black w-full max-w-md"> 
                        <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSideBar;