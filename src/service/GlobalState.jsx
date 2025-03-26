import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    token: null, 
    location: { 
        latitude: null,
        longitude: null,
        error: null, 
    },
    pharmacies: [], 
    searchCriteria: { 
        searchTerm: "",
        filterBy: "",
    },
    error: null, 
    isLoading: false, 
};

const medGetSlice = createSlice({
    name: "medGet",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // state.token = action.payload.token;
        },
        setToken: (state, action) => {
            state.action = action.payload
            console.log('Set User Action Payload:', action.payload); 
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setPharmacies: (state, action) => {
            state.pharmacies = action.payload;
        },
        setSearchCriteria: (state, action) => {
            state.searchCriteria = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearUser:(state)=>{
          state.user = null;
          state.token = null;
        }
    },
});

export const {
    setUser,
    setToken,
    setLocation,
    setPharmacies,
    setSearchCriteria,
    setError,
    setLoading,
    clearUser,
} = medGetSlice.actions;

export default medGetSlice.reducer;