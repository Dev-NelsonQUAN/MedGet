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

            <div className="p-4 mt-4 lg:mt-10">
                {/* <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
                 */}
                 <div>
                  <img src={medGetWhiteLogo} alt="MedGet Logo" />
                 </div>

                <nav className="pt-4 ">
                    <ul className="list-none">
                        {sideBarData.map((item, index) => (
                            <li
                                key={index}
                                className="pl-2 py-3 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
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



// import React from 'react';
// import { CgLogOff } from 'react-icons/cg';
// import {
//     FaHome,
//     FaUsers,
//     FaStore,
// } from 'react-icons/fa';
// import { IoClose } from 'react-icons/io5';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { clearUser } from '../../service/GlobalState'; 
// import { persistStore } from 'redux-persist';
// import { store } from '../../service/store';

// const AdminSideBar = ({ toogleSidebar }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch(clearUser());
//         persistStore(store).purge(['medGet']);
//         navigate('/admin-login');
//     };

//     const sideBarData = [
//         {
//             title: 'Users',
//             icon: <FaUsers />,
//             link: '/admin-dash',
//         },
//         {
//             title: 'Pharmacies',
//             icon: <FaStore />,
//             link: '/admin-dash/pharmacies',
//         },
//         {
//             title: 'Logout',
//             icon: <CgLogOff />,
//             action: handleLogout,
//         },
//     ];

//     return (
//         <div className="w-65 h-full bg-blue-600 flex flex-col relative text-white">
//             <button
//                 className="absolute top-4 right-4 text-white text-2xl lg:hidden"
//                 onClick={toogleSidebar}
//             >
//                 <IoClose />
//             </button>

//             <div className="p-4 mt-4 lg:mt-10">
//                 <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

//                 <nav className="pt-4 ">
//                     <ul className="list-none">
//                         {sideBarData.map((item, index) => (
//                             <li
//                                 key={index}
//                                 className="pl-2 py-3 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
//                                 onClick={item.action} // Call action if it exists
//                             >
//                                 {item.action ? (
//                                     <div className="flex items-center">
//                                         <span className="mr-2">{item.icon}</span>
//                                         <span>{item.title}</span>
//                                     </div>
//                                 ) : (
//                                     <Link to={item.link} className="flex items-center">
//                                         <span className="mr-2">{item.icon}</span>
//                                         <span>{item.title}</span>
//                                     </Link>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     );
// };

// export default AdminSideBar;




// import React from 'react'
// import { CgLogOff } from 'react-icons/cg';
// import {
//     FaHome,
//     FaUsers,
//     FaHospital,
//     FaFileAlt,
//     FaChartLine,
//     FaCog,
//     FaClipboardList,
//     FaUserPlus,
//     FaStore,
//   } from 'react-icons/fa';
// import { IoClose } from 'react-icons/io5';
//   import { Link, useNavigate } from 'react-router-dom';
// import { clearUser } from '../../service/GlobalState';
// import { persistStore } from 'redux-persist';

// const AdminSideBar = ({toogleSidebar}) => {

//   const Nav = useNavigate()
//   const handleLogout = () => {
//     dispatch(clearUser())
//     persistStore().purge['medGet']
//     Nav('/admin-login')
//   }

//     const sideBarData = [
//         // {
//         //   title: 'Dashboard',
//         //   icon: <FaHome />,
//         //   link: '/admin-dash/home',
//         // },
//         {
//           title: 'Users',
//           icon: <FaUsers />,
//           link: '/admin-dash',
//         },
//         {
//           title: 'Pharmacies',
//           icon: <FaStore />,
//           link: '/admin-dash/pharmacies',
//         },
//         {
//           title: 'Logout',
//           icon: <CgLogOff />,
//           action: handleLogout
//         }
//         // {
//         //   title: 'Add User',
//         //   icon: <FaUserPlus />,
//         //   link: '/admin-dash/addUser',
//         // },
//         // {
//         //   title: 'Reports',
//         //   icon: <FaChartLine />,
//         //   link: '/adminDash/reports',
//         // },
//         // {
//         //   title: 'Audit Logs',
//         //   icon: <FaClipboardList />,
//         //   link: '/adminDash/auditlogs',
//         // },
//         // {
//         //   title: 'Hospitals',
//         //   icon: <FaHospital />,
//         //   link: '/adminDash/hospitals',
//         // },
//         // {
//         //   title: 'Documents',
//         //   icon: <FaFileAlt />,
//         //   link: '/adminDash/documents',
//         // },
//         // {
//         //   title: 'Settings',
//         //   icon: <FaCog />,
//         //   link: '/adminDash/settings',
//         // },
//       ];
//   return (
//     <div className="w-65 h-full bg-blue-600 flex flex-col relative text-white">
//       <button className='absolute top-4 right-4 text-white text-2xl lg:hidden' 
//       onClick={toogleSidebar} >
//         <IoClose />
//       </button>

//     <div className="p-4 mt-4 lg:mt-10">
//       <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

//       <nav className="pt-4 ">
//         <ul className="list-none">
//           {sideBarData.map((item, index) => (
//             <li
//               key={index}
//               className="pl-2 py-3 hover:bg-white hover:text-blue-600 rounded-md cursor-pointer"
//             >
//               <Link to={item.link} className="flex items-center">
//                 <span className="mr-2">{item.icon}</span>
//                 <span>{item.title}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   </div>  )
// }

// export default AdminSideBar