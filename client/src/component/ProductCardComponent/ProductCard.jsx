import React, { useEffect, useState } from 'react';
import './styles.css';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FaShoppingBag } from 'react-icons/fa';
import { addToCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetSingleWishListQuery, useRemoveFromWishlistMutation } from '../../slices/whishlistApi';

const ProductCard = ({ product, cancelWishlist , widthMesure }) => {
  const tooltipStyle = {
    backgroundColor: '#2196F3', // Change the background color
    color: '#FFFFFF',           // Change the text color
    fontSize: '14px',           // Change the font size
    // Add more styles as needed
  };
  
  const {cartItems} = useSelector(state => state.cart)
  const {userInfo} = useSelector(state => state.auth)
  const existingQty = cartItems.find((item) => item._id === product._id)?.quantity || 0;
  const {data: wishlistPro, refetch:refetchWishlistPro} = useGetSingleWishListQuery()
  const pro =  wishlistPro?.products.find(item => item._id === product._id)
  const [removeFromWishlist, {isLoading}] = useRemoveFromWishlistMutation()
  const [qty, setQty] = useState(existingQty + 1);
  const dispatch = useDispatch();
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n)+'...' : str;
  };

  const addToCartHandler = () => {
    try {
      dispatch(addToCart({ ...product, qty: qty }));
      setQty((prevQty) => prevQty + 1);
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  const removeFromWishlistHandler = async() => {
     try {
        await removeFromWishlist({
           userId: userInfo._id,
           productId: product._id
        })
        refetchWishlistPro()
     } catch (error) {
        console.log(error)
        toast.error(error?.data?.message)
     }
  }
  
   
  
   
  

  return (
    <div className={widthMesure ? "card" : "card"}>
      <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
        <div className='image-container'>
          <img style={{ objectFit: 'contain' }} width={200} height={200} src={product.image} alt={product.description} />
         
        </div>
      </Link>
      <div className='info-wrapper'>

      
      <div className='card-info'>
        <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
          <p className='desc'>{truncate(product.name, 30)}</p>
        </Link>
         {cancelWishlist ? (
           <div>
                <p className='brand-title'>sold by <span>{product.brand}</span></p>
                <span
    
      onClick={removeFromWishlistHandler}
      aria-disabled={isLoading}
      style={{ pointerEvents: isLoading ? 'none' : 'auto' , cursor:'pointer', width:'auto'}}
   >
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
   </span>

           </div>
         ): (
          <p className='brand-title'>sold by <span>{product.brand}</span></p>
         )}
        
      </div>
      <div className='price-container'>
        <h4 className='price-tag'>$ {product.price}</h4>
        <div className='percent'>
          -20%
        </div>
        <div onClick={addToCartHandler} className='cart-shopping'>
          <FaShoppingBag />
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProductCard;
