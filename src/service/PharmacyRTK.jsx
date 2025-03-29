import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pharmacySlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:7399/api/pharmacies',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().medGet.token; // Get token from Redux state
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
        url: '/register',
        method: 'POST',
        body: pharmacyData,
      }),
    }),

    verifyPharmacy: builder.query({
      query: (token) => ({
        url: `/pharm-verify?token=${token}`,
        method: 'GET',
      }),
    }),

    loginPharmacy: builder.mutation({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    resendVerificationEmail: builder.mutation({
      query: (emailData) => ({
        url: '/resend-verification-email',
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




// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const pharmacySlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:7399/api/pharmacies',
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),


//   reducerPath: 'pharmacyApi',
//   tagTypes: ["pharmacies"],
//   endpoints: (builder) => ({
//     registerPharmacy: builder.mutation({
//       query: (pharmacyData) => ({
//         url: '/register',
//         method: 'POST',
//         body: pharmacyData,
//       }),
//     }),

//     verifyPharmacy: builder.query({
//       query: (token) => ({
//         url: `/pharm-verify?token=${token}`,
//         // url: `/verify?token=${token}`,
//         method: 'GET',
//       }),
//     }),

//     loginPharmacy: builder.mutation({
//       query: (loginData) => ({
//         url: '/login',
//         method: 'POST',
//         body: loginData,
//       }),
//     }),

//     resendVerificationEmail: builder.mutation({
//       query: (emailData) => ({
//         url: '/resend-verification-email',
//         method: 'POST',
//         body: emailData,
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterPharmacyMutation,
//   useVerifyPharmacyQuery,
//   useLoginPharmacyMutation,
//   useResendVerificationEmailMutation,
// } = pharmacySlice;
