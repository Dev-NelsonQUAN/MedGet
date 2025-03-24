import React from 'react'
import { Link } from "react-router-dom";
import Btn from '../ui/Btn'

export const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-blue-700">404</h1>
            <p className="text-lg text-gray-600 mt-2">Oops! Page not found!</p>
            <p className="text-sm text-gray-500 mb-5">
                The page you requested was not found.
            </p>
            <Link to="/">
                <Btn 
                btnText='Back to home'
                bg='bg-blue-600'
                color='text-white'
                px='px-4'
                py='py-2'
                />
            </Link>
            `</div>
    )
}
