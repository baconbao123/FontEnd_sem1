import React, { useEffect, useState, useRef } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_prizes_modal from "../AD_component/AD_prizes_modal"
import { DataTable,Column,Tag, Button,FilterMatchMode, FilterOperator, InputText,Dropdown } from 'primereact'
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsTrophyFill,BsPlusLg} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import axios from 'axios'
export default function AD_disable_prize() {
    const [prizes,setPrizes]=useState([]);
    const [loading, setLoading] = useState(true);
    const [global, setGlobal] = useState('');
    const [selection,setSelection]=useState([]);
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
    useEffect(()=>{
      (async()=>await Load())()
        setLoading(false)
    },[])
    // ham get data
    async function Load() {
      const result= await axios.get('http://127.0.0.1:8000/api/prizedisable');
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
        alert(item.id+' success active')
        Load()
    }
    catch(err) {
        alert(err)
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
          
    
        alert(item.id+' success deleted !')
        Load()
    }
    catch(err) {
        alert(err)
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
          <div className="d-flex justify-content-around">
            <span className="p-input-icon-left">
              <BsSearch className="pi pi-search" />
              <InputText value={global} onChange={handleGlobalSearch} placeholder="Keyword Search" />
           
              <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
                <RiFilterOffFill  />
                 </Button>
             
            </span>
            <h1 className='d-flex'> DISABLE PRIZE</h1>
      
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
        <Row>
            <Col lg={2}>
                <AD_nav/>
            </Col>
            <Col lg={10}>
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
                   <Column sortable filter field='id' header='id' />
                   <Column sortable filter field='nobel_year' header='nobel year' />
                   <Column sortable filter field='nobel_name' header='nobel name' />
                   <Column field='status' header='status' body={itemStatus} />



                </DataTable>
            </Col>
        </Row>
   
    </Container>
  )
}
