import { useEffect, useState } from "react";

export const BASE_URL = '';  // if you're using PROXY in your package.json
export const PRODUCTS_URL = '/api/products';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const USERS_URL = '/api/users';
export const UPLOADS_URL = '/api/uploads';
export const CART_URL = "/api/cart";
export const WISHLIST_URL = '/api/add-to-wishlist';

export const useCategoryNames = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const categoryNames = [
    {
      id: "545458783212121",
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_5__1.webp',
      name: 'maison-cuisine-deco',
      imageBanner: isMobile
        ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_30_.webp'
        : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_maison/output_image_29_.webp',
    },
    {
      id: "545458783212121656565989845454545e4fdfdfdf",
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_1.webp',
      name: 'Electronics',
      imageBanner: isMobile
        ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/BANNIERES-N1_mobile2-gaming.webp'
        : 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/SLIDE-N1-2-gaming.webp',
    },
    // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/BANNIERES-N1_mobile2-gaming.webp">
    // <source media="(min-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_informatique/SLIDE-N1-2-gaming.webp">
    {
      id: "45554489663333660000zzdsdsd9890",
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_6__1.webp',
      name :'TV - Son - Photo',
      imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/Mobile_tv-son_image_22_.webp'  :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/desktiop_tv_son_image_21_.webp"
     
   },
   // <source media="(max-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/Mobile_tv-son_image_22_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/Mobile_tv-son_image_22_.webp">
   //<source media="(min-width:768px)" data-srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/desktiop_tv_son_image_21_.webp" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_tv/desktiop_tv_son_image_21_.webp">
   {
      id: "455544896633336600000",
      showcaseImage: 'https://www.marjanemall.ma/media/wysiwyg/category/n1_sport/Webp/output_image_12_.webp',
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_2__1.webp',
      name :'sport',
      imageBanner:  isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/BANNIERES-N1_mobile8_image_22_.webp" : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_sport/SLIDE-N1-8-sport_image_21_.webp"
   },
   
   {
      id: "0022559694998989dfdfdfd",
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_8__1.webp',
      name :'Bébé - Jouets',
      imageBanner: isMobile ? "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/BANNIERES-N1_mobile6-b_b_jouet_image_23_.webp" :  "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/SLIDE-N1-6-b_b_joeut_image_24_.webp"
   },
   // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_bebe/BANNIERES-N1_mobile6-b_b_jouet_image_23_.webp">
   {
    id: "0022559694454549889",
    image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_9__1.webp',
    name :'Beauté - Santé',
    imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_13_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_beaute/output_image_14_.webp"
 },
 
 {
    id: "0022559694",
    image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_7__1.webp',
    name :'vetements',
    imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_26_.webp' : "https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_25_.webp"
 },
// <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_mode/output_image_26_.webp">
   {
      id: "23698888899999999",
      image: 'https://www.marjanemall.ma/media/wysiwyg/category/HOMEPAGE/homepage_desktop_webp/output_image_4__1.webp',
      name :'telephone',
      imageBanner: isMobile ? 'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_telephone/output_image_18_.webp' :  'https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_telephone/tele-desktop.webp'
   },
   // <source media="(max-width:768px)" srcset="https://www.marjanemall.ma/media/wysiwyg/offre_vedd/N1_telephone/output_image_18_.webp">
  ];

  // Update the imageBanner property for each category based on isMobile
  const updatedCategoryNames = categoryNames.map(category => ({
    ...category,
  }));

  return updatedCategoryNames;
};















