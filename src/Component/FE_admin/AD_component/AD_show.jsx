import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsPersonAdd} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';

import AD_nav from '../Layout/AD_nav';
import AD_modal from './AD_modal';

export default function AD_show() {
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
  const [selection,setSelection]=useState(false);
  const [show,setShow]=useState(10);
  const [showRow]=useState([5,10,15,20,30]);


  const showModalButoon=useRef(null)
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
    setLoading(false);
  }, [])
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
      <div className="">
        <span className="p-input-icon-left">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
       
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
            <RiFilterOffFill  />
             </Button>
         
        </span>
        <span className='AD-show-dropdown'>

        show
        <Dropdown  value={show} options={showRow} onChange={e=>setShow(e.value)} />
        </span>

        <Button ref={showModalButoon} type='button' label="ADD"  severity='info'>
          <BsPersonAdd/> </Button>
        
      </div>
    );

  };
  const header = renderHeader;
// hàm tạo ra tag status
  const  itemStatus=(e)=> {
    return <Tag value={e.status} severity={e.status}/>
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

 
  return (
    <Container fluid className='wrapper'>
      <Row>
        <Col lg={2} md={2} className='padding-0'>
          <AD_nav />
        </Col>
        <Col lg={10} md={10} className='bg-content'>
          <div className='title-content '>
            <h1> Person</h1>
          </div>
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
              filters={filters} 
            > 
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column field='id' header='id'filter sortable  style={{ minWidth: '7rem' }} emptyMessage="No customers found."  />
              <Column field='name' header='name' sortable filterPlaceholder="Search"  filter style={{ minWidth:'12rem', maxWidth: '24rem' }} />
              <Column field='birthdate' header='birthdate' sortable filter  dataType='date'  style={{ minWidth: '12rem' }}   />
              <Column field='deathdate' header='deathdate' sortable filter  dataType='date' style={{ minWidth: '12rem' }} />
              <Column field='national' header='national' sortable filterPlaceholder="Search" filter style={{ minWidth: '12rem' }} />
              <Column field='gender' header='gender' filter  sortable filterElement={genderFilter} body={genderStatus} style={{ minWidth: '12rem' }}/>
              <Column field='status' header='status' filter sortable filterElement={statusFilter} body={itemStatus}   style={{ minWidth: '12rem' }}   />
            </DataTable>
          </section>

        </Col>

        <AD_modal show={showModalButoon} />

        
      </Row>
    </Container>
  )
}
