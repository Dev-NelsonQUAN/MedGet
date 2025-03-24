import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import UserDashboardHome from './UserdashboardMedicine'

const UserPrivateRoue = ({children}) => {
    const token = useSelector((state) => state?.user?.token)

      if (!token) {
        return <Navigate to='/login'/>
      }
  return 
  // (
  //  <>
  //   { 
  //   token == null ? <Navigate to='/login'/> : <UserDashboardHome />
  //   }
  //  </>
  // )
}

export default UserPrivateRoue