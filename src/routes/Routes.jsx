import React from 'react'
import { createHashRouter, } from 'react-router-dom'
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'
import AdminDashboard from '../layout/AdminDashboardLayout'
import PharmacyDashboard from '../layout/PharmacyDashboardLayout'
// import PharmacyDashboardHome from '../pages/pharmacy/PharmacyDashboardHome'
import DashboardHome from '../components/DashboardHome'
import Users from '../pages/admin/Users';
import Pharmacies from '../pages/admin/Pharmacies';
import UserDashboardHome from '../pages/users/UserDashboardHome'
import LandingPage from "../pages/Landing/LandingPage"
import SelectionPage from "../pages/Landing/SelectionPage"
import PharmSignUp from '../pages/auth/PharmSignUp'
import PharmLogin from '../pages/auth/PharmLogin'
import CheckEmail from '../pages/auth/CheckEmail'
import ContactPage from '../pages/Landing/ContactPage'
import Verification from '../pages/auth/Verification'
import PharmacyVerification from '../pages/auth/PharmacyEmailVerify'
import UserLayout from '../pages/users/Dashboard'
import UserDashboardSetting from '../pages/users/UserDashboardSetting'
import UserdashboardMedicine from '../pages/users/UserdashboardMedicine'

const router = createHashRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/selection",
        element: <SelectionPage />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/check-email",
        element: <CheckEmail />
    },
    // {
    //     path: "/verification/verify:token",
    //     element: <Verification />
    // },
    {
        path: "/verify/:token",
        element: <Verification />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/pharmacy-sign-up',
        element: <PharmSignUp />
    },
    {
        path: '/pharmacyVerification/:token',
        element: <PharmacyVerification/>
    },
    {
        path: '/pharmacy-login',
        element: <PharmLogin/>
    },
    {
        path: "/adminDash",
        element: <AdminDashboard />,
        children: [
            {
                path: 'home',
                element: <DashboardHome />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'pharmacies',
                element: <Pharmacies />
            },
        ]
    },
    {
        path: "/userDashboard",
        element: <UserLayout />,
        children: [
            {
                path: 'home',
                element: <UserDashboardHome />
            },
            {
                path: "medicine",
                element: <UserdashboardMedicine />
            },
            {
                path: "settings",
                element: <UserDashboardSetting />
            }
            // {
            //     path: 'drugs',
            //     element: 
            // }
        ]

    },
    {
        path: "/pharmacydashboard",
        element: <PharmacyDashboard/>,
        children: [
            // {
            //     path: "homes",
            //     element : <PharmacyDashboardHome/>
            // }
        ]
    },
    {
        path: "*",
        element: 
            <div className='flex justify-center items-center'>
                <h1>MedGet is asking, are you lost?</h1>
            </div>
    }
])

export default router