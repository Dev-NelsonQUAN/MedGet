import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa6';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';

const UserDashboardHeader = ({ toggleSidebar }) => {
    const Nav = useNavigate();
    const user = useSelector((state) => state.medGet.user);
    let firstName = '';

    if (user && user.fullname) {
        const nameParts = user.fullname.split(' ');
        firstName = nameParts[0];
    }

    return (
        <div className="w-full p-4 flex justify-between items-center shadow-2xl text-black">
            <div className="flex items-center">
                <button
                    className="lg:hidden mr-4 text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    <FaBars color='black' />
                </button>
                <div>
                    <h2 className="text-lg font-semibold">
                        Welcome, {firstName || 'User'}
                    </h2>
                    <p className="lg:text-[16px] text-black max-[769px]:text-[14px] max-[576px]:text-[10px]">Here's your dashboard overview.</p>
                </div>
            </div>

            <div
                className="bg-blue-600 rounded-full p-2 cursor-pointer"
                onClick={() => Nav('/user-dashboard/user-details')}
            >
                <CgProfile className="text-white text-lg" />
            </div>
        </div>
    );
};

export default UserDashboardHeader;




















// import React from 'react';
// import { CgProfile } from 'react-icons/cg';
// import { useSelector } from 'react-redux'; 

// const UserDashboardHeader = () => {
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
//                 <div className="bg-blue-600 rounded-full p-2">
//                     <CgProfile className="text-white text-lg" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDashboardHeader


