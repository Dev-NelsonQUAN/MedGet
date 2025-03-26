import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7399/api/user',
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.medGet?.token;

            console.log("LoginToken", token)

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    reducerPath: 'userApi',
    tagTypes: ['user'],
    endpoints: (builder) => ({
        signUpUser: builder.mutation({
            query: (body) => ({
                url: '/createuser',
                method: 'POST',
                body
            }),
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        verifyUser: builder.query({
            query: (token) => ({
                url: `/verify?token=${token}`,
                method: 'GET'
            })
        }),
        resendVerificationEmail: builder.mutation({
            query: (email) => ({
                url: '/resend-verification-email',
                method: 'POST',
                body: { email }
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (formData) => ({
                url: '/profile',
                method: 'PUT',
                body: formData,
                formData: true,
            }),
        }),
        updateUserPassword: builder.mutation({
            query: (body) => ({
                url: '/password',
                method: 'PUT',
                body,
            }),
        }),
        getUser: builder.query({
            query: () => '/profile',
            providesTags: ['user'],
        }),
        getAllPharms: builder.query({
            query: () => '/getAllPharms'
        })
    }),
});

export const {
    useSignUpUserMutation,
    useLoginUserMutation,
    useVerifyUserQuery,
    useResendVerificationEmailMutation,
    useUpdateUserProfileMutation,
    useUpdateUserPasswordMutation,
    useGetUserQuery,
    useGetAllPharmsQuery
} = userSlice;