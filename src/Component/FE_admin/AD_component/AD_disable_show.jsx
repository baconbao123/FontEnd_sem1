import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsTrashFill,BsPlusLg} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';
import axios from 'axios';
import AD_nav from '../Layout/AD_nav';


export default function AD_disbale_show() {
// Khởi tạo các biến
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true)
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


  const showModalButoon=useRef(null)
  const showModalEdit=useRef('')
  useEffect(() => {
    (async()=>await Load())();
    setLoading(false);
  }, [])

  async function  Load() {
    const result=await axios.get('http://127.0.0.1:8000/api/persondisable');
    setPerson(result.data);
  }


   // Ham active
   const handleActive=()=> {
    if (selection.length>=1) {
     
        selection.map((item=> {
        
          
             activeperson(item);
             setSelection(selection.filter(item=>item !== item))
        }))

    }
}
async function activeperson(item) {

    
    try {
        
      await axios.put('http://127.0.0.1:8000/api/updateperson/' +item.id,{
      
        status: 'active',
      
      }) 
      alert(item.id + ' Active success')
      Load();
    }
    catch (err) {
      alert(err)
      alert('Active failed')
    }
}
// ham delete
  const handelDelete =( )=> {
    console.log(selection);
    selection.map(item=>{
      deleteperson(item);
      setSelection(selection.filter(item=>item !== item))
    })
  }

  async function deleteperson(item) {
    try {
      await axios.delete('http://127.0.0.1:8000/api/deleteperson/' +item.id)
      alert("Deleted !")
      Load()
    }
    catch (err) {
      alert(err)
      alert('Delete failed')
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
      <div className="d-flex justify-content-around">
        <span className="p-input-icon-left">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
       
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
            <RiFilterOffFill  />
             </Button>
         
        </span>
        <h1 className='d-flex'>PERSON DISABLE</h1>
        <span className='AD-show-dropdown'>

        show
        <Dropdown  value={show} options={showRow} onChange={e=>setShow(e.value)} />
        </span>
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
     <img className='d-inline-flex ms-2 mt-1' alt={store[3]} src={"http://127.0.0.1:8000/api/images/"+store[3]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[4]} src={"http://127.0.0.1:8000/api/images/"+store[4]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[5]} src={"http://127.0.0.1:8000/api/images/"+store[5]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[6]} src={"http://127.0.0.1:8000/api/images/"+store[6]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[7]} src={"http://127.0.0.1:8000/api/images/"+store[7]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[8]} src={"http://127.0.0.1:8000/api/images/"+store[8]}  width='100'/>
     <img className='d-inline-flex ms-2 mt-1' alt={store[9]} src={"http://127.0.0.1:8000/api/images/"+store[9]}  width='100'/>
      </>
  
     )
    }
  } 
 
  return (
    <Container fluid className='wrapper'>
      <Row>
        <Col lg={2} md={2} className='padding-0'>
          <AD_nav />
        </Col>
        <Col lg={10} md={10} className='bg-content'>
        
          <section className='card'>

            <DataTable value={person} data-key='id' loading={loading}
            
            selectionMode={'checkbox'}
            selection={selection} onSelectionChange={(e)=>setSelection(e.value)}
              header={header}
              showGridlines
              paginator rows={show}
              removableSort
              tableStyle={{ minWidth: '100%' }}
              globalFilterFields={['id', 'name', 'birthdate', 'deathdate', 'gender', 'national', 'status']}
              emptyMessage="No customers found."
              filters={filters} 
            > 
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
         
              <Column field='id' header='id'filter sortable  style={{ minWidth: '7rem' }}   />
              <Column field='name' header='name' sortable filterPlaceholder="Search"  filter style={{ minWidth:'12rem', maxWidth: '24rem' }} />
              <Column field='birthdate' header='birthdate' sortable filter  dataType='date'  style={{ minWidth: '12rem' }}   />
              <Column field='deathdate' header='deathdate' sortable filter  dataType='date' style={{ minWidth: '12rem' }} />
              <Column field='national' header='national' sortable filterPlaceholder="Search" filter style={{ minWidth: '12rem' }} />
              <Column field='gender' header='gender' filter  sortable filterElement={genderFilter} body={genderStatus} style={{ minWidth: '12rem' }}/>
              <Column field='status' header='status' filter sortable filterElement={statusFilter} body={itemStatus}   style={{ minWidth: '12rem' }}   />
              <Column field='img' header='img' body={itemImage}    style={{ minWidth: '40rem' }}   />
              
            </DataTable>
          </section>

        </Col>

       
        
      </Row>
    </Container>
  )
}
