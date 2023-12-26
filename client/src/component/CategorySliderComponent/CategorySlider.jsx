import React, { useContext } from "react";
import { Link, useLocation,  } from 'react-router-dom';

import { useCategoryNames } from '../../constants';
import {  ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css';
import './styles.css';
import { FaChevronLeft , FaChevronRight} from "react-icons/fa";
function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
     
    return (
      <button 
        className="btn-arrow"
        disabled={isFirstItemVisible}
        style={{ opacity: isFirstItemVisible ? "0" : "1" }}
        onClick={() => scrollPrev()}
      >
        <FaChevronLeft width={16} height={16} />
      </button>
    );
  }
function RightArrow() {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  
    return (
      <button
        className="btn-arrow"
        style={{ opacity: isLastItemVisible ? "0" : "1" }}
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
      >
        <FaChevronRight height={16} width={16} />
      </button>
    );
  }
const CategorySlider = () => {
  const { pathname } = useLocation();

  const categories = useCategoryNames()
  if (pathname !== '/' && !pathname.includes('/page/')) return null;
 
  return (
    <div className='category-slider-wrapper'>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {categories.map(item => (
          <Link 
            key={item.name}
            to={`/browse-products/${item.name}`}
            className={`cate-slider`}
          >
            <div className='cate-paragraph'>
              <p>{item.name}</p>
            </div>
            <div className='cate-slider-img'>
              <img src={item.image} alt={item.name} />
            </div>
          </Link>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default CategorySlider;

