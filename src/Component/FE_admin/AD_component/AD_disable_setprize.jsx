import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { DataTable, Column, Tag, Button,  InputText, Dropdown } from 'primereact'
import { BsSearch, BsPersonAdd, BsGear, BsTrashFill, BsTrophyFill,BsPlusLg ,BsChevronDoubleRight } from "react-icons/bs";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { RiFilterOffFill } from "react-icons/ri";
import axios from 'axios';
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav';
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
export default function AD_disable_setprize() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState('');
  const [selection, setSelection] = useState([]);
  const [showNav,setShowNav]=useState(false)
  const [person,setPerson]=useState([]);
  const [allPrize,setAllPrize]=useState([])
  const showModalButoon = useRef()
  const toast= useRef()
 
  const [filters, setFilters] = useState(
    {
      global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id_nobel: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      id_person: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      motivation: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      nobel_share: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    }
  )
    // Toast
    const showSuccess = (e) => {
      toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
     
    }
    const showError = (e) => {
      toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
    }
  useEffect(() => {
    
    (async()=>await Load())();
    (async()=>await LoadPrize())();
    (async()=>await LoadPerson())();


    setLoading(false)
  }, [])
 // get data
 async function Load() {
  const instance = axios.create({
    timeout: 3000 
  });
  const result= await instance.get('http://127.0.0.1:8000/api/pndisable');
  setPrizes(result.data) 
}

async function LoadPrize() {
  const instance = axios.create({
    timeout: 3000 
  });
  const result = await instance.get('http://127.0.0.1:8000/api/nobelprize');
  setAllPrize(result.data)
}
async function LoadPerson() {
  const instance = axios.create({
    timeout: 3000 
  });
  const result = await instance.get('http://127.0.0.1:8000/api/personprize');
  let data=result.data.filter(item=>{
      if(item.life_story)return item
  })
 
  setPerson(data)
}

// handle body nobel
const handlePerson=(e)=> {
 

    let storePerson=person.filter(item=>item.id===e.person_id)
    if (storePerson.length>0) {
      
      return storePerson[0].name
    }

}

const handleNobel=(e)=> { 
 

    let storeNobel=allPrize.filter(item=>item.id===e.nobel_id)
    
    if(storeNobel.length>0) {

      return storeNobel[0].nobel_name;
    }
  
}
const handleNobelYear=(e)=> {


    let storeNobel=allPrize.filter(item=>item.id===e.nobel_id)
    if(storeNobel.length>0) {

      return storeNobel[0].nobel_year
    }
  
}
 // ham active 
 const handleActive=() => {
  selection.map(item=>{
    activesetprize(item);
    setSelection(selection.filter(item=>item !== item))
  })
}
async function  activesetprize(item){
    try {
        await axios.put('http://127.0.0.1:8000/api/updatepn/'+item.person_id +'/'+item.nobel_id,{
          status: 'active',
        })
        Load();
        showSuccess(' sucess active')
    }
    catch(err) {
    

        showError(err.message)
    
    }
}
// Ham delete setprize

const handleDelete=() => {
  selection.map(item=>{
    deletesetprize(item);
    setSelection(selection.filter(item=>item !== item))
  })
}
async function  deletesetprize(item){
    try {
        await axios.delete('http://127.0.0.1:8000/api/deletepn/'+item.person_id +'/'+item.nobel_id)
        Load();
    showSuccess(' sucess delete')
    }
    catch(err) {
   
        showError(err.message)
   
    }
}

  // hàm set Init FIlter
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id_nobel: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      id_person: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      motivation: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      nobel_share: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    })
    setGlobal('');
  }

  const clearFilter = () => {
    initFilters();
  };

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    let _filter = { ...filters };
    _filter['global'].value = value;
    setFilters(_filter);
    setGlobal(value);
  }
  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-around AD-header">
        <div  className='d-none show-1000 mb-3 row  '>
          
          <section className=' fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
      <h1 className='d-inline-block text-center col-10 '> DISABLE SET PRIZE</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
        <section>

        <span className="p-input-icon-left  mb-3">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={handleGlobalSearch} placeholder="Keyword Search" />

        </span>

          <Button type="button" label="Clear" outlined onClick={clearFilter} className=' mb-3 ms-2 AD-clear-filter' >
            <RiFilterOffFill />
          </Button>
        </section>
        <h1 className='hidden-1000 '> DISABLE SET PRIZE</h1>
        <span className='AD-show-dropdown'>



        </span>
        <section style={{ minWidth: '24rem' }}>
        
        
            {selection.length>=1&&(
             <>
              <Button 
            onClick={handleActive}
              className='ms-3' type='button' label="Active" severity='success' >
                <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
           
                <Button onClick={handleDelete} className='ms-3' type='button' label="Delete" severity='danger' >
                <BsTrashFill    className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
    
             </>
            )}
        </section>

      </div>
    );

  };
  const header = renderHeader;
  // status
  const itemStatus = (e) => {
    let status = '';
    let value = ''
    if (e.status === 'active') {
      value = 'active'
      status = 'success'
    }
    else if (e.status === 'disable') {
      status = 'danger'
      value = 'disable'
    }
    return <Tag value={value} severity={status} />
  }

  return (
    <Container fluid className='wrapper'>
      <Toast  ref={toast}/>
       <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav page={'Disable setprizes'}/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>

      <Row>
      <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav page={'Disable setprizes'} />
        </Col>
        <Col className='bg-content col-xl-10  col-md-12'>
          <DataTable
            header={header}
            loading={loading}
            value={prizes}
            emptyMessage="No customers found."
            paginator rows={10}
            rowsPerPageOptions={[2, 5, 10, 25, 50]}
            showGridlines
            removableSort
            filters={filters}
            selection={selection} onSelectionChange={(e) => setSelection(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column sortable  field='nobel_id' body={handleNobel} header='nobel name' />
            <Column sortable  field='nobel_id' body={handleNobelYear} header='nobel year' />
            <Column sortable  field='person_id' body={handlePerson} header='person name' />
            <Column sortable filter field='motivation' header='motivation' />
            <Column sortable filter field='nobel_share' header='nobel share' />

            <Column field='status' header='status' body={itemStatus} />



          </DataTable>
        </Col>
      </Row>
   
    </Container>
  )
}
