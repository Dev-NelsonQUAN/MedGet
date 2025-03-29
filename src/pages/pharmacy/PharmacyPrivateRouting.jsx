import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PharmacyPrivateRouting = () => {
    const reduxToken = useSelector((state) => state?.medGet?.token)

    console.log(reduxToken)

    return reduxToken ? <Outlet /> : <Navigate to='/pharmacy-login' replace />

}

export default PharmacyPrivateRouting;