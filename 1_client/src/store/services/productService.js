import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.adminToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => {
    return {
      // **********  create product ***********
      cProduct: builder.mutation({
        query: (data) => {
          return {
            url: "create-product",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),

      // ********* update product *********

      updateProduct: builder.mutation({
        query: (data) => {
          return {
            url: `product`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),

      // ********* delete product  *********

      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `delete/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),

      // ******** get products ********

      getProducts: builder.query({
        query: (page) => {
          return {
            url: `products/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),

      // ********* get single product by ID **********

      getProduct: builder.query({
        query: (id) => {
          return {
            url: `product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
    };
  },
});

export const {
  useCProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productService;
export default productService;
