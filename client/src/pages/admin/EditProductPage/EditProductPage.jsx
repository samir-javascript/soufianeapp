import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGetSingleProductQuery, useUpdateProductMutation } from '../../../slices/productsApi'
import Loading from '../../../component/LoadingComponent/Loading'
import Message from '../../../component/MessageComponent/Message'
import FormContainer from '../../../component/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useUploadProductImageMutation } from '../../../slices/productsApi'
const EditProduct = () => {
  const {id: productId} = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading , error} = useGetSingleProductQuery(productId)
  const [updateProduct, {isLoading:loadingUPD}] = useUpdateProductMutation()
  const [uploadImage, {isLoading:loadingImage, error:errorUplaodingImage}] = useUploadProductImageMutation()
   const [name,setName] = useState('')
   const [description,setDescription] = useState('')
   const [price,setPrice] = useState(0)
   const [brand,setBrand] = useState('')
   const [category,setCategory] = useState('')
   const [image,setImage] = useState('')
   const [countInStock, setCountInStock] = useState(0)
   useEffect(() => {
     if(product) {
      setName(product.name)
      setBrand(product.brand)
      setCategory(product.category)
      setPrice(product.price)
      setDescription(product.description)
      setCountInStock(product.countInStock)
      setImage(product.image)
     }
   }, [product])
   const handleSubmit = async(e)=> {
       e.preventDefault()
       try {
        const updatedProduct = {
          productId,
          name,
          brand,
          category,
          price,
          countInStock,
          image,
          description
       }
       await updateProduct(updatedProduct).unwrap()
       toast.success('product updated')
       navigate('/admin/productsList')
       } catch (error) {
          console.log(error)
          toast.error(error?.data?.message || error || error?.error)
       }
      
   }
     const uploadFileHandler = async(e)=> {
      const formData = new FormData()
      formData.append('image', e.target.files[0]);
      try {
         const res = await uploadImage(formData).unwrap()
         toast.success(res.message)
         setImage(res.image)
      } catch (error) {
         console.log(error)
         toast.error(error || error?.data?.message || error?.error)
      }
         console.log(e.target.files[0])
     }
   if(isLoading) return <Loading />
   if(error) return <Message variant='danger'>{error?.data?.message || error?.error} </Message>
  return (
    <div style={{margin: '30px'}}>
         <Link to='/admin/productsList' className='btn btn-light my-3'>
           Go Back
         </Link>
         <FormContainer>
            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-4' controlId='name'>
                   <Form.Label>Product Name</Form.Label>
                   <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='description'>
                   <Form.Label>Product description</Form.Label>
                   <Form.Control type='description' placeholder='Enter description' value={description} onChange={(e)=> setDescription(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='brand'>
                   <Form.Label>Product brand</Form.Label>
                   <Form.Control type='brand' placeholder='Enter brand' value={brand} onChange={(e)=> setBrand(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='image'>
                   <Form.Label>Product image</Form.Label>
                   <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e)=> setImage(e.target.value)} ></Form.Control>
                    <Form.Control type='file' Label='choose file' onChange={uploadFileHandler} >

                    </Form.Control>
                </Form.Group>
                <Form.Group className='mb-4' controlId='category'>
                   <Form.Label>Product category</Form.Label>
                   <Form.Control type='category' placeholder='Enter category' value={category} onChange={(e)=> setCategory(e.target.value)} ></Form.Control>
                   
                </Form.Group>

                <Form.Group className='mb-4' controlId='price'>
                   <Form.Label>Product price</Form.Label>
                   <Form.Control type='price' placeholder='Enter price' value={price} onChange={(e)=> setPrice(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Form.Group className='mb-4' controlId='countInStock'>
                   <Form.Label>Product countInStock</Form.Label>
                   <Form.Control type='countInStock' placeholder='Enter countInStock' value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} ></Form.Control>
                   
                </Form.Group>
                <Button disabled={loadingUPD} type='submit' variant='primary' className='btn-black'>
                   {loadingUPD ? 'loading...' :'Edit Product'}
                </Button>
            </Form>
         </FormContainer>
     </div>
  )
}

export default EditProduct