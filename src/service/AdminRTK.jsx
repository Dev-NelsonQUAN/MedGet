import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:7399/api/admin`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.medGet?.token;

            console.log("ReduxToken", token)

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
                url: '/createAdmin',
                method: 'POST',
                body
            }),
        }),
            loginAdmin: builder.mutation({
            query: (body) => ({
                url: '/loginAdmin',
                method: 'POST',
                body,
            })
        }),
        getAllUsers: builder.query({
            query: () => '/getAllUsers'
            }),
        // }),

        // getAllUsers: builder.query({
        //     query: (token) => ({
        //         url: '/getAllUsers',
        //         method: 'GET',
        //         token
        //     })
        // }),
        getAllPharmacies: builder.query({
            query: () => '/getAllPharmacies',
            })
        // }),
        
        // getAllPharmacies: builder.query({
        //     query: (token) => ({
        //         url: '/getAllPharmacies',
        //         method: 'GET',
        //         token
        //     })
        // }),
        
    }),
})

export const {
    useSignUpAdminMutation,
    useLoginAdminMutation,
    useGetAllUsersQuery,
    useGetAllPharmaciesQuery
} = adminSlice