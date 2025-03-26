import React from 'react';
import { useGetMedicinesQuery } from '../../service/MedicineRtk'; // Adjust the path

const UserDashboardMedicine = () => {
    const { data: medicines, isLoading, isError } = useGetMedicinesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching medicines.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {medicines.map((medicine) => (
                <div key={medicine._id} className="border rounded-lg p-4 shadow-md">
                    <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-48 object-cover rounded-md mb-2"
                    />
                    <h2 className="text-lg font-semibold mb-1">{medicine.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">{medicine.genericName}</p>
                    <p className="text-sm text-gray-600 mb-1">Price: ${medicine.price}</p>
                    <p className="text-sm text-gray-600 mb-1">Stock: {medicine.stock}</p>
                    <p className="text-sm text-gray-600">Status: {medicine.status}</p>
                    {/* Add more details as needed */}
                </div>
            ))}
        </div>
    );
};

export default UserDashboardMedicine;

// import React, { useEffect, useState } from 'react';
// import dummyPharmacies from './pharmacies';
// import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';

// const UserDashboardHome = () => {
//     const [userLocation, setUserLocation] = useState(null);
//     const [pharmacies, setPharmacies] = useState([]);
//     const [totalPharmacies, setTotalPharmacies] = useState(0);

//     useEffect(() => {
//         setUserLocation({ latitude: 34.0522, longitude: -118.2437 });
//         setPharmacies(dummyPharmacies);
//         setTotalPharmacies(dummyPharmacies.length);
//     }, []);

//     const truncateText = (text, maxLength) => {
//         if (text.length <= maxLength) return text;
//         return text.substring(0, maxLength) + '...';
//     };

//     return (
//         <div className="p-4 bg-white">
//             <h1 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaStore className="mr-4 text-3xl" /> 
//                     <div>
//                         <h2 className="text-lg font-semibold">Total Pharmacies</h2>
//                         <p className="text-3xl font-bold mt-2">{totalPharmacies}</p>
//                     </div>
//                 </div>

//                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaMoneyBillAlt className="mr-4 text-3xl" /> 
//                     <div>
//                         <h2 className="text-lg font-semibold">Simulated Revenue</h2>
//                         <p className="text-3xl font-bold mt-2">$1,250</p>
//                     </div>
//                 </div>

//                 <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
//                     <FaMapMarkerAlt className="mr-4 text-3xl" /> 
//                     <div>
//                         <h2 className="text-lg font-semibold">Your Location</h2>
//                         {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
//                         {!userLocation && <p className="mt-2">Loading...</p>}
//                     </div>
//                 </div>
//             </div>

//             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

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
//                         {pharmacies.map((pharmacy) => (
//                             <tr key={pharmacy.id}>
//                                 <td className="py-2 px-4 border-b text-center">
//                                     {pharmacy.image && (
//                                         <img
//                                             src={pharmacy.image}
//                                             alt={`${pharmacy.name} logo`}
//                                             className="w-12 h-12 object-cover rounded-full mx-auto"
//                                         />
//                                     )}
//                                 </td>
//                                 <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
//                                 <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
//                                 <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
//                                 <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours,20)}</td>
//                                 <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
//                                 <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserDashboardHome;





// // import React, { useEffect, useState } from 'react';
// // import dummyMedicines from './medicines'; // Assuming you have a dummy medicines data file

// // const MedicineDashboard = () => {
// //     const [userLocation, setUserLocation] = useState(null);
// //     const [medicines, setMedicines] = useState([]);
// //     const [totalMedicines, setTotalMedicines] = useState(0);
// //     const [totalStock, setTotalStock] = useState(0); // Added for total stock

// //     useEffect(() => {
// //         setUserLocation({ latitude: 34.0522, longitude: -118.2437 }); // Simulated location
// //         setMedicines(dummyMedicines);
// //         setTotalMedicines(dummyMedicines.length);
// //         setTotalStock(dummyMedicines.reduce((acc, med) => acc + med.stock, 0)); // Calculate total stock
// //     }, []);

// //     const truncateText = (text, maxLength) => {
// //         if (text.length <= maxLength) return text;
// //         return text.substring(0, maxLength) + '...';
// //     };

// //     return (
// //         <div className="p-4 bg-white">
// //             <h1 className="text-2xl font-bold mb-4">Medicine Dashboard</h1>

// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4">
// //                     <h2 className="text-lg font-semibold">Total Medicines</h2>
// //                     <p className="text-3xl font-bold mt-2">{totalMedicines}</p>
// //                 </div>

// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4">
// //                     <h2 className="text-lg font-semibold">Total Stock</h2>
// //                     <p className="text-3xl font-bold mt-2">{totalStock}</p>
// //                 </div>

// //                 <div className="bg-blue-600 text-white rounded-lg shadow p-4">
// //                     <h2 className="text-lg font-semibold">Your Location</h2>
// //                     {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
// //                     {!userLocation && <p className="mt-2">Loading...</p>}
// //                 </div>
// //             </div>

// //             <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Available Medicines</h2>

// //             <div className="overflow-x-auto mt-4">
// //                 <table className="min-w-full bg-white border border-gray-300">
// //                     <thead>
// //                         <tr>
// //                             <th className="py-2 px-4 border-b text-center">Image</th>
// //                             <th className="py-2 px-4 border-b text-center">Name</th>
// //                             <th className="py-2 px-4 border-b text-center">Description</th>
// //                             <th className="py-2 px-4 border-b text-center">Price</th>
// //                             <th className="py-2 px-4 border-b text-center">Stock</th>
// //                             <th className="py-2 px-4 border-b text-center">Category</th>
// //                             <th className="py-2 px-4 border-b text-center">Manufacturer</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {medicines.map((medicine) => (
// //                             <tr key={medicine.id}>
// //                                 <td className="py-2 px-4 border-b text-center">
// //                                     {medicine.image && (
// //                                         <img
// //                                             src={medicine.image}
// //                                             alt={`${medicine.name} medicine`}
// //                                             className="w-12 h-12 object-cover rounded-full mx-auto"
// //                                         />
// //                                     )}
// //                                 </td>
// //                                 <td className="py-2 px-4 border-b text-center">{medicine.name}</td>
// //                                 <td className="py-2 px-4 border-b text-center">{truncateText(medicine.description, 30)}</td>
// //                                 <td className="py-2 px-4 border-b text-center">${medicine.price}</td>
// //                                 <td className="py-2 px-4 border-b text-center">{medicine.stock}</td>
// //                                 <td className="py-2 px-4 border-b text-center">{medicine.category}</td>
// //                                 <td className="py-2 px-4 border-b text-center">{medicine.manufacturer}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MedicineDashboard;