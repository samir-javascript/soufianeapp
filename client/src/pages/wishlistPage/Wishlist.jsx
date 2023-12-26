import React from 'react'
import './styles.css'
import { Container } from 'react-bootstrap'
import ProductCard from '../../component/ProductCardComponent/ProductCard'
import { useGetSingleWishListQuery } from '../../slices/whishlistApi'
import Message from '../../component/MessageComponent/Message'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  
    const {data: wishlistPro, refetch:refetchWishlistPro} = useGetSingleWishListQuery()
   
  return (
    <Container className='my-5'>
        <h2 style={{marginBottom:'15px'}}>My wishlist Products</h2>
        {wishlistPro?.products.length === 0 ? (
            <>
            <Message> 
                There are no items in your wishlist
            </Message>
            <Link to='/'>
            <button className='login-btn'>
                 Browse Products
            </button>
            </Link>
            </> 
          ): (
            <div className='card-grid-container'>
            
            {wishlistPro?.products.map(product =>(
              
                   <ProductCard widthMesure cancelWishlist product={product} key={product._id} />
            ))}
              </div>
           )}
        
    </Container>
  )
}

export default Wishlist