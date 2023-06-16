import React from 'react'
import {Container,Col,Row} from 'react-bootstrap'
import {Route,Routes} from 'react-router-dom'

import AD_nav from '../Layout/AD_nav'
import '../AD_component/AD_home.scss'
import AD_show from './AD_show'
export default function AD_home() {
  return (
    <Container fluid className='wrapper'>
    <Row>
        <Col lg={2} md={2} className='padding-0'>
            <AD_nav/>
            </Col>
        <Col lg={10} md={10} className='bg-content'>

        
         
        </Col>
    </Row>
    </Container>
  )
}
