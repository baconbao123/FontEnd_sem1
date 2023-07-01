import React, { useEffect, useRef, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav'
import '../AD_component/AD_home.scss'
import { Button  as PrimeButton} from 'primereact/button';
import AD_card_item from './AD_card_item'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BsFillPersonFill,BsFillTrophyFill,BsChatSquareTextFill,BsFillPersonPlusFill,BsChevronDoubleRight} from "react-icons/bs";

import { Toast } from 'primereact/toast';
import AD_show_modal from '../AD_component/AD_show_modal';
import AD_life_modal from '../AD_component/AD_life_modal';
import AD_prize_modal from '../AD_component/AD_prizes_modal';

import AD_blog_modal from '../AD_component/AD_blog_modal';
import AD_setprize_modal from '../AD_component/AD_setprize_modal';
import AD_prizes_modal from '../AD_component/AD_prizes_modal'
import Swal from 'sweetalert2'
export default function AD_home() {
  const navigate = useNavigate();
  const toast=useRef()
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
  useEffect(() => {
    if (!Cookies.get('login')) {
      navigate('/login')
    }
  })
  const [person, setPerson] = useState();
  const [prize, setPrize] = useState();
  const [blog, setBlog] = useState();
  const [showNav,setShowNav]=useState(false);
  const showNavRef=useRef()
  const ref=useRef()
  const showPersonModal=useRef();
  const showBlogModal=useRef();
  const showPrizeModal=useRef();
  const showsetPrizeModal=useRef();
  const showLifeModal=useRef();
  useEffect(()=>{

   const handleClickOutSide=(e)=>{
 
      if(showNavRef.current&&!showNavRef.current.contains(e.target)){
     
        setShowNav(false)
      } 
    }
    document.addEventListener('click',handleClickOutSide);
    return ()=> {
      document.removeEventListener('click',handleClickOutSide);
    
    }
  },[showNavRef]);

  const handleShowNav=()=> {
    setShowNav(true);
    setTimeout(() => {
      if (showNavRef.current) {
        showNavRef.current.focus();
      }
    }, 0);
  }
  

  useEffect(()=>{
    (async()=> await LoadPerson())();
    (async()=> await LoadPrize())();
    (async()=> await LoadBlog())();
  },[showNav])

 async function  LoadPerson() {
    const result=await axios.get('http://127.0.0.1:8000/api/person');
    setPerson(result.data);
  }

  async function LoadPrize() {
    const result= await axios.get('http://127.0.0.1:8000/api/prize');
    setPrize(result.data)
  }
  async function  LoadBlog() {
    const result=await axios.get('http://127.0.0.1:8000/api/blog');
        setBlog(result.data);
  }
 
  const handleOnclickPerson=()=> {
    navigate('/admin/show')
  }
  const handleOnclickPrize=()=> {
    navigate('/admin/prize')
  }
  const handleOnclickBLog=()=> {
    navigate('/admin/blog')
  }
  
  

  return (
    <Container fluid className='wrapper'>
      <Toast ref={toast}/>
      <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>

      <Row> 
        <Col lg={2}   className='padding-0 d-xl-flex d-lg-none d-xs-none d-sm-none xs-none'>
          <AD_nav />
        </Col>
        <Col   className='bg-content d-xl-10 d-md-12 d-xs-12 '>
          <Row>
            <Container >
              <Card className='bg-white card-ad-home ' style={{ width: '100%' }}>
                <section className='header-ad-containt d-flex justify-content-between align-items-center' >
                  <section>
                    <div  className='show-menu  d-lg-block d-xl-none' onClick={()=>{setShowNav(true);console.log(showNav);}} >

                      <BsChevronDoubleRight />
                   
                    </div>
                  </section>
                  <span className='d-inline-block'>
                    <h1  > ADMIN</h1>
                  </span>
                  <section className='d-inline-block'>
                    <Button onClick={logout}>LOG OUT</Button>
                  </section>
                </section>
              </Card>
            </Container >
          </Row>
          <Row  >
            <Card className=' bg-white card-ad-body mb-5'>
              <Row>
                <Col lg={4} md={4} className="mb-4 mt-5"  >
                  <section onClick={handleOnclickPerson} className='mb-4 d-flex justify-content-center'>

                  <AD_card_item  title={'PERSON'} Icon={BsFillPersonFill} content={person?person.length+' persons': '0 perons'} cardColor={'card-color1'} />
                  </section>
                  
                 <section className='d-flex justify-content-evenly'>
                 <PrimeButton ref={showPersonModal} severity="info" label='ADD PERSON' > <BsFillPersonPlusFill className='ms-1'/> </PrimeButton>
                 </section>

                 <section className='d-flex justify-content-evenly mt-3'>
                  <PrimeButton ref={showLifeModal} severity="info" label='ADD LIFE' > <BsFillPersonPlusFill className='ms-1'/> </PrimeButton>
                 </section>


                  <AD_show_modal toast={toast} show={showPersonModal} title={'ADD NEW '}  Load={LoadPerson}/>
                  <AD_life_modal toast={toast} show={showLifeModal}  title={"ADD NEW LIFE"} Load={LoadPerson} />
                </Col>
                <Col lg={4} md={4} className="mb-4 mt-5" >
                  <section onClick={handleOnclickPrize} className='mb-4 d-flex justify-content-center'>

                  <AD_card_item  title={'PRIZE'} Icon={BsFillTrophyFill} content={prize?prize.length +' prizes':' 0 prizes'} cardColor={'card-color3'} />
                  </section>
                  <section  className='d-flex justify-content-evenly'>
                  <PrimeButton ref={showPrizeModal} severity="info" label='ADD PRIZE'  > <BsFillTrophyFill className='ms-1 '/> </PrimeButton>
                  
                  </section>
                  <section  className='d-flex justify-content-evenly mt-3'>
                  <PrimeButton ref={showsetPrizeModal} severity="info" label='SET PRIZE'> <BsFillTrophyFill className='ms-1'/> </PrimeButton>
                  </section>

                <AD_setprize_modal toast={toast} show={showsetPrizeModal} title={"SET NEW PRIZE"} Load={LoadPrize}/>
                  <AD_prizes_modal toast={toast} show={showPrizeModal} Load={LoadPrize} title={"ADD NEW PRIZE "}   />
                </Col>

                <Col lg={4} md={4} className="mb-4 mt-5 " >
                <section onClick={handleOnclickBLog} className='mb-4 d-flex justify-content-center'>

                  <AD_card_item  title={'BLOG'} Icon={BsChatSquareTextFill} content={blog?blog.length +' posts':'0 blogs'} cardColor={'card-color4'} />
                </section>
                <section className='d-flex justify-content-evenly'>

                <PrimeButton ref={showBlogModal} severity="info" label='ADD BLOG'  > <BsChatSquareTextFill className='ms-1 '/> </PrimeButton>
                </section>
                  <AD_blog_modal toast={toast} show={showBlogModal} title={"ADD NEW BLOG"} Load={LoadBlog}/>
                </Col>

              </Row>
            </Card>
          </Row>

        </Col>
      </Row>
    </Container>
  )
  }
