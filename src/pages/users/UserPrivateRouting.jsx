import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const UserPrivateRouting = () => {
  const reduxToken = useSelector((state) => state?.medGet?.token)

  console.log(reduxToken)
  
  return reduxToken ? <Outlet /> : <Navigate to='/login' replace />

}

export default UserPrivateRouting