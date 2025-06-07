import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.medGet?.token;
            console.log("LoginToken", token);
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
                url: 'user/createuser',
                method: 'POST',
                body,
            }),
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: 'user/login',
                method: 'POST',
                body,
            }),
        }),
        verifyUser: builder.query({
            query: (token) => ({
                url: `user/verify?token=${token}`,
                method: 'GET',
            }),
        }),
        resendVerificationEmail: builder.mutation({
            query: (email) => ({
                url: 'user/resend-verification-email',
                method: 'POST',
                body: { email },
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (body) => ({
                url: 'profile/createProfile',
                method: 'POST',
                body,
            }),
        }),
        updateUserPassword: builder.mutation({
            query: (body) => ({
                url: 'user/password',
                method: 'PATCH',
                body,
            }),
        }),
        getUser: builder.query({
            query: () => 'profile/getProfile',
            transformResponse: (response) => {
                console.log("getUser Response: ", response);
                if (response && response.user && response.profile) {
                    return {
                        ...response.user,
                        profile: response.profile,
                    };
                } else {
                    return null;
                }
            },
            providesTags: ['user'],
        }),
        getAllPharms: builder.query({
            query: () => 'user/getAllPharms',
        }),
        getAllMedicines: builder.query({
            query: () => 'user/getAllMedicines',
        }),
        getUserById: builder.query({
            query: (userId) => `user/${userId}`,
            providesTags: ['user'],
        }),
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
    useGetAllPharmsQuery,
    useGetAllMedicinesQuery,
    useGetUserByIdQuery,
} = userSlice;