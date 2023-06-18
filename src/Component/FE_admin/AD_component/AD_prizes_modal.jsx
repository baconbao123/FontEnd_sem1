import React, { useEffect, useState,useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';  
import { FileUpload } from 'primereact/fileupload';

import { InputText } from 'primereact/inputtext';
        
import { Toast } from 'primereact/toast';
export default function AD_prizes_modal({title, show ,value}) {
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);
    const [prizes,setPrizes]=useState([]);
 
 
    const [year,setYear]=useState('')
    const category=[{category:'Physic Prize'},{category:'Chemistry Prize'},{category:'Medicine Prize'},{category:'Literature Prize'},{category:'Peace Prize'},{category:'Prize in Economic Sciences'}]
   const [categoryName,setCategoryName]=useState('');


  

    useEffect(() => {
       if(show) {
        const handleClick = () => {
            setShowModal(!showModal);

        }
        show.current.addEventListener('click', handleClick);
        return () => {
            show.current.removeEventListener('click', handleClick);
        }
       }
    }, [show]);
    useEffect(()=>{
        setPrizes([
            {id:'1',nobel_year:'2022',nobel_name:'Chemistry Prize'},
            {id:'2',nobel_year:'2002',nobel_name:'Chemistry Prize'},
            {id:'3',nobel_year:'2002',nobel_name:'Medicine Prize'},
            {id:'4',nobel_year:'2002',nobel_name:'Medicine Prize'},
            {id:'5',nobel_year:'2002',nobel_name:'Medicine Prize'},
            {id:'6',nobel_year:'2002',nobel_name:'Medicine Prize'},
            {id:'7',nobel_year:'2002',nobel_name:'Chemistry Prize'},
            {id:'8',nobel_year:'2002',nobel_name:'Chemistry Prize'},
            {id:'9',nobel_year:'2002',nobel_name:'Literature Prize'},
            {id:'10',nobel_year:'2016',nobel_name:'Literature Prize'},
            {id:'11',nobel_year:'2016',nobel_name:'Literature Prize'},
            {id:'12',nobel_year:'2016',nobel_name:'Literature Prize'},
            {id:'13',nobel_year:'2016',nobel_name:'Chemistry Prize'},
            {id:'14',nobel_year:'2016',nobel_name:'Chemistry Prize'},
            {id:'15',nobel_year:'2016',nobel_name:'Chemistry Prize'},
            {id:'16',nobel_year:'2016',nobel_name:'Chemistry Prize'},
            {id:'17',nobel_year:'2016',nobel_name:'Chemistry Prize'},
            {id:'18',nobel_year:'2022',nobel_name:'Chemistry Prize'},
            {id:'19',nobel_year:'2022',nobel_name:'Chemistry Prize'},
            {id:'20',nobel_year:'2022',nobel_name:'Chemistry Prize'},

        ])
       
    },[])
//    ham set edit
   useEffect(()=> {
    if(value) {
        setYear(value.nobel_year);
        setCategoryName({category: value.nobel_name})
    }
   },[])
      

    return (
        <>


            <Modal show={showModal} onHide={() => setShowModal(!showModal)} centered={true} size='lg'>
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
                                
                                        <InputText value={year} onChange={e=>setYear(e.target.value)}  type='text' name='year'   style={{minWidth:'100%'}}/>
                                    </Form.Group>
                            </Col>
                            <Col lg={6}>
                                    <Form.Group>
                                        <Form.Label>Categories</Form.Label>
                                        <Dropdown value={categoryName} onChange={e=>setCategoryName(e.value)} options={category} optionLabel='category'  style={{minWidth:'100%'}}/>
                                    </Form.Group>
                            </Col>
                        </Row>
                       
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
