import React, { useEffect, useRef, useState } from 'react'
import logo from '../AD_img/logo-admin.png';
import './AD_nav.scss'
import AD_nav_item from './AD_nav_item';
import {AiFillHome} from "react-icons/ai";
import  {BsFillPersonFill,BsFillTrophyFill,BsTrashFill} from   'react-icons/bs';

export default function AD_nav() {
  const [nav,setNav]=useState([]);
  useEffect(()=>{
    setNav(
      
       [
        {
          id:'1',
          content:'DashBoard',
          item_icon: AiFillHome,
          child: 
          [
            {child_id:'1',child_content:'Home',child_link:'/'},
            {child_id:'2',child_content:'Admin',child_link:'/admin'}
          ],
          link: ''
          
        } ,
        {
          id:'2',
          content:'Person',
          item_icon:BsFillPersonFill,
          child:[
            {child_id:'1',child_content:'Show',child_link:'/admin/show'},
            {child_id:'2',child_content:'Life',child_link:'/admin/life'},
           

          ],
          link:''
        },
        {
          id:'3',
          content:'Prizes',
          item_icon:BsFillTrophyFill,
          child:[
            {child_id:'1',child_content:'Prize',child_link:'/admin/prize'},
            {child_id:'2',child_content:'Set-Prize',child_link:'/admin/setprize'},


          ],
          link:''
        },
        {
          id:'3',
          content:'Disable',
          item_icon:BsTrashFill,
          child:[
            {child_id:'1',child_content:'Disable show',child_link:'/admin/disable/show'},
            {child_id:'2',child_content:'Disable life',child_link:'/admin/disable/life'},
            {child_id:'3',child_content:'Disable prizes',child_link:'/admin/disable/prize'},
            {child_id:'4',child_content:'Disable setprizes',child_link:'/admin/disable/setprize'}

          ],
          link:''
        }
       ]
      
    )
  },[])


  return (
    <div className='AD-nav-content'>
    <div className='AD-nav-logo'>
      <img src={logo} alt=""  className='AD-nav-img'/>

    </div>
    <section className='AD-nav-items' >
        {
          nav.map((nav,index)=>(
         
            <AD_nav_item  key={index}  content={nav.content} Item_icon={nav.item_icon} child={nav.child}/>
          ))
        }  

    </section>
    </div>
  )
}
