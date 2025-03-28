import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.medGet?.token;
            // const tokenTwo = getState()?.medGet?.action;

            console.log("ReduxToken", token)
            // console.log("Action", tokenTwo)

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
        // }),

        // getAllUsers: builder.query({
        //     query: (token) => ({
        //         url: '/getAllUsers',
        //         method: 'GET',
        //         token
        //     })
        // }),
        getAllPharmacies: builder.query({
            query: () => 'admin/getAllPharmacies',
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