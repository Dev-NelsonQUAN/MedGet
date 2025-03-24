import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserRTK";
import medGetReducer from "./GlobalState"
import { medicineApi } from './MedicineRtk';
import { pharmacySlice } from './PharmacyRTK'
import { adminSlice } from "./AdminRTK";

const store = configureStore({
  reducer: {
    medGet: medGetReducer, 
    [userSlice.reducerPath]: userSlice.reducer,
    [adminSlice.reducerPath]: adminSlice.reducer,

    [medicineApi.reducerPath]: medicineApi.reducer,
    [pharmacySlice.reducerPath]: pharmacySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(medicineApi.middleware)
      .concat(pharmacySlice.middleware)
      .concat(adminSlice.middleware) 
});

export default store;
