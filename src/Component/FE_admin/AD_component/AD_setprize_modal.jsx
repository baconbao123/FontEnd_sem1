import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';

import { InputText } from 'primereact/inputtext';

import { Toast } from 'primereact/toast';
export default function AD_setprize_modal({ title, show, value }) {
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);
    const [prizes, setPrizes] = useState([]);
    const [person, setPerson] = useState([])
    const [availabePrize, setAvailablePrize] = useState([]);
    const status=[{status:'active'},{status:'disable'}]
    const [statusName,setStatusName]=useState('')
    const [personName, setPersonName] = useState('')
    const [prizeName, setPrizeName] = useState('')
    const [nobelShare, setNobelShare] = useState('')

    const category = [{ category: 'Physic Prize' }, { category: 'Chemistry Prize' }, { category: 'Medicine Prize' }, { category: 'Literature Prize' }, { category: 'Peace Prize' }, { category: 'Prize in Economic Sciences' }]
    const [categoryName, setCategoryName] = useState('');


    useEffect(() => {
        let _filter = prizes.filter((prizes) => prizes.nobel_name === categoryName.category)
        setAvailablePrize(_filter);
    }, [categoryName])
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
    useEffect(() => {
        setPrizes([
            { id: '1', nobel_year: '2022', nobel_name: 'Chemistry Prize' },
            { id: '2', nobel_year: '2002', nobel_name: 'Chemistry Prize' },
            { id: '3', nobel_year: '2002', nobel_name: 'Medicine Prize' },
            { id: '4', nobel_year: '2002', nobel_name: 'Medicine Prize' },
            { id: '5', nobel_year: '2002', nobel_name: 'Medicine Prize' },
            { id: '6', nobel_year: '2002', nobel_name: 'Medicine Prize' },
            { id: '7', nobel_year: '2002', nobel_name: 'Chemistry Prize' },
            { id: '8', nobel_year: '2002', nobel_name: 'Chemistry Prize' },
            { id: '9', nobel_year: '2002', nobel_name: 'Literature Prize' },
            { id: '10', nobel_year: '2016', nobel_name: 'Literature Prize' },
            { id: '11', nobel_year: '2016', nobel_name: 'Literature Prize' },
            { id: '12', nobel_year: '2016', nobel_name: 'Literature Prize' },
            { id: '13', nobel_year: '2016', nobel_name: 'Chemistry Prize' },
            { id: '14', nobel_year: '2016', nobel_name: 'Chemistry Prize' },
            { id: '15', nobel_year: '2016', nobel_name: 'Chemistry Prize' },
            { id: '16', nobel_year: '2016', nobel_name: 'Chemistry Prize' },
            { id: '17', nobel_year: '2016', nobel_name: 'Chemistry Prize' },
            { id: '18', nobel_year: '2022', nobel_name: 'Chemistry Prize' },
            { id: '19', nobel_year: '2022', nobel_name: 'Chemistry Prize' },
            { id: '20', nobel_year: '2022', nobel_name: 'Chemistry Prize' },

        ])
        setPerson([
            { id: '1', name: 'nguyen', birthdate: '2004-06-16', deathdate: 'null', gender: 'male', national: 'VietName', status: 'active', img: 'hello' },
            { id: '2', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '3', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '4', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable', img: 'hello' },
            { id: '5', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable', img: 'hello' },
            { id: '6', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'disable', img: 'hello' },
            { id: '7', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable', img: 'hello' },
            { id: '8', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable', img: 'hello' },
            { id: '9', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '10', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '11', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'active', img: 'hello' },
            { id: '12', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'US', status: 'active', img: 'hello' },
            { id: '13', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '14', name: 'Ngoc', birthdate: '15/6/2003', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' },
            { id: '15', name: 'Thuyfdsafsadffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active', img: 'hello' }
        ])
        if(value) {
            setNobelShare(value.nobel_share)
            setStatusName({status:value.status})
        }
    }, [])
    useEffect(()=>{
        if(value) {
            let _filterPerson=person.filter(item=>item.id===value.person_id);
            console.log(_filterPerson);
            setPersonName(_filterPerson[0]);

            let _filterPrize=prizes.filter(item=>item.id===value.nobel_id);
            console.log('filre',_filterPrize);
            setPrizeName(_filterPrize[0]);
            if(_filterPrize.length===1) {

                setCategoryName({category:_filterPrize[0].nobel_name})
            }
        }
    },[person,prizes])
    //    ham set edit
    //    useEffect(()=> {
    //     if(value) {
    //         setYear(value.nobel_year);
    //         setCategoryName({category: value.nobel_name})
    //     }
    //    },[])


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
                                    <Form.Label>Person</Form.Label>

                                    <Dropdown placeholder='select person' options={person} optionLabel='name' value={personName} onChange={e => setPersonName(e.value)} style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    {personName && (
                                        <>
                                            <Form.Label  >Information</Form.Label>
                                            <div>
                                                Name: {personName.name}
                                            </div>
                                            <div>
                                                Birthdate: {personName.birthdate}
                                            </div>
                                            <div className='d-inline-block me-5'>
                                                Nation: {personName.national}
                                            </div>
                                            <div className='d-inline-block'>
                                                Gender: {personName.gender}
                                            </div>
                                        </>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Prize</Form.Label>

                                    <Dropdown placeholder='select prize' options={category} optionLabel='category' value={categoryName} onChange={e => setCategoryName(e.value)} style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>
                                    <Dropdown options={availabePrize} optionLabel='nobel_year' placeholder='select year' value={prizeName} onChange={e => setPrizeName(e.value)} style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={6}>
                                <Form.Group >
                                    <Form.Label>
                                        Nobel Share
                                    </Form.Label>
                                        <InputText value={nobelShare} onChange={e=>setNobelShare(e.value)}  placeholder='1/n' style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group >
                                    <Form.Label>
                                       Satus
                                    </Form.Label>
                                        <Dropdown value={statusName} onChange={e=>setStatusName(e.value)} options={status} optionLabel='status' placeholder='select staus ' style={{ minWidth: '100%' }} />
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
