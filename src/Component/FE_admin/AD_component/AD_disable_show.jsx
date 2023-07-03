import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsTrashFill,BsPlusLg,BsChevronDoubleRight} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';
import axios from 'axios';
import AD_nav from '../Layout/AD_nav';
import AD_hidden_nav from '../Layout/AD_hidden_nav';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Toast } from 'primereact/toast';
export default function AD_disbale_show() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
// Khởi tạo các biến
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showNav,setShowNav]=useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    name: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    birthdate: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}] },
    deathdate: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
    gender: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}] },
    national: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    status: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  })
  
  const [global, SetGlobal] = useState('');
  const [status]=useState(['success','sucess','danger']);
  const [gender]=useState(['male','female']);
  const [selection,setSelection]=useState([]);
  const [show,setShow]=useState(10);
  const [showRow]=useState([5,10,15,20,30]);
  const toast = useRef(null);

  const showModalButoon=useRef(null)
  const showModalEdit=useRef('')

  // Toast
  const showSuccess = (e) => {
    toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
   
  }
  const showError = (e) => {
    toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
  }

  useEffect(() => {
    (async()=>await Load())();
    setLoading(false);
  }, [])

  async function  Load() {
    const instance = axios.create({
      timeout: 1000 
    });
    const result=await instance.get('http://127.0.0.1:8000/api/persondisable');
    setPerson(result.data);
  }


   // Ham active
   const handleActive=()=> {
    let time=1000
    if (selection.length>=1) {
      // if(selection.length>10) {
        
      //   time=10000
      // }
      
      
        selection.map((item=> {
        
          setTimeout(()=>{  activeperson(item)},time);
           
             setSelection(selection.filter(item=>item !== item))
        }))

    }
}
async function activeperson(item) {

    
    try {
        
      await axios.put('http://127.0.0.1:8000/api/updateperson/' +item.id,{
      
        status: 'active',
      
      }) 
    showSuccess(' active success')
      Load();
    }
    catch (err) {
  
    showError(err.message)

  
    }
}
// ham delete
  const handelDelete =( )=> {
    
    selection.map(item=>{
      deleteperson(item);
      setSelection(selection.filter(item=>item !== item))
    })
  }

  async function deleteperson(item) {
    try {
      await axios.delete('http://127.0.0.1:8000/api/deleteperson/' +item.id)
      showSuccess(' delete success')
      Load()
    }
    catch (err) {
    

        showError(err.message)
   
    }
  }
// Hàm search Golbal
  const hanldeGlobalSearch = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    SetGlobal(value);
  }
// hàm set Init FIlter
  const initFilters=()=> {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    name: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    birthdate: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}] },
    deathdate: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
    gender: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}] },
    national: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    status: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    })
    SetGlobal('');
  }
  
  const clearFilter = () => {
    initFilters();
  };


// render header
  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-around AD-header">
         <div  className='d-none show-1000 mb-3 row  '>
          
          <section className=' fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
      <h1 className='d-inline-block text-center col-10 '>PERSON DISABLE</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
        <section>
          
        <span className="p-input-icon-left mb-3">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
       
         
        </span>
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='mb-3 ms-3' >
            <RiFilterOffFill  />
             </Button>
        </section>
        <h1 className=' hidden-1000'>PERSON DISABLE</h1>
    
        <section style={{minWidth:'24rem'}}>
      

       

          {selection.length>=1&&(
            <>
          <Button  onClick={handleActive} ref={showModalEdit} className='ms-3' type='button' label="active" severity='success' >
            <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
          <Button  onClick={handelDelete} className='ms-3' type='button' label="Delete" severity='danger' >
            <BsTrashFill    className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            </>

          )}
 
        </section>
        
      </div>
    );

  };
  const header = renderHeader;
