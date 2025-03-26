import React, { useEffect } from 'react';
import { useGetAllUsersQuery } from '../../service/AdminRTK';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserPlus, FaChartLine } from 'react-icons/fa';

const AdminDashboardUsers = () => {
    const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery();
    const token = useSelector((state) => state?.medGet?.token);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Token in AdminDashboard:", token);
        if (!token) {
            navigate('/admin-login');
        }
    }, [token, navigate]);

    if (!token) {
        return null;
    }

    console.log(useSelector((state) => state.medGet));
    console.log("Users Data:", users);

    if (usersLoading) {
        return <p>Loading...</p>;
    }

    if (usersError) {
        return <p>Error fetching data</p>;
    }

    const dummyImageUrl = 'https://via.placeholder.com/150';

    if (users && users.data && Array.isArray(users.data)) {
        return (
            <div className="p-4 bg-white">
                <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-orange-400 text-white rounded-lg shadow p-4 flex items-center">
                        <FaUsers className="mr-4 text-3xl" />
                        <div>
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-3xl font-bold mt-2">{users.data.length}</p>
                        </div>
                    </div>

                    <div className="bg-green-600 text-white rounded-lg shadow p-4 flex items-center">
                        <FaUserPlus className="mr-4 text-3xl" />
                        <div>
                            <h2 className="text-lg font-semibold">New Users (Simulated)</h2>
                            <p className="text-3xl font-bold mt-2">15</p>
                        </div>
                    </div>

                    <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
                        <FaChartLine className="mr-4 text-3xl" />
                        <div>
                            <h2 className="text-lg font-semibold">User Activity (Simulated)</h2>
                            <p className="text-3xl font-bold mt-2">High</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">User List</h2>

                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-center">Image</th>
                                <th className="py-2 px-4 border-b text-center">Full Name</th>
                                <th className="py-2 px-4 border-b text-center">Email</th>
                                <th className="py-2 px-4 border-b text-center">Address</th>
                                <th className="py-2 px-4 border-b text-center">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b text-center">
                                        <img
                                            src={user.image || dummyImageUrl}
                                            alt={`${user.fullname} profile`}
                                            className="w-12 h-12 object-cover rounded-full mx-auto"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{user.fullname || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.email || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.address || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{user.phone || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else if (users) {
        return <div>Users data is not in an array format.</div>;
    } else {
        return (
            <div className="p-4 bg-white">
                <h2>Users</h2>
                <div>No users data available.</div>
            </div>
        );
    }
};

export default AdminDashboardUsers;



// import React, { useEffect } from 'react';
// import { useGetAllPharmaciesQuery, useGetAllUsersQuery } from '../../service/AdminRTK';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { FaUsers, FaUserPlus, FaChartLine } from 'react-icons/fa';

// const AdminDashboardUsers = () => {
//     const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery();
//     const { data: pharmacies, isLoading: pharmaciesLoading, isError: pharmaciesError } = useGetAllPharmaciesQuery();
//     const token = useSelector((state) => state?.medGet?.token);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("Token in AdminDashboard:", token);
//         if (!token) {
//             navigate('/admin-login');
//         }
//     }, [token, navigate]);

//     if (!token) {
//         return null;
//     }

//     console.log(useSelector((state) => state.medGet));
//     console.log("Users Data:", users);
//     console.log("Pharmacies Data:", pharmacies);

//     if (usersLoading || pharmaciesLoading) {
//         return <p>Loading...</p>;
//     }

//     if (usersError || pharmaciesError) {
//         return <p>Error fetching data</p>;
//     }

//     if (users && users.data && Array.isArray(users.data)) {
//         return (
//             <div className="p-4 bg-white">
//                 <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                     <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
//                         <FaUsers className="mr-4 text-3xl" />
//                         <div>
//                             <h2 className="text-lg font-semibold">Total Users</h2>
//                             <p className="text-3xl font-bold mt-2">{users.data.length}</p>
//                         </div>
//                     </div>

//                     <div className="bg-green-600 text-white rounded-lg shadow p-4 flex items-center">
//                         <FaUserPlus className="mr-4 text-3xl" />
//                         <div>
//                             <h2 className="text-lg font-semibold">New Users (Simulated)</h2>
//                             <p className="text-3xl font-bold mt-2">15</p>
//                         </div>
//                     </div>

//                     <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
//                         <FaChartLine className="mr-4 text-3xl" />
//                         <div>
//                             <h2 className="text-lg font-semibold">User Activity (Simulated)</h2>
//                             <p className="text-3xl font-bold mt-2">High</p>
//                         </div>
//                     </div>
//                 </div>

//                 <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">User List</h2>

//                 <div className="overflow-x-auto mt-4">
//                     <table className="min-w-full bg-white border border-gray-300">
//                         <thead>
//                             <tr>
//                                 <th className="py-2 px-4 border-b text-center">Full Name</th>
//                                 <th className="py-2 px-4 border-b text-center">Email</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.data.map((user) => (
//                                 <tr key={user.id}>
//                                     <td className="py-2 px-4 border-b text-center">{user.fullname}</td>
//                                     <td className="py-2 px-4 border-b text-center">{user.email}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Pharmacies</h2>
//                 {pharmacies && pharmacies.data && Array.isArray(pharmacies.data) && pharmacies.data.map((pharmacy) => (
//                     <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>
//                 ))}
//             </div>
//         );
//     } else if (users) {
//         return <div>Users data is not in an array format.</div>;
//     } else {
//         return (
//             <div className="p-4 bg-white">
//                 <h2>Users</h2>
//                 <div>No users data available.</div>
//                 <h2>Pharmacies</h2>
//                 {pharmacies && pharmacies.data && Array.isArray(pharmacies.data) && pharmacies.data.map((pharmacy) => (
//                     <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>
//                 ))}
//             </div>
//         );
//     }
// };

// export default AdminDashboardUsers;

// import React, { useEffect } from 'react';
// import { useGetAllPharmaciesQuery, useGetAllUsersQuery } from '../../service/AdminRTK';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboardUsers = () => {
//     const { data: users, isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery();
//     const { data: pharmacies, isLoading: pharmaciesLoading, isError: pharmaciesError } = useGetAllPharmaciesQuery();
//     const token = useSelector((state) => state?.medGet?.token);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("Token in AdminDashboard:", token);
//         if (!token) {
//             navigate('/admin-login');
//         }
//     }, [token, navigate]);

//     if (!token) {
//         return null;
//     }

//     console.log(useSelector((state) => state.medGet));

//     console.log("Users Data:", users);
//     console.log("Pharmacies Data:", pharmacies);

//     if (usersLoading || pharmaciesLoading) {
//         return <p>Loading...</p>;
//     }

//     if (usersError || pharmaciesError) {
//         return <p>Error fetching data</p>;
//     }

//     if (users && users.data && Array.isArray(users.data)) {
//         // It is an array, so map it.
//         return (
//             <div>
//                 <h2>Users</h2>
//                 {users.data.map((user) => (
//                     <div key={user.id}>{user.fullname}</div>
//                 ))}
//                 <h2>Pharmacies</h2>
//                 {pharmacies && pharmacies.data && Array.isArray(pharmacies.data) && pharmacies.data.map((pharmacy) => (
//                     <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>
//                 ))}
//             </div>
//         );
//     } else if (users) {
//         // It is not an array, but it has a value.
//         return <div>Users data is not in an array format.</div>;
//     } else {
//         // It is null or undefined.
//         return (
//             <div>
//                 <h2>Users</h2>
//                 <div>No users data available.</div>
//                 <h2>Pharmacies</h2>
//                 {pharmacies && pharmacies.data && Array.isArray(pharmacies.data) && pharmacies.data.map((pharmacy) => (
//                     <div key={pharmacy.id}>{pharmacy.pharmacyName}</div>
//                 ))}
//             </div>
//         );
//     }
// };

// export default AdminDashboardUsers;