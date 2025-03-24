import React from 'react'
import { createBrowserRouter, createHashRouter, } from 'react-router-dom'
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'
import AdminDashboard from '../layout/AdminDashboardLayout'
import PharmacyDashboard from '../layout/PharmacyDashboardLayout'
import PharmacyDashboardHome from '../pages/pharmacy/PharmacyDashboardHome'
import DashboardHome from '../components/DashboardHome'
import AddMedicine from "../pages/pharmacy/outlet/Addmedicine"
import MedicineList from "../pages/pharmacy/outlet/MedicineList"
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
import ProfileSettings from '../pages/users/ProfileSettings'
import PasswordSettings from '../pages/users/PasswordSettings'
import ProfileDetails from '../pages/users/ProfileDetails'
import UserPrivateRoue from '../pages/users/UserPrivateRoue'
import { Error } from './Error'
import PharmVerification from '../pages/auth/PharmVerification'
import AdminDashboardUsers from '../pages/admin/AdminDashboardUsers'
import AdminDashboardPharm from '../pages/admin/AdminDashboardPharm'
import AdminDashboardLayout from '../pages/admin/AdminDashboardLayout'

const router = createBrowserRouter([
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
        path: '/pharmacy-verification/:token',
        element: <PharmacyVerification />
    },
    {
        path: "/pharm-verify/:token",
        element: <PharmVerification />
    },
    {
        path: '/pharmacy-login',
        element: <PharmLogin />
    },
    {
        path: "/admin-dash",
        element: <AdminDashboardLayout />,
        children: [
            {
                path: 'home',
                element: <DashboardHome />
            },
            {
                path: 'users',
                element: <AdminDashboardUsers />
            },
            {
                path: 'pharmacies',
                element: <AdminDashboardPharm />
            },
        ]
    },
//  {
//     element: <UserPrivateRoue />,
//     children: [
        {
            path: "/user-dashboard",
            element: <UserLayout />,
            children: [
                {
                    index: true,
                    // path: '',
                    element: <UserDashboardHome />
                },
                {
                    path: "medicines",
                    element: <UserdashboardMedicine />
                },
                {
                    path: "user-details",
                    element: <ProfileDetails />
                },
                {
                    path: "settings",
                    element: <UserDashboardSetting />,
                    children: [
                        {
                            path: "profile",
                            element: <ProfileSettings />
                        },
                        {
                            path: "password",
                            element: <PasswordSettings />
                        }
                    ]
                },
            ]
    
        },
    // ]
//  },
    {
        path: "/pharmacy-dashboard",
        element: <PharmacyDashboard />,
        children: [
            {
                path: "home",
                element: <PharmacyDashboardHome />
            },
            {
                path: "add",
                element: <AddMedicine />
            },
            {
                path: 'view',
                element: <MedicineList />
            }
        ]
    },
    {
        path: "*",
        element: <Error />
            // <div className='flex justify-center items-center'>
            //     <h1>MedGet is asking, are you lost?</h1>
            // </div>
    }
])

export default router