import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { useCategoryNames } from '../../constants'
import './styles.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='footer-lists'>
            <ul>
            <li className="list-head">ONLINE CLOTHING</li>
            <li><Link href="#">Clothes</Link></li>
            <li><Link href="#">Brands</Link></li>
            <li><Link href="#">Latest Collection</Link></li>
            <li><Link href="#">Promotions</Link></li>
          </ul>
          <ul>
            <li><Link href="#">Back In Stock</Link></li>
            <li><Link href="#">NewsLetter</Link></li>
            <li><Link href="#">Originals</Link></li>
            <li><Link href="#">Networks</Link></li>
            <li><Link href="#">Kids</Link></li>
            <li><Link href="#">Women</Link></li>
          </ul>
          <ul>
          <li className="list-head">CATEGORIES</li>
          {useCategoryNames().map(category => (
            <li key={category.name}>
               <Link to={`/browse-products/${category.name}`}>
                  {category.name}
               </Link>
            </li>
          ))}

            
          </ul>
          <ul>
            <li className="list-head">HELP</li>
            <li><Link href="#">Account & Billing</Link></li>
            <li><Link href="#">Plans & Pricing</Link></li>
            <li><Link href="#">Supported Devices</Link></li>
            <li><Link href="#">Accesibility</Link></li>
          </ul>
          <ul>
            <li className="list-head">ABOUT US</li>
            <li><Link href="#">Press</Link></li>
            <li><Link href="#">About StarShinerS</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
            </div>
           
       
        <div className="divider"></div>
        <div className="social-icons-container">
            <div className='social-icons'>
        <Link target='_blank' to="https://www.facebook.com">
            <FaFacebook />
         </Link>
          <Link target='_blank' to="https://www.twitter.com">
               <FaTwitter />
          </Link>
          <Link target='_blank' to="https://youtube.com">
              <FaYoutube />
          </Link>
          <Link target='_blank' to="https://instagram.com"><FaInstagram /></Link>
          </div>
          <p>© Copyright 2008 - 2023 StarShinerS SRL Romania. All rights reserved.</p>
        </div>
        </div>
    </footer>
  )
}

export default Footer