// hàm tạo ra tag status
  const  itemStatus=(e)=> {
    let status='';
    let value=''
    if(e.status==='active') {
      value='active'
      status='success'
    }
    else if (e.status==='disable') {
      status='danger'
      value='disable'
    }
    return <Tag value={value} severity={status}/>
  }
  const  genderStatus=(e)=> {
    let status='';
     if(e.gender==='female') {
      status='info';
      
     }
     else   {
      status='success'
     }
    return <Tag value={e.gender} severity={status}/>
  }
  const statusDropdown=(e)=> {
    return <Tag value={e} severity={e} />
  }
  // Hàm tạo ra tag status trong filter
  const genderDropdown=(e)=> {
     let status='';
     if(e==='female') {
      status='info';
      
     }
     else {
      status='success'
     }
   
    return <Tag value={e} severity={status}/>
  }
  // Hàm tạo ra dropdown filter
  const statusFilter=(event)=>{
    return (

      <Dropdown value={event.value} options={status} onChange={(e)=>event.filterApplyCallback(e.value)} itemTemplate={statusDropdown}  placeholder='select one' showClear />
    )
  }
  const genderFilter=(event)=> {
     return (
      <Dropdown value={event.value} options={gender} onChange={(e)=>event.filterApplyCallback(e.value)} itemTemplate={genderDropdown } showClear placeholder='select one'/>
     )

  }
  

  const itemImage=(e)=> {
    if(e.img) {
 
      let store=e.img.split(',')
      
     return (
      <>
      
      <img className='d-inline-flex ms-2 mt-1' alt={store[0]} src={"http://127.0.0.1:8000/api/images/"+store[0]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[1]} src={"http://127.0.0.1:8000/api/images/"+store[1]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[2]} src={"http://127.0.0.1:8000/api/images/"+store[2]}  width='100'/>
     
      </>
  
     )
    }
  } 
  const avatarImage=(e)=> {
    
    if(e.avatar) {
      return(
        <>
          <img className='d-inline-flex ms-2 mt-1' alt={e.avatar} src={"http://127.0.0.1:8000/api/images/" + e.avatar} width='100' />

        </>
      )
    }
  }
 
  return (
    <Container fluid className='wrapper'>
        <Toast ref={toast} /> 
      <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav page={'Disable show'} /></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>
      <Row>
      <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav page={'Disable show'} />
        </Col>
        <Col  className='bg-content col-xl-10  col-md-12'>
        
          <section className='card'>

            <DataTable value={person} data-key='id' loading={loading}
            
            selectionMode={'checkbox'}
            selection={selection} onSelectionChange={(e)=>setSelection(e.value)}
              header={header}
              showGridlines
              paginator rows={5}
              rowsPerPageOptions={[2, 5, 10, 25, 50]}
              removableSort
              tableStyle={{ minWidth: '100%' }}
              globalFilterFields={['id', 'name', 'birthdate', 'deathdate', 'gender', 'national', 'status']}
              emptyMessage="No customers found."
              filters={filters} 
            > 
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
         
          
              <Column field='name' header='name' sortable filterPlaceholder="Search"  filter style={{ minWidth:'12rem', maxWidth: '24rem' }} />
              <Column field='birthdate' header='birthdate' sortable filter  dataType='date'  style={{ minWidth: '12rem' }}   />
              <Column field='deathdate' header='deathdate' sortable filter  dataType='date' style={{ minWidth: '12rem' }} />
              <Column field='national' header='national' sortable filterPlaceholder="Search" filter style={{ minWidth: '12rem' }} />
              <Column field='gender' header='gender' filter  sortable filterElement={genderFilter} body={genderStatus} style={{ minWidth: '12rem' }}/>
              <Column field='status' header='status' filter sortable filterElement={statusFilter} body={itemStatus}   style={{ minWidth: '12rem' }}   />
              <Column field='avatar' header='avatar' body={avatarImage}  style={{ minWidth: '12rem' }} />
              
              <Column field='img' header='img' body={itemImage}    style={{ minWidth: '40rem' }}   />
              
            </DataTable>
          </section>

        </Col>

       
        
      </Row>
    </Container>
  )
}
