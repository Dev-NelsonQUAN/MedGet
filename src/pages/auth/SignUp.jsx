import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useSignUpUserMutation } from '../../service/UserRTK';
import Input from '../../ui/Input';
import Btn from "../../ui/Btn";
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import Spinner from '../../ui/Spinner';
import signupSvg from '../../assets/doctorvector.png';
import { useDispatch } from 'react-redux';
import { setUser, setError } from "../../service/GlobalState";
import medGetWhiteLogo from "../../assets/MedgetLogoNoBG2.png"

const SignUp = () => {
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [signUpUser, { isLoading: isSignUpLoading }] = useSignUpUserMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    let errorMessage;

    try {
      const response = await signUpUser(data).unwrap();
      const { data: user } = response;

      dispatch(setUser(user));

      Swal.fire({
        title: 'Success!',
        text: 'You have signed up successfully. A verification email has been sent.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });

      Nav('/check-email');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.error === 'TypeError: Failed to fetch') {
        Swal.fire({
          title: 'Network Error!',
          text: 'Could not connect to the server. Please check your network connection.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } else if (err.status === 400) {
        errorMessage = 'Invalid signup data.';
        if (err && err.data && err.data.errors) {
          errorMessage = Object.values(err.data.errors).join('\n');
        }
        Swal.fire({
          title: 'Validation Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } else if (err.status === 409) {
        if (err && err.data && err.data.message && err.data.message.includes('already exists')) {
          errorMessage = 'Email address is already in use.';
        } else {
          errorMessage = 'Error during signup.'
        }
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } else {
        errorMessage = 'Signup failed, Please try again.';
        if (err && err.data && err.data.message) {
          errorMessage = err.data.message;
        }
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }

      dispatch(setError(errorMessage));

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex lg:h-full">
      <div className="bg-blue-600 w-[100%] flex p-2 max-[769px]:hidden flex-col">
        {/* <h1 className="text-white font-bold mt-2 ml-10">MedGet</h1> */}
        <div className='w-full flex justify-center mt-14 cursor-pointer'
        onClick={() => Nav('/')}
        >
          <img 
            className='w-45'
          src={medGetWhiteLogo} alt="Medget Logo" />
        </div>


        <div className="flex justify-center mt-4">
          <img
            className="transform scale-x-[-1]"
            src={signupSvg}
            alt="Sign Up SVG"
          />
        </div>
      </div>

      <div className="bg-white w-[100%] h-[100vh] flex justify-center items-center max-[576px]:px-10 max-[321px]:px-5">
        <form
          className="shadow-2xl lg:px-[50px] lg:py-[40px] max-[769px]:p-[40px] max-[576px]:p-[25px] rounded-[5px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold lg:text-[40px] max-[769px]:text-[35px] max-[576px]:text-[25px] flex justify-self-center leading-8 max-[321px]:text-[24px]">
            Create an account
          </h1>

          <div className="mt-6 mb-4">
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Chinedu Nelson"
                  labelText="Fullname"
                  htmlFor="Fullname"
                  name="fullname"
                  type="text"
                  rounded="rounded-[5px]"
                  w="w-full"
                  p="p-2.5"
                  outline="outline-blue-600"
                  border="border-1"
                  borderCol="border-gray-600"
                />
              )}
            />
            {errors.fullname && (
              <div className="text-sm text-red-500">
                {' '}
                {errors.fullname.message}{' '}
              </div>
            )}
          </div>

          <div className="mt-4 mb-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="chinelz@gmail.com"
                  labelText="Email"
                  htmlFor="Email"
                  name="email"
                  type="email"
                  rounded="rounded-[5px]"
                  w="w-full"
                  p="p-2.5"
                  outline="outline-blue-600"
                  border="border-1"
                  borderCol="border-gray-600"
                />
              )}
            />
            {errors.email && (
              <div className="text-sm text-red-500">
                {' '}
                {errors.email.message}{' '}
              </div>
            )}
          </div>

          <div className="mt-4 mb-4">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="********"
                  labelText="Password"
                  htmlFor="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  rounded="rounded-[5px]"
                  w="w-full"
                  p="p-2.5"
                  pl="20"
                  outline="outline-blue-600"
                  border="border-1"
                  borderCol="border-gray-600"
                  icon={
                    showPassword ? (
                      <FaEye onClick={handleShowPassword} />
                    ) : (
                      <FaEyeSlash onClick={handleShowPassword} />
                    )
                  }
                />
              )}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                {' '}
                {errors.password.message}{' '}
              </div>
            )}
          </div>

          <div className="mt-4 mb-4">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="**********"
                  labelText="Confirm Password"
                  htmlFor="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  rounded="rounded-[5px]"
                  w="w-full"
                  p="p-2.5"
                  outline="outline-blue-600"
                  border="border-1"
                  borderCol="border-gray-600"
                  icon={
                    showPassword ? (
                      <FaEye onClick={handleShowPassword} />
                    ) : (
                      <FaEyeSlash
                        onClick={handleShowPassword}
                      />
                    )
                  }
                />
              )}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">
                {' '}
                {errors.confirmPassword.message}{' '}
              </div>
            )}
          </div>

          <Btn
            type="submit"
            btnText={
              loading ? (
                <>
                  <Spinner size="1.5em" color="white" borderWidth="0.3em" />
                </>
              ) : (
                'Create Account'
              )
            }
            bg="bg-blue-600"
            color="text-white"
            px={
              loading
                ? 'lg:px-49 max-[769px]:px-38 max-[576px]:px-15.5 max-[321px]:px-12'
                : 'lg:px-35 max-[769px]:px-35 max-[576px]:px-13.5 max-[321px]:px-12'
            }
            fontWeight="font-bold"
            py="py-2.5"
            mt="mt-6"
            hoverBg="hover:bg-blue-700"
            disabled={loading}
          />

          <p className="flex justify-self-center mt-4 text-gray-600 max-[576px]:text-[10px] max-[576px]:text-center">
            Already have an account?{' '}
            <span
              className="pl-1 flex items-center text-blue-600 font-bold cursor-pointer hover:underline"
              onClick={() => Nav('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import Swal from 'sweetalert2';
// import { useSignUpUserMutation } from '../../service/UserRTK';
// import Input from '../../ui/Input';
// import Btn from "../../ui/Btn";
// import { FaEye } from 'react-icons/fa6';
// import { FaEyeSlash } from 'react-icons/fa';
// import Spinner from '../../ui/Spinner';
// import signupSvg from '../../assets/doctorvector.png';
// import { useDispatch } from 'react-redux';
// import { setUser, setError } from "../../service/GlobalState";

// const SignUp = () => {
//   const Nav = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();

//   const validationSchema = Yup.object().shape({
//     fullname: Yup.string().required('Fullname is required'),
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string()
//       .required('Password is required')
//       .min(6, 'Password must be at least 6 characters')
//       .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//       .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//       .matches(/\d/, 'Password must contain at least one number')
//       .matches(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         'Password must contain at least one special character'
//       ),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm Password is required'),
//   });

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const [signUpUser, { isLoading: isSignUpLoading }] = useSignUpUserMutation();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     // let errorMessage;
//     try {
//       const response = await signUpUser(data).unwrap();
//       const { data: user } = response;

//       dispatch(setUser(user));

//       Swal.fire({
//         title: 'Success!',
//         text: 'You have signed up successfully. A verification email has been sent.',
//         icon: 'success',
//         confirmButtonText: 'Okay',
//       });

//       Nav('/check-email');
//     } catch (err) {
//       console.error('Signup error:', err);
//       if (err.error === 'TypeError: Failed to fetch') {
//         Swal.fire({
//           title: 'Network Error!',
//           text: 'Could not connect to the server. Please check your network connection.',
//           icon: 'error',
//           confirmButtonText: 'Okay',
//         });
//       } else if (err.status === 400) {
//         let errorMessage = 'Invalid signup data.';
//         if (err && err.data && err.data.errors) {
//           errorMessage = Object.values(err.data.errors).join('\n');
//         }
//         Swal.fire({
//           title: 'Validation Error!',
//           text: errorMessage,
//           icon: 'error',
//           confirmButtonText: 'Okay',
//         });
//       } else if (err.status === 409) {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Email address is already in use.',
//           icon: 'error',
//           confirmButtonText: 'Okay',
//         });
//       } else {
//         let errorMessage = 'Signup failed, Please try again.';
//         if (err && err.data && err.data.message) {
//           errorMessage = err.data.message;
//         }
//         Swal.fire({
//           title: 'Error!',
//           text: errorMessage,
//           icon: 'error',
//           confirmButtonText: 'Okay',
//         });
//       }

//       dispatch(setError(errorMessage));

//       Swal.fire({
//         title: 'Error!',
//         text: errorMessage,
//         icon: 'error',
//         confirmButtonText: 'Okay',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   return (
//     <div className="flex lg:h-[100vh]">
//       <div className="bg-blue-600 w-[100%] flex p-2 max-[769px]:hidden flex-col">
//         <h1 className="text-white font-bold mt-2 ml-10">MedGet</h1>
//         <div className="flex justify-center mt-25">
//           <img
//             className="transform scale-x-[-1]"
//             src={signupSvg}
//             alt="Sign Up SVG"
//           />
//         </div>
//       </div>

//       <div className="bg-white w-[100%] h-[100vh] flex justify-center items-center max-[576px]:px-10 max-[321px]:px-5">
//         <form
//           className="shadow-2xl lg:px-[50px] lg:py-[40px] max-[769px]:p-[40px] max-[576px]:p-[25px] rounded-[5px]"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <h1 className="font-bold lg:text-[40px] max-[769px]:text-[35px] max-[576px]:text-[25px] flex justify-self-center leading-8 max-[321px]:text-[24px]">
//             Create an account
//           </h1>

//           <div className="mt-6 mb-4">
//             <Controller
//               name="fullname"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   placeholder="Chinedu Nelson"
//                   labelText="Fullname"
//                   htmlFor="Fullname"
//                   name="fullname"
//                   type="text"
//                   rounded="rounded-[5px]"
//                   w="w-full"
//                   p="p-2.5"
//                   outline="outline-blue-600"
//                   border="border-1"
//                   borderCol="border-gray-600"
//                 />
//               )}
//             />
//             {errors.fullname && (
//               <div className="text-sm text-red-500">
//                 {' '}
//                 {errors.fullname.message}{' '}
//               </div>
//             )}
//           </div>

//           <div className="mt-4 mb-4">
//             <Controller
//               name="email"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   placeholder="chinelz@gmail.com"
//                   labelText="Email"
//                   htmlFor="Email"
//                   name="email"
//                   type="email"
//                   rounded="rounded-[5px]"
//                   w="w-full"
//                   p="p-2.5"
//                   outline="outline-blue-600"
//                   border="border-1"
//                   borderCol="border-gray-600"
//                 />
//               )}
//             />
//             {errors.email && (
//               <div className="text-sm text-red-500">
//                 {' '}
//                 {errors.email.message}{' '}
//               </div>
//             )}
//           </div>

//           <div className="mt-4 mb-4">
//             <Controller
//               name="password"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   placeholder="********"
//                   labelText="Password"
//                   htmlFor="Password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   rounded="rounded-[5px]"
//                   w="w-full"
//                   p="p-2.5"
//                   pl="20"
//                   outline="outline-blue-600"
//                   border="border-1"
//                   borderCol="border-gray-600"
//                   icon={
//                     showPassword ? (
//                       <FaEye onClick={handleShowPassword} />
//                     ) : (
//                       <FaEyeSlash onClick={handleShowPassword}
//                       />
//                     )
//                   }
//                 />
//               )}
//             />
//             {errors.password && (
//               <div className="text-red-500 text-sm">
//                 {' '}
//                 {errors.password.message}{' '}
//               </div>
//             )}
//           </div>

//           <div className="mt-4 mb-4">
//             <Controller
//               name="confirmPassword"
//               control={control}
//               render={({ field }) => (
//                 <Input
//                   {...field}
//                   placeholder="**********"
//                   labelText="Confirm Password"
//                   htmlFor="Confirm Password"
//                   name="confirmPassword"
//                   type={showPassword ? 'text' : 'password'}
//                   rounded="rounded-[5px]"
//                   w="w-full"
//                   p="p-2.5"
//                   outline="outline-blue-600"
//                   border="border-1"
//                   borderCol="border-gray-600"
//                   icon={
//                     showPassword ? (
//                       <FaEye onClick={handleShowPassword} />
//                     ) : (
//                       <FaEyeSlash
//                         onClick={handleShowPassword}
//                       />
//                     )
//                   }
//                 />
//               )}
//             />
//             {errors.confirmPassword && (
//               <div className="text-red-500 text-sm">
//                 {' '}
//                 {errors.confirmPassword.message}{' '}
//               </div>
//             )}
//           </div>

//           <Btn
//             type="submit"
//             btnText={
//               loading ? (
//                 <>
//                   <Spinner size="1.5em" color="white" borderWidth="0.3em" />
//                 </>
//               ) : (
//                 'Create Account'
//               )
//             }
//             bg="bg-blue-600"
//             color="text-white"
//             px={
//               loading
//                 ? 'lg:px-49'
//                 : 'lg:px-35 max-[769px]:px-35 max-[576px]:px-13.5 max-[321px]:px-12'
//             }
//             fontWeight="font-bold"
//             py="py-2.5"
//             mt="mt-6"
//             hoverBg="hover:bg-blue-700"
//             disabled={loading}
//           />

//           <p className="flex justify-self-center mt-4 text-gray-600 max-[576px]:text-[10px] max-[576px]:text-center">
//             Already have an account?{' '}
//             <span
//               className="pl-1 flex items-center text-blue-600 font-bold cursor-pointer hover:underline"
//               onClick={() => Nav('/login')}
//             >
//               Login
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
