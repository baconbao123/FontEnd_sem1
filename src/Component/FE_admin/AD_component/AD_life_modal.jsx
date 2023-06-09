import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Editor } from 'primereact/editor';
import { Row, Col,Card } from 'react-bootstrap'
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import URL from '../../api/api'
export default function AD_life_modal({value,title, show,Load,selection,toast}) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!Cookies.get('login')){
          navigate('/login')
        }
       })
    const [reLoad,setReLoad]=useState(0);
    const [showModal, setShowModal] = useState(false);
    const [person,setPerson]=useState([])
    const [storePerson,setStorePerson]=useState([])
    const [personSelected,setPersonSelected]=useState('');
  
    const [education,setEducation]=useState('')
    const [experiment,setExperiment]=useState('')
    const [struggles,setStruggles]=useState('')
    const [time_line,setTime_line]=useState('')
       
    const [achivements,setAchivements]=useState('')
    const [qoute,setQoute]=useState('')
    const [book,setBook]=useState('')
    const [life,setLife]=useState('')
    const [statusName,setStatusName]=useState({status:''});
   
    const status = [{ status: "active" }, { status: "disable" }]
// set EDIT 



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
       
       (async()=>await Loadperson())();
    
     
        if(value) {
            if(value.person_status==='disable') {
                showWarn('Person is disable');
            }
          
            if(value.id) {
                setPersonSelected(person.filter(item=>item.id===value.id))
              
            }
    
            setAchivements(value.achievements_detail);
            setQoute(value.quote);
            setLife(value.life);
   
            setTime_line(value.time_line);
            setEducation(value.education);
            setExperiment(value.experiment);
            setStruggles(value.struggles);
            setBook(value.books)
            setStatusName({status:value.status})
            
        }
       
      }, [])
        // Toast
    const showError = (e) => {
        toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
      }
      const showSuccess = (e) => {
        toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
        
      }
    
      
      const showWarn = (e) => {
          toast.current.show({severity:'warn', summary: 'Warning', detail:e?e:"To many request", life: 1000});
      }
//    ham  get data 
async function Loadperson() {
  
       const response = await axios.get(`${URL}/api/personlife`)
       setPerson(response.data);
     
  }





 
//  Ham add life
      async function addlife(e) {
        if(statusName.status==='') {
            showWarn('Status must be chosen')
        }
        else if(!personSelected)  {
            showWarn('Person must be chosen')
        }
        else {
            e.preventDefault()
            try {
            await  axios.post(`${URL}/api/addlife`,{
    
                person_id: personSelected.id,
                life:life,
         
                education: education ,
                experiment:  experiment,
                struggles: struggles ,
                time_line: time_line ,
  
                achievements_detail: achivements ,
                quote:  qoute,
                books: book ,
                status : statusName.status
            })
           showSuccess('Add success')
            setShowModal(false);
      
            setAchivements('');
            setQoute('');
            setLife('');
   
            setTime_line('');
            setEducation('');
            setExperiment('');
            setStruggles('');
            setBook('')
            setPersonSelected('');
            setStatusName({status:''})
            setTimeout(()=>{
                Load()
            },1000)
            Loadperson()
          
            }
            catch(err) {
               showError(err.message)
            }
        }
       
      }
