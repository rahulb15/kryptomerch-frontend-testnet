/* eslint-disable */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return { url: "/auth/login", method: "post", body };
            },
        }),

        registerUser: builder.mutation({
            query: (body) => {
                return { url: "/auth/register", method: "post", body };
            },
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
