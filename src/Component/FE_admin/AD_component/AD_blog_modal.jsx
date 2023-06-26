import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { InputTextarea } from 'primereact';
import { Dropdown } from 'primereact/dropdown';

import { Toast } from 'primereact/toast';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
export default function AD_blog_modal({ title, show, value, Load,setSelection }) {
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);

  
    
 
    const status = [{ status: "active" }, { status: "disable" }]

    const [statusName, setStatusName] = useState({status:''})
    const [titlePost, setTitlePost] = useState('');
   
    const [author,setAuthor]=useState('');
    const [content,setContent]=useState('');
    const [imgemty, setImgemty] = useState(true);
    const [imgName, setImgName] = useState([]);
    
   
    const toast = useRef(null);
  
    // ham add new person
    const showToast = () => {
        return toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    };
  
    async function addBlog(e) {
       
        e.preventDefault();
        if(imgName.length<3){
            alert('At least 3 images')
            
        }
        else {
            
            const data=new FormData();
            if(imgName) {
    
                imgName.map(item=>data.append('img[]',item));
            }
            data.append('title',titlePost);
          
            data.append('author',author);
            data.append('status',statusName.status);
            data.append('content',content)
          
           
    
               
          
            try {
                await axios.post('http://127.0.0.1:8000/api/addblog',data);
              
                alert('success')
    
                setShowModal(!showModal)
                setTitlePost('');
                setAuthor('');
              
                setContent('')
                setStatusName('');
                Load()
    
            }
            catch (err) {
                alert(err)
                alert('ADD FAILED')
            
        }
    }
    }


    // ham update 
    async function updateblog(e) {
        e.preventDefault()
          
        let check=0;
       if(value.img&&imgName) {
        
           const storeImg=value.img.split(',');
        
          
          
           if(storeImg.length!==imgName.length) {
               check++
           }
           else {
               for(let i=0;i<storeImg.length;i++) {
                   if(imgName[i]!==storeImg[i]) {
                       check++
                   }
               }
           }
       }
       else {
        if(!value.img&&imgName) {
            check++
        }
        if(value.img&&!imgName) {

        }
       }
      console.log(check);
        // image and pdf change
     
        //Img change
        if(imgName.length<3){
            alert('At least 3 images')
            
        }
        else if(check>0) {
            
            const data=new FormData();
            data.append('_method',"PUT")
                 imgName.map(item=>data.append('img[]',item));
                data.append('name',titlePost);
         
            data.append('status',statusName.status);
            data.append('author',author)
          data.append('content',content)
            
          
            e.preventDefault();
            try {
                await axios.post('http://127.0.0.1:8000/api/updateblog/' + value.id,data)
                alert('success')
    
                setShowModal(!showModal)
                setTitlePost('');
                setAuthor('');
              
                setContent('')
                setStatusName('');
                Load()
                setSelection()
            }
            catch (err) {
                alert(err)
                alert('Update FAILED')
            }
        }
       
        // Image and pdf not change
        else {

            try {
                await axios.put('http://127.0.0.1:8000/api/updateblog/' + value.id, {
                    title:titlePost,
                    content:content,
                    author:author,
                    status:statusName.status,
                    
                   
                })
                alert('success')
    
                setShowModal(!showModal)
                setTitlePost('');
                setAuthor('');
              
                setContent('')
                setStatusName('');
                Load()
                setSelection()
            }
            catch (err) {
                alert(err)
                alert('Update FAILED')
            }
        }
        }

 
    // Ham show modal   
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


  

    //    ham set edit
    useEffect(() => {
        if (value) {
            setTitlePost(value.title);
            setContent(value.content);
            setStatusName({ status: value.status })
            setAuthor(value.author)
            if(value.img) {
                
                setImgName(value.img.split(','))
            }
          
        }
    }, [])

    // ham img 
    const handleShowImg = (e,index) => {
        return <img key={index} className='d-inline-flex ms-2 mt-1' alt={e} src={"http://127.0.0.1:8000/api/images/"+e} width='100' />

    }
  
    


    const handleImg=(e)=> {
        console.log(e.target.files);
        setImgemty(false)
        const store=[]
      
        for(let i=0;i<e.target.files.length;i++) {
            store.push(e.target.files[i])
           
           
         

        }
      
        setImgName(store)
        // dua duong dan file vao
        const myDiv=document.getElementById('inputfile')
        myDiv.innerHTML=''
      
        store.map((item,index)=> {

            const reader = new FileReader();
            reader.readAsDataURL(item);
            reader.onload = () => {
              const imgPath = reader.result;
              const imageElement = document.createElement("img");
              imageElement.src = imgPath;
          
         

              imageElement.style.maxWidth = "20%";
              myDiv.appendChild(imageElement);
            };
        })
      
       
     
    
   
   
       
    }
  

    return (
        <>


            <Modal show={showModal} onHide={() => setShowModal(!showModal)} centered={true} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Toast ref={toast} />
                        {/* <Button  label="click" onClick={showToast}/> */}
                        <h1>{title} </h1>
                    </Modal.Title>
                </Modal.Header>
                    <Form  onSubmit={value?updateblog:addBlog}   encType='multipart/form-data' >
                <Modal.Body>

                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <InputText value={titlePost} onChange={e => setTitlePost(e.target.value)} placeholder="Enter title"  style={{ minWidth: '100%' }} />

                        </Form.Group>
                        <Row>
                            
                            
                            <Col lg={6}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Status</Form.Label>
                                    <Dropdown options={status} value={statusName} onChange={e => setStatusName(e.value)} optionLabel='status' placeholder='Status' style={{ minWidth: '100%' }} />

                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                            <Form.Group className="mb-3" >
                            <Form.Label>Author</Form.Label>
                            <InputText value={author} onChange={e => setAuthor(e.target.value)} placeholder="Enter Author Name" name='name' style={{ minWidth: '100%' }} />

                        </Form.Group>
                            </Col> 
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group>
                                <Form.Label>Content</Form.Label>
                                <InputTextarea placeholder='enter personalities' style={{minWidth:'100%',minHeight:'12rem'}}  value={content} onChange={e=>setContent(e.target.value)} />
                            </Form.Group>
                        </Row>    
                        <Row className='mt-4'>
                            <Form.Group  >
                                <Form.Label>Images (&gt;=3 Files)</Form.Label>
                                <InputText type='file' multiple onChange={handleImg} accept='image/*'  style={{minWidth:'100% '}} />
                                {imgemty&&value&&imgName&&imgName.length>0 && imgName.map((item,index)=> handleShowImg(item,index))}

                            </Form.Group>
                        </Row>
                        <Row className='mt-4'  id='inputfile'></Row>
                
                </Modal.Body>
                <Modal.Footer>

                    {value && (

                        <Button variant="primary" type='submit' >
                            SAVE
                        </Button>
                    )}
                    {!value && (

                        <Button variant="primary" type='submit' >
                            SUBMIT
                        </Button>
                    )}
                </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}
