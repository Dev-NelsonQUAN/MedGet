import React from 'react';
import { CgLogOff } from 'react-icons/cg';
import {
    FaUsers,
    FaStore,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../service/GlobalState';
import { persistStore } from 'redux-persist';
import store  from '../../service/store';
import medGetWhiteLogo from "../../assets/MedgetLogoNoBG2.png"

const AdminSideBar = ({ toogleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        persistStore(store).purge(['medGet']);
        navigate('/admin-login');
    };

    const sideBarData = [
        {
            title: 'Users',
            icon: <FaUsers />,
            link: '/admin-dash',
        },
        {
            title: 'Pharmacies',
            icon: <FaStore />,
            link: '/admin-dash/get-all-pharmacies',
        },
        {
            title: 'Logout',
            icon: <CgLogOff />,
            action: handleLogout,
        },
    ];

    return (
        <div className="w-65 h-full bg-blue-600 flex flex-col relative text-white">
            <button
                className="absolute top-4 right-4 text-white text-2xl lg:hidden"
                onClick={toogleSidebar}
            >
                <IoClose />
            </button>

            <div className="px--4 lg:mt-8 max-[769px]:mt-4"
            >
                 <div className='w-35 cursor-pointer pl-1.5' 
                 onClick={() => navigate("/")}
                 >
                  <img src={medGetWhiteLogo} alt="MedGet Logo" />
                 </div>

                <nav className="pt-6 ">
                    <ul className="list-none">
                        {sideBarData.map((item, index) => (
                            <li
                                key={index}
                                className="pl-4 py-3.5 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
                            >
                                {item.action ? (
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
    );
};

export default AdminSideBar;