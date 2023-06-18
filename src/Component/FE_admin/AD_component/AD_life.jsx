import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import AD_nav from '../Layout/AD_nav'
import { DataTable,Button, Column ,Dropdown,InputText,FilterMatchMode, FilterOperator,Tag } from 'primereact'
import { BsSearch, BsGear, BsTrashFill } from "react-icons/bs";
import { BsDatabaseFillAdd } from "react-icons/bs";
import AD_life_modal from './AD_life_modal';
import {RiFilterOffFill  } from "react-icons/ri";

export default function AD_life() {
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
        setData([
            {
                id: '1', person_id: '1',
                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },
            {
                id: '2', person_id: '2',
                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',

                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            }
            ,
            {
                id: '3', person_id: '3',
                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',

                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

            {
                id: '4', person_id: '4',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

            {
                id: '5', person_id: '5',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

            {
                id: '6', person_id: '6',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

            {
                id: '7', person_id: '7',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

            {
                id: '8', person_id: '8',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },
            {
                id: '9', person_id: '9',

                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',
                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },
            {
                id: '10', person_id: '10',
                life: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp',

                childhood: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                education: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                experiment: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                struggles: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                time_line: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                personalities: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                achievements_detail: 'Lưu ý rằng tắt header sẽ xóa hoàn toàn các thông tin trong header của tài liệu. Nếu bạn muốn giữ lại thông tin trong header nhưng không muốn hiển thị nó trên trang hiện tại, bạn có thể ẩn header bằng cách chỉnh kích thước margin cho phù hợp.',
                quote: 'The href attribute requires a valid va',
                book: 'The href attribute requires a valid va',
                status: 'active'
            },

        ])
        setLoading(false)

    }, [])


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
    const renderHeader = () => {
        return (
            <div className='d-flex justify-content-around'>
                <section className='jutify-content-center'>
                    <span className="p-input-icon-left d-inline-flex" >
                        <BsSearch className="pi pi-search" />
                        <InputText value={global} placeholder='search keyword' onChange={handleGlobalSearch} />

                        <Button type="button" label="Clear" outlined onClick={clearFilter} className='AD-clear-filter' >
                            <RiFilterOffFill />
                        </Button>

                    </span>
                </section>
                <h1 className='d-inline-flex jutify-content-center'>LIFE STORY</h1>
                <section style={{ minWidth: '25rem' }}>

                    <Button className='me-3' label="ADD LIFE" severity='info' ref={showModal}>
                        <BsDatabaseFillAdd className='ms-2' />
                    </Button>
                    {selection.length === 1 && (
                        <>

                            <Button className='me-3' label="EDIT" severity='warning' ref={showModalEdit}>
                                <BsGear className='ms-2' />

                            </Button>
                            <AD_life_modal value={selection[0]} title={'EDIT'} show={showModalEdit} />
                        </>
                    )}

                    {selection.length >= 1 && (

                        <Button className='' label="disable" severity='danger' ref={showModal}>
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
                            <Column field='status' header='status'  body={itemStatus}/>
                        </DataTable>
                    </section>

                </Col>
            </Row>
            <AD_life_modal title="ADD NEW" show={showModal} />
        </Container>
    )
}
