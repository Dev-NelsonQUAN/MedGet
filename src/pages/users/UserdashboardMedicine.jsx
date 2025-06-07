import React from 'react';
import { useGetAllMedicinesQuery } from '../../service/UserRTK';

const UserDashboardMedicine = () => {

    const {data: medicines, isLoading, isError} = useGetAllMedicinesQuery()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching medicines.</p>;

    if (!medicines || !Array.isArray(medicines)) {
        return <p> No medicine by any pharmamcies yet.
        </p>
    }

    console.log(isError)

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
                </div>
            ))}
        </div>
    );
};

export default UserDashboardMedicine;
