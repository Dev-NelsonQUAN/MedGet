import React, { useEffect } from 'react';
import { useGetAllPharmaciesQuery, useGetAllUsersQuery } from '../../service/AdminRTK';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboardUsers = () => {
    const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery();
    const { data: pharmacies, isLoading: pharmaciesLoading, isError: pharmaciesError } = useGetAllPharmaciesQuery();
    const token = useSelector((state) => state?.medGet?.token);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Token in AdminDashboard:", token); // Add this line
        if (!token) {
            navigate('/admin-login');
        }
    }, [token, navigate]);

    if (!token) {
        return null
    }

    console.log(useSelector((state) => state.medGet))

    console.log(users);
    console.log(pharmacies);

    if (usersLoading || pharmaciesLoading) {
        return <p>Loading...</p>;
    }

    if (usersError || pharmaciesError) {
        return <p>Error fetching data</p>;
    }

    return (
        <div>
            <h2>Users</h2>
            {users && users.map((user) => (
                <div key={user.id}>{user.fullname}</div>
            ))}

            <h2>Pharmacies</h2>
            {pharmacies && pharmacies.map((pharmacy) => (
                <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>
            ))}
        </div>
    );
};

export default AdminDashboardUsers;

// import React, { useState, useEffect } from 'react'
// import { useGetAllPharmaciesQuery, useGetAllUsersQuery } from '../../service/AdminRTK'

// const AdminDashboardUsers = () => {
//     const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery
//     const { data: pharmacies, isLoading: pharmaciesLoading, isError: pharmaciesError } = useGetAllPharmaciesQuery

//     console.log(users)
//     console.log(pharmacies)

//     if (usersLoading || pharmaciesLoading) {
//         return <p>Loading...</p>
//     }

//     if (usersError || pharmaciesError) {
//         return <p> Error fetching data </p>
//     }

//     return (
//         <div>
//             <h2>Users</h2>
//             {users && users.map((user) => (
//                 <div key={user.id}>{user.fullname}</div>
//             ))}

//             <h2>Pharmacies</h2>
//             {pharmacies && pharmacies.map((pharmacy) => (
//                 <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>

//             ))}
//         </div>
//     )
// }

// export default AdminDashboardUsers