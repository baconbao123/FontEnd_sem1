import React, { useEffect, useRef, useState } from 'react'
import { DataTable} from 'primereact'
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { Tag } from 'primereact/tag';
import { BsSearch,BsPersonAdd,BsGear,BsTrashFill,BsPlusLg} from "react-icons/bs";
import {RiFilterOffFill  } from "react-icons/ri";
import { Button } from 'primereact/button';
import axios from 'axios';
import AD_nav from '../Layout/AD_nav';
import AD_blog_modal  from './AD_blog_modal';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function AD_disable_blog() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!Cookies.get('login')){
      navigate('/login')
    }
   })
// Khởi tạo các biến
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}] },
    title: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
   created_at: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}] },
  
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

  const showModalButoon=useRef(null)
  const showModalEdit=useRef('')
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
    if (selection.length>=1) {

        selection.map((item=> {
       

            activeperson(item)
            setSelection(selection.filter(item=>item !== item))
        }))

    }
}
async function activeperson(item) {

    
    try {
        
      await axios.put('http://127.0.0.1:8000/api/updateblog/' +item.id,{
    
        status: 'active',
   
      }) 
      alert(item.id + ' active  success')
      Load();
    }
    catch (err) {
      alert(err)
      alert('active failed')
    }
}

   // Ham delete
   const handleDelete=()=> {
    if (selection.length>=1) {

        selection.map((item=> {
       

            deleteperson(item)
            setSelection(selection.filter(item=>item !== item))
        }))

    }
}
async function deleteperson(item) {

    
    try {
        
      await axios.delete('http://127.0.0.1:8000/api/deleteblog/' +item.id,) 
      alert(item.id + ' delete  success')
      Load();
    }
    catch (err) {
      alert(err)
      alert('delete failed')
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
      created_at: { operator:FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}] },
    
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
      <div className="d-flex justify-content-around">
        <span className="p-input-icon-left">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={hanldeGlobalSearch} placeholder="Keyword Search" />
       
          <Button  type="button"  label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
            <RiFilterOffFill  className='ms-2' />
             </Button>
         
        </span>
        <h1 className='d-flex'> DISABLE BLOG</h1>
        <span className='AD-show-dropdown'>

        show
        <Dropdown  className='ms-2' value={show} options={showRow} onChange={e=>setShow(e.value)} />
        </span>
        <section style={{minWidth:'24rem'}}>

          {selection.length>=1&&(
            <>
          <Button onClick={handleActive}   className='ms-3' type='button' label="Active" severity='success' >
            <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
          <Button  onClick={handleDelete}  className='ms-3' type='button' label="Delete" severity='danger' >
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


  return (
    <Container fluid className='wrapper'>
      <Row>
        <Col lg={2} md={2} className='padding-0'>
          <AD_nav />
        </Col>
        <Col lg={10} md={10} className='bg-content'>
        
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
         
              <Column field='id' header='id'filter sortable  style={{ minWidth: '7rem' }}   />
              <Column field='title' header='title' sortable filterPlaceholder="Search"  filter style={{ minWidth:'12rem', maxWidth: '24rem' }} />
              <Column field='created_at' header='post date' sortable filter  dataType='date'  style={{ minWidth: '12rem' }}   />
              <Column field='content' header='content' sortable filterPlaceholder="Search" filter style={{ minWidth: '70rem' }} />
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
    </Container>
  )
}
