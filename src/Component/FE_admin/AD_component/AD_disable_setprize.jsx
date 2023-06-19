import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { DataTable, Column, Tag, Button, FilterMatchMode, FilterOperator, InputText, Dropdown } from 'primereact'
import { BsSearch, BsPersonAdd, BsGear, BsTrashFill, BsTrophyFill,BsPlusLg   } from "react-icons/bs";
import { RiFilterOffFill } from "react-icons/ri";

import AD_nav from '../Layout/AD_nav'

export default function AD_disable_setprize() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [global, setGlobal] = useState('');
  const [selection, setSelection] = useState([]);
  const showModalButoon = useRef()
  const showModalEdit = useRef()
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
  useEffect(() => {
    setPrizes([
      { nobel_id: '1', person_id: '1', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '2', person_id: '2', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '3', person_id: '3', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '4', person_id: '4', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '5', person_id: '5', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '6', person_id: '6', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '7', person_id: '7', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '8', person_id: '8', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '9', person_id: '9', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '10', person_id: '10', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '11', person_id: '11', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '12', person_id: '12', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '13', person_id: '13', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '14', person_id: '14', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '15', person_id: '15', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '16', person_id: '16', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '17', person_id: '17', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '18', person_id: '18', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '19', person_id: '19', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },
      { nobel_id: '20', person_id: '20', motivation: 'verry goood to pround of', nobel_share: '1/3', status: 'active' },

    ])
    
    setLoading(false)
  }, [])

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
      <div className="d-flex justify-content-around">
        <span className="p-input-icon-left">
          <BsSearch className="pi pi-search" />
          <InputText value={global} onChange={handleGlobalSearch} placeholder="Keyword Search" />

          <Button type="button" label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
            <RiFilterOffFill />
          </Button>

        </span>
        <h1 className='d-flex'>SET PRIZE</h1>
        <span className='AD-show-dropdown'>



        </span>
        <section style={{ minWidth: '24rem' }}>
        
        
            {selection.length>=1&&(
             <>
              <Button 
            
              className='ms-3' type='button' label="Active" severity='success' >
                <BsPlusLg   className='ms-3 	--bs-body-bg p-input-icon-left' /> </Button>
           
                <Button className='ms-3' type='button' label="Delete" severity='danger' >
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
      <Row>
        <Col lg={2}>
          <AD_nav />
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
            selection={selection} onSelectionChange={(e) => setSelection(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column sortable filter field='nobel_id' header='nobel id' />
            <Column sortable filter field='person_id' header='person id' />
            <Column sortable filter field='motivation' header='motivation' />
            <Column sortable filter field='nobel_share' header='nobel share' />

            <Column field='status' header='status' body={itemStatus} />



          </DataTable>
        </Col>
      </Row>
   
    </Container>
  )
}
