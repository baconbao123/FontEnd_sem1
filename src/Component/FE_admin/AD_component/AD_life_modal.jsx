import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Editor } from 'primereact/editor';
import { Row, Col,Card } from 'react-bootstrap'
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
         
export default function AD_life_modal({ show }) {
    const [showModal, setShowModal] = useState(false);
    const [person,setPerson]=useState([])
    const [personSelected,setPersonSelected]=useState('');
    const [childhood,setChildhood]=useState('')
    const [education,setEducation]=useState('')
    const [experiment,setExperiment]=useState('')
    const [struggles,setStruggles]=useState('')
    const [time_line,setTime_line]=useState('')
    const [personalities,setPersonalities]=useState('')
    const [achivements,setAchivements]=useState('')
    const [qoute,setQoute]=useState('')
    const [book,setBook]=useState('')



    useEffect(() => {
        const handleClick = () => {
            setShowModal(!showModal);

        }
        show.current.addEventListener('click', handleClick);
        return () => {
            show.current.removeEventListener('click', handleClick);
        }
    }, [show]);

    useEffect(() => {
        setPerson([
          { id: '1', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'success' },
          { id: '2', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'success' },
          { id: '3', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'success' },
          { id: '4', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '5', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '6', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'sucess' },
          { id: '7', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '8', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '9', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '10', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '11', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'sucess' },
          { id: '12', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'US', status: 'success' },
          { id: '13', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '14', name: 'Ngoc', birthdate: '15/6/2003', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' },
          { id: '15', name: 'Thuyfdsafsadffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'sucess' }
        ])
   
      }, [])


console.log(personSelected);
    return (
        <>
            <Modal show={showModal} centered={true} size='lg' onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><h1>ADD NEW LIFE</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col lg={6}>
                            <Form.Group className="mb-3" >
                            <Form.Label>Person</Form.Label>
                                <Dropdown placeholder='select person' value={personSelected} onChange={(e)=>setPersonSelected(e.value)} options={person} optionLabel='name' style={{minWidth:'100%'}}/>
                        </Form.Group>
                            </Col>
                            <Col lg={6}>
                                {personSelected&&(
                                   <Form.Group>
                                        <Form.Label>Infomation</Form.Label>
                                       <div>name: {personSelected.name}</div>
                                       
                                       <div >Birthday: {personSelected.birthdate}</div>
                                      
                                       <div  className='d-inline-block me-5' >Nation: {personSelected.national}</div>
                                       <div className='d-inline-block'>Gender: {personSelected.gender}</div>
                                   </Form.Group>


                                )}
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>Childhood</Form.Label>
                                <InputTextarea placeholder=' enter childhood' style={{minWidth:'100%'}} value={childhood} onChange={e=>setChildhood(e.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>Education</Form.Label>
                                <InputTextarea placeholder='enter education' style={{minWidth:'100%'}} value={education} onChange={e=>setEducation(e.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>experiment</Form.Label>
                                <InputTextarea placeholder='enter experiment' style={{minWidth:'100%'}} value={experiment} onChange={e=>setExperiment(e.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>struggles</Form.Label>
                                <InputTextarea placeholder='enter struggles' style={{minWidth:'100%'}} value={struggles} onChange={e=>setStruggles(e.value)} />
                            </Form.Group>
                        </Row>
                        
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>
                                Time line
                                </Form.Label>
                                <Editor  style={{minWidth:'100%'}} value={time_line} onChange={e=>setTime_line(e.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>personalities</Form.Label>
                                <InputTextarea placeholder='enter personalities' style={{minWidth:'100%'}} value={personalities} onChange={e=>setPersonalities(e.value)} />
                            </Form.Group>
                        </Row>    
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>achievements detail</Form.Label>
                                <InputTextarea placeholder='enter achivements' style={{minWidth:'100%'}} value={achivements} onChange={e=>setAchivements(e.value)} />
                            </Form.Group>
                        </Row>  
                        <Row className='mt-4'>
                            <Col lg={6}>

                            <Form.Group>
                                <Form.Label>
                                    Quote
                                </Form.Label>
                                    <InputText   value={qoute} onChange={e=>setQoute(e.value)} placeholder='enter quote' style={{minWidth:'100%'}}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={6}>

                            <Form.Group>
                                <Form.Label>
                                    Quote
                                </Form.Label>
                                    <InputText   value={qoute} onChange={e=>setQoute(e.value)} placeholder='enter quote' style={{minWidth:'100%'}}/>
                            </Form.Group>
                            </Col>
                            <Col lg={6}>

                            <Form.Group>
                                <Form.Label>
                                  Book
                                </Form.Label>
                                    <InputText   value={book} onChange={e=>setBook(e.value)} placeholder='enter book' style={{minWidth:'100%'}}/>
                            </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
