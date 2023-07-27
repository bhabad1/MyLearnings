import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import  {authReducer}  from './slices/authSlice';
import { userApi } from './apis/userApi';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
    reducer:{
       [userApi.reducerPath] : userApi.reducer,
        auth:authReducer,

    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(userApi.middleware);
    }
})
setupListeners(store.dispatch);


export {store};
export {useAddUserMutation, useLoginUserMutation,useUpdateUserMutation,useLogoutUserMutation} from './apis/userApi';
export  {logUser} from './slices/authSlice';