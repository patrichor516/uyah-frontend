
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
                  <li className="breadcrumb-item active">DataTables</li>
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
                    <h3 className="card-title">DataTable with default features</h3>
                  </div>
                  <div className="card-body">
                    {Books.length > 0 ? (
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>ISBN</th>
                            <th>Name Book</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Author</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Books.map((book) => (
                            <tr key={book.id}>
                              <td>{book.id}</td>
                              <td>{book.isbn}</td>
                              <td>{book.name_book}</td>
                              <td>{book.status}</td>
                              <td>{book.category.name_category}</td>
                              <td>
                                {book.author.map((author) => (
                                  <div key={author.id}>{author.name_author}</div>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Loading data...</p>
                    )}
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