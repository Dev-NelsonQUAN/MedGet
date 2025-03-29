import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddMedicineMutation } from "../../service/MedicineRtk";



const schema = yup.object().shape({
  name: yup.string().required("Medicine name is required"),
  genericName: yup.string().required("Generic name is required"),
  sku: yup.string().required("SKU is required"),
  weight: yup.number().positive().required("Weight is required"),
  category: yup.string().required("Category is required"),
  manufacturer: yup.string().required("Manufacturer is required"),
  price: yup.number().min(0, "Price cannot be negative").required("Price is required"),
  stock: yup.number().min(0, "Stock cannot be negative").required("Stock is required"),
  expireDate: yup.date().min(new Date(), "Expiration date must be in the future").required("Expiration date is required"),
  status: yup.string().oneOf(["Available", "Out of Stock"], "Invalid status"),
  details: yup.string().required("Details are required"),
  image: yup.mixed().required("Image is required"),
});

const AddMedicine = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [addMedicine, { isLoading, error }] = useAddMedicineMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      let value = data[key];

      if (key !== "image") {
        formData.append(key, value);
      }
    });

    formData.append("image", data.image[0] || data.image);
    
    await addMedicine(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    }
  };

  return (
    <div className="max-w-[900px] mx-auto p-8 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Medicine</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="text-black font-medium mb-2">Medicine Image</label>
          <div
            className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Medicine Preview" className="w-full h-full object-cover rounded-md" />
            ) : (
              <span className="text-gray-500">Click to upload</span>
            )}
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {[{ id: "name", label: "Medicine Name" },
          { id: "genericName", label: "Generic Name" },
          { id: "sku", label: "SKU" },
          { id: "weight", label: "Weight (g)", type: "number", step: "any" },
          { id: "category", label: "Category" },
          { id: "manufacturer", label: "Manufacturer" },
          { id: "price", label: "Price", type: "number", min: 0 },
          { id: "stock", label: "Stock", type: "number", min: 0 },
          { id: "expireDate", label: "Expire Date", type: "date" },
          { id: "details", label: "Details" },
        ].map(({ id, label, type = "text", min, step }) => (
          <div key={id} className="w-full">
            <label htmlFor={id} className="text-black font-medium">{label}</label>
            <input
              id={id}
              type={type}
              min={min}
              step={step}
              {...register(id)}
              className="w-full p-3 border rounded-md text-gray-900 focus:ring focus:ring-blue-300"
            />
            {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
          </div>
        ))}
        <div className="w-full">
          <label className="text-black font-medium">Status</label>
          <select {...register("status")} className="w-full p-3 border rounded-md text-gray-900">
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {error && <p className="text-red-500 text-center">{error.data?.message || "Something went wrong"}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition"
          >
            {isLoading ? "Adding..." : "Add Medicine"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;


