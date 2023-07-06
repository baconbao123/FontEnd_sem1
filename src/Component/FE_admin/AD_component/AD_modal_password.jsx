
import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import Cookies from 'js-cookie';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function AD_modal_password({show,toast}) {
  const [showModal, setShowModal] = useState(false);
  const [oldPass,setOldPass]=useState('')
  const [newPass,setNewPass]=useState('')

  useEffect(() => {
    if (show) {
        const handleClick = () => {
            setShowModal(!showModal);

        }
        show.current.addEventListener('click', handleClick);
        // return () => {
        //     show.current.removeEventListener('click', handleClick);
          
        // }
    }
}, [show]);
const showError = (e) => {
  toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
}
const showSuccess = (e) => {
  toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
  
}


const showWarn = (e) => {
    toast.current.show({severity:'warn', summary: 'Warning', detail:e?e:"To many request", life: 3000});
}

async function changePassword(e) {
  e.preventDefault();
  if(!oldPass) {
    showWarn("Old password can not be empty")
  }
  else if(!newPass) {
    showWarn("New password can not be empty")
  }
  else {
    
    try {
     await  axios.put('http://127.0.0.1:8000/api/changePassword',{
        'oldPass' : oldPass,
        'Pass' : newPass
      })
      showSuccess("Change password success")
      setShowModal(false)
      setNewPass('')
      setOldPass('')
    }
    catch(err) {
      if(err.response.status===400) {
  
        showError("Wrong password")
      }
    }
  }
}
  return (
   
    <Modal fullscreen="md-down" show={showModal} onHide={() => setShowModal(!showModal)} centered={true} size='lg'>
    <Modal.Header closeButton>
        <Modal.Title>
            <h1>Change Password</h1>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Form>

            <Row>
                <Col lg={6} className='mt-4 mb-4 text-center' >
                    <Form.Group>
                        <Form.Label  style={{width:'100%'}}>Old Password</Form.Label>
                          <Password value={oldPass}  placeholder='Enter old password' onChange={e=>setOldPass(e.target.value)} toggleMask  />
                   
                    </Form.Group>
                </Col>
                <Col lg={6} className='mt-4 mb-4 text-center'>
                    <Form.Group>
                        <Form.Label style={{width:'100%'}}>New Password</Form.Label>
                        <Password value={newPass} placeholder='Enter new passsword' onChange={e=>setNewPass(e.target.value)} toggleMask />
                       
                    </Form.Group>
                </Col>
            </Row>
       

        </Form>
    </Modal.Body>
    <Modal.Footer>
        
            <Button variant="primary" onClick={changePassword}>
                Change
            </Button>
      
    </Modal.Footer>
</Modal>
  )
}