// Ham update life
      async function updatelife() {
        if  (value.person_status==='disable') {
            showWarn('Person is disable')
        }
        else if(statusName.name==='') {
            showWarn('Status must be chosen')
        }
        else if(!personSelected) {
            showWarn('Person is disable')
        }
        
        else {

            try{
                await axios.put(`${URL}/api/updatelife/`+value.id,{
                
                person_id: personSelected.id,
                life:life,
              
                education: education ,
                experiment:  experiment,
                struggles: struggles ,
                time_line: time_line ,
        
                achievements_detail: achivements ,
                quote:  qoute,
                books: book ,
                status : statusName.status
                })
                
                showSuccess('success updated')
                setTimeout(()=> {
                    setShowModal(false);
                    selection()
                     Load()
                window.location.reload();
                    
                },1000)
               
               
                setPersonSelected('');
             
                setAchivements('');
                setQoute('');
                setLife('');
           
     
                setTime_line('');
                setEducation('');
                setExperiment('');
                setStruggles('');
                setBook('')
                
           
               
            }
            catch(err) {
                showError(err.message)
            }
        }
      
      }


    useEffect(()=> {
     const   store= person.filter((item)=>item.life_story===null);
        if(value) {
        
            const id=person.filter((item)=>item.id===value.person_id);
         
         setStorePerson([id[0],...store])
            setPersonSelected(id[0] );
  
        }
        else if (!value) {
            
            setStorePerson(store)

        }
    },[person])
   
    return (
        <>
            <Modal className='modal-md' show={showModal} centered={true} size='lg' onHide={() => setShowModal(false)} fullscreen="lg-down">
                <Modal.Header closeButton>
                    <Modal.Title><h1>{title}</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col lg={6}>
                            <Form.Group className="mb-3" >
                            <Form.Label>Person *</Form.Label>
                                <Dropdown placeholder='select person' value={personSelected} onChange={(e)=>setPersonSelected(e.value)} options={storePerson    } optionLabel='name' style={{minWidth:'100%'}}/>
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
                                <Form.Label>Life</Form.Label>
                                <InputTextarea placeholder=' enter life' style={{minWidth:'100%',minHeight:'12rem'}} value={life} onChange={e=>setLife(e.target.value)} />
                            </Form.Group>
                        </Row>
                     
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>Education</Form.Label>
                                <InputTextarea placeholder='enter education' style={{minWidth:'100%',minHeight:'12rem'}} value={education} onChange={e=>setEducation(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>experiment</Form.Label>
                                <InputTextarea placeholder='enter experiment' style={{minWidth:'100%',minHeight:'12rem'}} value={experiment} onChange={e=>setExperiment(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>struggles</Form.Label>
                                <InputTextarea placeholder='enter struggles' style={{minWidth:'100%',minHeight:'12rem'}} value={struggles} onChange={e=>setStruggles(e.target.value)} />
                            </Form.Group>
                        </Row>
                        
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>
                                Time line
                                </Form.Label>
                                <InputTextarea style={{minWidth:'100%',minHeight:'12rem'}} value={time_line} onChange={e=>setTime_line(e.target.value)} />
                               
                                
                            </Form.Group>
                        </Row>
                      
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>achievements detail</Form.Label>
                                <InputTextarea  placeholder='enter achivements' style={{minWidth:'100%',minHeight:'12rem'}} value={achivements} onChange={e=>setAchivements(e.target.value)} />
                            </Form.Group>
                        </Row>  
                     
                        <Row className='mt-4'>
                            <Col lg={6}>

                            <Form.Group>
                                <Form.Label>
                                    Quote
                                </Form.Label>
                                    <InputText   value={qoute} onChange={e=>setQoute(e.target.value)} placeholder='enter quote' style={{minWidth:'100%'}}/>
                            </Form.Group>
                            </Col>
                            <Col lg={6}>

                            <Form.Group>
                                <Form.Label>
                                  Book
                                </Form.Label>
                                    <InputText   value={book} onChange={e=>setBook(e.target.value)} placeholder='enter book' style={{minWidth:'100%'}}/>
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                           <Col lg={6}>
                           <Form.Label>Status *</Form.Label>
                            <Dropdown placeholder='select status' options={status}  optionLabel='status' value={statusName} onChange={e=>setStatusName(e.value)} style={{minWidth:"100%"}}/>
                           </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  {value&&(
                    <Button variant="primary" onClick={updatelife}>
                        Save Changes
                    </Button>

                  )}
                      {!value&&(
                    <Button variant="primary" onClick={addlife}>
                        ADD NEW
                    </Button>

                  )}

                </Modal.Footer>
            </Modal>
        </>
    )
}
