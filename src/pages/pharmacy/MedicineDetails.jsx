import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMedicineByIdQuery, useDeleteMedicineMutation, useUpdateMedicineMutation, useGetMedicinesQuery } from "../../service/MedicineRtk";

const DeleteMedicine = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: medicine, isLoading } = useGetMedicineByIdQuery(id);
    const { refetch } = useGetMedicinesQuery();
    const [deleteMedicine] = useDeleteMedicineMutation();
    const [updateMedicine] = useUpdateMedicineMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        price: "",
        stock: "",
        expireDate: "",
        status: "",
        details: "",
        image: null,
    });

    useEffect(() => {
        if (medicine) {
            setUpdatedData({
                price: medicine.price || "",
                stock: medicine.stock || "",
                expireDate: medicine.expireDate ? medicine.expireDate.split("T")[0] : "",
                status: medicine.status || "",
                details: medicine.details || "",
                image: null, 
            });
        }
    }, [medicine]);

    const handleUpdateChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedData({ ...updatedData, image: file });
        }
    };

    const confirmDelete = async () => {
        await deleteMedicine(id);
        navigate("/pharmacy-dashboard/home");
    };

    const confirmUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("price", updatedData.price);
        formData.append("stock", updatedData.stock);
        formData.append("expireDate", updatedData.expireDate);
        formData.append("status", updatedData.status);
        formData.append("details", updatedData.details);

        if (updatedData.image) {
            formData.append("image", updatedData.image);
        }

        await updateMedicine({ id, formData });
        setShowUpdateModal(false);
        window.location.reload(); 
    };

    if (isLoading) return <p>Loading...</p>;
    if (!medicine) return <p>Medicine not found</p>;

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Medicine Details</h2>
            {medicine.image && (
                <img src={medicine.image} alt="Medicine" className="w-32 h-32 object-cover mb-4 mx-auto" />
            )}
            <p><strong>Name:</strong> {medicine.name}</p>
            <p><strong>Generic Name:</strong> {medicine.genericName}</p>
            <p><strong>SKU:</strong> {medicine.sku}</p>
            <p><strong>Weight:</strong> {medicine.weight}</p>
            <p><strong>Category:</strong> {medicine.category}</p>
            <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
            <p><strong>Price:</strong> {medicine.price}</p>
            <p><strong>Stock:</strong> {medicine.stock}</p>
            <p><strong>Expire Date:</strong> {medicine.expireDate}</p>
            <p><strong>Status:</strong> {medicine.status}</p>
            <p><strong>Details:</strong> {medicine.details}</p>
            
            <div className="flex space-x-4 mt-4">
                <button onClick={() => setShowUpdateModal(true)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                    Edit Medicine
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
                    Delete Medicine
                </button>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Are you sure you want to delete this medicine?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">No</button>
                            <button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Yes</button>
                        </div>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Medicine</h3>
                        <form onSubmit={confirmUpdate} className="space-y-3">
                            {medicine.image && (
                                <div className="mb-4">
                                    <img src={medicine.image} alt="Medicine" className="w-32 h-32 object-cover mb-2 mx-auto" />
                                    <p className="text-center text-sm text-gray-500">Current Image</p>
                                </div>
                            )}
                            <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" />
                            <input type="text" name="price" value={updatedData.price} onChange={handleUpdateChange} placeholder="Price" className="w-full p-2 border rounded" />
                            <input type="text" name="stock" value={updatedData.stock} onChange={handleUpdateChange} placeholder="Stock" className="w-full p-2 border rounded" />
                            <input type="date" name="expireDate" value={updatedData.expireDate} onChange={handleUpdateChange} className="w-full p-2 border rounded" />
                            
                            <select name="status" value={updatedData.status} onChange={handleUpdateChange} className="w-full p-2 border rounded">
                                <option value="">Select Status</option>
                                <option value="Available">Available</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>

                            <textarea name="details" value={updatedData.details} onChange={handleUpdateChange} placeholder="Details" className="w-full p-2 border rounded" />
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setShowUpdateModal(false)} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Edit Medicine</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteMedicine;
