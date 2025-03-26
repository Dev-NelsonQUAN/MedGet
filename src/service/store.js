import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./UserRTK";
import medGetReducer from "./GlobalState"
import { medicineApi } from './MedicineRtk';
import { pharmacySlice } from './PharmacyRTK'
import { adminSlice } from "./AdminRTK";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ['medGet']
};

const persistedMedGetReducer = persistReducer(persistConfig, medGetReducer);


const store = configureStore({
  reducer: {
    medGet: persistedMedGetReducer, 
    [userSlice.reducerPath]: userSlice.reducer,
    [adminSlice.reducerPath]: adminSlice.reducer,
    [medicineApi.reducerPath]: medicineApi.reducer,
    [pharmacySlice.reducerPath]: pharmacySlice.reducer,
  },
  middleware: (getAllMiddelware) =>
    getAllMiddelware({  serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },})
      .concat(userSlice.middleware)
      .concat(medicineApi.middleware)
      .concat(pharmacySlice.middleware)
      .concat(adminSlice.middleware) 
});

export default store;
export const persistor = persistStore(store)
