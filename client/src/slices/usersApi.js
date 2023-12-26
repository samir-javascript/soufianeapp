import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";


export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data // this is the user's credentials (email, password)
            })
        }),
        register: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        getUsers: builder.query({
            query: ()=> ({
                url: USERS_URL,  
            }),
            providesTags : ['User'],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (id)=> ({
                url: `${USERS_URL}/${id}`,  
                method: "DELETE"
            })
        }),
        getUserDetails: builder.query({
            query: (id)=> ({
                url: `${USERS_URL}/${id}`,  
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/${data.userId}`,  
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
        
        logout: builder.mutation({
            query: ()=> ({
                url: `${USERS_URL}/logout`,
                method: 'POST', 
            })
        }),
        profile: builder.mutation({
            query: (data)=> ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body : data
            })
        }),
    }),
})

export const { useLoginMutation, useLogoutMutation,
     useRegisterMutation, useProfileMutation,
     useDeleteUserMutation,useGetUsersQuery,useUpdateUserMutation,
     useGetUserDetailsQuery
    } = authSlice;