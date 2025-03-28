import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medicineApi = createApi({
    reducerPath: 'medicineApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Medicines'],
    endpoints: (builder) => ({
        getMedicines: builder.query({
            query: () => 'medicines/getallmedicines',
            providesTags: ['Medicines'],
        }),
        getMedicineById: builder.query({
            query: (id) => `medicines/getbyidmedicines/${id}`,
            providesTags: (result, error, id) => [{ type: 'Medicines', id }],
        }),
        createMedicine: builder.mutation({
            query: (formData) => ({
                url: 'medicines/createmedicines',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Medicines'],
        }),
        updateMedicine: builder.mutation({
            query: ({ id, formData }) => ({
                url: `medicines/updatemedicinesbyid/${id}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Medicines', id }],
        }),
        deleteMedicine: builder.mutation({
            query: (id) => ({
                url: `medicines/deletemedicines/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Medicines'],
        }),
    }),
});

export const {
    useGetMedicinesQuery,
    useGetMedicineByIdQuery,
    useCreateMedicineMutation,
    useUpdateMedicineMutation,
    useDeleteMedicineMutation,
} = medicineApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const medicineApi = createApi({
//   reducerPath: 'medicineApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1234/api/medicines',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     }
//   }),

//   tagTypes: ['Medicines'],
//   endpoints: (builder) => ({
//     getMedicines: builder.query({
//       query: () => '/getallmedicines',
//       providesTags: ['Medicines'],
//     }),

//     getMedicineById: builder.query({
//       query: (id) => `/getbyidmedicines/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Medicines', id }],
//     }),

//     createMedicine: builder.mutation({
//       query: (formData) => ({
//         url: '/createmedicines',
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ['Medicines'],
//     }),

//     updateMedicine: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/updatemedicinesbyid/${id}`,
//         method: 'PATCH',
//         body: formData,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: 'Medicines', id }],
//     }),
//     deleteMedicine: builder.mutation({
//       query: (id) => ({
//         url: `/deletemedicines/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Medicines'],
//     }),
//   }),
// });

// export const {
//   useGetMedicinesQuery,
//   useGetMedicineByIdQuery,
//   useCreateMedicineMutation,
//   useUpdateMedicineMutation,
//   useDeleteMedicineMutation
// } = medicineApi;
