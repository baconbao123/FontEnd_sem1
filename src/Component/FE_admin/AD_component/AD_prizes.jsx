import React, { useEffect, useState, useRef } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav'
import AD_prizes_modal from "../AD_component/AD_prizes_modal"
import { DataTable,Column,Tag, Button,FilterMatchMode, FilterOperator, InputText,Dropdown } from 'primereact'
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsTrophyFill,BsChevronDoubleRight} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import axios from 'axios'
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function AD_prizes() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
   const [showNav,setShowNav]=useState(false)
    const [prizes,setPrizes]=useState([]);
    const [loading, setLoading] = useState(true);
    const [global, setGlobal] = useState('');
    const [selection,setSelection]=useState([]);
    const  showModalButoon=useRef()
    const showModalEdit=useRef()
    const toast = useRef(null);
    const [filters,setFilters]=useState(
        {
            global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
           nobel_year: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nobel_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH}] },

        }
    )
    useEffect(()=>{
       (async()=>await Load())()
        setLoading(false)
    },[])
    // Toast
  const showSuccess = (e) => {
    toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
   
  }
  const showError = (e) => {
    toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
  }
  // get data
   async function Load() {
     const result= await axios.get('http://127.0.0.1:8000/api/prize');
     setPrizes(result.data)
   }
  //  ham disable
  const handleDisable=()=>{
    selection.map(item=> {
      disableprize(item)
      setSelection(selection.filter(item=>item !== item))
    })
  }
  async function disableprize(item) {
    try {
      await  axios.put('http://127.0.0.1:8000/api/updateprize/'+item.id,{
        
          status: 'disable'
      })
      showSuccess('disable sucess')
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

    // const handle selection
    const handleSelection = () => {
      setSelection('')
    }
// Search global
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
        
      <h1 className='d-inline-block text-center col-10 '>PRIZE</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
            <BsChevronDoubleRight />
          </section>
            <span className="p-input-icon-left mb-3">
              <BsSearch className="pi pi-search" />
              <InputText value={global} onChange={handleGlobalSearch} placeholder="Keyword Search" />
           
              <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='ms-1' >
                <RiFilterOffFill  />
                 </Button>
             
            </span>
            <h1 className='hidden-1000'>PRIZE</h1>
            <span className='AD-show-dropdown'>
    

        
            </span>
            <section style={{minWidth:'24rem'}}>
            <Button
             ref={showModalButoon}
             className='d-inline-flex justify-content-end' type='button' label="ADD"  severity='info'>
              <BsTrophyFill className='ms-2'/> </Button>
              {selection.length===1&&(
             <>
              <Button 
              ref={showModalEdit} 
              className='ms-3' type='button' label="edit" severity='warning' >
                <BsGear   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
                <AD_prizes_modal setSelection={handleSelection}  toast={toast}  Load={Load} title={"EDIT PRIZE"} show={showModalEdit}  value={selection[0]}/>

    
             </>
              )}
    
              {selection.length>=1&&(
              <Button onClick={handleDisable} className='ms-3' type='button' label="disable" severity='danger' >
                <BsTrashFill    className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
    
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
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>
        <Row>
        <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav />
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
        <AD_prizes_modal setSelection={handleSelection} toast={toast} Load={Load} title={"ADD NEW"} show={showModalButoon}/>
    </Container>
  )
}
