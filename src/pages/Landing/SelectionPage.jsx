import React from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../../assets/patientDoc.png';

const SignInOptions = () => {
  const navigate = useNavigate();

  // const handleSignIn = (role) => {
  //   navigate(`/${role}-signin`);
  // };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block bg-blue-700">
        <img
          src={userImage}
          alt="Sign Up"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 ">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Sign In</h2>
        <p className="mb-4 text-blue-700 ">Please select your role to sign in:</p>
        <div className="space-y-4 max-xl:text-center">
          <button
            onClick={() => navigate('/sign-up')}
            className="w-64 mr-4 py-2 px-4 bg-blue-600 text-white max-xl:mr-0 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up as User
          </button>
          <button
            onClick={() => navigate('/pharmacy-sign-up')}
            className="w-64 py-2 px-4 bg-white border text-blue-500 rounded-lg shadow-md"
          >
            Sign Up as Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
};
``
export default SignInOptions;
