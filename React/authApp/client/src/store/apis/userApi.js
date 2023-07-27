import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getState().auth.userToken
        
         if(token && !(endpoint in ['loginUser','addUser'])){
          headers.set('authorization', `Bearer ${token}`)  
          return headers
        }
      },
  }),
  endpoints: (builder) => {
    return {
      loginUser: builder.mutation({
        query: (data) => {
          return {
            url: "/users/login",
            method: "POST",
            body: {
              ...data,
            },
          };
        },
      }),
      addUser: builder.mutation({
        query: (user) => {
          return {
            url: "/users/addUser",
            method: "POST",
            body: {
              ...user,
            },
          };
        },
      }),
      updateUser: builder.mutation({
        query: (user) => {
          return {
            url: "/users/updateUser",
            method: "POST",
            body: {
              ...user,
            },
          };
        },
      }),
      logoutUser: builder.mutation({
        query: (data) => {
          return {
            url: "/users/logout",
            method: "POST",
            body: {
              ...data,
            },
          };
        },
      }),
    };
  },
});


export {userApi};
export const {useLoginUserMutation, useAddUserMutation, useUpdateUserMutation,useLogoutUserMutation} = userApi;