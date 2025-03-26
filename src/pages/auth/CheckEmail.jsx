import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerifyUserQuery, useResendVerificationEmailMutation } from '../../service/UserRTK';
import Btn from '../../ui/Btn';
import Spinner from '../../ui/Spinner';
import Swal from 'sweetalert2';
import { FaMailBulk } from 'react-icons/fa';

const CheckEmail = () => {
    const [resendLoading, setResendLoading] = useState(false);
    const Nav = useNavigate();

    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    const { data, error, isLoading } = useVerifyUserQuery(token, {
        skip: !token,
    });

    const [resendVerificationEmail] = useResendVerificationEmailMutation();

    const handleResendEmail = async () => {
        setResendLoading(true);
        try {
            const email = data?.email;


            if (email) {
                await resendVerificationEmail({ email });

                Swal.fire({
                    title: 'Success!',
                    text: 'Verification email has been resent. Please check your inbox.',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Unable to get the user email. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to resend email. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        } finally {
            setResendLoading(false);
        }
    };

    if (data) {
        Nav("/login");
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='flex lg:h-[100vh]'>
            <div className='bg-white w-[100%] h-[100vh] flex justify-center items-center lg:px-70  max-[576px]:px-10 max-[321px]:px-5'>

                <div className='shadow-2xl lg:px-[30px] lg:py-[40px] max-[769px]:p-[40px] max-[576px]:p-[25px] rounded-[5px] text-center'>
                    <div className='flex justify-center mb-6'>
                        <FaMailBulk size={50} />
                    </div>
                    <h1 className='font-bold lg:text-[40px] max-[769px]:text-[35px] max-[576px]:text-[25px] flex justify-self-center leading-8 max-[321px]:text-[24px] mb-4'>
                        Check Your Email
                    </h1>
                    <p className='mt-6 font-medium lg:text-lg text-gray-700 text-center lg:w-110 justify-self-center flex'>
                        A verification email has been sent to your inbox. Please check your email to verify your account.
                    </p>

                    <p className='mt-4 text-sm text-gray-500 text-center'>
                        If you don't see it, check your spam folder or try resending the verification email.
                    </p>

                    {/* <div className='mt-6 flex justify-self-center'>
                        <Btn
                            type='button'
                            btnText={resendLoading ? <><Spinner size='1.5em' color='white' borderWidth='0.3em' /></> : "Resend Verification Email"}
                            bg='bg-blue-600'
                            color='text-white'
                            px='lg:px-25 max-[769px]:px-18 max-[576px]:px-12.5 max-[321px]:px-2.5'
                            fontWeight='font-bold'
                            py='py-2.5'
                            mt='mt-6'
                            hoverBg='hover:bg-blue-700'
                            disabled={resendLoading}
                            onClick={handleResendEmail}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CheckEmail;
