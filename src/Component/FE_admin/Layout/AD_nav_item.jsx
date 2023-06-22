import React,{useEffect, useState} from 'react'
import {BsChevronCompactDown,BsChevronCompactUp} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SpanDown=styled.span`
  ${props=>props.show===true&&`{
    display:none!important;
  }`}
`
const SpanUp=styled.span`
${props=>props.show===false&&`{
  display:none!important;
}`}
`
export default function AD_nav_item({content,Item_icon,child, navContaint}) {
    const [showChild,setShowChild]=useState(false);

  return (
     
      <div className=' cursor-pointer AD-nav-item' onClick={()=>setShowChild(!showChild)} >
        <Item_icon className='AD-item-icon'/> 
        <span className='AD-nav-title'>
          {content}
        </span>
        <SpanDown show={showChild}>
        <BsChevronCompactDown className='AD-item-down_up ' />
        </SpanDown>
        <SpanUp show={showChild}>

        <BsChevronCompactUp className='AD-item-down_up'/>
        </SpanUp>
        {child&&showChild&&(
        <section className='AD-nav-children'>
      {child&&showChild&&(
        child.map((child,index)=>(
            <section key={index} className='AD-nav-child'>
                <Link className='link-default' to={child.child_link}>{child.child_content}</Link>
            </section>
        ))
        )}
        </section>)}
      </div>
 
    
  )
}
