import React, { useEffect, useRef, useState } from 'react'
import logo from '../AD_img/logo-admin.png';
import './AD_nav.scss'
import { Button } from 'react-bootstrap';
import AD_nav_item from './AD_nav_item';
import {AiFillHome} from "react-icons/ai";
import Cookies from 'js-cookie';
import { useNavigate,Link } from 'react-router-dom';
import  {BsFillPersonFill,BsFillTrophyFill,BsTrashFill,BsChatLeftTextFill} from   'react-icons/bs';
import Swal from 'sweetalert2'

export default function AD_nav({page}) {
  const navigate = useNavigate();
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
            {child_id:'1',child_content:'Admin',child_link:'/admin'},
            {child_id:'2',child_content:'Home',child_link:'/'},
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
          id:'4',
          content:'Blog',
          item_icon:BsChatLeftTextFill,
          child:[
            {child_id:'1',child_content:'Blog',child_link:'/admin/blog'},
            // {child_id:'2',child_content:'Set-Prize',child_link:'/admin/'},


          ],
          link:''
        },
        {
          id:'5',
          content:'Disable',
          item_icon:BsTrashFill,
          child:[
            {child_id:'1',child_content:'Disable show',child_link:'/admin/disable/show'},
            {child_id:'2',child_content:'Disable life',child_link:'/admin/disable/life'},
            {child_id:'3',child_content:'Disable prizes',child_link:'/admin/disable/prize'},
            {child_id:'4',child_content:'Disable setprizes',child_link:'/admin/disable/setprize'},
            {child_id:'4',child_content:'Disable blog',child_link:'/admin/disable/blog'}
            

          ],
          link:''
        },
      
       ]
      
    )
  },[])

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('login');
        navigate('/login');
      }
    }) }
  
  return (
    

    <div className='AD-nav-content '>
 
    <section className='AD-nav-container'>

    <div className='AD-nav-logo'>
      <Link to='/admin'>

      <img src={logo} alt=""  className='AD-nav-img'/>
      </Link>

    </div>
    <section className='AD-nav-items ' >
        { 
          nav.map((nav,index)=>(
         
            <AD_nav_item page={page}  key={index}  content={nav.content} Item_icon={nav.item_icon} child={nav.child}/>
          ))
        }  
        <div className='d-flex justify-content-center'>

        <Button className='mt-5' onClick={logout} >Log out </Button>

      
        </div>
     

    </section>
    </section>
    </div>
  
  )
}
