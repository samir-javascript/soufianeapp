
import {Link, useNavigate, useParams } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useState } from 'react'
import { Row, Col, Image , Button, ListGroup, Card, Form} from 'react-bootstrap'
import { useGetSingleProductQuery, useCreateProductReviewMutation } from '../../slices/productsApi'
import { useAddTowishlistMutation , useGetSingleWishListQuery} from '../../slices/whishlistApi'
import { addToCart } from '../../slices/cartSlice'
//import { useAddToCartMutation } from '../../slices/cartApi'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'
import Rating from '../../component/RatingComponent/Rating'
import Loading from '../../component/LoadingComponent/Loading'
import Message from '../../component/MessageComponent/Message'

import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

const ProductDetailsPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [comment, setComment] = useState('')
   const [rating,setRating] = useState(0)
  const [ qty, setQty ] = useState(1)
  const {id: productId} = useParams()
 // const [addToCart, {isLoading:isAddingToCart}] = useAddToCartMutation()
  const {userInfo} = useSelector(state => state.auth);
  const truncate = (str, n) => {
   return str.length > n ? str.substring(0, n)+'...' : str;
 };
 const tooltipStyle = {
   backgroundColor: '#2196F3', // Change the background color
   color: '#FFFFFF',           // Change the text color
   fontSize: '14px',           // Change the font size
   // Add more styles as needed
 };
  const [ createReview, {isLoading:loadingCR, error:errorcreateRV}] = useCreateProductReviewMutation()
  const { data: product, isLoading, error, refetch} = useGetSingleProductQuery(productId)
 const [addToWishlist, {isLoading:isAdding, error:errorAdding}] = useAddTowishlistMutation()
 const {data: wishlistPro, refetch:refetchWishlistPro} = useGetSingleWishListQuery()
  const pro =  wishlistPro?.products.find(item => item._id === productId)
  console.log(pro)
  const addToCartHandler =async ()=> {
   
   dispatch(addToCart({ ...product, qty }));
   
   navigate('/cart');
  }
  const AddToWishlistHandler = async()=> {
   if(errorAdding) {
      toast.error(error?.data?.message || error?.error)
      return;
   }
     if(userInfo) {
      try {
         await addToWishlist({
            userId: userInfo._id,
            productId
         })

         refetchWishlistPro()
         if(!pro) {
            toast.success('item Added To your Wishlist')
             navigate('/browse-wishlist-products')
             
         }
        
     } catch (error) {
        console.log(error)
        toast.error(error?.data?.message || error?.error || error)
     }
     }else {
       navigate('/login')
     }
    
  }
 // if(errorWLP) return <Message>{errorWLP?.data?.message || errorWLP?.error}</Message>
   if(isLoading) return <Loading />
    if(error) return <Message variant={'danger'}>{error?.data?.message || error?.error}</Message>
     const handleCreateReview = async(e)=> {
         e.preventDefault()
         if(errorcreateRV) {
           
            return;
         }
         try {
           const res =  await createReview({
               productId,
               rating,
               comment
            }).unwrap()
            if(res.error) {
               toast.error(res.error?.data?.message || res?.error?.error)
               return
            }else {
               refetch()
               setComment('')
               setRating(0)
               toast.success('Review has been created')
            }
            
         } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error?.error || error)
         }
     }
  return (
    <div className='product-details-container'>
       <Link className='btn btn-light m-3' to='/'>
          Go Back
       </Link>
       <Helmet>
        <title>starshiners | {product.name} </title>
        <meta name='description' content={product.description} />
    </Helmet>
       <Row className='justify-content-md-center m-3'>
       <Col className='mb-3' md={3}>
          <Image  className='image'  alt={product.name} src={product.image} fluid />
       </Col>
       <Col md={5}>
          <ListGroup variant='flush'>
              <ListGroup.Item>
              <h3 className='coure'>
   {product.name}{' '}
   <div
      className='bg-cour'
      onClick={AddToWishlistHandler}
      aria-disabled={isAdding}
      style={{ pointerEvents: isAdding ? 'none' : 'auto' , cursor:'pointer', width:'auto'}}
   >
     {!pro ? (
       
          <img 
          
          width={30}
          
          src={
             
               pro ? '/images/heart_filled.png'
                : '/images/heart_outline.png'
          }
          alt="heart icon to add products to wishlist"
       />
     ) : (
      <>
      <img 
      data-tooltip-id="my-tooltip" data-tooltip-content="remove from wishlist"
      width={30}
       
      src={
         
           pro ? '/images/heart_filled.png'
            : '/images/heart_outline.png'
      }
      alt=""
   />
        <Tooltip style={tooltipStyle}  id="my-tooltip" />  
        </>  
     )}
    
      
   </div>
</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                 <Rating value={product.rating} text={(product.numReviews)} /> 
              </ListGroup.Item>
              <ListGroup.Item>
                 Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                  description: <p>{ truncate(product.description,150)}.</p>
              </ListGroup.Item>
          </ListGroup>
       </Col>
       <Col md={4}>
         {/** style={{height:'auto'}} */}
          <Card style={{height:'auto'}}>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <Row>
                       <Col>Price:</Col>
                       <Col>
                         <strong>${product.price}</strong>
                       </Col>
                     </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Row>
                       <Col>Status:</Col>
                       <Col>
                         <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                       </Col>
                     </Row>
                  </ListGroup.Item>
                   {product.countInStock > 0 && (
                    <ListGroup.Item>
                 <Row>
                     <Col>Qty:</Col>
                     <Col>
                    <Form.Control as='select' value={qty}
                      onChange={(e)=> setQty(Number(e.target.value))}>
                     {[...Array(product.countInStock).keys()].map(x=> (
                     <option key={x+1} value={x + 1}>
                         {x + 1}
                     </option>
                        ))}
                   </Form.Control>
                   </Col>
                </Row>
              </ListGroup.Item>
                   )}
                 
                  <ListGroup.Item>
                      <Button onClick={addToCartHandler} disabled={product.countInStock === 0} type='button' className='btn-block mt-3'>
                         Add To Cart
                      </Button>
                  </ListGroup.Item>
              </ListGroup>
          </Card>
       </Col> 
       </Row>
      

      
       <Row className='review m-3'>
          <Col md={6} >
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                  {product.reviews.map(item => (
                     <ListGroup.Item key={item._id}>
                         <strong>{item.name} </strong>
                         <Rating value={item.rating} />
                         <p>{item.createdAt.substring(0,10)} </p>
                         <p>{item.comment} </p>
                     </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                     {userInfo ? (
                       <Form onSubmit={handleCreateReview}>
                          <Form.Group controlId='rating' className='my-2'>
                             <Form.Label>Rating</Form.Label>
                             <Form.Control as='select' value={rating}
                              onChange={(e)=> setRating(Number(e.target.value))} >
                                <option value="">select...</option>
                                <option value={1}>1 - poor</option>
                                <option value={2}>2 - fair</option>
                                <option value={3}>3 - good</option>
                                <option value={4}>4 - very good</option>
                                <option value={5}>5 - excellent</option>
                             </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment' className='my-2'>
                             <Form.Label>Comment</Form.Label>
                             <Form.Control as='textarea' value={comment} rows="4" placeholder='Write a customer review on starshiner'
                              onChange={(e)=> setComment(e.target.value)} >
                               
                             </Form.Control>
                          </Form.Group>
                          <Button disabled={loadingCR} type='submit' variant='primary'>
                              {loadingCR ? 'loading...' : 'submit'}
                          </Button>
                       </Form>
                     ) : (
                            <Message>Please <Link to='/login'>sign in</Link> to write a review </Message>
                     )}
                  </ListGroup.Item>
              </ListGroup>
          </Col>
       </Row>
       
    </div>
  )
}

export default ProductDetailsPage