import {Routes,Route,Link} from 'react-router-dom'

import React, { useRef } from 'react';
import './App.scss';

import AD_home from './Component/FE_admin/AD_component/AD_home';


function App() {
  return (

<>
{/* amdin */}
    <Routes>
    <Route path='/admin' element={<AD_home/>}/>
        
    
    </Routes>
</>

  )
}

export default App;
