import React, { useState } from 'react';
import { useCreateLocationMutation, useGetLocationByIdQuery, useUpdateLocationMutation } from '../../service/PharmacyLocationRTK';

const LocationPage = () => {
  const { data: location, isLoading, refetch } = useGetLocationByIdQuery();
  const [createLocation] = useCreateLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    localGovernmentArea: '',
    street: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    if (location) {
      setFormData({
        name: location.name || '',
        address: location.address || '',
        localGovernmentArea: location.localGovernmentArea || '',
        street: location.street || '',
        state: location.state || '',
        postalCode: location.postalCode || '',
        country: location.country || '',
        phoneNumber: location.phoneNumber || '',
      });
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location) {
      await updateLocation(formData);
    } else {
      await createLocation(formData);
    }
    setShowModal(false);
    refetch(); 
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Pharmacy Location</h2>

      {!location && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg">
          <input type="text" name="name" placeholder="Location Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="localGovernmentArea" placeholder="Local Government Area" value={formData.localGovernmentArea} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Location</button>
        </form>
      )}

      {location && (
        <div className="bg-white shadow-md p-6 rounded-lg mt-4">
          <h3 className="text-xl font-semibold">Name: {location.name}</h3>
          <p className="text-gray-600">Address: {location.address}</p>
          <p className="text-gray-600">L.G.A: {location.localGovernmentArea}</p>
          <p className="text-gray-600">Sreet: {location.street}</p>
          <p className="text-gray-600">State: {location.state}</p>
          <p className="text-gray-600">Postal Code: {location.postalCode}</p>
          <p className="text-gray-600">Country: {location.country}</p>
          <p className="text-gray-600">Phone Number: {location.phoneNumber}</p>
          <button onClick={handleEdit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Edit Location
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Update Location</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Location Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="localGovernmentArea" placeholder="City" value={formData.localGovernmentArea} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="w-full p-2 border rounded" />

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
