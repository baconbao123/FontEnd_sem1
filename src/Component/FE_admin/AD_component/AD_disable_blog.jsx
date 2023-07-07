import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsPlusLg,BsChevronDoubleRight} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';
import axios from 'axios';
import AD_nav from '../Layout/AD_nav';
import AD_hidden_nav from '../Layout/AD_hidden_nav';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { BlockUI } from 'primereact/blockui';
import Swal from 'sweetalert2';
import ReadMore from 'react-read-more-read-less';

export default function AD_disable_blog() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
   useEffect(() => {
    document.title = 'Admin-Disable-Blog';
  }, []);
// Khởi tạo các biến
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true)
  const [showNav,setShowNav]=useState(false)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    title: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
   created_at: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
  
   author: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
  
    content: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    status: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
  })
  
  const [global, SetGlobal] = useState('');
  const [statusName]=useState(['success','disbale']);

  const [selection,setSelection]=useState([]);
  const [show,setShow]=useState(10);
  const [showRow]=useState([5,10,15,20,30]);
  const [storeImg,setStoreImg]=useState([])
  const [blocked,setBlocked]=useState()
  const toast=useRef()
  const showModalButoon=useRef(null)
  const showModalEdit=useRef('')
    // Toast
    const showError = (e) => {
      toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
    }
    const showSuccess = (e) => {
      toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
      
    }
  
    
   
  // fectch data

  useEffect(() => {
    (async()=>await Load())();

    setLoading(false);

  }, [])

  async function  Load() {
   
    const result=await axios.get('http://127.0.0.1:8000/api/disableblog');
        setBlog(result.data);
  }
   // Ham active
   const handleActive=()=> {
    setBlocked(true)
    Promise.all(
      selection.map((item) => {
        setSelection(selection.filter(item=>item !== item))
        return activeperson(item);
      })
    ).then(() => {
     
      Load();
      setBlocked(false);
    }).catch((err) => {
      showError(err.message);
    });
  }

async function activeperson(item) {

    
    try {
        
      await axios.put('http://127.0.0.1:8000/api/updateblog/' +item.id,{
    
        status: 'active',
   
      }) 
     showSuccess( ' active  success')
      Load();
    }
    catch (err) {
     showError(err.message)
    }
}

   // Ham delete

  
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
            return deleteperson(item);
          })
        ).then(() => {
        
          Load();
          setBlocked(false);
        }).catch((err) => {
          showError(err.message);
        });
      
      }
    });
  };
  
  async function deleteperson(item) {
    try {
      await axios.delete('http://127.0.0.1:8000/api/deleteblog/' + item.id);
      showSuccess('Delete success');
      Load();
    } catch (err) {
      showError(err.message);
    }
    
  }

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
      title: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      created_at: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    
     author: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    
      content: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
      status: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
    })
    SetGlobal('');
  }
  
  const clearFilter = () => {
    initFilters();
  };

  // const handle selection
  const handleSelection=()=>{
    setSelection('')
  }

