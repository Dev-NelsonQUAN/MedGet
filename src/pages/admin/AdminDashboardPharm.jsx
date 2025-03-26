import React, { useState, useEffect } from 'react';
import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPharm = () => {
    const { data: pharmacies, isLoading, isError } = useGetAllPharmaciesQuery();
    const token = useSelector((state) => state.medGet.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/admin-login');
        }
    }, [token, navigate]);

    console.log("Pharmacies Data:", pharmacies);

    const [userLocation, setUserLocation] = useState(null);
    const [totalPharmacies, setTotalPharmacies] = useState(0);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading pharmacies.</div>;
    }

    if (!pharmacies || !pharmacies.data || !Array.isArray(pharmacies.data)) {
        return <div>No pharmacies available.</div>;
    }

    const truncateText = (text, maxLength) => {
        if (!text) {
            return 'N/A';
        }
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const dummyImageUrl = 'https://via.placeholder.com/150'; // Placeholder image URL

    return (
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-orange-400 text-white rounded-lg shadow p-4 flex items-center">
                    <FaStore className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Pharmacies</h2>
                        <p className="text-3xl font-bold mt-2">{pharmacies.data.length}</p>
                    </div>
                </div>

                <div className="bg-green-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaMoneyBillAlt className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Simulated Revenue</h2>
                        <p className="text-3xl font-bold mt-2">$1,250</p>
                    </div>
                </div>

                <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaMapMarkerAlt className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Your Location</h2>
                        {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
                        {!userLocation && <p className="mt-2">Loading...</p>}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Image</th>
                            <th className="py-2 px-4 border-b text-center">Name</th>
                            <th className="py-2 px-4 border-b text-center">Address</th>
                            <th className="py-2 px-4 border-b text-center">Distance</th>
                            <th className="py-2 px-4 border-b text-center">Hours</th>
                            <th className="py-2 px-4 border-b text-center">Phone</th>
                            <th className="py-2 px-4 border-b text-center">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pharmacies.data.map((pharmacy) => {
                            console.log("Individual Pharmacy:", pharmacy);
                            return (
                                <tr key={pharmacy.id}>
                                    <td className="py-2 px-4 border-b text-center">
                                        <img
                                            src={pharmacy.image || dummyImageUrl}
                                            alt={`${pharmacy.name} logo`}
                                            className="w-12 h-12 object-cover rounded-full mx-auto"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.pharmacyName}</td>
                                    <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
                                    <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.phone || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.rating || 'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardPharm;
// import React, { useState, useEffect } from 'react';
// import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboardPharm = () => {
//     const { data: pharmacies, isLoading, isError } = useGetAllPharmaciesQuery();
//     const token = useSelector((state) => state.medGet.token);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!token) {
//             navigate('/admin-login');
//         }
//     }, [token, navigate]);

//     console.log("Pharmacies Data:", pharmacies);

//     const [userLocation, setUserLocation] = useState(null);
//     const [totalPharmacies, setTotalPharmacies] = useState(0);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error loading pharmacies.</div>;
//     }

//     if (!pharmacies || !pharmacies.data || !Array.isArray(pharmacies.data)) {
//         return <div>No pharmacies available.</div>;
//     }

//     const truncateText = (text, maxLength) => {
//         if (!text) {
//             return 'N/A'; // Or '' if you prefer empty string
//         }
//         if (text.length <= maxLength) return text;
//         return text.substring(0, maxLength) + '...';
//     };

//     return (
//         <div className="p-4 bg-white">
//             <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div className="bg-orange-400 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaStore className="mr-4 text-3xl" />
//                     <div>
//                         <h2 className="text-lg font-semibold">Total Pharmacies</h2>
//                         <p className="text-3xl font-bold mt-2">{pharmacies.data.length}</p>
//                     </div>
//                 </div>

//                 <div className="bg-green-600 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaMoneyBillAlt className="mr-4 text-3xl" />
//                     <div>
//                         <h2 className="text-lg font-semibold">Simulated Revenue</h2>
//                         <p className="text-3xl font-bold mt-2">$1,250</p>
//                     </div>
//                 </div>

//                 <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaMapMarkerAlt className="mr-4 text-3xl" />
//                     <div>
//                         <h2 className="text-lg font-semibold">Your Location</h2>
//                         {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
//                         {!userLocation && <p className="mt-2">Loading...</p>}
//                     </div>
//                 </div>
//             </div>

//             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">All Pharmacies</h2>

//             <div className="overflow-x-auto mt-4">
//                 <table className="min-w-full bg-white border border-gray-300">
//                     <thead>
//                         <tr>
//                             <th className="py-2 px-4 border-b text-center">Image</th>
//                             <th className="py-2 px-4 border-b text-center">Name</th>
//                             <th className="py-2 px-4 border-b text-center">Address</th>
//                             <th className="py-2 px-4 border-b text-center">Distance</th>
//                             <th className="py-2 px-4 border-b text-center">Hours</th>
//                             <th className="py-2 px-4 border-b text-center">Phone</th>
//                             <th className="py-2 px-4 border-b text-center">Rating</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {pharmacies.data.map((pharmacy) => {
//                             console.log("Individual Pharmacy:", pharmacy);
//                             return (
//                                 <tr key={pharmacy.id}>
//                                     <td className="py-2 px-4 border-b text-center">
//                                         {pharmacy.image && (
//                                             <img
//                                                 src={pharmacy.image}
//                                                 alt={`${pharmacy.name} logo`}
//                                                 className="w-12 h-12 object-cover rounded-full mx-auto"
//                                             />
//                                         )}
//                                     </td>
//                                     <td className="py-2 px-4 border-b text-center">{pharmacy.pharmacyName}</td>
//                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
//                                     <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
//                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
//                                     <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
//                                     <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardPharm;

// // import React, { useState, useEffect } from 'react';
// // import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
// // import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// // const AdminDashboardPharm = () => {
// //     const { data: pharmacies, isLoading, isError } = useGetAllPharmaciesQuery();
// //     const token = useSelector((state) => state.medGet.token);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         if (!token) {
// //             navigate('/admin-login');
// //         }
// //     }, [token, navigate]);

// //     console.log("Pharmacies Data:", pharmacies);

// //     const [userLocation, setUserLocation] = useState(null);
// //     const [totalPharmacies, setTotalPharmacies] = useState(0);

// //     if (isLoading) {
// //         return <div>Loading...</div>;
// //     }

// //     if (isError) {
// //         return <div>Error loading pharmacies.</div>;
// //     }

// //     if (!pharmacies || !pharmacies.data || !Array.isArray(pharmacies.data)) {
// //         return <div>No pharmacies available.</div>;
// //     }

// //     const truncateText = (text, maxLength) => {
// //         if (text.length <= maxLength) return text;
// //         return text.substring(0, maxLength) + '...';
// //     };

// //     return (
// //         <div className="p-4 bg-white">
// //             <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// //                     <FaStore className="mr-4 text-3xl" />
// //                     <div>
// //                         <h2 className="text-lg font-semibold">Total Pharmacies</h2>
// //                         <p className="text-3xl font-bold mt-2">{pharmacies.data.length}</p>
// //                     </div>
// //                 </div>

// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// //                     <FaMoneyBillAlt className="mr-4 text-3xl" />
// //                     <div>
// //                         <h2 className="text-lg font-semibold">Simulated Revenue</h2>
// //                         <p className="text-3xl font-bold mt-2">$1,250</p>
// //                     </div>
// //                 </div>

// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// //                     <FaMapMarkerAlt className="mr-4 text-3xl" />
// //                     <div>
// //                         <h2 className="text-lg font-semibold">Your Location</h2>
// //                         {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
// //                         {!userLocation && <p className="mt-2">Loading...</p>}
// //                     </div>
// //                 </div>
// //             </div>

// //             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

// //             <div className="overflow-x-auto mt-4">
// //                 <table className="min-w-full bg-white border border-gray-300">
// //                     <thead>
// //                         <tr>
// //                             <th className="py-2 px-4 border-b text-center">Image</th>
// //                             <th className="py-2 px-4 border-b text-center">Name</th>
// //                             <th className="py-2 px-4 border-b text-center">Address</th>
// //                             <th className="py-2 px-4 border-b text-center">Distance</th>
// //                             <th className="py-2 px-4 border-b text-center">Hours</th>
// //                             <th className="py-2 px-4 border-b text-center">Phone</th>
// //                             <th className="py-2 px-4 border-b text-center">Rating</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {pharmacies.data.map((pharmacy) => {
// //                             console.log("Individual Pharmacy:", pharmacy);
// //                             return (
// //                                 <tr key={pharmacy.id}>
// //                                     <td className="py-2 px-4 border-b text-center">
// //                                         {pharmacy.image && (
// //                                             <img
// //                                                 src={pharmacy.image}
// //                                                 alt={`${pharmacy.name} logo`}
// //                                                 className="w-12 h-12 object-cover rounded-full mx-auto"
// //                                             />
// //                                         )}
// //                                     </td>
// //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
// //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
// //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
// //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
// //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
// //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
// //                                 </tr>
// //                             );
// //                         })}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AdminDashboardPharm;


// // // import React, { useState, useEffect } from 'react';
// // // import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
// // // import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';
// // // import { useSelector } from 'react-redux';
// // // import { useNavigate } from 'react-router-dom';

// // // const AdminDashboardPharm = () => {
// // //     const { data: pharmacies, isLoading, isError } = useGetAllPharmaciesQuery();
// // //     const token = useSelector((state) => state.medGet.token);
// // //     const navigate = useNavigate();

// // //     useEffect(() => {
// // //         if (!token) {
// // //             navigate('/admin-login');
// // //         }
// // //     }, [token, navigate]);

// // //     console.log("Pharmacies Data:", pharmacies);

// // //     const [userLocation, setUserLocation] = useState(null);
// // //     const [totalPharmacies, setTotalPharmacies] = useState(0);

// // //     if (isLoading) {
// // //         return <div>Loading...</div>;
// // //     }

// // //     if (isError) {
// // //         return <div>Error loading pharmacies.</div>;
// // //     }

// // //     if (!pharmacies || !Array.isArray(pharmacies)) {
// // //         return <div>No pharmacies available.</div>;
// // //     }

// // //     const truncateText = (text, maxLength) => {
// // //         if (text.length <= maxLength) return text;
// // //         return text.substring(0, maxLength) + '...';
// // //     };

// // //     return (
// // //         <div className="p-4 bg-white">
// // //             <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // //                     <FaStore className="mr-4 text-3xl" />
// // //                     <div>
// // //                         <h2 className="text-lg font-semibold">Total Pharmacies</h2>
// // //                         <p className="text-3xl font-bold mt-2">{pharmacies.length}</p>
// // //                     </div>
// // //                 </div>

// // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // //                     <FaMoneyBillAlt className="mr-4 text-3xl" />
// // //                     <div>
// // //                         <h2 className="text-lg font-semibold">Simulated Revenue</h2>
// // //                         <p className="text-3xl font-bold mt-2">$1,250</p>
// // //                     </div>
// // //                 </div>

// // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // //                     <FaMapMarkerAlt className="mr-4 text-3xl" />
// // //                     <div>
// // //                         <h2 className="text-lg font-semibold">Your Location</h2>
// // //                         {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
// // //                         {!userLocation && <p className="mt-2">Loading...</p>}
// // //                     </div>
// // //                 </div>
// // //             </div>

// // //             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

// // //             <div className="overflow-x-auto mt-4">
// // //                 <table className="min-w-full bg-white border border-gray-300">
// // //                     <thead>
// // //                         <tr>
// // //                             <th className="py-2 px-4 border-b text-center">Image</th>
// // //                             <th className="py-2 px-4 border-b text-center">Name</th>
// // //                             <th className="py-2 px-4 border-b text-center">Address</th>
// // //                             <th className="py-2 px-4 border-b text-center">Distance</th>
// // //                             <th className="py-2 px-4 border-b text-center">Hours</th>
// // //                             <th className="py-2 px-4 border-b text-center">Phone</th>
// // //                             <th className="py-2 px-4 border-b text-center">Rating</th>
// // //                         </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                         {pharmacies.map((pharmacy) => {
// // //                             console.log("Individual Pharmacy:", pharmacy);
// // //                             return (
// // //                                 <tr key={pharmacy.id}>
// // //                                     <td className="py-2 px-4 border-b text-center">
// // //                                         {pharmacy.image && (
// // //                                             <img
// // //                                                 src={pharmacy.image}
// // //                                                 alt={`${pharmacy.name} logo`}
// // //                                                 className="w-12 h-12 object-cover rounded-full mx-auto"
// // //                                             />
// // //                                         )}
// // //                                     </td>
// // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
// // //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
// // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
// // //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
// // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
// // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
// // //                                 </tr>
// // //                             );
// // //                         })}
// // //                     </tbody>
// // //                 </table>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default AdminDashboardPharm;


// // // // import React, { useState } from 'react';
// // // // import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
// // // // import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';

// // // // const AdminDashboardPharm = () => {
// // // //     const { data: pharmacies, isLoading, isError } = useGetAllPharmaciesQuery();
// // // //     console.log("Pharmacies Data:", pharmacies); // Add console log here

// // // //     const [userLocation, setUserLocation] = useState(null);
// // // //     const [totalPharmacies, setTotalPharmacies] = useState(0);

// // // //     if (isLoading) {
// // // //         return <div>Loading...</div>;
// // // //     }

// // // //     if (isError) {
// // // //         return <div>Error loading pharmacies.</div>;
// // // //     }

// // // //     if (!pharmacies || !Array.isArray(pharmacies)) {
// // // //         return <div>No pharmacies available.</div>;
// // // //     }

// // // //     const truncateText = (text, maxLength) => {
// // // //         if (text.length <= maxLength) return text;
// // // //         return text.substring(0, maxLength) + '...';
// // // //     };

// // // //     return (
// // // //         <div className="p-4 bg-white">
// // // //             <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

// // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // //                     <FaStore className="mr-4 text-3xl" />
// // // //                     <div>
// // // //                         <h2 className="text-lg font-semibold">Total Pharmacies</h2>
// // // //                         <p className="text-3xl font-bold mt-2">{pharmacies.length}</p>
// // // //                     </div>
// // // //                 </div>

// // // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // //                     <FaMoneyBillAlt className="mr-4 text-3xl" />
// // // //                     <div>
// // // //                         <h2 className="text-lg font-semibold">Simulated Revenue</h2>
// // // //                         <p className="text-3xl font-bold mt-2">$1,250</p>
// // // //                     </div>
// // // //                 </div>

// // // //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // //                     <FaMapMarkerAlt className="mr-4 text-3xl" />
// // // //                     <div>
// // // //                         <h2 className="text-lg font-semibold">Your Location</h2>
// // // //                         {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
// // // //                         {!userLocation && <p className="mt-2">Loading...</p>}
// // // //                     </div>
// // // //                 </div>
// // // //             </div>

// // // //             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

// // // //             <div className="overflow-x-auto mt-4">
// // // //                 <table className="min-w-full bg-white border border-gray-300">
// // // //                     <thead>
// // // //                         <tr>
// // // //                             <th className="py-2 px-4 border-b text-center">Image</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Name</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Address</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Distance</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Hours</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Phone</th>
// // // //                             <th className="py-2 px-4 border-b text-center">Rating</th>
// // // //                         </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                         {pharmacies.map((pharmacy) => {
// // // //                             console.log("Individual Pharmacy:", pharmacy); // Add console log here
// // // //                             return (
// // // //                                 <tr key={pharmacy.id}>
// // // //                                     <td className="py-2 px-4 border-b text-center">
// // // //                                         {pharmacy.image && (
// // // //                                             <img
// // // //                                                 src={pharmacy.image}
// // // //                                                 alt={`${pharmacy.name} logo`}
// // // //                                                 className="w-12 h-12 object-cover rounded-full mx-auto"
// // // //                                             />
// // // //                                         )}
// // // //                                     </td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
// // // //                                     <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
// // // //                                 </tr>
// // // //                             );
// // // //                         })}
// // // //                     </tbody>
// // // //                 </table>
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default AdminDashboardPharm;

// // // // // import React, { useState } from 'react'
// // // // // // import dummyPharmacies from '../users/pharmacies';
// // // // // import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
// // // // // import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';

// // // // // const AdminDashboardPharm = () => {
// // // // //     const {data: pharmacies, isLoading, isError} = useGetAllPharmaciesQuery()
// // // // //     console.log(pharmacies)
// // // // //     const [userLocation, setUserLocation] = useState(null);
// // // // //     // const [pharmacies, setPharmacies] = useState([]);
// // // // //     const [totalPharmacies, setTotalPharmacies] = useState(0);

// // // // //     // useEffect(() => {
// // // // //     //     setUserLocation({ latitude: 34.0522, longitude: -118.2437 });
// // // // //     //     setPharmacies(dummyPharmacies);
// // // // //     //     setTotalPharmacies(dummyPharmacies.length);
// // // // //     // }, []);

// // // // //     if (isLoading) {
// // // // //         return <div>Loading...</div>; 
// // // // //     }

// // // // //     if (isError) {
// // // // //         return <div>Error loading pharmacies.</div>; 
// // // // //     }

// // // // //     if (!pharmacies || !Array.isArray(pharmacies)) {
// // // // //         return <div>No pharmacies available.</div>;
// // // // //     }


// // // // //     const truncateText = (text, maxLength) => {
// // // // //         if (text.length <= maxLength) return text;
// // // // //         return text.substring(0, maxLength) + '...';
// // // // //     };

// // // // //   return (
// // // // //     <div className="p-4 bg-white">
// // // // //     <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

// // // // //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // // // //         <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // // //             <FaStore className="mr-4 text-3xl" />
// // // // //             <div>
// // // // //                 <h2 className="text-lg font-semibold">Total Pharmacies</h2>
// // // // //                 <p className="text-3xl font-bold mt-2">{totalPharmacies}</p>
// // // // //             </div>
// // // // //         </div>

// // // // //         <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // // //             <FaMoneyBillAlt className="mr-4 text-3xl" />
// // // // //             <div>
// // // // //                 <h2 className="text-lg font-semibold">Simulated Revenue</h2>
// // // // //                 <p className="text-3xl font-bold mt-2">$1,250</p>
// // // // //             </div>
// // // // //         </div>

// // // // //         <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
// // // // //             <FaMapMarkerAlt className="mr-4 text-3xl" />
// // // // //             <div>
// // // // //                 <h2 className="text-lg font-semibold">Your Location</h2>
// // // // //                 {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
// // // // //                 {!userLocation && <p className="mt-2">Loading...</p>}
// // // // //             </div>
// // // // //         </div>
// // // // //     </div>

// // // // //     <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

// // // // //     <div className="overflow-x-auto mt-4">
// // // // //         <table className="min-w-full bg-white border border-gray-300">
// // // // //             <thead>
// // // // //                 <tr>
// // // // //                     <th className="py-2 px-4 border-b text-center">Image</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Name</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Address</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Distance</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Hours</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Phone</th>
// // // // //                     <th className="py-2 px-4 border-b text-center">Rating</th>
// // // // //                 </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //                 {pharmacies.map((pharmacy) => (
// // // // //                     <tr key={pharmacy.id}>
// // // // //                         <td className="py-2 px-4 border-b text-center">
// // // // //                             {pharmacy.image && (
// // // // //                                 <img
// // // // //                                     src={pharmacy.image}
// // // // //                                     alt={`${pharmacy.name} logo`}
// // // // //                                     className="w-12 h-12 object-cover rounded-full mx-auto"
// // // // //                                 />
// // // // //                             )}
// // // // //                         </td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
// // // // //                         <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
// // // // //                     </tr>
// // // // //                 ))}
// // // // //             </tbody>
// // // // //         </table>
// // // // //     </div>
// // // // // </div>  )
// // // // // }

// // // // // export default AdminDashboardPharm