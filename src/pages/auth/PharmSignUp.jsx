import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useRegisterPharmacyMutation } from '../../service/PharmacyRTK';
import Input from '../../ui/Input';
import Btn from "../../ui/Btn";
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import Spinner from '../../ui/Spinner';
import signupSvg from '../../assets/doctorvector.png';
import { useDispatch } from 'react-redux';
import { setUser, setError } from "../../service/GlobalState";

const PharmSignUp = () => {
  const Nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    pharmacyName: Yup.string().required('Pharmacy name is required'),
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

  const [signUpUser, { isLoading: isSignUpLoading }] = useRegisterPharmacyMutation();

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
          errorMessage = 'Error during signup.'; // General error for 409
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
    <div className="flex lg:h-[100vh]">
      <div className="bg-blue-600 w-[100%] flex p-2 max-[769px]:hidden flex-col">
        <h1 className="text-white font-bold mt-2 ml-10">MedGet</h1>
        <div className="flex justify-center mt-25">
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
              name="pharmacyName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Chinedu Nelson"
                  labelText="PharmacyName"
                  htmlFor="pharmacyName"
                  name="pharmacyName"
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
            {errors.pharmacyName && (
              <div className="text-sm text-red-500">
                {' '}
                {errors.pharmacyName.message}{' '}
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
              onClick={() => Nav('/pharmacy-login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PharmSignUp;




// import React, { useState } from 'react';
// import Btn from '../../ui/Btn';
// import Input from '../../ui/Input';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { Controller, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import signupSvg from '../../assets/doctorvector.png';
// import { FaEye, FaEyeSlash } from 'react-icons/fa6';
// import Spinner from '../../ui/Spinner';
// import Swal from 'sweetalert2';
// import { useRegisterPharmacyMutation } from '../../service/PharmacyRTK';

// const PharmSignUp = () => {
//     const Nav = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [registerPharmacy, { isLoading }] = useRegisterPharmacyMutation();

//     const validationSchema = Yup.object().shape({
//         pharmacyName: Yup.string().required('Pharmacy Name is required'),
//         email: Yup.string().email('Invalid email format').required('Email is required'),
//         password: Yup.string()
//             .required('Password is required')
//             .min(6, 'Password must be at least 6 characters')
//             .matches(/[A-Z]/, 'At least one uppercase letter')
//             .matches(/[a-z]/, 'At least one lowercase letter')
//             .matches(/\d/, 'At least one number')
//             .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one special character'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Passwords must match')
//             .required('Confirm Password is required')
//     });

//     const { control, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(validationSchema)
//     });

//     const handleShowPassword = () => {
//         setShowPassword((prev) => !prev);
//     };

//     const onSubmit = async (data) => {
//         try {
//             const res = await registerPharmacy({
//                 pharmacyName: data.pharmacyName,
//                 email: data.email,
//                 password: data.password
//             }).unwrap();

//             Swal.fire({
//                 title: 'Sign Up Successful!',
//                 text: res.message || 'Welcome!',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             });
//             reset();
//             Nav(`/check-email`);
//         } catch (err) {
//             Swal.fire({
//                 title: 'Sign Up Failed!',
//                 text: err?.data?.message || 'Signup failed, Please try again',
//                 icon: 'error',
//                 confirmButtonText: 'Try Again'
//             });
//         }
//     };

//     return (
//         <div className='flex lg:h-[100vh]'>
//             {/* Left Image Section */}
//             <div className='bg-blue-600 w-[100%] max-[769px]:hidden'>
//                 <div className='flex justify-center mt-40'>
//                     <img
//                         className='transform scale-x-[-1]'
//                         src={signupSvg} alt="Sign Up svg" />
//                 </div>
//             </div>

//             {/* Form Section */}
//             <div className='bg-white w-[100%] h-[100vh] flex justify-center items-center max-[576px]:px-10'>
//                 <form className='shadow-2xl lg:p-[60px] max-[769px]:p-[40px] max-[576px]:p-[25px] max-[321px]:p-[20px] rounded-[5px]'
//                     onSubmit={handleSubmit(onSubmit)}>

//                     <h1 className='font-bold lg:text-[40px] max-[769px]:text-[35px] max-[576px]:text-[25px] flex justify-self-center'>Create Account</h1>

//                     {/* pharmacyName */}
//                     <div className='mt-4 mb-4'>
//                         <Controller
//                             name='pharmacyName'
//                             control={control}
//                             render={({ field }) => (
//                                 <Input
//                                     {...field}
//                                     placeholder="Pharmacy XYZ"
//                                     labelText='Pharmacy Name'
//                                     htmlFor='pharmacyName'
//                                     type='text'
//                                     rounded='rounded-[5px]'
//                                     w='w-full'
//                                     p='p-2.5'
//                                     outline='outline-blue-600'
//                                     border='border-1'
//                                     borderCol='border-gray-600'
//                                     aria-label="Pharmacy Name"
//                                 />
//                             )}
//                         />
//                         {errors.pharmacyName && <div className='text-red-500 text-sm'> {errors.pharmacyName.message} </div>}
//                     </div>

//                     {/* Email */}
//                     <div className='mt-4 mb-4'>
//                         <Controller
//                             name='email'
//                             control={control}
//                             render={({ field }) => (
//                                 <Input
//                                     {...field}
//                                     placeholder="pharmacy@gmail.com"
//                                     labelText='Email'
//                                     htmlFor='Email'
//                                     type='email'
//                                     rounded='rounded-[5px]'
//                                     w='w-full'
//                                     p='p-2.5'
//                                     outline='outline-blue-600'
//                                     border='border-1'
//                                     borderCol='border-gray-600'
//                                     aria-label="Email"
//                                 />
//                             )}
//                         />
//                         {errors.email && <div className='text-red-500 text-sm'> {errors.email.message} </div>}
//                     </div>

//                     {/* Password */}
//                     <div className='mt-4 mb-4'>
//                         <Controller
//                             name='password'
//                             control={control}
//                             render={({ field }) => (
//                                 <Input
//                                     {...field}
//                                     placeholder="********"
//                                     labelText='Password'
//                                     htmlFor='Password'
//                                     type={showPassword ? 'text' : 'password'}
//                                     rounded='rounded-[5px]'
//                                     w='w-full'
//                                     p='p-2.5'
//                                     outline='outline-blue-600'
//                                     border='border-1'
//                                     borderCol='border-gray-600'
//                                     aria-label='Password'
//                                     icon={
//                                         showPassword ? (
//                                             <FaEye onClick={handleShowPassword} />
//                                         ) : (
//                                             <FaEyeSlash onClick={handleShowPassword} />
//                                         )
//                                     }
//                                 />
//                             )}
//                         />
//                         {errors.password && <div className='text-red-500 text-sm'> {errors.password.message} </div>}
//                     </div>

//                     {/* Confirm Password */}
//                     <div className='mt-4 mb-4'>
//                         <Controller
//                             name='confirmPassword'
//                             control={control}
//                             render={({ field }) => (
//                                 <Input
//                                     {...field}
//                                     placeholder="********"
//                                     labelText='Confirm Password'
//                                     htmlFor='ConfirmPassword'
//                                     type={showPassword ? 'text' : 'password'}
//                                     rounded='rounded-[5px]'
//                                     w='w-full'
//                                     p='p-2.5'
//                                     outline='outline-blue-600'
//                                     border='border-1'
//                                     borderCol='border-gray-600'
//                                     aria-label='Confirm Password'
//                                     icon={
//                                         showPassword ? (
//                                             <FaEye onClick={handleShowPassword} />
//                                         ) : (
//                                             <FaEyeSlash onClick={handleShowPassword} />
//                                         )
//                                     }
//                                 />
//                             )}
//                         />
//                         {errors.confirmPassword && <div className='text-red-500 text-sm'> {errors.confirmPassword.message} </div>}
//                     </div>

//                     <Btn
//                         type='submit'
//                         btnText={isLoading ? <><Spinner size='1.5em' color='white' borderWidth='0.3em' /></> : "Sign Up"}
//                         bg='bg-blue-600'
//                         color='text-white'
//                         px='lg:px-45 max-[576px]:px-30 max-[321px]:px-25'
//                         fontWeight='font-bold'
//                         py='py-2.5'
//                         mt='mt-8'
//                         hoverBg='hover:bg-blue-700'
//                         disabled={isLoading}
//                     />

//                     <p className='flex justify-self-center mt-4 text-gray-600 max-[576px]:text-[12px]'> Already have an account? <span className='pl-1 
//             text-blue-600 font-bold cursor-pointer hover:underline'
//                         onClick={() => Nav("/pharmacy-login")}> Login </span> </p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default PharmSignUp;