// render header
  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-around AD-header">
        <div  className='d-none show-1000 mb-3 row  '>
          
          <section className=' fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
      <h1 className='d-inline-block text-center col-10 '>DISABLE BLOG</h1>
      </div>
      <section className=' fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu' onClick={e=>setShowNav(true)}>
          <BsChevronDoubleRight />
        </section>
        <section>

        <span className="p-input-icon-left mb-3">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
         
        </span>
       
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className=' mb-3  ms-2 AD-clear-filter' >
            <RiFilterOffFill  className='ms-2' />
             </Button>
        </section>
        <h1 className='hidden-1000'> DISABLE BLOG</h1>
     
        <section style={{minWidth:'24rem'}}>

          {selection.length>=1&&(
            <>
          <Button onClick={handleActive}   className='ms-3' type='button' label="Active" severity='success' >
            <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
          <Button  onClick={confirmDelete}  className='ms-3' type='button' label="Delete" severity='danger' >
            <BsTrashFill   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
            </>
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
 
  const statusDropdown=(e)=> {
    return <Tag value={e} severity={e} />
  }

  
  // Hàm tạo ra dropdown filter
  const statusFilter=(event)=>{
    return (

      <Dropdown value={event.value} options={statusName} onChange={(e)=>event.filterApplyCallback(e.value)} itemTemplate={statusDropdown}  placeholder='select one' showClear />
    )
  }
 
 
  const itemImage=(e)=> {
   if(e.img) {

     let store=e.img.split(',')
     
     
    return (
     <>
     
        <img className='d-inline-flex ms-2 mt-1' alt={store[0]} src={"http://127.0.0.1:8000/api/images/"+store[0]}  width='150'/>
        <img className='d-inline-flex ms-2 mt-1' alt={store[1]} src={"http://127.0.0.1:8000/api/images/"+store[1]}  width='150'/>
        <img className='d-inline-flex ms-2 mt-1' alt={store[2]} src={"http://127.0.0.1:8000/api/images/"+store[2]}  width='150'/>

     
     </>
 
    )
   }   }

   const avatarImage=(e)=> {
    
    if(e.avatar) {
      return(
        <>
          <img className='d-inline-flex ms-2 mt-1' alt={e.avatar} src={"http://127.0.0.1:8000/api/images/" + e.avatar} width='100' />

        </>
      )
    }
  }

  const bodyShowMore=(e)=> {
    if(e) {

      return (
       <ReadMore
       charLimit={100}
       readMoreText="Read More"
       readLessText="See Less"
       className='text-primary'
     >
       {e}
     </ReadMore>
      )
    }
    
 }
  return (
    <Container fluid className='wrapper'>
        <BlockUI blocked={blocked}>
      <Toast ref={toast}/>
       <Row className={`fixed-top h-100 d-xl-none ${showNav?'d-flex':'d-none'}` }>
       <Col   md={4} xs={8} className=' padding-none   h-100 sticky-top  d-inline-block'> <AD_hidden_nav page={'Disable blog'}/></Col>
      <Col md={8} xs={4} className='hidden-color ps-1 padding-none' onClick={()=>setShowNav(false)}> </Col>
      </Row>
      <Row>
      <Col lg={2} className='padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none'>
          <AD_nav page={'Disable blog'} />
        </Col>
        <Col className='bg-content col-xl-10  col-md-12'>
        
          <section className='card'>

            <DataTable value={blog} data-key='id' loading={loading}
            
            selectionMode={'checkbox'}
            selection={selection} onSelectionChange={(e)=>setSelection(e.value)}
              header={header}
              showGridlines
              paginator rows={show}
              removableSort
              tableStyle={{ minWidth: '100%' }}
              globalFilterFields={['id', 'title', 'created_at', 'content', 'author', 'status']}
              emptyMessage="No customers found."
              filters={filters} 
            > 
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
         
           
              <Column field='title' header='title' sortable filterPlaceholder="Search"  filter style={{ minWidth:'12rem', maxWidth: '24rem' }} />
              <Column field='created_at' header='post date' sortable filter  style={{ minWidth: '12rem' }}   />
              <Column field='content' header='content' body={e=>bodyShowMore(e.content)} sortable filterPlaceholder="Search" filter style={{ minWidth: '20rem' }} />
              <Column field='author' header='author' sortable filterPlaceholder="Search" filter style={{ minWidth: '12rem' }} />

              <Column field='status' header='status'  filterElement={statusFilter} body={itemStatus}   style={{ minWidth: '12rem' }}   />
              <Column field='avatar' header='avatar' body={avatarImage} style={{ minWidth: '12rem' }}   />
              
              <Column field='img' header='img' 
              
              body={itemImage} 
                style={{ minWidth: '40rem' }}   />

              
            </DataTable>
          </section>

        </Col>

  
        
      </Row>
      </BlockUI>
    </Container>
  )
}
