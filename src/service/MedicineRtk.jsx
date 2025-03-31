import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medicineSlice = createApi({
  reducerPath: "medicineSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7399/api/medicines",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().medGet.token; 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMedicines: builder.query({
      query: () => "/getallmedicines",
    }),

    getMedicineById: builder.query({
      query: (id) => `/getbyidmedicines/${id}`,
    }),

    addMedicine: builder.mutation({
      query: (formData) => ({
        url: "/createmedicines",
        method: "POST",
        body: formData,
      }),
    }),

    updateMedicine: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/updatemedicinesbyid/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),

    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `/deletemedicines/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useGetMedicineByIdQuery,
  useAddMedicineMutation,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineSlice;
