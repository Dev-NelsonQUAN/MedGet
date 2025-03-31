import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'; 

const UserPrivateRouting = () => {
    const reduxToken = useSelector((state) => state?.medGet?.token);

    const isTokenValid = () => {
        if (!reduxToken) return false;

        try {
            const decodedToken = jwt_decode.jwtDecode(reduxToken);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp > currentTime;
        } catch (error) {
            return false;
        }
    };

    return isTokenValid() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserPrivateRouting;


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

// const UserPrivateRouting = () => {
//     const reduxToken = useSelector((state) => state?.medGet?.token);
//     const location = useLocation();

//     const isTokenValid = () => {
//         if (!reduxToken) return false;

//         try {
//             const decodedToken = jwt_decode(reduxToken);
//             const currentTime = Math.floor(Date.now() / 1000);
//             return decodedToken.exp > currentTime;
//         } catch (error) {
//             return false;
//         }
//     };

//     return isTokenValid() ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
// };

// export default UserPrivateRouting;

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'

// const UserPrivateRouting = () => {
//   const reduxToken = useSelector((state) => state?.medGet?.token)

//   console.log(reduxToken)
  
//   return reduxToken ? <Outlet /> : <Navigate to='/login' replace />

// }

// export default UserPrivateRouting