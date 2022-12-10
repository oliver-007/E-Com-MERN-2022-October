import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderService = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // const reducers = getState();
      const token = getState()?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => {
    return {
      getOrders: builder.query({
        query: (page) => {
          return {
            // url: `orders?page=${page}`,
            url: `orders/${page}`,
            method: "GET",
          };
        },
        providesTags: ["orders"],
      }),
    };
  },
});

export const { useGetOrdersQuery } = orderService;
export default orderService;
