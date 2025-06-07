import React, { useEffect, useState } from 'react';
import { useGetAllPharmaciesQuery } from '../../service/MedicineRtk'; // Assuming this is where you fetch pharmacies for users
import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';

const UserDashboardPharmacies = () => {
    const { data: pharmaciesData, isLoading, isError } = useGetAllPharmaciesQuery({ isVerified: true }); // Fetch only verified pharmacies
    const pharmacies = pharmaciesData?.data || [];

    console.log("User Pharmacies Data:", pharmaciesData);

    const [userLocation, setUserLocation] = useState(null);

    if (isLoading) {
        return <div>Loading pharmacies...</div>;
    }

    if (isError) {
        return <div>Error loading pharmacies.</div>;
    }

    const truncateText = (text, maxLength) => {
        if (!text) {
            return 'N/A';
        }
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Pharmacies Near You</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaStore className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Verified Pharmacies</h2>
                        <p className="text-3xl font-bold mt-2">{pharmacies.length}</p>
                    </div>
                </div>

                <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaMoneyBillAlt className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Simulated Revenue</h2>
                        <p className="text-3xl font-bold mt-2">$1,250</p>
                    </div>
                </div>

                <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaMapMarkerAlt className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Your Location</h2>
                        {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
                        {!userLocation && <p className="mt-2">Loading...</p>}
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Available Pharmacies</h2>

            {pharmacies.length > 0 ? (
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
                            {pharmacies.map((pharmacy) => (
                                <tr key={pharmacy._id}>
                                    <td className="py-2 px-4 border-b text-center">
                                        {pharmacy.image && (
                                            <img
                                                src={pharmacy.image}
                                                alt={`${pharmacy.name} logo`}
                                                className="w-12 h-12 object-cover rounded-full mx-auto"
                                            />
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.name}</td>
                                    <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.distance || 'N/A'} miles</td>
                                    <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.phoneNumber || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b text-center">{pharmacy.rating || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No verified pharmacies found.</p>
            )}
        </div>
    );
};

export default UserDashboardPharmacies;