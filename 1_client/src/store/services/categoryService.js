import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.adminToken;

      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }

      headers.set("authorization", token ? `Bearer ${token}` : "");

      return headers;
    },
  }),

  tagTypes: ["categories"],

  endpoints: (builder) => {
    return {
      //      *********  Create category  *********

      create: builder.mutation({
        query: (name) => {
          return {
            url: "create-category",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"],
      }),

      //      *********  Get category  *********

      get: builder.query({
        query: (page) => {
          return {
            url: `categories/${page}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      //      *********  Fetch category  *********

      fetchCategory: builder.query({
        query: (id) => {
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      //      *********  Update category  *********

      updateCategory: builder.mutation({
        query: ({ name, id }) => {
          return {
            url: `update-category/${id}`,
            method: "PUT",
            body: { name: name },
          };
        },
        invalidatesTags: ["categories"],
      }),

      //      *********  Delete category  *********

      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),

      // *********  all categories  ***********

      allcategories: builder.query({
        query: () => {
          return {
            url: `allcategories`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),

      // ******** random categories  ********

      randomCategories: builder.query({
        query: () => {
          return {
            url: "random-categories",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateMutation,
  useGetQuery,
  useFetchCategoryQuery,
  useRandomCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllcategoriesQuery,
} = categoryService;
export default categoryService;
