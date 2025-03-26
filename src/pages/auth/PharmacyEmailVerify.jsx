import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyPharmacyQuery} from '../../service/PharmacyRTK';

const PharmacyVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyPharmacy, { isLoading, isSuccess, isError }] = useVerifyPharmacyQuery(token);

  useEffect(() => {
    if (token) {
      verifyPharmacy(token);
    }
  }, [token, verifyPharmacy]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/pharmacy-login');
      }, 2000); //
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading && <p>Verifying your email...</p>}
      {isSuccess && <p>Email verified successfully! Redirecting to login...</p>}
      {isError && <p>Verification failed. Please try again.</p>}
    </div>
  );
};

export default PharmacyVerification;
