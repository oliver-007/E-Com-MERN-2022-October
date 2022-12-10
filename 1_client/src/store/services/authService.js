import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),

  endpoints: (builder) => {
    return {
      // ******* admin login  *********
      authLogin: builder.mutation({
        query: (loginData) => {
          return {
            url: "login",
            method: "POST",
            body: loginData,
          };
        },
      }),

      // ***********  user register  ************

      userRegister: builder.mutation({
        query: (state) => {
          return {
            url: "register",
            method: "POST",
            body: state,
          };
        },
      }),

      // ***********  user login  ************

      userLogin: builder.mutation({
        query: (state) => {
          return {
            url: "login",
            method: "POST",
            body: state,
          };
        },
      }),
    };
  },
});

export const {
  useAuthLoginMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
} = authService;
export default authService;
