/*import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

export const cartSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addToCart : builder.mutation({
            query: (data)=> ({
                url: CART_URL,
                method: 'POST',
                body: data
            }),   
        }),
        getUserCart : builder.query({
            query: ()=> ({
                url: CART_URL,
            }),   
            keepUnusedDataFor: 5
        }),
      }),
})


export const { useAddToCartMutation, useGetUserCartQuery} = cartSlice;*/