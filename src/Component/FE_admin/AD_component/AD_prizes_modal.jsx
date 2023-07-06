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

import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function AD_prizes_modal({ title, show, value, Load,toast,setSelection }) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!Cookies.get('login')){
          navigate('/login')
        }
       })
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
    // ham
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);
    const [prizes, setPrizes] = useState([]);


    const [year, setYear] = useState('')
    const category = [{ category: 'Physic Prize' }, { category: 'Chemistry Prize' }, { category: 'Medicine Prize' }, { category: 'Literature Prize' }, { category: 'Peace Prize' }, { category: 'Prize in Economic Sciences' }]
    const [categoryName, setCategoryName] = useState({category:''});
    const [statusName, setStatusName] = useState({status:''});

    const status = [{ status: "active" }, { status: "disable" }]



    useEffect(() => {
        if (show) {
            const handleClick = () => {
                setShowModal(!showModal);

            }
            show.current.addEventListener('click', handleClick);
            return () => {
                show.current.removeEventListener('click', handleClick);
            }
        }
    }, [show]);
    console.log(statusName);
    async function addprize() {
        if(statusName.status==='') {
            showWarn('Status must be chosen')
        }
         else  if(!year) {
            showWarn('Year must be chosen')
        }
        else if(categoryName.category==='') {
            showWarn('Category must be chosen')
        }
        else {

            try {
                await axios.post('http://127.0.0.1:8000/api/addprize', {
                    nobel_year: year,
                    nobel_name: categoryName.category,
                    status: statusName.status
                })
              showSuccess('Add success')
                Load()
                setYear('')
                setCategoryName({category:''})
                setStatusName({status:''})
                setShowModal(false)
            }
            catch (err) {
            showError('The prize is already exist')
            }
        }
    }
    // ham update prize
    async function updateprize () {
        if(statusName.status==='') {
            showWarn('Status must be chosen')
        }
         else  if(!year) {
            showWarn('Year must be chosen')
        }
        else if(categoryName.category==='') {
            showWarn('Category must be chosen')
        }
        else {

            try {
                await  axios.put('http://127.0.0.1:8000/api/updateprize/'+value.id,{
                    nobel_year: year,
                    nobel_name: categoryName.category,
                    status: statusName.status
                })
              
                showSuccess('updated success')
                setTimeout(()=> {
    
                    Load()
                    setSelection()
                },1000)
                setYear('')
                setCategoryName({status:''})
                setStatusName({status:''})
                setShowModal(false)
            }
            catch(err) {
                
                showError('The prize is already exist')
            }
        }
    }
    //    ham set edit 
    useEffect(() => {
        if (value) {
            setYear(value.nobel_year);
            setCategoryName({ category: value.nobel_name })
            setStatusName({status:value.status})
        }
    }, [])


    return (
        <>


            <Modal fullscreen="md-down" show={showModal} onHide={() => setShowModal(!showModal)} centered={true} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>{title}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>

                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>

                                    <InputText maxLength={4}  keyfilter="num" placeholder='enter year' value={year} onChange={e => setYear(e.target.value)} type='text' name='year' style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Categories</Form.Label>
                                    <Dropdown placeholder='select prize' value={categoryName} onChange={e => setCategoryName(e.value)} options={category} optionLabel='category' style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={6}>
                                <Form.Label>Status</Form.Label>
                                <Dropdown placeholder='select status' options={status} optionLabel='status' value={statusName} onChange={e => setStatusName(e.value)} style={{ minWidth: "100%" }} />
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {value && (

                        <Button variant="primary" onClick={updateprize}>
                            Save Changes
                        </Button>
                    )}
                    {!value && (
 
                        <Button variant="primary" onClick={addprize}>
                            ADD NEW
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

        </>
    )
}
