import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import Loading from '../../../component/LoadingComponent/Loading'
import Message from '../../../component/MessageComponent/Message'
import FormContainer from '../../../component/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../../slices/usersApi'
const EditUser = () => {
  const {id: userId} = useParams()
  const { data: user, isLoading, error} = useGetUserDetailsQuery(userId)
  const [updateUser, {isLoading:isUpdating}] = useUpdateUserMutation()
  const navigate = useNavigate()

   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [isAdmin,setIsAdmin] = useState(false)
   
   useEffect(() => {
     if(user) {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
     }
   }, [user])
   const handleSubmit = async(e)=> {
       e.preventDefault()
       try {
        const updatedUser = {
          userId,
          name,
          email,
          isAdmin,
       }
       await updateUser(updatedUser).unwrap()
       toast.success('user updated')
       navigate('/admin/usersList')
       } catch (error) {
         
          toast.error(error?.data?.message || error || error?.error)
       }
      
   }
    
   if(isLoading) return <Loading />
   if(error) return <Message variant='danger'>{error?.data?.message || error?.error} </Message>
  return (
    <div style={{margin: '30px'}}>
         <Link to='/admin/usersList' className='btn btn-light my-3'>
           Go Back
         </Link>
         <FormContainer>
            <h1>Edit User</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-4' controlId='name'>
                   <Form.Label>User Name</Form.Label>
                   <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='email'>
                   <Form.Label>User Email</Form.Label>
                   <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='admin'>
                   
                   <Form.Check type='checkbox' label='is Admin' checked={isAdmin === true}
                    value={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)} ></Form.Check>
                   
                </Form.Group>
               

               
               
                <Button disabled={isUpdating} type='submit' variant='primary' className='btn-black'>
                   {isUpdating ? 'loading...' :'Edit User'}
                </Button>
            </Form>
         </FormContainer>
     </div>
  )
}

export default EditUser