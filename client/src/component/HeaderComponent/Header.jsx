import React from 'react'
import {  FaUser, FaRegHeart, FaFirstOrder } from "react-icons/fa";

import { LinkContainer } from 'react-router-bootstrap'
import { GiShoppingBag } from "react-icons/gi";
import { NavDropdown} from 'react-bootstrap'
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApi';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { useGetUserCartQuery } from '../../slices/cartApi';
import './styles.css'

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search from '../searchComponent/Search';
import Loading from '../LoadingComponent/Loading';
import MobileNav from './MobileNav';

const Header = () => {
    const { pathname } = useLocation()
    //const {data:cartData, isLoading} = useGetUserCartQuery();
   
    
   
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ logoutApiCall ] = useLogoutMutation()
 
   const { userInfo } = useSelector(state => state.auth);
   
 
  const { cartItems } = useSelector(state => state.cart)
 
  if(pathname === '/shipping' || pathname === '/payment' || pathname === '/login' || pathname === '/register') return null
   const logoutHandler =async ()=> {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error?.error)
    }
   }
  return (
    <header className='header'>
      <div className='header-wrapper'>
        <Link to='/'>
             <img className='logo-image' alt='starshines ' src="https://stcnt.starshiners.ro/img/logo-StarShinerS.svg" />
        </Link>
        <Search  />
        <div className="header-options-container">
        {!userInfo ? (
                <Link style={{textDecoration: 'none', color: '#000'}} to='/login'>
           
                <div className='header-option'>
                    <FaUser />
                    <div className='chivron-text'>
                        <span>Login</span>
                         <IoChevronDown />
                    </div>
                </div>
                </Link>
               ) : (
                    <NavDropdown title={'My account'} id='username'>
                          <LinkContainer to='/profile'>
                             <NavDropdown.Item>
                              <div className='dropdown-flex'>
                                 <FaUser className='dropdown-icon' /> <span>Profile</span>
                              </div>
                                 
                             </NavDropdown.Item>
                          </LinkContainer>
                          
                           <NavDropdown.Item>
                             
                           <div onClick={(e)=> navigate('/profile')} className='dropdown-flex'>
                                 <FaFirstOrder className='dropdown-icon' /> <span>My orders</span>
                              </div>
                            
                           </NavDropdown.Item>
                           <NavDropdown.Item>
                            <div onClick={(e)=> navigate('/browse-wishlist-products')} className='dropdown-flex'>
                                 <FaRegHeart className='dropdown-icon' /> <span>My favourites</span>
                              </div>
                           </NavDropdown.Item>
                           <NavDropdown.Item onClick={logoutHandler}>
                           <div className='dropdown-flex'>
                           <img className='dropdown-icon' width={22} src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png" alt="" /> <span>Log out</span>
                              </div>
                                  
                           </NavDropdown.Item>
                    </NavDropdown>
               )}
                  {userInfo && userInfo.isAdmin && (
                      <NavDropdown title='Admin'>
                         <LinkContainer to='/admin/ordersList'>
                             <NavDropdown.Item>
                                Orders List
                             </NavDropdown.Item>
                         </LinkContainer>
                         <LinkContainer to='/admin/usersList'>
                             <NavDropdown.Item>
                                Users List
                             </NavDropdown.Item>
                         </LinkContainer>
                         <LinkContainer to='/admin/productsList'>
                             <NavDropdown.Item>
                                Products List
                             </NavDropdown.Item>
                         </LinkContainer>
                      </NavDropdown>
                  )}
         
             {/** second  */}
             <div className='header-option'>
                <FaRegHeart />
                <div onClick={(e)=> navigate('/browse-wishlist-products')} className='chivron-text'>
                    <span>Favourites</span>
                    <IoChevronDown />
                </div>
            </div>
               {/** third  */}
               <div className='header-option'>
                <Link to='/cart' className='cart-container-item'>
                   <GiShoppingBag  size={25}/>
                   { cartItems.length !== 0 &&(
                       <span>
                           {Number(cartItems.reduce((a, c) => a + c.qty, 0))}
                        </span>
                   )}
                   
                   
                </Link>
                

                
            </div>
        </div>
        <MobileNav />
        </div>
       
    </header>
  )
}

export default Header

//  <img alt='starshines ' src="https://stcnt.starshiners.ro/img/logo-StarShinerS.svg" />


 