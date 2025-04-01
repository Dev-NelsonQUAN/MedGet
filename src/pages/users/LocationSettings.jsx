import React, { useState } from 'react';
import Input from '../../ui/Input';
import Btn from '../../ui/Btn';
// import { useUpdateLocationMutation } from '../../service/UserRTK'; 

const LocationSettings = () => {
    const [locationData, setLocationData] = useState({
        name: '',
        address: '',
        localGovernmentArea: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        email: '',
        latitude: '',
        longitude: '',
    });

    // const [updateLocation, { isLoading, isError, error, isSuccess }] = useUpdateLocationMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocationData({
            ...locationData,
            [name]: value,
        });
    };

    const handleSaveLocation = async () => {
        try {
            await updateLocation(locationData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <Input
                labelText="Name"
                htmlFor="name"
                type="text"
                placeholder="Enter location name"
                value={locationData.name}
                onChange={handleChange}
                name="name"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Address"
                htmlFor="address"
                type="text"
                placeholder="Enter address"
                value={locationData.address}
                onChange={handleChange}
                name="address"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Local Government Area"
                htmlFor="localGovernmentArea"
                type="text"
                placeholder="Enter local government area"
                value={locationData.localGovernmentArea}
                onChange={handleChange}
                name="localGovernmentArea"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="State"
                htmlFor="state"
                type="text"
                placeholder="Enter state"
                value={locationData.state}
                onChange={handleChange}
                name="state"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Postal Code"
                htmlFor="postalCode"
                type="text"
                placeholder="Enter postal code"
                value={locationData.postalCode}
                onChange={handleChange}
                name="postalCode"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Country"
                htmlFor="country"
                type="text"
                placeholder="Enter country"
                value={locationData.country}
                onChange={handleChange}
                name="country"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Phone Number"
                htmlFor="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                value={locationData.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Email"
                htmlFor="email"
                type="email"
                placeholder="Enter email"
                value={locationData.email}
                onChange={handleChange}
                name="email"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Latitude"
                htmlFor="latitude"
                type="number"
                placeholder="Enter latitude"
                value={locationData.latitude}
                onChange={handleChange}
                name="latitude"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />
            <Input
                labelText="Longitude"
                htmlFor="longitude"
                type="number"
                placeholder="Enter longitude"
                value={locationData.longitude}
                onChange={handleChange}
                name="longitude"
                border="border-1"
                borderCol="border-gray-300"
                outline="outline-blue-200"
                rounded="rounded-md"
                w="w-full"
                p="p-2"
            />

            {/* {isError && <p className="text-red-500">{error?.data?.message || 'Failed to update location.'}</p>}
            {isSuccess && <p className="text-green-500">Location updated successfully</p>} */}

            <Btn
                // btnText={isLoading ? 'Saving...' : 'Save Location'}
                bg="bg-blue-500"
                color="text-white"
                px="px-4"
                py="py-2"
                mt="mt-4"
                hoverBg="hover:bg-blue-600"
                onClick={handleSaveLocation}
                // disabled={isLoading}
            />
        </div>
    );
};

export default LocationSettings;