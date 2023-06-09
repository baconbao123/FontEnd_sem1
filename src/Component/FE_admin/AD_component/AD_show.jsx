import React, { useEffect, useRef, useState, createRef } from "react";
import { DataTable } from "primereact";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Container, Col, Row } from "react-bootstrap";
import { Tag } from "primereact/tag";
import {
  BsSearch,
  BsPersonAdd,
  BsGear,
  BsTrashFill,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { RiFilterOffFill } from "react-icons/ri";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import AD_nav from "../Layout/AD_nav";
import AD_modal from "./AD_show_modal";
import AD_hidden_nav from "../Layout/AD_hidden_nav";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BlockUI } from "primereact/blockui";
import URL from "../../api/api";
export default function AD_show() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("login")) {
      navigate("/login");
    }
  });
  useEffect(() => {
    document.title = "Admin-Person";
  }, []);
  // Khởi tạo các biến
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    birthdate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    deathdate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    gender: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    national: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const [global, SetGlobal] = useState("");
  const [statusName] = useState(["success", "sucess", "danger"]);
  const [genderName] = useState(["male", "female"]);
  const [selection, setSelection] = useState([]);
  const toast = useRef("div");
  const [showNav, setShowNav] = useState(false);
  const [storeImg, setStoreImg] = useState([]);

  const showModalButoon = useRef(null);
  const showModalEdit = useRef("");
  // Toast
  const showSuccess = (e) => {
    toast.current.show({
      severity: "success",
      summary: " SUCCESS",
      detail: e ? e : "To many request",
      life: 1000,
    });
  };
  const showError = (e) => {
    toast.current.show({
      severity: "error",
      summary: "ERROR",
      detail: e ? e : "To many request",
      life: 1000,
    });
  };
  useEffect(() => {
    toast.current = toast.current || createRef();
  }, [toast]);

  // fectch data

  useEffect(() => {
    (async () => await Load())();

    setLoading(false);
  }, []);
  const Reload = () => {
    window.location.reload();
  };
  async function Load() {
    try {
      const result = await axios.get(`${URL}/api/person`);
      setPerson(result.data);
    } catch (error) {}
  }
  // Ham disable
  const handleDisable = () => {
    if (selection.length >= 1) {
      setBlocked(true);
      Promise.all(
        selection.map((item) => {
          setSelection(selection.filter((item) => item !== item));
          return disableperson(item);
        })
      )
        .then(() => {
          Load();
          setBlocked(false);
        })
        .catch((err) => {
          showError(err.message);
        });
    }
  };

  async function disableperson(item) {
    try {
      await axios.put(`${URL}/api/updateperson/` + item.id, {
        status: "disable",
      });
      showSuccess(" sucess disable");

      Load();
    } catch (err) {
      showError(err.message);
    }
  }

  // Hàm search Golbal
  const hanldeGlobalSearch = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    SetGlobal(value);
  };
  // hàm set Init FIlter
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      birthdate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      deathdate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      gender: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      national: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      status: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
    });
    SetGlobal("");
  };

  const clearFilter = () => {
    initFilters();
  };

  // const handle selection
  const handleSelection = () => {
    setSelection("");
  };

  // render header
  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-around AD-header mt-3">
        <div className="d-none show-1000 mb-3 row  ">
          <section
            className=" fs-2 text-start d-inline-block  d-lg-none  d-md-inline-block col-2 show-menu"
            onClick={(e) => setShowNav(true)}
          >
            <BsChevronDoubleRight />
          </section>
          <h1 className="d-inline-block text-center col-10 ">PERSON</h1>
        </div>
        <section
          className=" fs-2 text-start  d-lg-block d-xl-none d-md-none xs-none d-sm-none show-menu"
          onClick={(e) => setShowNav(true)}
        >
          <BsChevronDoubleRight />
        </section>
        <section>
          <span className="p-input-icon-left mb-3">
            <InputText
              className=" me-1 "
              value={global}
              onChange={hanldeGlobalSearch}
              placeholder="Keyword Search"
            />
            <BsSearch className=" ms-2 " />
          </span>

          <Button
            type="button"
            label="Clear"
            outlined
            onClick={clearFilter}
            className="mb-3 "
          >
            <RiFilterOffFill className="ms-1" />
          </Button>
        </section>
        <h1 className="hidden-1000">PERSON</h1>

        <section className=" ">
          <Button
            ref={showModalButoon}
            className=" mb-3 "
            type="button"
            label="ADD"
            severity="info"
          >
            <BsPersonAdd className="ms-2  p-input-icon-left" />{" "}
          </Button>

          {selection.length === 1 && (
            <>
              <Button
                ref={showModalEdit}
                className="ms-3 mb-3"
                type="button"
                label="edit"
                severity="warning"
              >
                <BsGear className="ms-3 	--bs-body-bg p-input-icon-left" />{" "}
              </Button>
              <AD_modal
                toast={toast}
                setSelection={handleSelection}
                Load={Reload}
                title="EDIT"
                show={showModalEdit}
                value={selection[0]}
              />
            </>
          )}

          {selection.length >= 1 && (
            <Button
              onClick={handleDisable}
              className="ms-3 mb-3"
              type="button"
              label="disable"
              severity="danger"
            >
              <BsTrashFill className="ms-3 	--bs-body-bg p-input-icon-left" />{" "}
            </Button>
          )}
        </section>
      </div>
    );
  };
  const header = renderHeader;
  // hàm tạo ra tag status
  const itemStatus = (e) => {
    let status = "";
    let value = "";
    if (e.status === "active") {
      value = "active";
      status = "success";
    } else if (e.status === "disable") {
      status = "danger";
      value = "disable";
    }
    return <Tag value={value} severity={status} />;
  };
  const genderStatus = (e) => {
    let status = "";
    if (e.gender === "female") {
      status = "info";
    } else {
      status = "success";
    }
    return <Tag value={e.gender} severity={status} />;
  };
  const statusDropdown = (e) => {
    return <Tag value={e} severity={e} />;
  };
  // Hàm tạo ra tag status trong filter
  const genderDropdown = (e) => {
    let status = "";
    if (e === "female") {
      status = "info";
    } else {
      status = "success";
    }

    return <Tag value={e} severity={status} />;
  };
  // Hàm tạo ra dropdown filter
  const statusFilter = (event) => {
    return (
      <Dropdown
        value={event.value}
        options={statusName}
        onChange={(e) => event.filterApplyCallback(e.value)}
        itemTemplate={statusDropdown}
        placeholder="select one"
        showClear
      />
    );
  };
  const genderFilter = (event) => {
    return (
      <Dropdown
        value={event.value}
        options={genderName}
        onChange={(e) => event.filterApplyCallback(e.value)}
        itemTemplate={genderDropdown}
        showClear
        placeholder="select one"
      />
    );
  };
  // Toast

  const itemImage = (e) => {
    if (e.img) {
      let store = e.img.split(",");

      return (
        <>
          <img
            className="d-inline-flex ms-2 mt-1"
            alt={store[0]}
            src={`${URL}/api/images/` + store[0]}
            width="100"
          />
          <img
            className="d-inline-flex ms-2 mt-1"
            alt={store[1]}
            src={`${URL}/api/images/` + store[1]}
            width="100"
          />
          <img
            className="d-inline-flex ms-2 mt-1"
            alt={store[2]}
            src={`${URL}/api/images/` + store[2]}
            width="100"
          />
        </>
      );
    }
  };
  const avatarImage = (e) => {
    if (e.avatar) {
      return (
        <>
          <img
            className="d-inline-flex ms-2 mt-1"
            alt={e.avatar}
            src={`${URL}/api/images/` + e.avatar}
            width="100"
          />
        </>
      );
    }
  };
  const pdfItem = (e) => {
    if (e.pdf) {
      return (
        <>
          <a target="_blank" href={`${URL}/api/pdfs/` + e.pdf}>
            {e.pdf}
          </a>
        </>
      );
    }
  };

  // Toast

  return (
    <Container fluid className="wrapper">
      <BlockUI blocked={blocked}>
        <Toast ref={toast} />
        <Row
          className={`fixed-top h-100 d-xl-none ${
            showNav ? "d-flex" : "d-none"
          }`}
        >
          <Col
            md={4}
            xs={8}
            className=" padding-none   h-100 sticky-top  d-inline-block"
          >
            {" "}
            <AD_hidden_nav page={"Show"} />
          </Col>
          <Col
            md={8}
            xs={4}
            className="hidden-color ps-1 padding-none"
            onClick={() => setShowNav(false)}
          >
            {" "}
          </Col>
        </Row>

        <Row>
          <Col
            lg={2}
            className="padding-0 xs-none  d-xl-inline-flex d-lg-none d-xs-none d-sm-none"
          >
            <AD_nav page={"Show"} />
          </Col>
          <Col className="bg-content col-xl-10  col-md-12">
            <section className="card">
              <DataTable
                value={person}
                data-key="id"
                loading={loading}
                selectionMode={"checkbox"}
                selection={selection}
                onSelectionChange={(e) => setSelection(e.value)}
                header={header}
                showGridlines
                paginator
                rows={5}
                rowsPerPageOptions={[2, 5, 10, 25, 50]}
                removableSort
                tableStyle={{ minWidth: "100%" }}
                globalFilterFields={[
                  "id",
                  "name",
                  "birthdate",
                  "deathdate",
                  "gender",
                  "national",
                  "status",
                ]}
                emptyMessage="No customers found."
                filters={filters}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3rem" }}
                ></Column>

                <Column
                  field="name"
                  header="name"
                  sortable
                  filterPlaceholder="Search"
                  filter
                  style={{ minWidth: "12rem", maxWidth: "24rem" }}
                />
                <Column
                  field="birthdate"
                  header="birthdate"
                  sortable
                  filter
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="deathdate"
                  header="deathdate"
                  sortable
                  filter
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="national"
                  header="national"
                  sortable
                  filterPlaceholder="Search"
                  filter
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="gender"
                  header="gender"
                  filter
                  sortable
                  filterElement={genderFilter}
                  body={genderStatus}
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="status"
                  header="status"
                  sortable
                  filterElement={statusFilter}
                  body={itemStatus}
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  field="avatar"
                  header="avatar"
                  body={avatarImage}
                  style={{ minWidth: "12rem" }}
                />

                <Column
                  field="img"
                  header="img"
                  body={itemImage}
                  style={{ minWidth: "40rem" }}
                />

                <Column
                  field="pdf"
                  body={pdfItem}
                  header="pdf"
                  style={{ minWidth: "12rem" }}
                />
              </DataTable>
            </section>
          </Col>

          <AD_modal
            toast={toast}
            title={"ADD NEW"}
            show={showModalButoon}
            Load={Reload}
          />
        </Row>
      </BlockUI>
    </Container>
  );
}
