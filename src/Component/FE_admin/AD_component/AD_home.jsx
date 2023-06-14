import React from 'react'
import AD_nav from '../Layout/AD_nav'
import '../AD_component/AD_home.scss'
import {Container,Col,Row} from 'react-bootstrap'
export default function AD_home() {
  return (
    <Container fluid className='wrapper'>
    <Row>
        <Col lg={2} md={2} className='bg-gray'>
            <AD_nav/>
            </Col>
        <Col lg={10} md={10} className='bg-blue'>
            <h1>Content</h1>
        </Col>
    </Row>
    </Container>
  )
}
