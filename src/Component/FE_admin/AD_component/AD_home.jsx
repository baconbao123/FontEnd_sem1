import React, { useEffect, useRef, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import '../AD_component/AD_home.scss'
import { Button  as PrimeButton} from 'primereact/button';
import AD_card_item from './AD_card_item'
import axios from 'axios';
import Cookies from 'js-cookie';
import { BsFillPersonFill,BsFillTrophyFill,BsChatSquareTextFill,BsFillPersonPlusFill} from "react-icons/bs";
import AD_show_modal from '../AD_component/AD_show_modal';
import AD_life_modal from '../AD_component/AD_life_modal';
import AD_prize_modal from '../AD_component/AD_prizes_modal';

import AD_blog_modal from '../AD_component/AD_blog_modal';
import AD_setprize_modal from '../AD_component/AD_setprize_modal';
import AD_prizes_modal from '../AD_component/AD_prizes_modal'

export default function AD_home() {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove('login');
    navigate('/login')
  }
  useEffect(() => {
    if (!Cookies.get('login')) {
      navigate('/login')
    }
  })
  const [person, setPerson] = useState();
  const [prize, setPrize] = useState();
  const [blog, setBlog] = useState();
  const showPersonModal=useRef();
  const showBlogModal=useRef();
  const showPrizeModal=useRef();
  const showsetPrizeModal=useRef();
  const showLifeModal=useRef();


  useEffect(()=>{
    (async()=> await LoadPerson())();
    (async()=> await LoadPrize())();
    (async()=> await LoadBlog())();
  },[])

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
      <Row>
        <Col lg={2} md={2} className='padding-0'>
          <AD_nav />
        </Col>
        <Col lg={10} md={10} className='bg-content'>
          <Row>
            <Container>
              <Card className='bg-white card-ad-home ' style={{ width: '100%' }}>
                <section className='header-ad-containt d-flex justify-content-between align-items-center' >
                  <section>
               
                  </section>
                  <span className='d-inline-block'>
                    <h1 > ADMIN</h1>
                  </span>
                  <section className='d-inline-block'>
                    <Button onClick={logout}>LOG OUT</Button>
                  </section>
                </section>
              </Card>
            </Container>
          </Row>
          <Row>
            <Card className=' bg-white card-ad-home card-body-home'>
              <Row>
                <Col lg={4} md={4}  className='text-center'>
                  <section onClick={handleOnclickPerson} className='mb-4'>

                  <AD_card_item  title={'PERSON'} Icon={BsFillPersonFill} content={person?person.length+' persons': '0 perons'} cardColor={'card-color1'} />
                  </section>
                  
                  <PrimeButton ref={showPersonModal} severity="info" label='ADD PERSON' className='ms-5'> <BsFillPersonPlusFill className='ms-3'/> </PrimeButton>
                  <PrimeButton ref={showLifeModal} severity="info" label='ADD LIFE' className='ms-5'> <BsFillPersonPlusFill className='ms-3'/> </PrimeButton>

                  <AD_show_modal show={showPersonModal} title={'ADD NEW '}  Load={LoadPerson}/>
                  <AD_life_modal show={showLifeModal}  title={"ADD NEW LIFE"} Load={LoadPerson} />
                </Col>
                <Col lg={4} md={4} className='text-center'>
                  <section onClick={handleOnclickPrize} className='mb-4'>

                  <AD_card_item  title={'PRIZE'} Icon={BsFillTrophyFill} content={prize?prize.length +' prizes':' 0 prizes'} cardColor={'card-color3'} />
                  </section>
                  <PrimeButton ref={showPrizeModal} severity="info" label='ADD PRIZE' className='ms-5    ' > <BsFillTrophyFill className='ms-3 '/> </PrimeButton>
                  <PrimeButton ref={showsetPrizeModal} severity="info" label='SET PRIZE' className='ms-5'> <BsFillTrophyFill className='ms-3'/> </PrimeButton>
                  <AD_setprize_modal show={showsetPrizeModal} title={"SET NEW PRIZE"} Load={LoadPrize}/>
                  <AD_prizes_modal show={showPrizeModal} Load={LoadPrize} title={"ADD NEW PRIZE "}  Load={LoadPrize} />
                </Col>

                <Col lg={4} md={4} className='text-center'>
                <section onClick={handleOnclickBLog} className='mb-4'>

                  <AD_card_item  title={'BLOG'} Icon={BsChatSquareTextFill} content={blog?blog.length +' posts':'0 blogs'} cardColor={'card-color4'} />
                </section>
                <PrimeButton ref={showBlogModal} severity="info" label='ADD BLOG' className='ms-5    ' > <BsChatSquareTextFill className='ms-3 '/> </PrimeButton>
                  <AD_blog_modal  show={showBlogModal} title={"ADD NEW BLOG"} Load={LoadBlog}/>
                </Col>

              </Row>
            </Card>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}
