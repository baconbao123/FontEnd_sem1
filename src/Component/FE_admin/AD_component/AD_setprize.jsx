import React, { useEffect, useState, useRef } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_prizes_modal from "../AD_component/AD_prizes_modal"
import { DataTable,Column,Tag, Button,FilterMatchMode, FilterOperator, InputText,Dropdown } from 'primereact'
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsTrophyFill} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
export default function AD_setprize() {
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
        setPrizes([
            {id:'1',nobel_year:'2022',nobel_name:'Chemistry Prize',status:'active'},
            {id:'2',nobel_year:'2002',nobel_name:'Chemistry Prize',status:'active'},
            {id:'3',nobel_year:'2002',nobel_name:'Medicine Prize',status:'active'},
            {id:'4',nobel_year:'2002',nobel_name:'Medicine Prize',status:'active'},
            {id:'5',nobel_year:'2002',nobel_name:'Medicine Prize',status:'active'},
            {id:'6',nobel_year:'2002',nobel_name:'Medicine Prize',status:'active'},
            {id:'7',nobel_year:'2002',nobel_name:'Chemistry Prize',status:'active'},
            {id:'8',nobel_year:'2002',nobel_name:'Chemistry Prize',status:'active'},
            {id:'9',nobel_year:'2002',nobel_name:'Literature Prize',status:'active'},
            {id:'10',nobel_year:'2016',nobel_name:'Literature Prize',status:'disable'},
            {id:'11',nobel_year:'2016',nobel_name:'Literature Prize',status:'disable'},
            {id:'12',nobel_year:'2016',nobel_name:'Literature Prize',status:'disable'},
            {id:'13',nobel_year:'2016',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'14',nobel_year:'2016',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'15',nobel_year:'2016',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'16',nobel_year:'2016',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'17',nobel_year:'2016',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'18',nobel_year:'2022',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'19',nobel_year:'2022',nobel_name:'Chemistry Prize',status:'disable'},
            {id:'20',nobel_year:'2022',nobel_name:'Chemistry Prize',status:'disable'},

        ])
        setLoading(false)
    },[])

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
            <h1 className='d-flex'>PRIZE</h1>
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
                <AD_prizes_modal title={"EDIT PRIZE"} show={showModalEdit}  value={selection[0]}/>

    
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
        <AD_prizes_modal title={"ADD NEW"} show={showModalButoon}/>
    </Container>
  )
}
