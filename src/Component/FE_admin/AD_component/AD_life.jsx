import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav'
import { DataTable,Button, Column ,Dropdown,InputText,FilterMatchMode, FilterOperator,Tag } from 'primereact'
import { BsSearch, BsGear, BsTrashFill ,BsChevronDoubleRight} from "react-icons/bs";
import { BsDatabaseFillAdd } from "react-icons/bs";
import AD_life_modal from './AD_life_modal';
import {RiFilterOffFill  } from "react-icons/ri";
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function AD_life() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!Cookies.get('login')){
          navigate('/login')
        }
       })
       const toast = useRef(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [global, setGlobal] = useState('')
    const [selection, setSelection] = useState([]);
    const showModal = useRef()
    const showModalEdit = useRef()
    const [showNav,setShowNav]=useState(false)
    const [person,setPerson]=useState([])
    const [filters, setFilters] = useState(
        {
            global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            person_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            life: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            childhood: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            education: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            experiment: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            struggles: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            time_line: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            personalities: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            chievements_detail: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            quote: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
            books: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        }
    )
    useEffect(() => {
      (async()=>await Load())();
      (async()=>await LoadPerson())()
        setLoading(false)

    }, [])
// Ham get data
    async function Load() {
        const result= await axios.get('http://127.0.0.1:8000/api/life');
        setData(result.data)
    }
    async function LoadPerson() {
        const result= await axios.get('http://127.0.0.1:8000/api/person');
        setPerson(result.data)
    }
    
   // Ham disable
   const handleDisable=()=> {
        selection.map(item=> {
            disableLife(item);
            setSelection(selection.filter(item=>item !== item))
        })
   }
   async function disableLife(item) {
    try {
        await axios.put('http://127.0.0.1:8000/api/updatelife/'+item.id,{
            status: 'disable'
        })
     showSuccess('disable success')
        Load()
    }
    catch(err) {
      

            showError(err.message)
      
    }
   } 
    // hàm set Init FIlter
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            birthdate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            deathdate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            gender: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            national: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        })
        setGlobal('');
    }

    const clearFilter = () => {
        initFilters();
    };

    // Search Global function
    const handleGlobalSearch = (e) => {
        const value = e.target.value;
        let _filter = { ...filters };
        _filter['global'].value = value;
        setFilters(_filter);
        setGlobal(value);
    }
     // Toast
  const showSuccess = (e) => {
    toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
   
  }
  const showError = (e) => {
    toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
  }
//  handle selection
const handelSelection= ()=> {
    setSelection('')
}

    const renderHeader = () => {
        return (
            <div className='d-flex justify-content-around  AD-header mt-3'>
                 <div  className='d-none show-1000 mb-3 row  '>
          
          <section className=' fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
      <h1 className='d-inline-block text-center col-10 '>LIFE STORY</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
            <BsChevronDoubleRight />
          </section>
                <section className='jutify-content-center'>
                    <span className="p-input-icon-left  mb-3 d-inline-flex" >
                        <InputText className='me-1 ' value={global} placeholder='search keyword' onChange={handleGlobalSearch} />
                        <BsSearch className="pi pi-search" />
                     
                    </span>
                    
                <Button type="button" label="Clear" outlined onClick={clearFilter} className='mb-3' >
                            <RiFilterOffFill />
                        </Button>
                </section>


                            
                <h1 className='hidden-1000'>LIFE STORY</h1>
                <section style={{ minWidth: '25rem' }}>

                    <Button className='me-3' label="ADD LIFE" severity='info' ref={showModal}>
                        <BsDatabaseFillAdd className='ms-2' />
                    </Button>
                    {selection.length === 1 && (
                        <>

                            <Button className='me-3' label="EDIT" severity='warning' ref={showModalEdit}>
                                <BsGear className='ms-2' />

                            </Button>
                            <AD_life_modal toast={toast} selection={handelSelection} Load={Load} value={selection[0]} title={'EDIT LIFE'} show={showModalEdit} />
                        </>
                    )}

                    {selection.length >= 1 && (

                        <Button onClick={handleDisable} className='' label="disable" severity='danger' ref={showModal}>
                            <BsTrashFill className='ms-2' />
                        </Button>
                    )}
                </section>
            </div>
        )
    }
    const header = renderHeader;

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

      const handlePerson=(e)=> {
            let storePerson=person.filter(item=>item.id===e.person_id);
       
            if(storePerson.length>0) {
                return storePerson[0].name
            }
       
      }
  

    return (
        <Container fluid className='wrapper' >
            <Toast ref={toast} />
               <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>

            <Row>
            <Col lg={2}   className='padding-0 d-xl-flex d-lg-none d-xs-none d-sm-none xs-none'>
          <AD_nav />
        </Col>
                <Col className='bg-content col-xl-10  col-md-12'>
                    <div>
                        {}
                    </div>
                    <section className='card'>
                        <DataTable value={data} data-key='id' loading={loading}
                            showGridlines
                            paginator rows={5}
                            header={header}
                            rowsPerPageOptions={[2, 5, 10, 25, 50]}
                            emptyMessage="No customers found."
                            tableStyle={{ minWidth: '50rem' }}
                            globalFilterFields={['id', 'person_id', 'childhood', 'education', 'experiment', 'struggles', 'time_line', 'personalities', 'achievements_detail', 'quote', 'books']}
                            filters={filters}
                            removableSort
                            selectionMode={'checkbox'} selection={selection} onSelectionChange={e => setSelection(e.value)}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                
                            <Column field='person_id' body={handlePerson} filter sortable header='person name' style={{ minWidth: '12rem' }} />
                            <Column field='life' filter header='life' style={{ minWidth: '70rem' }} />
                            <Column field='childhood' filter header='childhood' style={{ minWidth: '24rem' }} />
                            <Column field='education' filter header='education' style={{ minWidth: '70rem' }} />
                            <Column field='experiment' filter header='experiment' style={{ minWidth: '70rem' }} />
                            <Column field='struggles' filter header='struggles' style={{ minWidth: '70rem' }} />
                            <Column field='time_line' filter header='time_line' style={{ minWidth: '70rem' }} />
                            <Column field='personalities' filter header='personalities' style={{ minWidth: '70rem' }} />
                            <Column field='achievements_detail' filter header='achievements_detail' style={{ minWidth: '70rem' }} />
                            <Column field='quote' filter header='quote' style={{ minWidth: '12rem' }} />
                            <Column field='books'  filter header='book' style={{ minWidth: '12rem' }} />
                          
                            <Column field='status' header='status'  body={itemStatus}/>
                        </DataTable>
                    </section>

                </Col>
            </Row>
            <AD_life_modal toast={toast} title="ADD NEW LIFE" Load={Load} show={showModal} />
        </Container>
    )
}
