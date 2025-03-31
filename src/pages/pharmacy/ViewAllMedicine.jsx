import React from "react";
import { useGetMedicinesQuery } from "../store/medicineApi";
import { Link } from "react-router-dom";

const MedicineList = () => {
  const { data: medicines, error, isLoading } = useGetMedicinesQuery();

  if (isLoading) return <p>Loading medicines...</p>;
  if (error) return <p>Failed to load medicines</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {medicines.map((medicine) => (
        <Link key={medicine._id} to={`/medicine/${medicine._id}`} className="border p-3 rounded-lg shadow-md hover:shadow-lg">
          <img src={medicine.image} alt={medicine.name} className="w-full h-40 object-cover rounded-md" />
          <h2 className="text-lg font-bold mt-2">{medicine.name}</h2>
          <p className="text-gray-600">{medicine.genericName}</p>
        </Link>
      ))}
    </div>
  );
};

export default MedicineList;
