import React from 'react'
import {
    FaHome,
    FaHospital,
    FaFileAlt,
    FaChartLine,
    FaCog,
    FaClipboardList,
    FaStore,
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const UserSideBar = () => {
    const sideBarData = [
        {
            title: 'Dashboard',
            icon: <FaHome />,
            link: '/user-dashboard/home',
        },
        // {
        //     title: 'Pharmacies',
        //     icon: <FaStore />,
        //     link: '/user-dashboard/pharmacies',
        // }, 
        {


            title: 'Medicines',
            icon: <GiMedicines />,
            link: '/user-dashboard/medicines',
        },
        // {
        //     title: 'Reports',
        //     icon: <FaChartLine />,
        //     link: '/userDashboard/reports',
        // },
        // {
        //     title: 'Audit Logs',
        //     icon: <FaClipboardList />,
        //     link: '/userDashboard/auditlogs',
        // },
        // {
        //     title: 'Hospitals',
        //     icon: <FaHospital />,
        //     link: '/user-dashboard/hospitals',
        // },
        // {
        //     title: 'Documents',
        //     icon: <FaFileAlt />,
        //     link: '/user-dashboard/documents',
        // },
        {
            title: 'Settings',
            icon: <FaCog />,
            link: '/user-dashboard/settings',
        },
    ];

    return (
        <div className="w-65 h-[100%] bg-blue-600 text-white">
            <div className="p-4">
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
    )
}

export default UserSideBar