import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useVerifyPharmacyQuery } from '../../service/PharmacyRTK'
import Spinner from '../../ui/Spinner'

const PharmVerification = () => {
    const Nav = useNavigate()
    const { token } = useParams()
    console.log(token)
    console.log("Next to token")

    const { data, error, isLoading, isSuccess } = useVerifyPharmacyQuery(token)
    console.log(data)
    console.log(error)
    console.log("working")

    if (isLoading) {
        return <div cclassName='flex justify-center item-center h-screen w-screen'>Loading...</div>
    }

    if (isSuccess) {
        Nav('/pharmacy-login')
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            {
                isLoading ? (
                    <div>
                        <h1 className='font-bold lg:text-3xl'>Verifying...</h1>
                        <div className='flex justify-self-center mt-4'>
                            <Spinner />
                        </div>
                    </div>
                ) : (
                    <div >
                        <h1 className='font-bold lg:text-3xl'>Verification in Progress...</h1>
                        <div className='flex justify-self-center mt-4'>
                            <Spinner />
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default PharmVerification