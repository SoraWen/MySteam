import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    // prepareHeaders: (headers, { getState }) => {
    //   const session = getState().session as { accessToken: string }; // 從 Redux store 中取得 session
    //   if (session) {
    //     headers.set("authorization", `Bearer ${session.accessToken}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["userData"],
  reducerPath: "bookApi",
  endpoints: (builder) => ({
    getUserByEmail: builder.query<getUserByEmailReturnValue[], string>({
      query: (userEmail) => `/users?email=${userEmail}`,
      providesTags: ["userData"],
    }),

    addToWishlist: builder.mutation<void, Helo>({
      query: ({ wishlist, userId }) => ({
        url: `/users/${userId}`, // 使用 session 中的 email 作為查詢參數
        method: "PATCH", // 使用 PATCH 方法更新使用者數據
        body: {
          wishlist: wishlist,
        },
      }),
      invalidatesTags: ["userData"],
    }),
  }),
});

type getUserByEmailReturnValue = {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
};

type Helo = { userId: string; wishlist: string[] };

export const { useAddToWishlistMutation, useGetUserByEmailQuery } = bookApi;
