import React,{useState, useEffect,useRef} from 'react'
import { Container,Row,Button,Form } from 'react-bootstrap'
import logo from '../AD_img/logo-admin.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link,useNavigate } from 'react-router-dom';
import {Toast} from 'primereact'

import { Card } from 'primereact/card';
        
export default function AD_login() {
  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate = useNavigate();
  const toast=useRef()
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('myButton').click();
    }
  };
    // Toast
    const showError = (e) => {
      toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
    }
    const showSuccess = (e) => {
      toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
      
    }
  
    
    const showWarn = (e) => {
        toast.current.show({severity:'warn', summary: 'Warning', detail:e?e:"To many request", life: 3000});
    }
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
      showSuccess('LOGIN SUCCESS')
      setTimeout(()=> {

        return  navigate('/admin');
      },1000)

    }
    catch(err) {
  
      showError('email or password invalid ')

    }
  }

  return (
    <Container className='wrapper ' fluid>
        <Toast  ref={toast}/>
        <Row className=' d-flex justify-content-center'>
            <img className=' logo-login' src={logo} alt="Img" width='300'/>
        </Row>

        <Row className=' d-flex justify-content-evenly mt-5'>
      <Card title="LOGIN" bg='white'  className='text-center' style={{ width: '40rem' }}>
     
 
        <Form   className='mb-5'>
          <Form.Group className='mt-3'>
            <Form.Label className='mb-3'>EMAIL</Form.Label>
            <Form.Control  className=' input-login'required value={email} onChange={e=>setEmail(e.target.value)} style={{minWidth:'100%'}} placeholder='Enter email'></Form.Control>
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
     
    </Card>
        </Row>
    </Container>
  )
}

