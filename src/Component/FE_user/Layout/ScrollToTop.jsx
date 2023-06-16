import React, {useState} from 'react';
import {IoIosArrowDropupCircle} from 'react-icons/io'
import './ScrollToTop.css'
import AOS from "aos";
import "aos/dist/aos.css";
const ScrollToTop = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <div className='btn-srcoll-on-top'  >
     <IoIosArrowDropupCircle onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} />
    </div>
  );
}
  
export default ScrollToTop;