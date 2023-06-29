import React,{useState, useEffect} from 'react'
import { Container,Card,Row,Button,Form } from 'react-bootstrap'
import logo from '../AD_img/logo-admin.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link,useNavigate } from 'react-router-dom';


export default function AD_login() {
  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('myButton').click();
    }
  };
  useEffect(()=>{
    if(Cookies.get('login')){
      navigate('/admin')
    }
   })

  async function login(e) {
    e.preventDefault();
    try {
      const response= await axios.post('http://127.0.0.1:8000/api/login',{
        email:email,
        password:password
      })
      Cookies.set('login',response.data,{expires:new Date(new Date().getTime() + 60* 60 *24 * 1000)})
      alert('login sucess');
      return  navigate('/admin');

    }
    catch(err) {
  
      alert('email or password invalid  ')

    }
  }

  return (
    <Container className='wrapper ' fluid>
        <Row className=' d-flex justify-content-center'>
            <img className=' logo-login' src={logo} alt="Img" width='300'/>
        </Row>

        <Row className=' d-flex justify-content-evenly mt-5'>
      <Card bg='white' text={'dark'} style={{ width: '40rem' }}>
     
      <Card.Body className='text-dark'>
        <Card.Title>LOGIN</Card.Title>
        <Form   className='mb-5'>
          <Form.Group className='mt-3'>
            <Form.Label className='mb-3'>EMAIL</Form.Label>
            <Form.Control required value={email} onChange={e=>setEmail(e.target.value)} style={{minWidth:'100%'}} placeholder='Enter email'></Form.Control>
          </Form.Group>
        </Form>
        <Form className='mb-5'>
          <Form.Group className='mt-3'>
            <Form.Label className='mb-3'>PASSWORD</Form.Label>
            <Form.Control type='password' required value={password} onChange={e=>setPassword(e.target.value)} style={{minWidth:'100%'}} placeholder='Enter password'></Form.Control>
          </Form.Group>

          <Button  onKeyDown={handleKeyDown} type='submit' onClick={login} className='mt-5' variant='primary'>LOGIN</Button>
        </Form>
      <Link to={'/'}>Come back home</Link>
      </Card.Body>
    </Card>
        </Row>
    </Container>
  )
}

