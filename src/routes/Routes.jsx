import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../pages/auth/SignUp'
import Login from '../pages/auth/Login'
import AdminDashboard from '../layout/AdminDashboardLayout'
import PharmacyDashboard from '../layout/PharmacyDashboardLayout'
import DashboardHome from '../components/DashboardHome'
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
import { Error } from './Error'
import PharmVerification from '../pages/auth/PharmVerification'
import AdminDashboardUsers from '../pages/admin/AdminDashboardUsers'
import AdminDashboardPharm from '../pages/admin/AdminDashboardPharm'
import AdminDashboardLayout from '../pages/admin/AdminDashboardLayout'
import UserPrivateRouting from '../pages/users/UserPrivateRouting'
import AdminLogin from '../pages/auth/AdminLogin'
import LocationSettings from '../pages/users/LocationSettings'

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
        path: '/admin-login',
        element: <AdminLogin />
    },
    {
        path: "/admin-dash",
        element: <AdminDashboardLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboardUsers />
            },
            {
                path: 'get-all-pharmacies',
                element: <AdminDashboardPharm />
            },
        ]
    },
    {
        element: <UserPrivateRouting />,
        children: [
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
                            },
                            {
                                path: "location",
                                element: <LocationSettings />
                            }
                        ]
                    },
                ]

            },
        ]
    },
    {
        path: "/pharmacy-dashboard",
        element: <PharmacyDashboard />,
        children: [
            {
                index: true,
                element: <UserdashboardMedicine />
            },
            {
                path: "settings",
                element: <UserDashboardSetting />
            }

        ]

    },
    {
        path: "*",
        element: <Error />
    }
])

export default router