import React, { useEffect, useState } from 'react';
import { FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import user-related icons
import { useGetAllPharmsQuery } from '../../service/UserRTK'; // Assuming you still use this slice, adjust if needed
import { useNavigate } from 'react-router-dom';

const UserDashboardHome = () => {
  const { data: usersData, isLoading, isError, error } = useGetAllPharmsQuery(); // Rename to usersData
  const [userLocation, setUserLocation] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0); // Rename to totalUsers
  const users = usersData?.data; // Rename to users
  const navigate = useNavigate();

  useEffect(() => {
    setUserLocation({ latitude: 34.0522, longitude: -118.2437 });
    if (users && Array.isArray(users)) {
      setTotalUsers(users.length); // Rename to totalUsers
    } else {
      setTotalUsers(0);
    }
  }, [users]);

  useEffect(() => {
    console.log('Is Loading:', isLoading);
    console.log('Is Error:', isError);
    if (error) {
      console.log('Error Data:', error);
    }
    if (users) {
      console.log('Users Data:', users);
    }
  }, [isLoading, isError, error, users]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError) {
    console.error('API Error:', error);
    return <div className="p-4">Error loading users.</div>;
  }

  if (!users || !Array.isArray(users)) {
    return <div className="p-4">No users available.</div>;
  }

  const truncateText = (text, maxLength) => {
    if (!text) {
      return 'N/A';
    }
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const dummyImageUrl = 'https://via.placeholder.com/150';

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to user details page
  };

  return (
    <div className="p-4 bg-white">
      <h1 className="lg:text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-orange-400 text-white rounded-lg shadow p-4 flex items-center">
          <FaUsers className="mr-4 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{totalUsers}</p>
          </div>
        </div>

        <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
          <FaMapMarkerAlt className="mr-4 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold">Your Location</h2>
            {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
            {!userLocation && <p className="mt-2">Loading...</p>}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">All Users</h2>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Image</th>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Phone</th>
              <th className="py-2 px-4 border-b text-center">Address</th>
              <th className="py-2 px-4 border-b text-center">Rating</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleUserClick(user.id)}>
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={user.image || dummyImageUrl}
                    alt={`${user.fullname} profile`}
                    className="w-12 h-12 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">{user.fullname || 'N/A'}</td>
                <td className="py-2 px-4 border-b text-center">{user.email || 'N/A'}</td>
                <td className="py-2 px-4 border-b text-center">{user.phone || 'N/A'}</td>
                <td className="py-2 px-4 border-b text-center">{truncateText(user.address, 30)}</td>
                <td className="py-2 px-4 border-b text-center">{user.rating || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboardHome;


// import React, { useEffect, useState } from 'react';
// import { FaStore, FaMapMarkerAlt } from 'react-icons/fa';
// import { useGetAllPharmsQuery } from '../../service/UserRTK';

// const UserDashboardHome = () => {
//   const { data: pharmaciesData, isLoading, isError, error } = useGetAllPharmsQuery();
//   const [userLocation, setUserLocation] = useState(null);
//   const [totalPharmacies, setTotalPharmacies] = useState(0);
//   const pharmacies = pharmaciesData?.data;

//   useEffect(() => {
//     setUserLocation({ latitude: 34.0522, longitude: -118.2437 });
//     if (pharmacies && Array.isArray(pharmacies)) {
//       setTotalPharmacies(pharmacies.length);
//     } else {
//       setTotalPharmacies(0);
//     }
//   }, [pharmacies]);

//   useEffect(() => {
//     console.log('Is Loading:', isLoading);
//     console.log('Is Error:', isError);
//     if (error) {
//       console.log('Error Data:', error);
//     }
//     if (pharmacies) {
//       console.log('Pharmacies Data:', pharmacies);
//     }
//   }, [isLoading, isError, error, pharmacies]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     console.error('API Error:', error);
//     return <div>Error loading pharmacies.</div>;
//   }

//   if (!pharmacies || !Array.isArray(pharmacies)) {
//     return <div>No pharmacies available.</div>;
//   }

//   const truncateText = (text, maxLength) => {
//     if (!text) {
//       return 'N/A';
//     }
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const dummyImageUrl = 'https://via.placeholder.com/150'; 

//   return (
//     <div className="p-4 bg-white">
//       <h1 className="lg:text-2xl font-bold mb-4">Pharmacy Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div className="bg-orange-400 text-white rounded-lg shadow p-4 flex items-center">
//           <FaStore className="mr-4 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">Total Pharmacies</h2>
//             <p className="text-3xl font-bold mt-2">{totalPharmacies}</p>
//           </div>
//         </div>

//         <div className="bg-purple-600 text-white rounded-lg shadow p-4 flex items-center">
//           <FaMapMarkerAlt className="mr-4 text-3xl" />
//           <div>
//             <h2 className="text-lg font-semibold">Your Location</h2>
//             {userLocation && <p className="mt-2">{userLocation.latitude}, {userLocation.longitude}</p>}
//             {!userLocation && <p className="mt-2">Loading...</p>}
//           </div>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold mb-4 border-b-1 border-gray-600 pb-2">Nearby Pharmacies</h2>

//       <div className="overflow-x-auto mt-4">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-center">Image</th>
//               <th className="py-2 px-4 border-b text-center">Name</th>
//               <th className="py-2 px-4 border-b text-center">Address</th>
//               <th className="py-2 px-4 border-b text-center">Distance</th>
//               <th className="py-2 px-4 border-b text-center">Hours</th>
//               <th className="py-2 px-4 border-b text-center">Phone</th>
//               <th className="py-2 px-4 border-b text-center">Rating</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pharmacies?.map((pharmacy) => (
//               <tr key={pharmacy.id}>
//                 <td className="py-2 px-4 border-b text-center">
//                   <img
//                     src={pharmacy.image || dummyImageUrl} 
//                     alt={`${pharmacy.pharmacyName} logo`}
//                     className="w-12 h-12 object-cover rounded-full mx-auto"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b text-center">{pharmacy.pharmacyName || 'N/A'}</td>
//                 <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.address, 30)}</td>
//                 <td className="py-2 px-4 border-b text-center">{pharmacy.distance || 'N/A'} miles</td>
//                 <td className="py-2 px-4 border-b text-center">{truncateText(pharmacy.operatingHours, 20)}</td>
//                 <td className="py-2 px-4 border-b text-center">{pharmacy.phone || 'N/A'}</td>
//                 <td className="py-2 px-4 border-b text-center">{pharmacy.rating || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserDashboardHome;