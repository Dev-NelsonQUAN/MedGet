import React, { useEffect, useState } from 'react';
import { FaStore, FaMoneyBillAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useGetAllPharmaciesQuery } from '../../service/AdminRTK';
import { useGetAllPharmsQuery } from '../../service/UserRTK';

const UserDashboardHome = () => {
    // const { data: pharmacies, isloading, isError } = useGetAllPharmaciesQuery();
    const { data: pharmacies, isloading, isError, error, originalArgs, fulfilledTimeStamp, status } = useGetAllPharmsQuery();

    console.log('Is Loading:', isloading);
    console.log('Is Error:', isError);
    console.log('Error Data:', error);
    console.log('Pharmacies Data:', pharmacies);
    console.log('originalArgs: ', originalArgs);
    console.log('fulfilledTimeStamp: ', fulfilledTimeStamp);
    console.log('status: ', status);
    const [userLocation, setUserLocation] = useState(null);
    const [totalPharmacies, setTotalPharmacies] = useState(0);

    // const displayPharmacies = isError ? samplePharmacies : pharmacies;

    useEffect(() => {
        setUserLocation({ latitude: 34.0522, longitude: -118.2437 });
        if (pharmacies && Array.isArray(pharmacies)) {
            setTotalPharmacies(pharmacies.length);
        }
    }, [pharmacies]); 


    if (isloading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error, loading pages...</div>;
    }

    if (isError) {
        console.error('API Error:', error);
        return <div>Error loading pharmacies. Using fallback data.</div>;
    }

    // if (!displayPharmacies || !Array.isArray(displayPharmacies)) {
    //     return <div>No pharmacies available.</div>;
    // }

    if (!pharmacies || !Array.isArray(pharmacies)) {
      console.log("Pharmacies is undefined or not an array");
      return <div>No pharmacies available.</div>;
    }

    // console.log('Is Loading:', isloading);
    // console.log('Is Error:', isError);
    // // console.log('Error Data:', error);
    // console.log('Pharmacies Data:', pharmacies)

    // if (isloading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error, loading pages...</div>;
    // }

    // if (!pharmacies || !Array.isArray(pharmacies)) {
    //     return <div>No pharmacies available.</div>;
    // }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="p-4 bg-white">
            <h1 className="lg:text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaStore className="mr-4 text-3xl" />
                    <div>
                        <h2 className="text-lg font-semibold">Total Pharmacies</h2>
                        <p className="text-3xl font-bold mt-2">{totalPharmacies}</p>
                    </div>
                </div>

                <div className="bg-blue-600 text-white rounded-lg shadow p-4 flex items-center">
                    <FaMoneyBillAlt className="mr-4 text-3xl" />
                    <div>
                        <h2 className="lg:text-lg font-semibold">Simulated Revenue</h2>
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
                        {pharmacies.map((pharmacy) => (
                            <tr key={pharmacy.id}>
                                <td className="py-2 px-4 border-b text-center">
                                    {pharmacy.image && (
                                        <img
                                            src={pharmacy.image}
                                            alt={`${pharmacy.name} logo`}
                                            className="w-12 h-12 object-cover rounded-full mx-auto"
                                        />
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b text-center">{pharmacy.pharmacyName}</td>
                                <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
                                <td className="py-2 px-4 border-b text-center">{pharmacy.distance} miles</td>
                                <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
                                <td className="py-2 px-4 border-b text-center">{pharmacy.phone}</td>
                                <td className="py-2 px-4 border-b text-center">{pharmacy.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDashboardHome;