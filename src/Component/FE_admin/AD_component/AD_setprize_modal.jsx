import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';

import { InputText, InputTextarea } from 'primereact'
import axios from 'axios';
import { Toast } from 'primereact/toast';
export default function AD_setprize_modal({ title, show, value, Load,setSelection }) {
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);
    const [prizes, setPrizes] = useState([]);
    const [person, setPerson] = useState([])
    const [availabePrize, setAvailablePrize] = useState([]);
    const status = [{ status: 'active' }, { status: 'disable' }]
    const [statusName, setStatusName] = useState('')
    const [personName, setPersonName] = useState('')
    const [prizeName, setPrizeName] = useState('')
    const [nobelShare, setNobelShare] = useState('')
    const [suggestPrize, setSuggestPrize] = useState([]);
    const [allPrize, setAllPrize] = useState([])
    const category = [{ category: 'Physic Prize' }, { category: 'Chemistry Prize' }, { category: 'Medicine Prize' }, { category: 'Literature Prize' }, { category: 'Peace Prize' }, { category: 'Prize in Economic Sciences' }]
    const [categoryName, setCategoryName] = useState('');
    const [motivation, setMotivation] = useState('')
    const [prizeContent, setPrizeContent] = useState()
    // ham add set prize
    async function addprize() {
        try {
            await axios.post('http://127.0.0.1:8000/api/addpn', {
                person_id: personName.id,
                nobel_id: prizeName.id,
                motivation: motivation,
                status: statusName.status,
                nobel_share: nobelShare
            })
            alert('ADD SUCCESS')
            Load()
            LoadPrize();
            LoadPerson();
            setPersonName('');
            setPrizeName('');
            setMotivation('');
            setStatusName('');
            setNobelShare('');
            setShowModal(false)
        }
        catch (err) {
            alert("ADD FAILED")
        }
    }
    
    // ham update
    async function updateprize() {
        try {
            await axios.put('http://127.0.0.1:8000/api/updatepn/'+value.person_id +'/'+value.nobel_id, {
                person_id: personName.id,
                nobel_id: prizeName.id,
                motivation: motivation,
                status: statusName.status,
                nobel_share: nobelShare
            })
            alert('UPDATE SUCCESS')
            Load();
            setSelection()
            LoadPrize();
            LoadPerson();

            setPersonName('');
            setPrizeName('');
            setMotivation('');
            setStatusName('');
            setNobelShare('');
            setShowModal(false)
        }
        catch (err) {
            alert("UPDATE FAILED")
        }
    }
// set availabe  prize
    useEffect(() => {
        let _filter = prizes.filter((prizes) => prizes.nobel_name === categoryName.category)
    
        if (value) {
            if(prizeName.nobel_name===categoryName.category) {

                _filter.push(prizeName)
                setAvailablePrize(_filter);
            }
            else {
                
            setAvailablePrize(_filter);
            }
        }
        else  {

            setAvailablePrize(_filter);

        }
      
  


    }, [categoryName, prizes])
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

      // set nobel share 
      useEffect(()=>{
        if(prizeName) {

            if(prizeName.person[0]) {
                setNobelShare(prizeName.person[0].pivot.nobel_share);
            }
        }
    },[prizeName])
 
    useEffect(() => {
        (async () => await LoadPrize())();
        (async () => await LoadPerson())()
        

        if (value) {
            setNobelShare(value.nobel_share)
            setStatusName({ status: value.status })
            setMotivation(value.motivation)
        }
    }, [])
// lọc giải
    useEffect(() => {
        
        setSuggestPrize(allPrize.filter(prize => {
            let check = 0;
            if (prize.person.length === 0) {
                return prize
            }
            else if (prize.person.length > 0) {
                if (prize.person.length < prize.person[0].pivot.nobel_share) check = 1

            }
            if (check === 1) return prize
        }))

  
    }, [allPrize])



    useEffect(() => {
        if(!value) {
            let result = suggestPrize.filter(prize => {
                let check = 0;
              if(personName) {
                personName.nobel.map(nobel => {
                    if (nobel.id === prize.id) check = 1
                })
              }
                if (check === 0) return prize
            })
            setPrizes(result);
        }

    }, [personName])
    // set person have life 
    useEffect(()=> {
       
     
    },[person])
    // console.log('prizes',prizes);
    async function LoadPrize() {
        const result = await axios.get('http://127.0.0.1:8000/api/nobelprize');
        setAllPrize(result.data)
    }
    async function LoadPerson() {
        const result = await axios.get('http://127.0.0.1:8000/api/personprize');
        let data=result.data.filter(item=>{
            if(item.life_story)return item
        })
       
        setPerson(data)
    }

    
    useEffect(() => {
        if (value) {
            let _filterPerson = person.filter(item => item.id === value.person_id);
            // console.log(_filterPerson);
            setPersonName(_filterPerson[0]);

            let _filterPrize = allPrize.filter(item => item.id === value.nobel_id);
            // console.log('all prize',prizes);
            // console.log('value',value);
            // console.log('filre',_filterPrize[0]);
            setPrizeName(_filterPrize[0]);
            // setAvailablePrize(prizeName)
            // console.log('prize name',prizeName);
            // console.log('available',availabePrize);
            if (_filterPrize.length >0) {


                setCategoryName({ category: _filterPrize[0].nobel_name })
            }
        }
    }, [person,prizes])
//    console.log(allPrize);

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
                            <Form.Group>
                                <Form.Label>motivation</Form.Label>
                                <InputTextarea placeholder='enter experiment' style={{ minWidth: '100%', minHeight: '12rem' }} value={motivation} onChange={e => setMotivation(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Col lg={6}>
                                <Form.Group >
                                    <Form.Label>
                                        Nobel Share
                                    </Form.Label>
                                    <InputText value={nobelShare} onChange={e => setNobelShare(e.target.value)} placeholder='1/n' style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group >
                                    <Form.Label>
                                        Satus
                                    </Form.Label>
                                    <Dropdown value={statusName} onChange={e => setStatusName(e.value)} options={status} optionLabel='status' placeholder='select staus ' style={{ minWidth: '100%' }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {!value && (

                        <Button onClick={addprize} variant="primary">
                            ADD NEW
                        </Button>
                    )}
                    {value && (

                        <Button onClick={updateprize} variant="primary">
                            SAVE CHANGE
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

        </>
    )
}