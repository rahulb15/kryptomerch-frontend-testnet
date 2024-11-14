/* eslint-disable */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const nftApi = createApi({
    reducerPath: "nftApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createNFT: builder.mutation({
            query: (body) => ({
                url: "/nft",
                method: "POST",
                body,
            }),
        }),
        createOneNFT: builder.mutation({
            query: (body) => ({
                url: "/nft/createOne",
                method: "POST",
                body,
            }),
        }),
        getNFTById: builder.query({
            query: (id) => `/nft/${id}`,
        }),
        getNFTs: builder.query({
            query: ({ pageNo, limit, search }) => ({
                url: "/nft",
                params: { pageNo, limit, search },
            }),
        }),
        getOwnedNfts: builder.query({
            query: ({ pageNo, limit, search }) => ({
                url: "/nft/ownedNfts",
                body: { pageNo, limit, search },
                method: "POST",
            }),
        }),
        ownerNFTs: builder.query({
            query: (body) => ({
                url: "/nft/owned",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useCreateNFTMutation,
    useCreateOneNFTMutation,
    useGetNFTByIdQuery,
    useGetNFTsQuery,
    useGetOwnedNftsQuery,
    useOwnerNFTsQuery,
} = nftApi;
