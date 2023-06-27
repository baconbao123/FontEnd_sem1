import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import { DataTable } from 'primereact'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact'
import { Dropdown } from 'primereact/dropdown';
import { BsSearch, BsTrashFill,BsPlusLg } from "react-icons/bs";
import { InputText } from 'primereact/inputtext';
import Cookies from 'js-cookie';
import AD_life_modal from './AD_life_modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
export default function AD_disable_life() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState('')
  const [selection, setSelection] = useState([]);
  const showModal = useRef()
  const showModalEdit = useRef()
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
    (async()=>await Load())()

    
    setLoading(false)

  }, [])
// ham get data
    async function Load() {
      const result= await axios.get('http://127.0.0.1:8000/api/lifedisable')
      setData(result.data)
    }
// Ham active
    const handleActive=()=> {
      selection.map(item=> {
        activelife(item);
        setSelection(selection.filter(item=>item !== item));
      })
    }
    async function activelife (item) {
      try {
        await axios.put('http://127.0.0.1:8000/api/updatelife/'+item.id,{
            status: 'active'
        })
        alert(item.id+' active success')
        Load()
    }
    catch(err) {
        alert(err)
    }}

    // Ham active
    const handleDelete=()=> {
      selection.map(item=> {
        deletelife(item);
        setSelection(selection.filter(item=>item !== item));
      })
    }
    async function deletelife (item) {
      try {
        await axios.put('http://127.0.0.1:8000/api/deletelife/'+item.id,{
            status: 'active'
        })
        alert(item.id+' delete success')
        Load()
    }
    catch(err) {
        alert(err)
    }}
    
    
  // global search
  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    let _filter = { ...filters };
    _filter['global'].value = value;
    setFilters(_filter);
    setGlobal(value);
  }
  const renderHeader = () => {
    return (
      <div className='d-flex justify-content-around'>
        <section className='jutify-content-center'>
          <span className="p-input-icon-left d-inline-flex" >
            <BsSearch className="pi pi-search" />
            <InputText value={global} placeholder='search keyword' onChange={handleGlobalSearch} />
          </span>
        </section>
        <h1 className='d-inline-flex jutify-content-center'>LIFE STORY DISABLE</h1>
        <section style={{ minWidth: '24rem' }}>



          {selection.length >= 1 && (
            <>

          <Button onClick={handleActive} ref={showModalEdit} className='ms-3' type='button' label="active" severity='success' >
            <BsPlusLg className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            <Button  onClick={handleDelete} className='ms-3' type='button' label="Delete" severity='danger' >
              <BsTrashFill className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            </>

          )}

        </section>
      </div>
    )
  }
  const header = renderHeader;





  return (
    <Container fluid className='wrapper' >
      <Row>
        <Col lg={2} className='padding-0'>
          <AD_nav />
        </Col>
        <Col lg={10}>

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
              <Column field='id' filter sortable header='id' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='person_id' filter sortable header='person_id' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='life' filter header='life' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='childhood' filter header='childhood' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='education' filter header='education' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='experiment' filter header='experiment' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='struggles' filter header='struggles' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='time_line' filter header='time_line' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='personalities' filter header='personalities' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='achievements_detail' filter header='achievements_detail' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='quote' filter header='quote' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='book' filter header='book' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
            </DataTable>
          </section>

        </Col>
      </Row>
      
    </Container>
  )
}
