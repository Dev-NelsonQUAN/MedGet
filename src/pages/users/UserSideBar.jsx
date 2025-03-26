import React from 'react'
import { CgLogOff } from 'react-icons/cg';
import {
    FaHome,
    FaHospital,
    FaCog,
    FaStore,
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../service/GlobalState';
import { persistStore } from 'redux-persist';
import store from '../../service/store';

const UserSideBar = ({ toogleSidebar }) => {
    const Nav = useNavigate()
    const handleLogout = () => {
        dispatch(clearUser())
        persistStore(store).purge['medGet']
    }

    const sideBarData = [
        {
            title: 'Dashboard',
            icon: <FaHome />,
            link: '/user-dashboard',
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
        {
            title: 'Logout',
            icon: <CgLogOff />,
            action: handleLogout
            // link: 
        }
    ];

    return (
        <div className="lg:w-65 h-full bg-blue-600 text-white flex flex-col relative">
            <button className='absolute top-4 right-4 text-white text-2xl lg:hidden'
                onClick={toogleSidebar}>
                <IoClose />
            </button>

            <div className="p-4 mt-4 lg:mt-10">
                <h1 className="text-2xl font-bold mb-6">User Panel</h1>

                <nav className="pt-4">
                    <ul className="list-none">
                        {sideBarData.map((item, index) => (
                            <li
                                key={index}
                                className="pl-2 py-3 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
                            >
                                {
                                    item.action ?
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
        </div>
    )
}

export default UserSideBar