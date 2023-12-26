import React, {useState, useEffect} from 'react'
import { CiMenuFries } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaFirstOrder, FaRegHeart, FaUser, FaWindowClose } from "react-icons/fa";
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../../slices/usersApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';
import { IoChevronDown } from 'react-icons/io5';
import { GiShoppingBag } from 'react-icons/gi';
const MobileNav = () => {
  const { pathname} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth);
  const { cartItems} = useSelector(state=> state.cart)
    const [isOpen, setIsOpen] = useState(false)
   const [ logoutApiCall ] = useLogoutMutation()
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
  useEffect(() => {
     setIsOpen(false)
  }, [pathname])
  
  return (
    <div className='mobile-nav'>
        <div  className='toogler' onClick={()=> setIsOpen(prev => !prev) }>
            {isOpen ? <FaWindowClose size={25} /> : <CiMenuFries size={25}  />} 
        </div>
        {isOpen && (
            <div className='menu-mobile'>
                 <ul>
                     
                     <li>
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
                     </li>
                     <li>
                     <div className='header-option'>
                <FaRegHeart />
                <Link style={{color:"black", textDecoration:'none'}} to='browse-wishlist-products' className='chivron-text'>
                    <span>Favourites</span>
                    <IoChevronDown />
                </Link>
                </div>
                     </li>
                     <li>
                     <div className='header-option'>
                <div onClick={(e)=> navigate('/cart')} className='cart-container-item'>
                   <GiShoppingBag  size={25}/>
                     
                   { cartItems.length !== 0 &&(
                       <span>
                           {Number(cartItems.reduce((a, c) => a + c.qty, 0))}
                        </span> 
                   )}
                   
                   
                </div>
                <div onClick={(e)=> navigate('/cart')} style={{marginLeft: '10px'}}>
                        <button className='login-btn cart-btn'>View cart</button>
                 </div>

                
            </div>
                     </li>
                     <li>
                        {userInfo ? (
                           <NavDropdown title={'My account'} id='username'>
                          <LinkContainer to='/profile'>
                             <NavDropdown.Item>
                              <div className='dropdown-flex'>
                                 <FaUser className='dropdown-icon' /> <span>Profile</span>
                              </div>
                                 
                             </NavDropdown.Item>
                          </LinkContainer>
                          
                           <NavDropdown.Item>
                           <div className='dropdown-flex'>
                                 <FaFirstOrder className='dropdown-icon' /> <span>My orders</span>
                              </div>
                           </NavDropdown.Item>
                           <NavDropdown.Item>
                           <Link to='/browse-wishlist-products' className='dropdown-flex'>
                                 <FaRegHeart className='dropdown-icon' /> <span>My favourites</span>
                              </Link>
                           </NavDropdown.Item>
                           <NavDropdown.Item onClick={logoutHandler}>
                           <div className='dropdown-flex'>
                           <img className='dropdown-icon' width={22} src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png" alt="" /> <span>Log out</span>
                              </div>
                                  
                           </NavDropdown.Item>
                    </NavDropdown>
                        
                     
                         ): (
                          <Link to='/login'>
                            <button className='login-btn'>
                                Log in
                            </button>
                            </Link>
                         )}
                     </li>
                 </ul>
            </div>
        )}
    </div>
  )
}

export default MobileNav