import React, { useState, useRef, useEffect } from 'react';
import Input from '../../ui/Input';
import Btn from '../../ui/Btn';
import { FaCamera } from 'react-icons/fa';
import { 
    useGetProfileQuery, 
    useCreateProfileMutation, 
    useUpdateProfileMutation 
} from '../../service/PharmacyProfileRTK';

const PharmacyProfileSettings = () => {
    const { data: profile, isLoading: isFetching, refetch } = useGetProfileQuery();
    const [createProfile] = useCreateProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();

    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [pharmacyName, setPharmacyName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [bio, setBio] = useState('');
    const [image, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        if (profile) {
            setPhone(profile.phone || '');
            setAge(profile.age || '');
            setEmail(profile.email || '');
            setPharmacyName(profile.pharmacyName || '');
            setGender(profile.gender || '');
            setDateOfBirth(profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '');
            setBio(profile.bio || '');
        }
    }, [profile]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSaveSettings = async () => {
        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('pharmacyName', pharmacyName);
        formData.append('gender', gender);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('bio', bio);
        if (image) formData.append('image', image);

        try {
            if (profile) {
                await updateProfile(formData);
            } else {
                await createProfile(formData);
            }
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-center mb-4">
                <div className="relative">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : profile?.image ? (
                        <img
                            src={profile.image}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            <FaCamera className="text-gray-500 text-2xl" />
                        </div>
                    )}
                    <button
                        onClick={handleOpenFileInput}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                    >
                        <FaCamera className="text-sm" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            <div className="mb-4">
                <Input
                    labelText="Pharmacy Name"
                    htmlFor="pharmacyName"
                    type="text"
                    placeholder="Enter pharmacy name"
                    value={pharmacyName}
                    onChange={(e) => setPharmacyName(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            <div className="mb-4">
                <Input
                    labelText="Age"
                    htmlFor="age"
                    type="number"
                    placeholder="Enter age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            <div className="mb-4">
                <Input
                    labelText="Date of Birth"
                    htmlFor="dateOfBirth"
                    type="date"
                    placeholder="Enter date of birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            <div className="mb-4">
                <Input
                    labelText="Phone Number"
                    htmlFor="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            <div className="mb-4">
                <Input
                    labelText="Email"
                    htmlFor="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    border="border-1"
                    borderCol="border-gray-300"
                    outline="outline-blue-200"
                    rounded="rounded-md"
                    w="w-full"
                    p="p-2"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="gender" className="block text-md font-medium">
                    Gender
                </label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full mt-1 border-1 border-gray-300 outline-blue-200 rounded-md p-2"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="bio" className="block text-md font-medium">
                    Bio
                </label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter your bio"
                    className="border border-gray-300 mt-1 outline-blue-200 rounded-md w-full p-2"
                />
            </div>

            {isFetching && <p className="text-gray-500">Loading...</p>}

            <Btn
                btnText={isFetching ? 'Saving...' : 'Save Settings'}
                bg="bg-blue-500"
                color="text-white"
                px="px-4"
                py="py-2"
                mt="mt-4"
                hoverBg="hover:bg-blue-600"
                onClick={handleSaveSettings}
                disabled={isFetching}
            />
        </div>
    );
};

export default PharmacyProfileSettings;
