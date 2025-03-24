import React from 'react'
import {
    FaHome,
    FaUsers,
    FaHospital,
    FaFileAlt,
    FaChartLine,
    FaCog,
    FaClipboardList,
    FaUserPlus,
    FaStore,
  } from 'react-icons/fa';
  import { Link } from 'react-router-dom';

const AdminSideBar = () => {
    const sideBarData = [
        // {
        //   title: 'Dashboard',
        //   icon: <FaHome />,
        //   link: '/admin-dash/home',
        // },
        {
          title: 'Users',
          icon: <FaUsers />,
          link: '/admin-dash/users',
        },
        {
          title: 'Pharmacies',
          icon: <FaStore />,
          link: '/admin-dash/pharmacies',
        },
        // {
        //   title: 'Add User',
        //   icon: <FaUserPlus />,
        //   link: '/admin-dash/addUser',
        // },
        // {
        //   title: 'Reports',
        //   icon: <FaChartLine />,
        //   link: '/adminDash/reports',
        // },
        // {
        //   title: 'Audit Logs',
        //   icon: <FaClipboardList />,
        //   link: '/adminDash/auditlogs',
        // },
        // {
        //   title: 'Hospitals',
        //   icon: <FaHospital />,
        //   link: '/adminDash/hospitals',
        // },
        // {
        //   title: 'Documents',
        //   icon: <FaFileAlt />,
        //   link: '/adminDash/documents',
        // },
        // {
        //   title: 'Settings',
        //   icon: <FaCog />,
        //   link: '/adminDash/settings',
        // },
      ];
  return (
    <div className="w-65 h-[100%] bg-blue-600 text-white">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

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
  </div>  )
}

export default AdminSideBar