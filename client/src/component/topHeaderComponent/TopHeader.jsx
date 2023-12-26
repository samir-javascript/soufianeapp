import React from 'react'
import { FaShippingFast } from 'react-icons/fa'
import './styles.css'
const TopHeader = () => {
  return (
    <div className='top-header'>
        <div className='top-header-info'>
           <FaShippingFast /> <span>Free Shipping for order over $100</span>
        </div>
    </div>
  )
}

export default TopHeader