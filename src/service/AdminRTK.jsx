import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.medGet?.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),

    reducerPath: 'adminApi',
    tagTypes: ['admin'],
    endpoints: (builder) => ({
        signUpAdmin: builder.mutation({
            query: (body) => ({
                url: 'admin/createAdmin',
                method: 'POST',
                body
            }),
        }),
 loginAdmin: builder.mutation({
            query: (body) => ({
                url: 'admin/loginAdmin',
                method: 'POST',
                body,
            })
        }),
        getAllUsers: builder.query({
            query: () => 'admin/getAllUsers'
            }),
        getAllPharmacies: builder.query({
            query: () => 'admin/getAllPharmacies',
            }),
        VerifyPharmacy: builder.mutation({
            query: () => 'admin/verifyPharm',

        })
    }),
})

export const {
    useSignUpAdminMutation,
    useLoginAdminMutation,
    useGetAllUsersQuery,
    useGetAllPharmaciesQuery,
    useVerifyPharmacyMutation

} = adminSlice