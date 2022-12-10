import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentService = createApi({
  reducerPath: "payment",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");

      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // ****** send payment ******
      sendPayment: builder.mutation({
        query: (cart) => {
          return {
            url: `create-checkout-session`,
            method: "POST",
            body: cart,
          };
        },
      }),
      // ****** verify payment *******
      verifyPayment: builder.query({
        query: (id) => {
          return {
            url: `verify-payment/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useSendPaymentMutation, useVerifyPaymentQuery } = paymentService;
export default paymentService;
