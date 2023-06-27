import React, { useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Route, Routes,useNavigate } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import '../AD_component/AD_home.scss'

import AD_card_item from './AD_card_item'

import Cookies from 'js-cookie';
export default function AD_home() {
  const navigate = useNavigate();
  const logout=()=> {
    Cookies.remove('login');
    navigate('/login')
  }
 useEffect(()=>{
  if(!Cookies.get('login')){
    navigate('/login')
  }
 })

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
              <span className='d-inline-block'>
                  <h1 > ADMIN</h1>
                </span>
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
                <AD_card_item />
                <AD_card_item />
                <AD_card_item />
                <AD_card_item />
            </Card>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}
