import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';

import AD_nav from '../Layout/AD_nav';
import AD_modal from './AD_show_modal';

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
  const [statusName]=useState(['success','sucess','danger']);
  const [genderName]=useState(['male','female']);
  const [selection,setSelection]=useState([]);
  const [show,setShow]=useState(10);
  const [showRow]=useState([5,10,15,20,30]);
  
  const showModalButoon=useRef(null)
  const showModalEdit=useRef('')
  useEffect(() => {
    setPerson([
      { id: '1', name: 'nguyen', birthdate: '2004-06-16', deathdate: 'null', gender: 'male', national: 'VietName', status: 'active',img:'hello' },
      { id: '2', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active',img:'hello' },
      { id: '3', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active',img:'hello' },
      { id: '4', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable' ,img:'hello'},
      { id: '5', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable' ,img:'hello'},
      { id: '6', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'disable' ,img:'hello'},
      { id: '7', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable' ,img:'hello'},
      { id: '8', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'disable' ,img:'hello'},
      { id: '9', name: 'Ngoc', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active' ,img:'hello'},
      { id: '10', name: 'Thuy', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active' ,img:'hello'},
      { id: '11', name: 'nguyen', birthdate: '15/6/2004', deathdate: 'Null', gender: 'male', national: 'VietName', status: 'active' ,img:'hello'},
      { id: '12', name: 'Long', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'US', status: 'active',img:'hello' },
      { id: '13', name: 'Ang', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active' ,img:'hello'},
      { id: '14', name: 'Ngoc', birthdate: '15/6/2003', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active' ,img:'hello'},
      { id: '15', name: 'Thuyfdsafsadffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', birthdate: '15/6/2004', deathdate: 'Null', gender: 'female', national: 'VietName', status: 'active' ,img:'hello'}
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
      <div className="d-flex justify-content-around">
        <span className="p-input-icon-left">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
       
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
            <RiFilterOffFill  className='ms-2' />
             </Button>
         
        </span>
        <h1 className='d-flex'>PERSON</h1>
        <span className='AD-show-dropdown'>

        show
        <Dropdown  className='ms-2' value={show} options={showRow} onChange={e=>setShow(e.value)} />
        </span>
        <section style={{minWidth:'24rem'}}>
        <Button ref={showModalButoon} className='d-inline-flex justify-content-end ' type='button' label="ADD"  severity='info'>
          <BsPersonAdd className='ms-2  p-input-icon-left'/> </Button>

          {selection.length===1&&(
         <>
          <Button ref={showModalEdit} className='ms-3' type='button' label="edit" severity='warning' >
            <BsGear   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            <AD_modal title="EDIT" show={showModalEdit} value={selection[0]}/>

         </>
          )}

          {selection.length>=1&&(
          <Button className='ms-3' type='button' label="disable" severity='danger' >
            <BsTrashFill    className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>

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

      <Dropdown value={event.value} options={statusName} onChange={(e)=>event.filterApplyCallback(e.value)} itemTemplate={statusDropdown}  placeholder='select one' showClear />
    )
  }
  const genderFilter=(event)=> {
     return (
      <Dropdown value={event.value} options={genderName} onChange={(e)=>event.filterApplyCallback(e.value)} itemTemplate={genderDropdown } showClear placeholder='select one'/>
     )

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
              <Column field='img' header='img'    style={{ minWidth: '12rem' }}   />
              
            </DataTable>
          </section>

        </Col>

        <AD_modal title={"ADD NEW"} show={showModalButoon} />
        
      </Row>
    </Container>
  )
}
