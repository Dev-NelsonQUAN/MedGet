import { useEffect } from "react";
import { useGetMedicinesQuery } from "../../service/MedicineRtk";
import { useNavigate, useLocation } from "react-router-dom";

const PharmacyHomeDashboard = () => {
  const { data: medicines, isLoading, refetch } = useGetMedicinesQuery();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  const totalMedicines = medicines?.length || 0;
  const outOfStock = medicines?.filter(med => med.stock === 0).length || 0;
  const availableMedicines = totalMedicines - outOfStock;
  const recentMedicines = medicines?.slice(0, 5) || [];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Total Medicines</h3>
          <p className="text-3xl font-bold text-blue-600">{totalMedicines}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-600">{outOfStock}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold">Available Medicines</h3>
          <p className="text-3xl font-bold text-green-600">{availableMedicines}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Medicines</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentMedicines.map((med) => (
            <div key={med.id} className="bg-white shadow-md rounded-lg p-4 h-[350px] flex flex-col justify-between">
              <div>
                <img src={med.image} alt={med.name} className="w-full h-48 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold">{med.name}</h3>
                <p className="text-gray-600">Price: &#8358;{med.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${med.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {med.stock > 0 ? 'Available' : 'Out of Stock'}
                </p>
              </div>
              <button 
                onClick={() => navigate(`/pharmacy-dashboard/medicine-page/medicine-details/${med._id}`)}
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacyHomeDashboard;
