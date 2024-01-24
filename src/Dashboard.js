
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './element/Headers';
import Sidebar from './element/Sidebar';
import Footer from './element/Footer';
function Dashboard() {
  const [Books, setBooks] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/books')
      .then((response) => {
        const bookData = response.data.data; // Menyimpan data buku ke dalam variabel bookData
        setBooks(bookData);
        console.log(bookData);
      })
      .catch((error) => {
        console.error('bjir eror cok')
      });
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>DataTables</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link href="#">Home</Link></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">This Is Dashboard</h3>
                  </div>
                  <div className="card-body">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
export default Dashboard;