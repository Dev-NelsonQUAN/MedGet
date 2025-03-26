import React from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';

const UserDashboardSetting = () => {
    const location = useLocation();

    return (
        <div className="flex">
            <nav className="w-64 p-4 bg-gray-100">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/user-dashboard/settings/profile"
                            className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/profile' ? 'bg-blue-200' : ''}`}
                        >
                            Profile Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/user-dashboard/settings/password"
                            className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/password' ? 'bg-blue-200' : ''}`}
                        >
                            Password Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/user-dashboard/settings/location"
                            className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/location' ? 'bg-blue-200' : ''}`}
                        >
                            Location Settings
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
            {location.pathname === "/user-dashboard/settings" && <Navigate to="/user-dashboard/settings/profile" />}
        </div>
    );
};

export default UserDashboardSetting;


// import React from 'react';
// import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';

// const UserDashboardSetting = () => {
//     const location = useLocation();

//     return (
//         <div className="flex">
//             <nav className="w-64 p-4 bg-gray-100">
//                 <ul className="space-y-2">
//                     <li>
//                         <Link
//                             to="/user-dashboard/settings/profile"
//                             className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/profile' ? 'bg-blue-200' : ''}`}
//                         >
//                             Profile Settings
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/user-dashboard/settings/password"
//                             className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/password' ? 'bg-blue-200' : ''}`}
//                         >
//                             Password Settings
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="flex-1 p-4">
//                 <Outlet />
//             </div>
//             {location.pathname === "/user-dashboard/settings" && <Navigate to = "/user-dashboard/settings/profile"/>}
//         </div>
//     );
// };

// export default UserDashboardSetting;

// import Input from '../../ui/Input';
// import Btn from '../../ui/Btn';
// import { FaCamera } from 'react-icons/fa'; 

// const UserDashboardSetting = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phoneNo, setPhoneNo] = useState('');
//     const [age, setAge] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [gender, setGender] = useState('');
//     const [bio, setBio] = useState('');
//     const [profilePicture, setProfilePicture] = useState(null);
//     const fileInputRef = useRef(null); 

//     const handleProfilePictureChange = (e) => {
//         const file = e.target.files[0];
//         setProfilePicture(file);
//     };

//     const handleOpenFileInput = () => {
//         fileInputRef.current.click();
//     };

//     const handleSaveSettings = () => {
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

//         // Send formData to your backend API here
//         console.log('Form Data:', formData); 
//         // Log the formData for testing
//         // ... (Your API call logic)
//     };

//     return (
//         <div className="flex justify-center p-4">
//             <div className="w-full max-w-md ">
//                 <div className="flex justify-center mb-4">
//                     <div className="relative">
//                         {profilePicture ? (
//                             <img
//                                 src={URL.createObjectURL(profilePicture)}
//                                 alt="Profile"
//                                 className="w-32 h-32 rounded-full object-cover"
//                             />
//                         ) : (
//                             <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
//                                 <FaCamera className="text-gray-500 text-2xl" />
//                             </div>
//                         )}
//                         <button
//                             onClick={handleOpenFileInput}
//                             className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
//                         >
//                             <FaCamera className="text-sm" />
//                         </button>
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleProfilePictureChange}
//                             accept="image/*"
//                             className="hidden"
//                         />
//                     </div>
//                 </div>

//                 <h2 className="text-2xl font-semibold mb-4 text-center">User Settings</h2>

//                 <div className="mb-4">
//                     <Input
//                         labelText="Full Name"
//                         htmlFor="fullName"
//                         type="text"
//                         placeholder="Enter full name"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         border="border-1"
//                         borderCol="border-gray-300"
//                         outline="outline-blue-200"
//                         rounded="rounded-md"
//                         w="w-full"
//                         p="p-2"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <Input
//                         labelText="Email Address"
//                         htmlFor="email"
//                         type="email"
//                         placeholder="Enter email address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         border="border-1"
//                         borderCol="border-gray-300"
//                         outline="outline-blue-200"
//                         rounded="rounded-md"
//                         w="w-full"
//                         p="p-2"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <Input
//                         labelText="Phone Number"
//                         htmlFor="phoneNo"
//                         type="tel"
//                         placeholder="Enter phone number"
//                         value={phoneNo}
//                         onChange={(e) => setPhoneNo(e.target.value)}
//                         border="border-1"
//                         borderCol="border-gray-300"
//                         outline="outline-blue-200"
//                         rounded="rounded-md"
//                         w="w-full"
//                         p="p-2"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <Input
//                         labelText="Age"
//                         htmlFor="age"
//                         type="number"
//                         placeholder="Enter age"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         border="border-1"
//                         borderCol="border-gray-300"
//                         outline="outline-blue-200"
//                         rounded="rounded-md"
//                         w="w-full"
//                         p="p-2"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <Input
//                         labelText="Date of Birth"
//                         htmlFor="dateOfBirth"
//                         type="date"
//                         placeholder="Enter date of birth"
//                         value={dateOfBirth}
//                         onChange={(e) => setDateOfBirth(e.target.value)}
//                         border="border-1"
//                         borderCol="border-gray-300"
//                         outline="outline-blue-200"
//                         rounded="rounded-md"
//                         w="w-full"
//                         p="p-2"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="gender" className="font-medium text-[18px] mb-2 block">Gender</label>
//                     <select
//                         id="gender"
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="border border-gray-300 outline-blue-200 rounded-md w-full p-2"
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="bio" className="font-medium text-[18px] mb-2 block">Bio</label>
//                     <textarea
//                         id="bio"
//                         value={bio}
//                         onChange={(e) => setBio(e.target.value)}
//                         placeholder="Enter your bio"
//                         className="border border-gray-300 outline-blue-200 rounded-md w-full p-2"
//                     />
//                 </div>

//                 <Btn
//                     btnText="Save Settings"
//                     bg="bg-blue-500"
//                     color="text-white"
//                     px="px-4"
//                     py="py-2"
//                     mt="mt-4"
//                     hoverBg="hover:bg-blue-600"
//                     onClick={handleSaveSettings}
//                 />
//             </div>
//         </div>
//     );
// };

// export default UserDashboardSetting;
//   const location = useLocation();

//   return (
//     <div className="flex">
//       <nav className="w-64 p-4 bg-gray-100">
//         <ul className="space-y-2">
//           <li>
//             <Link
//               to="/user-dashboard/settings/profile"
//               className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/profile' ? 'bg-blue-200' : ''}`}
//             >
//               Profile Settings
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/user-dashboard/settings/password"
//               className={`block p-2 rounded ${location.pathname === '/user-dashboard/settings/password' ? 'bg-blue-200' : ''}`}
//             >
//               Password Settings
//             </Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="flex-1 p-4">
//         <Outlet />
//       </div>
//       {location.pathname === "/user-dashboard/settings" && <Navigate to="/user-dashboard/settings/profile" />}
//     </div>
//   );
// };

// export default UserDashboardSetting;
