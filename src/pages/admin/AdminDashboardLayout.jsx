import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'
import AdminDashboardHeader from './AdminDashboardHeader'

const AdminDashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    <aside className="w-64 bg-white shadow-md flex-shrink-0 z-10">
        <AdminSideBar />
    </aside>

    <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md 
        w-full">
            <AdminDashboardHeader />
        </header>

        <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
        </main>
    </div>
</div>  )
}

export default AdminDashboardLayout