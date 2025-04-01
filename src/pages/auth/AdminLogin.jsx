import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useLoginAdminMutation } from '../../service/AdminRTK';
import Input from '../../ui/Input';
import Btn from "../../ui/Btn";
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import Spinner from '../../ui/Spinner';
import loginSvg from '../../assets/doctorvector.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setToken } from "../../service/GlobalState";
import { persistStore } from 'redux-persist';
import store, { persistor } from '../../service/store';
import medGetWhiteLogo from '../../assets/MedgetLogoNoBG2.png';

const AdminLogin = () => {
    const Nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [loginAdmin, { isLoading: isLoginLoading }] = useLoginAdminMutation();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await loginAdmin(data).unwrap();
            const { data: adminData, token } = result;

            dispatch(setUser(adminData));
            dispatch(setToken(token))
            console.log('Redux State After Dispatch:', store.getState());


            persistStore(store).purge(['medGet']);
            persistor.flush()

            Swal.fire({
                title: 'Success!',
                text: 'Login successful!',
                icon: 'success',
                confirmButtonText: 'Okay',
            });

            Nav('/admin-dash');
        } catch (err) {
            console.error('Login error:', err);
            let errorMessage = 'Login failed. Please try again.';
            if (err && err.data && err.data.message) {
                errorMessage = err.data.message;
            }
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
            <div className="bg-blue-600 w-[100%] flex max-[769px]:hiddenn flex-col">
                <div
                    className="w-full flex justify-center mt-15 cursor-pointer"
                    onClick={() => Nav('/sign-up')}
                >
                    <img className="w-45" src={medGetWhiteLogo} alt="Medget Logo" />
                </div>

                <div className="flex justify-center mt-4">
                    <img
                        className="transform scale-x-[-1]"
                        src={loginSvg}
                        alt="Login SVG"
                    />
                </div>
            </div>

            <div className="bg-white w-[100%] h-[100vh] flex justify-center items-center max-[576px]:px-10 max-[321px]:px-5">
                <form
                    className="shadow-2xl lg:px-[50px] lg:py-[40px] max-[769px]:p-[40px] max-[576px]:p-[25px] rounded-[5px]"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="font-bold lg:text-[40px] max-[769px]:text-[35px] max-[576px]:text-[25px] flex justify-self-center leading-8 max-[321px]:text-[24px]">
                        Admin Login
                    </h1>

                    <div className="mt-8 mb-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="admin@example.com"
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

                    <Btn
                        type="submit"
                        btnText={
                            loading ? (
                                <>
                                    <Spinner size="1.5em" color="white" borderWidth="0.3em" />
                                </>
                            ) : (
                                'Login'
                            )
                        }
                        bg="bg-blue-600"
                        color="text-white"
                        px={
                            loading
                                ? 'lg:px-49 max-[769px]:px-35'
                                : 'lg:px-49 max-[769px]:px-35 max-[576px]:px-13.5 max-[321px]:px-12'
                        }
                        fontWeight="font-bold"
                        py="py-2.5"
                        mt="mt-10"
                        hoverBg="hover:bg-blue-700"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;