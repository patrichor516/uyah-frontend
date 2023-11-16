import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Dashboard from './Dashboard';
import Login from './login';
import ListBook from './pages/book/ListBook';
import CreateBook from './pages/book/CreateBook';
import EditBook from './pages/book/EditBook';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
     

                  {/* master data */}
        <Route path='/book/listbook' element={<ListBook/>}/>
        <Route path='/book/CreateBook' element={<CreateBook/>}/>
        <Route path='/book/EditBook' element={<EditBook/>}/>
       </Routes>
  );
}

export default App;
