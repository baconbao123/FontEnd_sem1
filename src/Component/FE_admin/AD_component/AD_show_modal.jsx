import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import Cookies from 'js-cookie';
export default function AD_modal({ title, show, value, Load,setSelection,toast }) {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!Cookies.get('login')){
          navigate('/login')
        }
       })
    // khoi tao bien
    const [showModal, setShowModal] = useState(false);
    const [country, setCountry] = useState([]);
    const [filterCountry, setFilterCountry] = useState(null);
    const [countryName, setCountryName] = useState({name:'',code:''});
    const gender = [{ gender: 'male' }, { gender: 'female' }]
    const status = [{ status: "active" }, { status: "disable" }]
    const [genderName, setGenderName] = useState({gender:''})
    const [statusName, setStatusName] = useState({status:''})
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [deathdate, setDeathdate] = useState('');

    const [imgemty, setImgemty] = useState(true);
    const [pdfemty, setpdfemty] = useState(true);
    const [avatarEmty,setAvatarEmty]=useState(true);
    const [avatar,setAvatar]=useState();
    const [imgName, setImgName] = useState([]);
    const [imgcontain, setImgcontain] = useState([]);
    const [pdf,setPdf]=useState()
   
    useEffect(() => {
        setCountry(
            [
                { name: 'Afghanistan', code: 'AF' },
                { name: 'Åland Islands', code: 'AX' },
                { name: 'Albania', code: 'AL' },
                { name: 'Algeria', code: 'DZ' },
                { name: 'American Samoa', code: 'AS' },
                { name: 'AndorrA', code: 'AD' },
                { name: 'Angola', code: 'AO' },
                { name: 'Anguilla', code: 'AI' },
                { name: 'Antarctica', code: 'AQ' },
                { name: 'Antigua and Barbuda', code: 'AG' },
                { name: 'Argentina', code: 'AR' },
                { name: 'Armenia', code: 'AM' },
                { name: 'Aruba', code: 'AW' },
                { name: 'Australia', code: 'AU' },
                { name: 'Austria', code: 'AT' },
                { name: 'Azerbaijan', code: 'AZ' },
                { name: 'Bahamas', code: 'BS' },
                { name: 'Bahrain', code: 'BH' },
                { name: 'Bangladesh', code: 'BD' },
                { name: 'Barbados', code: 'BB' },
                { name: 'Belarus', code: 'BY' },
                { name: 'Belgium', code: 'BE' },
                { name: 'Belize', code: 'BZ' },
                { name: 'Benin', code: 'BJ' },
                { name: 'Bermuda', code: 'BM' },
                { name: 'Bhutan', code: 'BT' },
                { name: 'Bolivia', code: 'BO' },
                { name: 'Bosnia and Herzegovina', code: 'BA' },
                { name: 'Botswana', code: 'BW' },
                { name: 'Bouvet Island', code: 'BV' },
                { name: 'Brazil', code: 'BR' },
                { name: 'British Indian Ocean Territory', code: 'IO' },
                { name: 'Brunei Darussalam', code: 'BN' },
                { name: 'Bulgaria', code: 'BG' },
                { name: 'Burkina Faso', code: 'BF' },
                { name: 'Burundi', code: 'BI' },
                { name: 'Cambodia', code: 'KH' },
                { name: 'Cameroon', code: 'CM' },
                { name: 'Canada', code: 'CA' },
                { name: 'Cape Verde', code: 'CV' },
                { name: 'Cayman Islands', code: 'KY' },
                { name: 'Central African Republic', code: 'CF' },
                { name: 'Chad', code: 'TD' },
                { name: 'Chile', code: 'CL' },
                { name: 'China', code: 'CN' },
                { name: 'Christmas Island', code: 'CX' },
                { name: 'Cocos (Keeling) Islands', code: 'CC' },
                { name: 'Colombia', code: 'CO' },
                { name: 'Comoros', code: 'KM' },
                { name: 'Congo', code: 'CG' },
                { name: 'Congo, The Democratic Republic of the', code: 'CD' },
                { name: 'Cook Islands', code: 'CK' },
                { name: 'Costa Rica', code: 'CR' },
                { name: 'Cote D\'Ivoire', code: 'CI' },
                { name: 'Croatia', code: 'HR' },
                { name: 'Cuba', code: 'CU' },
                { name: 'Cyprus', code: 'CY' },
                { name: 'Czech Republic', code: 'CZ' },
                { name: 'Denmark', code: 'DK' },
                { name: 'Djibouti', code: 'DJ' },
                { name: 'Dominica', code: 'DM' },
                { name: 'Dominican Republic', code: 'DO' },
                { name: 'Ecuador', code: 'EC' },
                { name: 'Egypt', code: 'EG' },
                { name: 'El Salvador', code: 'SV' },
                { name: 'Equatorial Guinea', code: 'GQ' },
                { name: 'Eritrea', code: 'ER' },
                { name: 'Estonia', code: 'EE' },
                { name: 'Ethiopia', code: 'ET' },
                { name: 'Falkland Islands (Malvinas)', code: 'FK' },
                { name: 'Faroe Islands', code: 'FO' },
                { name: 'Fiji', code: 'FJ' },
                { name: 'Finland', code: 'FI' },
                { name: 'France', code: 'FR' },
                { name: 'French Guiana', code: 'GF' },
                { name: 'French Polynesia', code: 'PF' },
                { name: 'French Southern Territories', code: 'TF' },
                { name: 'Gabon', code: 'GA' },
                { name: 'Gambia', code: 'GM' },
                { name: 'Georgia', code: 'GE' },
                { name: 'Germany', code: 'DE' },
                { name: 'Ghana', code: 'GH' },
                { name: 'Gibraltar', code: 'GI' },
                { name: 'Greece', code: 'GR' },
                { name: 'Greenland', code: 'GL' },
                { name: 'Grenada', code: 'GD' },
                { name: 'Guadeloupe', code: 'GP' },
                { name: 'Guam', code: 'GU' },
                { name: 'Guatemala', code: 'GT' },
                { name: 'Guernsey', code: 'GG' },
                { name: 'Guinea', code: 'GN' },
                { name: 'Guinea-Bissau', code: 'GW' },
                { name: 'Guyana', code: 'GY' },
                { name: 'Haiti', code: 'HT' },
                { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
                { name: 'Holy See (Vatican City State)', code: 'VA' },
                { name: 'Honduras', code: 'HN' },
                { name: 'Hong Kong', code: 'HK' },
                { name: 'Hungary', code: 'HU' },
                { name: 'Iceland', code: 'IS' },
                { name: 'India', code: 'IN' },
                { name: 'Indonesia', code: 'ID' },
                { name: 'Iran, Islamic Republic Of', code: 'IR' },
                { name: 'Iraq', code: 'IQ' },
                { name: 'Ireland', code: 'IE' },
                { name: 'Isle of Man', code: 'IM' },
                { name: 'Israel', code: 'IL' },
                { name: 'Italy', code: 'IT' },
                { name: 'Jamaica', code: 'JM' },
                { name: 'Japan', code: 'JP' },
                { name: 'Jersey', code: 'JE' },
                { name: 'Jordan', code: 'JO' },
                { name: 'Kazakhstan', code: 'KZ' },
                { name: 'Kenya', code: 'KE' },
                { name: 'Kiribati', code: 'KI' },
                { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
                { name: 'Korea, Republic of', code: 'KR' },
                { name: 'Kuwait', code: 'KW' },
                { name: 'Kyrgyzstan', code: 'KG' },
                { name: 'Lao People\'S Democratic Republic', code: 'LA' },
                { name: 'Latvia', code: 'LV' },
                { name: 'Lebanon', code: 'LB' },
                { name: 'Lesotho', code: 'LS' },
                { name: 'Liberia', code: 'LR' },
                { name: 'Libyan Arab Jamahiriya', code: 'LY' },
                { name: 'Liechtenstein', code: 'LI' },
                { name: 'Lithuania', code: 'LT' },
                { name: 'Luxembourg', code: 'LU' },
                { name: 'Macao', code: 'MO' },
                { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
                { name: 'Madagascar', code: 'MG' },
                { name: 'Malawi', code: 'MW' },
                { name: 'Malaysia', code: 'MY' },
                { name: 'Maldives', code: 'MV' },
                { name: 'Mali', code: 'ML' },
                { name: 'Malta', code: 'MT' },
                { name: 'Marshall Islands', code: 'MH' },
                { name: 'Martinique', code: 'MQ' },
                { name: 'Mauritania', code: 'MR' },
                { name: 'Mauritius', code: 'MU' },
                { name: 'Mayotte', code: 'YT' },
                { name: 'Mexico', code: 'MX' },
                { name: 'Micronesia, Federated States of', code: 'FM' },
                { name: 'Moldova, Republic of', code: 'MD' },
                { name: 'Monaco', code: 'MC' },
                { name: 'Mongolia', code: 'MN' },
                { name: 'Montserrat', code: 'MS' },
                { name: 'Morocco', code: 'MA' },
                { name: 'Mozambique', code: 'MZ' },
                { name: 'Myanmar', code: 'MM' },
                { name: 'Namibia', code: 'NA' },
                { name: 'Nauru', code: 'NR' },
                { name: 'Nepal', code: 'NP' },
                { name: 'Netherlands', code: 'NL' },
                { name: 'Netherlands Antilles', code: 'AN' },
                { name: 'New Caledonia', code: 'NC' },
                { name: 'New Zealand', code: 'NZ' },
                { name: 'Nicaragua', code: 'NI' },
                { name: 'Niger', code: 'NE' },
                { name: 'Nigeria', code: 'NG' },
                { name: 'Niue', code: 'NU' },
                { name: 'Norfolk Island', code: 'NF' },
                { name: 'Northern Mariana Islands', code: 'MP' },
                { name: 'Norway', code: 'NO' },
                { name: 'Oman', code: 'OM' },
                { name: 'Pakistan', code: 'PK' },
                { name: 'Palau', code: 'PW' },
                { name: 'Palestinian Territory, Occupied', code: 'PS' },
                { name: 'Panama', code: 'PA' },
                { name: 'Papua New Guinea', code: 'PG' },
                { name: 'Paraguay', code: 'PY' },
                { name: 'Peru', code: 'PE' },
                { name: 'Philippines', code: 'PH' },
                { name: 'Pitcairn', code: 'PN' },
                { name: 'Poland', code: 'PL' },
                { name: 'Portugal', code: 'PT' },
                { name: 'Puerto Rico', code: 'PR' },
                { name: 'Qatar', code: 'QA' },
                { name: 'Reunion', code: 'RE' },
                { name: 'Romania', code: 'RO' },
                { name: 'Russian Federation', code: 'RU' },
                { name: 'RWANDA', code: 'RW' },
                { name: 'Saint Helena', code: 'SH' },
                { name: 'Saint Kitts and Nevis', code: 'KN' },
                { name: 'Saint Lucia', code: 'LC' },
                { name: 'Saint Pierre and Miquelon', code: 'PM' },
                { name: 'Saint Vincent and the Grenadines', code: 'VC' },
                { name: 'Samoa', code: 'WS' },
                { name: 'San Marino', code: 'SM' },
                { name: 'Sao Tome and Principe', code: 'ST' },
                { name: 'Saudi Arabia', code: 'SA' },
                { name: 'Senegal', code: 'SN' },
                { name: 'Serbia and Montenegro', code: 'CS' },
                { name: 'Seychelles', code: 'SC' },
                { name: 'Sierra Leone', code: 'SL' },
                { name: 'Singapore', code: 'SG' },
                { name: 'Slovakia', code: 'SK' },
                { name: 'Slovenia', code: 'SI' },
                { name: 'Solomon Islands', code: 'SB' },
                { name: 'Somalia', code: 'SO' },
                { name: 'South Africa', code: 'ZA' },
                { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
                { name: 'Spain', code: 'ES' },
                { name: 'Sri Lanka', code: 'LK' },
                { name: 'Sudan', code: 'SD' },
                { name: 'Suriname', code: 'SR' },
                { name: 'Svalbard and Jan Mayen', code: 'SJ' },
                { name: 'Swaziland', code: 'SZ' },
                { name: 'Sweden', code: 'SE' },
                { name: 'Switzerland', code: 'CH' },
                { name: 'Syrian Arab Republic', code: 'SY' },
                { name: 'Taiwan, Province of China', code: 'TW' },
                { name: 'Tajikistan', code: 'TJ' },
                { name: 'Tanzania, United Republic of', code: 'TZ' },
                { name: 'Thailand', code: 'TH' },
                { name: 'Timor-Leste', code: 'TL' },
                { name: 'Togo', code: 'TG' },
                { name: 'Tokelau', code: 'TK' },
                { name: 'Tonga', code: 'TO' },
                { name: 'Trinidad and Tobago', code: 'TT' },
                { name: 'Tunisia', code: 'TN' },
                { name: 'Turkey', code: 'TR' },
                { name: 'Turkmenistan', code: 'TM' },
                { name: 'Turks and Caicos Islands', code: 'TC' },
                { name: 'Tuvalu', code: 'TV' },
                { name: 'Uganda', code: 'UG' },
                { name: 'Ukraine', code: 'UA' },
                { name: 'United Arab Emirates', code: 'AE' },
                { name: 'United Kingdom', code: 'GB' },
                { name: 'United States', code: 'US' },
                { name: 'United States Minor Outlying Islands', code: 'UM' },
                { name: 'Uruguay', code: 'UY' },
                { name: 'Uzbekistan', code: 'UZ' },
                { name: 'Vanuatu', code: 'VU' },
                { name: 'Venezuela', code: 'VE' },
                { name: 'Viet Nam', code: 'VN' },
                { name: 'Virgin Islands, British', code: 'VG' },
                { name: 'Virgin Islands, U.S.', code: 'VI' },
                { name: 'Wallis and Futuna', code: 'WF' },
                { name: 'Western Sahara', code: 'EH' },
                { name: 'Yemen', code: 'YE' },
                { name: 'Zambia', code: 'ZM' },
                { name: 'Zimbabwe', code: 'ZW' }

            ])
    }, []);
    // Toast
    const showError = (e) => {
        toast.current.show({severity:'error', summary: 'ERROR', detail:e?e:"To many request", life: 1000});
      }
      const showSuccess = (e) => {
        toast.current.show({severity:'success', summary: ' SUCCESS', detail:e?e:"To many request", life: 1000});
        
      }
    
      
      const showWarn = (e) => {
          toast.current.show({severity:'warn', summary: 'Warning', detail:e?e:"To many request", life: 3000});
      }
    // ham add new person
 
     
    async function addperson(e) {
       
        e.preventDefault();
        if(imgName.length<3){
          showWarn('At least 3 images')
            
        }
        else if(!avatar) {
            showWarn('Avatar must be chosen')
        }
        else if(statusName.status==='') {
            showWarn('Status must be chosen')
        }
        else if(genderName.gender==='') {
            showWarn('Gender must be chosen')
            
        }
        else if(!birthdate) {
            showWarn('Birthday must be chosen')
        }
        else if(!name) {
            showWarn('Name must be chosen')
        }
        else {
            
            const data=new FormData();
            if(imgName) {
    
                imgName.map(item=>data.append('img[]',item));
            }
            data.append('name',name);
            data.append('birthdate',birthdate);
            data.append('deathdate',deathdate);
            data.append('status',statusName.status);
            data.append('gender',genderName.gender)
            data.append('national',countryName.name)
            if(pdf) {
    
                data.append('pdf',pdf)
            }
            if(avatar) {
                data.append('avatar',avatar)
            }
            try {
                await axios.post('http://127.0.0.1:8000/api/addperson',data);
                   showSuccess("added success")
           
                setTimeout(()=> {

                    setShowModal(!showModal)
                    Load()
                },1000)
                setName('');
                setBirthdate('');
                setDeathdate('');
                setCountryName('');
                setGenderName({gender:''});
                setStatusName({status:''})
                setImgName('')
                setAvatar('')
               
               
             
    
            }
            catch (err) {
              console.log(err);
              if(err.response.status===400) {
                showError("Birthdate or Deathdate is invalid")
              }
              else {
                    console.log(err);
                  showError(err.response)
              }
          
            }
        }
    }

    // ham update 
    async function updateperson(e) {
        e.preventDefault()
       
        const storeImg=value.img.split(',');
        const storePdf=value.pdf;
    
        let check=0;
        let count=0;
        let condition=0
        
        if(storeImg.length!==imgName.length) {
            check++
        }
        else {
            for(let i=0;i<storeImg.length;i++) {
                if(imgName[i]!==storeImg[i]) {
                    check++
                }
            }
        }
        if(pdf) {

            if(pdf!==storePdf) {
                count=1;
            }
        }
        if(avatar!==value.avatar) {
            condition=1
        }
        if(imgName.length<3) {
            showWarn('At least 3 images');
        }
        else if(!avatar) {
            showWarn('Avatar must be chosen')
        }
        else if(genderName.gender==='') {
            showWarn('Gender must be chosen')
            
        }
        else if(!name) {
            showWarn('Name must be chosen')
        }
        else if(!birthdate) {
            showWarn('Birthday must be chosen')
        }
        else {

            // image and pdf change
            if(check>0 &&count>0&&condition>0) {
           
               
                const data=new FormData();
                data.append('_method',"PUT")
                 imgName.map(item=>data.append('image[]',item));
                 data.append('pdf',pdf)
                data.append('name',name);
                data.append('birthdate',birthdate);
                data.append('avatar',avatar)
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    
                    showSuccess('Update success')
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal)
                        Load()
                    },1000)
                  
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                
                  
                }
                catch (err) {
                   showError(err.message)
                }
            }
            else if(check>0&&condition>0) {
              
                const data=new FormData();
                data.append('_method',"PUT")
                 imgName.map(item=>data.append('image[]',item));
                data.append('name',name);
                data.append('birthdate',birthdate);
                data.append('avatar',avatar);
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    showSuccess('Update success')
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal)
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
               
                  
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
            else if(count>0&&condition>0) {
              
                const data=new FormData();
                data.append('_method',"PUT")
               data.append('pdf',pdf)
                data.append('name',name);
                data.append('birthdate',birthdate);
                data.append('avatar',avatar)
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    showSuccess('Update success')
        
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal)
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                 
                  
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
            //Img change
            else if(check>0) {
               
                const data=new FormData();
                data.append('_method',"PUT")
                 imgName.map(item=>data.append('image[]',item));
                data.append('name',name);
                data.append('birthdate',birthdate);
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    showSuccess('Update success')
        
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal);
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                  
                 
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
            else if(count>0) {
             
                const data=new FormData();
                data.append('_method',"PUT")
               data.append('pdf',pdf)
                data.append('name',name);
                data.append('birthdate',birthdate);
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    showSuccess('Update success')
        
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal);
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                 
                   
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
            else if(condition>0) {
             
                const data=new FormData();
                data.append('_method',"PUT")
               data.append('avatar',avatar)
                data.append('name',name);
                data.append('birthdate',birthdate);
                if(!deathdate) {
    
                    data.append('deathdate','');
                }
                else {
                    data.append('deathdate',deathdate);
    
                }
                data.append('status',statusName.status);
                if(!genderName.gender) {
    
                    data.append('gender','')
    
                }
                else {
                    data.append('gender',genderName.gender)
    
    
                }
                if(!countryName) {
    
                    data.append('national','')
    
                }
                else {
                    data.append('national',countryName)
    
    
                }
              
                e.preventDefault();
                try {
                    await axios.post('http://127.0.0.1:8000/api/updateperson/' + value.id,data);
                    showSuccess('Update success')
        
                    setTimeout(()=> {
                        setSelection()
                        setShowModal(!showModal);
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                 
                   
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
          
            // Image and pdf not change and avatar
            else {
    
                try {
                    await axios.put('http://127.0.0.1:8000/api/updateperson/' + value.id, {
                        name: name,
                        birthdate: birthdate,
                        deathdate: deathdate,
                        status: statusName.status,
                        gender: genderName.gender,
                        img: imgName.toString(),
                        national: countryName.name,
                    });
                    showSuccess('Update success');
        
                     setTimeout(()=> {
                        setShowModal(!showModal);
                        setSelection()  
                        Load()
                    },1000)
                    setName('');
                    setBirthdate('');
                    setDeathdate('');
                    setCountryName('');
                    setGenderName({gender:''});
                    setStatusName({status:''})
                    setImgName('')
                    setAvatar('')
                  
                   
                }
                catch (err) {
                    console.log(err);
                    showError(err.message)
                }
            }
        }
        }

 
    // Ham show modal   
    useEffect(() => {
        if (show) {
            const handleClick = () => {
                setShowModal(!showModal);

            }
            show.current.addEventListener('click', handleClick);
            return () => {
                show.current.removeEventListener('click', handleClick);
            }
        }
    }, [show]);


    // ham tim country
    const search = (event) => {
        setTimeout(() => {

            let suggest;
            if (!event.query.trim().length) {

                suggest = [...country];

            }
            else if (event.query.trim().length) {


                suggest = country.filter((a) => {

                    return a.name.toLowerCase().startsWith(event.query.toLowerCase());
                })
            }
            setFilterCountry(suggest);

        }, 250);
    }

    //    ham set edit
    useEffect(() => {
        if (value) {
            setName(value.name);
            if(value.national) {
                setCountryName(value.national);
            }
            setBirthdate(value.birthdate)
            if (value.deathdate !== 'null') {
                setDeathdate(value.deathdate)
            }

            setGenderName({ gender: value.gender })
            setStatusName({ status: value.status })
            if (value.img) {
                setImgName(value.img.split(','));
            }
            if(value.pdf) {
                setPdf(value.pdf)
            }
            if(value.avatar) {
                setAvatar(value.avatar)
            }
        }
    }, [])

    // ham img 
    const handleShowImg = (e,index) => {
        return <img key={index} className='d-inline-flex ms-2 mt-1' alt={e} src={"http://127.0.0.1:8000/api/images/"+e} width='100' />

    }

    


    const handleImg=(e)=> {
      
        setImgemty(false)
        const store=[]
      
        for(let i=0;i<e.target.files.length;i++) {
            store.push(e.target.files[i])
           
           
         

        }
      
        setImgName(store)
        // dua duong dan file vao
        const myDiv=document.getElementById('inputfile')
        myDiv.innerHTML=''
     
        store.map((item,index)=> {

            const reader = new FileReader();
           
            reader.readAsDataURL(item);
            reader.onload = () => {
              const imgPath = reader.result;
              const imageElement = document.createElement("img");
              imageElement.src = imgPath;
            //   imageElement.width=100
         

              imageElement.style.maxWidth = "20%";
              myDiv.appendChild(imageElement);
            };
        })
      
       
     
    
   
   
       
    }
  
// ham pdf 
    const handlePdf=(e)=> {
        setPdf(e.target.files[0]);
        setpdfemty(false)
    }
// ham avatar
    const handleAvatar=(e)=> {
        
        setAvatar(e.target.files[0]);
        
        const myDiv=document.getElementById('avatar');
        myDiv.innerHTML=''
        if(e.target.files[0]!==undefined){
            const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  const imgPath = reader.result;
                  const imageElement = document.createElement("img");
                  imageElement.src = imgPath;
             
             
    
                  imageElement.style.maxWidth = "20%";
                  myDiv.appendChild(imageElement);
                }
              
                setAvatarEmty(false);
            }
            else if(avatar===undefined) {
              
            }
    }

    return (
        <>


            <Modal show={showModal} onHide={() => setShowModal(!showModal)} centered={true} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Toast ref={toast} />
                        {/* <Button  label="click" onClick={showToast}/> */}
                        <h1>{title} PERSON</h1>
                    </Modal.Title>
                </Modal.Header>
                    <Form  onSubmit={value?updateperson:addperson} encType='multipart/form-data' >
                <Modal.Body>

                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <InputText value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" name='name' style={{ minWidth: '100%' }} />

                        </Form.Group>


                        <Row>
                            <Col lg={4}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Nation</Form.Label>

                                    <AutoComplete field='name' dropdown value={countryName} onChange={e => setCountryName(e.value)} completeMethod={search} suggestions={filterCountry} />
                                </Form.Group>
                            </Col>

                            <Col lg={4}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Gender</Form.Label>
                                    <Dropdown options={gender} value={genderName} onChange={e => setGenderName(e.target.value)} optionLabel='gender' placeholder='Gender' style={{ minWidth: '100%' }} />

                                </Form.Group>
                            </Col>


                            <Col lg={4}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Status</Form.Label>
                                    <Dropdown options={status} value={statusName} onChange={e => setStatusName(e.value)} optionLabel='status' placeholder='Status' style={{ minWidth: '100%' }} />

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Birthdate</Form.Label>
                                    <Form.Control value={birthdate} onChange={e => setBirthdate(e.target.value)} type='date' name='birthdate' />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Deathdate (allow null)</Form.Label>
                                    <Form.Control value={deathdate} onChange={e => setDeathdate(e.target.value)} type='date' name='deathdate' />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group >
                                <Form.Label>Avatar</Form.Label>
                                <InputText type='file'  onChange={handleAvatar} accept="image/*"  style={{minWidth:'100% '}} />
                                {avatarEmty&&value&&avatar&& (<img key={avatar} className='d-inline-flex ms-2 mt-1' alt={avatar} src={"http://127.0.0.1:8000/api/images/"+avatar} width='100' />) }
                            </Form.Group>
                        </Row>
                        <Row className='' id='avatar'></Row>
                        <Row className='mt-4'>
                            <Form.Group >
                                <Form.Label>PDF</Form.Label>
                                <InputText type='file'  onChange={handlePdf} accept="application/pdf"  style={{minWidth:'100% '}} />
                                {pdfemty&&value&&pdf&&(
                                      <a target="_blank" href={"http://127.0.0.1:8000/api/pdfs/"+pdf}>{pdf}</a>
                                )}
                            </Form.Group>
                        </Row>
                        <Row className='mt-4'>
                            <Form.Group  >
                                <Form.Label>Images (&gt;=3 Files)</Form.Label>
                                <InputText type='file' multiple onChange={handleImg} accept='image/*'  style={{minWidth:'100% '}} />
                                {imgemty&&value&&imgName&&imgName.length>0 && imgName.map((item,index)=> handleShowImg(item,index))}

                            </Form.Group>
                        </Row>
                        <Row className='mt-4'  id='inputfile'></Row>
                
                </Modal.Body>
                <Modal.Footer>

                    {value && (

                        <Button variant="primary" type='submit' >
                            SAVE
                        </Button>
                    )}
                    {!value && (

                        <Button variant="primary" type='submit' >
                            SUBMIT
                        </Button>
                    )}
                </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}
