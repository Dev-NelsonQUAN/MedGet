import React from 'react';
import {
    FaHome,
    FaCog,
    FaPowerOff
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import logo from '../../assets/MedgetLogoNoBG2.png'

const PharmacySideBar = ({ toggleSidebar }) => {
    const sideBarData = [
        { title: 'Dashboard', icon: <FaHome />, link: '/pharmacy-dashboard/home' },
        { title: 'Medicines', icon: <GiMedicines />, link: '/pharmacy-dashboard/medicine-page' },
        { title: 'Settings', icon: <FaCog />, link: '/pharmacy-dashboard/settings' },
        { title: 'Logout', icon: <FaPowerOff />, link: '/pharmacy-dashboard/settings' },
    ];

    return (
        <div className="w-64 h-full bg-blue-600 text-white flex flex-col relative">
            <button
                onClick={toggleSidebar}
                className="absolute top-4 right-4 text-white text-2xl lg:hidden"
            >
                <IoClose />
            </button>

            <div className="p-4 mt-10 lg:mt-4">
                <img src={logo} alt="" className='w-[120px] ml-2' />

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
