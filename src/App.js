import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Dashboard from './Dashboard';
import Login from './login';
import ListBook from './pages/book/ListBook';
import CreateBook from './pages/book/CreateBook';
import EditBook from './pages/book/EditBook';
import ListAuthor from './pages/Author/ListAuthor';
import CreateAuthor from './pages/Author/CreateAuthor';
import EditAuthor from './pages/Author/EditAuthor';
import ListCategory from './pages/Category/ListCategory';
import CreateCategory from './pages/Category/CreateCategory';
import EditCategory from './pages/Category/EditCategory';
import CreateUser from './pages/User/CreateUser';
import ListUser from './pages/User/ListUser';
import EditUser from './pages/User/EditUser';
import CreatePeminjaman from './pages/Peminjaman/CreatePeminjaman';
import ListPeminjaman from './pages/Peminjaman/ListPeminjaman';

function App() {

  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
     

                  {/* master data */}
        <Route path='/book/ListBook' element={<ListBook/>}/>
        <Route path='/book/CreateBook' element={<CreateBook/>}/>
        <Route path='/book/EditBook/:bookId' element={<EditBook/>}/>
        <Route path='/book/delete/:bookId' element={<ListBook/>}/>

        <Route path='/Author/ListAuthor' element={<ListAuthor/>}/>
        <Route path='/Author/CreateAuthor' element={<CreateAuthor/>}/>
        <Route path='/Author/EditAuthor/:authorId' element={<EditAuthor/>}/>

        <Route path='/Category/ListCategory' element={<ListCategory/>}/>
        <Route path='/Category/CreateCategory' element={<CreateCategory/>}/>
        <Route path='/Category/EditCategory/:categoryId' element={<EditCategory />}/>
        
        <Route path='/anggota/ListAnggota' element={<ListUser/>}/>
        <Route path='/anggota/CreateAnggota' element={<CreateUser/>}/>
        <Route path='/anggota/EditAnggota/:UserId' element={<EditUser />}/>

        <Route path='/peminjaman/ListPeminjaman' element={<ListPeminjaman/>}/>
        <Route path='/peminjaman/CreatePeminjaman' element={<CreatePeminjaman/>}/>
        <Route path='/anggota/EditAnggota/:UserId' element={<EditUser />}/>
       </Routes>
  );
}

export default App;
