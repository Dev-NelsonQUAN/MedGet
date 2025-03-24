import React from 'react';
import UserSideBar from './UserSideBar';
import UserDashboardHeader from './UserDashboardHeader';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md flex-shrink-0 z-10">
                <UserSideBar />
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md 
                w-full">
                    <UserDashboardHeader />
                </header>

                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default UserLayout;


// import React from 'react';
// import UserSideBar from './UserSideBar';
// import UserDashboardHeader from './UserDashboardHeader';
// import { Outlet } from 'react-router-dom';

// const UserLayout = () => {
//     return (
//         <div className="h-screen grid grid-cols-[256px_1fr]">
//             <aside className="bg-white shadow-md">
//                 <UserSideBar />
//             </aside>

//             <div className="flex flex-col overflow-hidden">

//                 <header className="bg-white shadow-md z-10">
//                     <UserDashboardHeader />
//                 </header>

//                 <main className="flex-1 overflow-y-auto p-4">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default UserLayout;