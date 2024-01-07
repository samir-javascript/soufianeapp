
import React, { useState } from 'react';
import { FaUser, FaRegHeart, FaFirstOrder, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { GiShoppingBag } from 'react-icons/gi';
import { NavDropdown } from 'react-bootstrap';
import { IoChevronDown, IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApi';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';

import './styles.css';

import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search from '../searchComponent/Search';
import MobileNav from './MobileNav';

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const {keyword: keywordUrl} = useParams()
   
    const [keyword,setKeyword] = useState(keywordUrl || '')
    const handleSearch = ()=> {
         if(keyword.trim())  {
            navigate(`/search/${keyword}`)
            setKeyword('')
         }else {
             
            navigate('/')
         }
    }
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  if (pathname === '/shipping' || pathname === '/payment' || pathname === '/login' || pathname === '/register') return null;
 
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <header className='header'>
      <div className='header-wrapper'> 
        { /** logo site */}
        <Link to='/'>
          <img className='logo-image' alt='starshines ' src='https://stcnt.starshiners.ro/img/logo-StarShinerS.svg' />
        </Link>
          { /*  search bar*/ }
        {isSearchVisible ? (
          <div className='input-absolute'>
            <div className='input-absolute-container-header'>
              <div onClick={() => setIsSearchVisible(false)}>
                <FaArrowLeft style={{ cursor: 'pointer' }} size={20} />
              </div>
              <div className='search-absolute-input'>
                <input   onKeyPress={(e)=> {
                      if(e.key === 'Enter') {
                          handleSearch()
                      }
                }}    value={keyword}  onChange={(e)=> setKeyword(e.target.value)} type='text' placeholder='search on starshiners' />
                 {keyword ? <IoCloseOutline onClick={()=> setKeyword('')} size={22}  /> : <FaSearch size={22}  /> } 
              </div>
            </div>
          </div>
        ) : (
          <Search />
        )}
         { /** user dropdown links */}
        <div className='header-options-container'>
          {!userInfo ? (
            <Link style={{ textDecoration: 'none', color: '#000' }} to='/login'>
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
                <div onClick={(e) => navigate('/profile')} className='dropdown-flex'>
                  <FaFirstOrder className='dropdown-icon' /> <span>My orders</span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <div onClick={(e) => navigate('/browse-wishlist-products')} className='dropdown-flex'>
                  <FaRegHeart className='dropdown-icon' /> <span>My favourites</span>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                <div className='dropdown-flex'>
                  <img className='dropdown-icon' width={22} src='https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png' alt='' /> <span>Log out</span>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          )}
           { /** admin panel */}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin'>
              <LinkContainer to='/admin/ordersList'>
                <NavDropdown.Item>Orders List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/usersList'>
                <NavDropdown.Item>Users List</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/productsList'>
                <NavDropdown.Item>Products List</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
             
          <div className='header-option'>
            <FaRegHeart />
            <div onClick={(e) => navigate('/browse-wishlist-products')} className='chivron-text'>
              <span>Favourites</span>
              <IoChevronDown />
            </div>
          </div>
           {/** shopping bag */}
          <div className='header-option'>
            <Link to='/cart' className='cart-container-item'>
              <GiShoppingBag size={25} />
              {cartItems.length !== 0 && <span>{Number(cartItems.reduce((a, c) => a + c.qty, 0))}</span>}
            </Link>
          </div>

        </div>
        <div className='toogle-search-container'>
          <div onClick={() => setIsSearchVisible(true)} className='mobile-search'>
            <FaSearch style={{ cursor: 'pointer' }} color='gray' size={25} />
          </div>
          <MobileNav  />
        </div>
      </div>
    </header>
  );
};

export default Header;

 