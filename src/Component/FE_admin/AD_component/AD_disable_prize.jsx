import React, { useEffect, useState, useRef } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav'
import AD_prizes_modal from "../AD_component/AD_prizes_modal"
import { DataTable,Column,Tag, Button,FilterMatchMode, FilterOperator, InputText,Dropdown } from 'primereact'
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsTrophyFill,BsPlusLg,BsChevronDoubleRight} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
export default function AD_disable_prize() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
    const [prizes,setPrizes]=useState([]);
    const [loading, setLoading] = useState(true);
    const [global, setGlobal] = useState('');
    const [selection,setSelection]=useState([]);
    const [showNav,setShowNav]=useState(false);
    const toast=useRef(null)
    const  showModalButoon=useRef()
    const showModalEdit=useRef()
    const [filters,setFilters]=useState(
        {
            global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
           nobel_year: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nobel_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH}] },

        }
    )
      // Toast
  const showSuccess = (e) => {
    toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
   
  }
  const showError = (e) => {
    toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
  }
    useEffect(()=>{
      (async()=>await Load())()
        setLoading(false)
    },[])
    // ham get data
    async function Load() {
      const instance = axios.create({
        timeout:1000 
      });
      const result= await instance.get('http://127.0.0.1:8000/api/prizedisable');
      setPrizes(result.data)
    }
    // ham active
    const handleActive=()=>{
      selection.map(item=> {
        activeprize(item)
        setSelection(selection.filter(item=>item !== item))
      })
    }
    async function activeprize(item) {
      try {
        await  axios.put('http://127.0.0.1:8000/api/updateprize/'+item.id,{
          
            status: 'active'
        })
        showSuccess(' success active')
        Load()
    }
    catch(err) {
  

        showError(err.message)
  
    }
    }
    // ham delete prize
    const handleDelete=()=>{
      selection.map(item=> {
       deleteprize(item)
        setSelection(selection.filter(item=>item !== item))
      })
    }
    async function deleteprize(item) {
      try {
        await  axios.delete('http://127.0.0.1:8000/api/deleteprize/'+item.id)
          
    
    showSuccess(' success deleted !')
        Load()
    }
    catch(err) {
  

        showError(err.message)
   
    }
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
      <h1 className='d-inline-block text-center col-10 '>DISABLE PRIZE</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
        <section>

            <span className="p-input-icon-left mb-3">
              <BsSearch className="pi pi-search" />
              <InputText  className='' value={global} onChange={handleGlobalSearch} placeholder="Keyword Search" />
           
             
            </span>
              <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter mb-3 ms-3' >
                <RiFilterOffFill  />
                 </Button>
        </section>
            <h1 className='hidden-1000'> DISABLE PRIZE</h1>
      
            <section style={{minWidth:'24rem'}}>
          
              {selection.length>=1&&(
             <>
              <Button 
              onClick={handleActive}
              className='ms-3' type='button' label="Active" severity='success' >
                <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
           
                <Button  onClick={handleDelete} className='ms-3' type='button' label="Delete" severity='danger' >
                <BsTrashFill    className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
    
             </>
              )}
    
            
            </section>
            
          </div>
        );
    
      };
      const header=renderHeader;
    // status
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

  return (
    <Container fluid className='wrapper'>
         <Toast ref={toast} />
        <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav page={'Disable prizes'}/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>

        <Row>
        <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav page={'Disable prizes'} />
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
                 selection={selection} onSelectionChange={(e)=>setSelection(e.value)}
                >
                      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                
                   <Column sortable filter field='nobel_year' header='nobel year' />
                   <Column sortable filter field='nobel_name' header='nobel name' />
                   <Column field='status' header='status' body={itemStatus} />



                </DataTable>
            </Col>
        </Row>
   
    </Container>
  )
}
