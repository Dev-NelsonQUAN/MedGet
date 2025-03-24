import React, { useState, useEffect } from 'react'
import { useGetAllPharmaciesQuery, useGetAllUsersQuery } from '../../service/AdminRTK'

const AdminDashboardUsers = () => {
    const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery
    const { data: pharmacies, isLoading: pharmaciesLoading, isError: pharmaciesError } = useGetAllPharmaciesQuery

    if (usersLoading || pharmaciesLoading) {
        return <p>Loading...</p>
    }

    if (usersError || pharmaciesError) {
        return <p> Error fetching data </p>
    }

    return (
        <div>
            <h2>Users</h2>
            {users && users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}

            <h2>Pharmacies</h2>
            {pharmacies && pharmacies.map((pharmacy) => (
                <div key={pharmacy.id}>{pharmacy.name}</div>

            ))}       
        </div>
    )
}

export default AdminDashboardUsers