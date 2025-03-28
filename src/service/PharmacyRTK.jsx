import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pharmacySlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),


  reducerPath: 'pharmacyApi',
  tagTypes: ["pharmacies"],
  endpoints: (builder) => ({
    registerPharmacy: builder.mutation({
      query: (pharmacyData) => ({
        url: 'pharmacies/register',
        method: 'POST',
        body: pharmacyData,
      }),
    }),

    verifyPharmacy: builder.query({
      query: (token) => ({
        url: `pharmacies/pharm-verify?token=${token}`,
        // url: `/verify?token=${token}`,
        method: 'GET',
      }),
    }),

    loginPharmacy: builder.mutation({
      query: (loginData) => ({
        url: 'pharmacies/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    resendVerificationEmail: builder.mutation({
      query: (emailData) => ({
        url: 'pharmacies/resend-verification-email',
        method: 'POST',
        body: emailData,
      }),
    }),
  }),
});

export const {
  useRegisterPharmacyMutation,
  useVerifyPharmacyQuery,
  useLoginPharmacyMutation,
  useResendVerificationEmailMutation,
} = pharmacySlice;
