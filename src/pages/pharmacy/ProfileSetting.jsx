// import React, { useState, useRef } from 'react';
// import Input from '../../ui/Input';
// import Btn from '../../ui/Btn';
// import { FaCamera } from 'react-icons/fa';
// import { useUpdateUserProfileMutation } from '../../service/UserRTK';

// const ProfileSettings = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNo, setPhoneNo] = useState('');
//     const [age, setAge] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [gender, setGender] = useState('');
//     const [bio, setBio] = useState('');
//     const [profilePicture, setProfilePicture] = useState(null);
//     const fileInputRef = useRef(null);

//     const [updateUserProfile, { isLoading, isError, error, isSuccess }] = useUpdateUserProfileMutation();

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         setProfilePicture(file);
//     };

//     const handleOpenFileInput = () => {
//         fileInputRef.current.click();
//     };

//     const handleSaveSettings = async () => {
//         const formData = new FormData();
//         formData.append('fullName', fullName);
//         formData.append('email', email);
//         formData.append('phoneNo', phoneNo);
//         formData.append('age', age);
//         formData.append('dateOfBirth', dateOfBirth);
//         formData.append('gender', gender);
//         formData.append('bio', bio);
//         if (profilePicture) {
//             formData.append('profilePicture', profilePicture);
//         }

//         try {
//             await updateUserProfile(formData);
//         } catch (err) {
//             console.log(err)
//         }
//     };

//     return (
//         <div>
//             <div className="flex justify-center mb-4">
//                 <div className="relative">
//                     {profilePicture ? (
//                         <img
//                             src={URL.createObjectURL(profilePicture)}
//                             alt="Profile"
//                             className="w-32 h-32 rounded-full object-cover"
//                         />
//                     ) : (
//                         <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
//                             <FaCamera className="text-gray-500 text-2xl" />
//                         </div>
//                     )}
//                     <button
//                         onClick={handleOpenFileInput}
//                         className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
//                     >
//                         <FaCamera className="text-sm" />
//                     </button>
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleProfilePictureChange}
//                         accept="image/*"
//                         className="hidden"
//                     />
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <Input
//                     labelText="Full Name"
//                     htmlFor="fullName"
//                     type="text"
//                     placeholder="Enter full name"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     border="border-1"
//                     borderCol="border-gray-300"
//                     outline="outline-blue-200"
//                     rounded="rounded-md"
//                     w="w-full"
//                     p="p-2"
//                 />
//             </div>

//             <div className="mb-4">
//                 <Input
//                     labelText="Email Address"
//                     htmlFor="email"
//                     type="email"
//                     placeholder="Enter email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     border="border-1"
//                     borderCol="border-gray-300"
//                     outline="outline-blue-200"
//                     rounded="rounded-md"
//                     w="w-full"
//                     p="p-2"
//                 />
//             </div>

//             <div className="mb-4">
//                 <Input
//                     labelText="Phone Number"
//                     htmlFor="phoneNo"
//                     type="tel"
//                     placeholder="Enter phone number"
//                     value={phoneNo}
//                     onChange={(e) => setPhoneNo(e.target.value)}
//                     border="border-1"
//                     borderCol="border-gray-300"
//                     outline="outline-blue-200"
//                     rounded="rounded-md"
//                     w="w-full"
//                     p="p-2"
//                 />
//             </div>

//             <div className="mb-4">
//                 <Input
//                     labelText="Age"
//                     htmlFor="age"
//                     type="number"
//                     placeholder="Enter age"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                     border="border-1"
//                     borderCol="border-gray-300"
//                     outline="outline-blue-200"
//                     rounded="rounded-md"
//                     w="w-full"
//                     p="p-2"
//                 />
//             </div>

//             <div className="mb-4">
//                 <Input
//                     labelText="Date of Birth"
//                     htmlFor="dateOfBirth"
//                     type="date"
//                     placeholder="Enter date of birth"
//                     value={dateOfBirth}
//                     onChange={(e) => setDateOfBirth(e.target.value)}
//                     border="border-1"
//                     borderCol="border-gray-300"
//                     outline="outline-blue-200"
//                     rounded="rounded-md"
//                     w="w-full"
//                     p="p-2"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label htmlFor="gender" className="font-medium text-[18px] mb-2 block">Gender</label>
//                 <select
//                     id="gender"
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="border border-gray-300 outline-blue-200 rounded-md w-full p-2"
//                 >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label htmlFor="bio" className="font-medium text-[18px] mb-2 block">Bio</label>
//                 <textarea
//                     id="bio"
//                     value={bio}
//                     onChange={(e) => setBio(e.target.value)}
//                     placeholder="Enter your bio"
//                     className="border border-gray-300 outline-blue-200 rounded-md w-full p-2"
//                 />
//             </div>

//             {isError && <p className="text-red-500">{error?.data?.message || 'Failed to update profile.'}</p>}
//             {isSuccess && <p className='text-green-500'>Profile updated successfully</p>}

//             <Btn
//                 btnText={isLoading ? 'Saving...' : 'Save Settings'}
//                 bg="bg-blue-500"
//                 color="text-white"
//                 px="px-4"
//                 py="py-2"
//                 mt="mt-4"
//                 hoverBg="hover:bg-blue-600"
//                 onClick={handleSaveSettings}
//                 disabled={isLoading}
//             />
//         </div>
//     );
// };

// export default ProfileSettings;