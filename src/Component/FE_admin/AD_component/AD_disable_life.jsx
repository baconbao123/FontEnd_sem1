import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import AD_hidden_nav from '../Layout/AD_hidden_nav'
import { DataTable } from 'primereact'
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Button } from 'primereact'
import { Dropdown } from 'primereact/dropdown';
import { BsSearch, BsTrashFill,BsPlusLg,BsChevronDoubleRight } from "react-icons/bs";
import { InputText } from 'primereact/inputtext';
import Cookies from 'js-cookie';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BlockUI } from 'primereact/blockui';
import { useNavigate } from 'react-router-dom'
export default function AD_disable_life() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
   useEffect(() => {
    document.title = 'Admin-Disable-Life';
  }, []);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState('')
  const [selection, setSelection] = useState([]);
  const [showNav,setShowNav]=useState(false)
  const showModal = useRef()
  const [person,setPerson]=useState([])
  const showModalEdit = useRef()
  const toast =useRef()
  const [blocked,setBlocked]=useState(false)
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
// ham get data
    async function Load() {
    
      const result= await axios.get('http://127.0.0.1:8000/api/lifedisable')
      setData(result.data)
    }
    async function LoadPerson() {
      
      const result= await axios.get('http://127.0.0.1:8000/api/allperson');
      setPerson(result.data)
  }
  
      // Toast
  const showSuccess = (e) => {
    toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
   
  }
  const showError = (e) => {
    toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
  }
// Ham active
    const handleActive=()=> {
      setBlocked(true)
      Promise.all(
        selection.map((item) => {
          setSelection(selection.filter(item=>item !== item))
          return activelife(item);
        })
      ).then(() => {
      
        Load();
        setBlocked(false);
      }).catch((err) => {
        showError(err.message);
      });
    }
    async function activelife (item) {
      try {
        await axios.put('http://127.0.0.1:8000/api/updatelife/'+item.id,{
            status: 'active'
        })
        showSuccess(' active success')
        Load()
    }
    catch(err) {
   

        showError(err.message)
     
    }}
// ham handle delete
    
    
    const confirmDelete = (item) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          setBlocked(true)
          Promise.all(
            selection.map((item) => {
              setSelection(selection.filter(item=>item !== item))
              return deletelife(item);
            })
          ).then(() => {
        
            setBlocked(false);
          }).catch((err) => {
            showError(err.message);
          });
        }
      });
    };
    
    async function deletelife(item) {
      try {
        await  axios.put('http://127.0.0.1:8000/api/deletelife/' + item.id);
        showSuccess('Delete success');
        Load();
      } catch (err) {
        showError(err.message);
      }
     
    }
    
    // handle person
    const handlePerson=(e)=> {
      let storePerson=person.filter(item=>item.id===e.person_id);
 
      if(storePerson.length>0) {
          return storePerson[0].name
      }
 
}

    
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
      <div className='d-flex justify-content-around AD-header'>
           <Toast ref={toast} />
          <div  className='d-none show-1000 mb-3 row  '>
          
          <section className=' fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
      <h1 className='d-inline-block text-center col-10 '>LIFE STORY DISABLE</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
        <section className='jutify-content-center'>
          <span className="p-input-icon-left d-inline-flex" >
            <BsSearch className="pi pi-search" />
            <InputText value={global} placeholder='search keyword' onChange={handleGlobalSearch} />
          </span>
        </section>
        <h1 className=' jutify-content-center hidden-1000'>LIFE STORY DISABLE</h1>
        <section className='mt-3' style={{ minWidth: '24rem' }}>



          {selection.length >= 1 && (
            <>

          <Button onClick={handleActive} ref={showModalEdit} className='ms-3' type='button' label="active" severity='success' >
            <BsPlusLg className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            <Button  onClick={confirmDelete} className='ms-3' type='button' label="Delete" severity='danger' >
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
        <BlockUI blocked={blocked}>
        <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav page={'Disable life'}/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>
      <Row>
      <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav page={'Disable life'} />
        </Col>
        <Col className='bg-content col-xl-10  col-md-12'>

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
           
              <Column field='person_id' filter sortable header='person name' body={handlePerson} style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='life' filter header='life' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='childhood' filter header='childhood' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='education' filter header='education' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='experiment' filter header='experiment' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='struggles' filter header='struggles' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='time_line' filter header='time_line' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='personalities' filter header='personalities' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='achievements_detail' filter header='achievements_detail' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='quote' filter header='quote' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
              <Column field='books' filter header='book' style={{ minWidth: '12rem', maxWidth: '24rem' }} />
            </DataTable>
          </section>

        </Col>
      </Row>
      </BlockUI>
    </Container>
  )
}
