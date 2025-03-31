import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const locationSlice = createApi({
  reducerPath: 'locationSlice',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:7399/api/locations',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().medGet.token; 
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: (data) => ({
        url: '/createlocation',
        method: 'POST',
        body: data,
      }),
    }),

    getLocationById: builder.query({
      query: () => '/getlocationbyid',
    }),

    updateLocation: builder.mutation({
      query: (data) => ({
        url: '/updatelocation',
        method: 'PUT',
        body: data,
      }),
    }),

    getAllPharmacies: builder.query({
      query: ({ state, city, service }) => {
        let queryParams = new URLSearchParams();
        if (state) queryParams.append('state', state);
        if (city) queryParams.append('city', city);
        if (service) queryParams.append('service', service);
        return `/pharmacies/all?${queryParams.toString()}`;
      },
    }),
  }),
});

export const { 
  useCreateLocationMutation, 
  useGetLocationByIdQuery, 
  useUpdateLocationMutation, 
  useGetAllPharmaciesQuery 
} = locationSlice;
