import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserDashboardHeader = () => {
    const Nav = useNavigate();
    const user = useSelector((state) => state.medGet.user);
    let firstName = '';

    if (user && user.fullname) {
        const nameParts = user.fullname.split(' ');
        firstName = nameParts[0];
    }

    return (
        <div className="w-full p-4 flex justify-between lg:items-center bg-white sm:items-center">
            <div className="mb-2 sm:mb-0"> 
                <h2 className="text-lg font-semibold">
                    Welcome, {firstName ? firstName : 'User'}
                </h2>
                <p className="text-sm text-gray-500">
                    Here's your dashboard overview.
                </p>
            </div>
            <div className="ml-0 sm:ml-4"> 
                <div className="bg-blue-600 rounded-full p-2 cursor-pointer">
                    <CgProfile className="text-white text-lg" onClick={() => Nav("/user-dashboard/user-details")} />
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHeader;


// import React from 'react';
// import { CgProfile } from 'react-icons/cg';
// import { useSelector } from 'react-redux'; 
// import { useNavigate } from 'react-router-dom';

// const UserDashboardHeader = () => {
//     const Nav =  useNavigate()
//     const user = useSelector((state) => state.medGet.user); 
//     let firstName = '';

//     if (user && user.fullname) {
//         const nameParts = user.fullname.split(' ');
//         firstName = nameParts[0];
//     }

//     return (
//         <div className="bg-white p-4 flex justify-between items-center">
//             <div>
//                 <h2 className="text-lg font-semibold">
//                     Welcome, {firstName ? firstName : 'User'}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                     Here's your dashboard overview.
//                 </p>
//             </div>
//             <div className="ml-4">
//                 <div className="bg-blue-600 rounded-full p-2 cursor-pointer ">
//                     <CgProfile className="text-white text-lg" onClick={() => Nav("/user-dashboard/user-details")}/>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDashboardHeader