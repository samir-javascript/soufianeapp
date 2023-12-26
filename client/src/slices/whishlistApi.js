import { apiSlice } from "./apiSlice";
import { WISHLIST_URL} from "../constants";

export const whishlistSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTowishlist : builder.mutation({
            query: (data)=> ({
                url: WISHLIST_URL,
                method: 'POST',
                body: {...data},
            }),   
        }),
        getSingleWishList : builder.query({
            query: ()=> ({
                url: WISHLIST_URL,
            }),   
            keepUnusedDataFor: 5
        }),
        removeFromWishlist : builder.mutation({
            query: (data)=> ({
                url: WISHLIST_URL,
                method: 'DELETE',
                body: data,
            }),   
           
        }),
     } )})


export const {useAddTowishlistMutation, useGetSingleWishListQuery, useRemoveFromWishlistMutation } = whishlistSlice;