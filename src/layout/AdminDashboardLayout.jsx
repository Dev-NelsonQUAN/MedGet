import React from 'react'
import SideBar from '../components/SideBar'
import DashboardHeader from '../components/DashboardHeader'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='bg-white flex h-[100vh]'>
      <aside>
        <SideBar />
      </aside>

      <div className='bg-gray-300'>
        <div>
          <DashboardHeader />
        </div>

        <div className='bg-gray-500 m-6'>
          <Outlet />
        </div> 
      </div>
    </div>
  )
}

export default AdminDashboard