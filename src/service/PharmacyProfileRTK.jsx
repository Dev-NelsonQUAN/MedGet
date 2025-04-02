import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pharmacyProfileSlice = createApi({
  reducerPath: "pharmacyProfileSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7399/api/pharmacy-profile",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().medGet.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    
    getProfile: builder.query({
      query: () => "/getprofile",
      providesTags: ["Profile"],
    }),

    createProfile: builder.mutation({
      query: (formData) => ({
        url: "/createprofile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/updateprofile",
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteProfile: builder.mutation({
      query: () => ({
        url: "/deleteprofile",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"], 
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = pharmacyProfileSlice;
