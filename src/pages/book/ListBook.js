
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import Swal from 'sweetalert2';

function ListBook() {
  const { bookId } = useParams();
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/books`);
      const bookData = response.data.data;
      setBooks(bookData);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      
      Swal.close();
  
      const response = await axios.delete(`http://localhost:8000/api/books/delete/${id}`);
      const deletedBookId = response.data.data.id;
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBookId));

      Swal.fire({
        title: 'Data Berhasil Dihapus',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error deleting book:', error);
      Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

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
                    <div class="card-tools">
                      <div class="input-group input-group-sm" style={{ width: '100px' }}>
                        <td>
                          <Link to="/book/CreateBook" className="btn btn-block btn-primary">
                            CREATE
                          </Link>
                        </td>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {Books.length > 0 ? (
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Judul Buku</th>
                            <th>Pengarang</th>
                            <th>Penerbit</th>
                            <th>Buku Baik</th>
                            <th>Buku Rusak</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Books.map((book) => (
                            <tr key={book.id}>
                              <td>{book.id}</td>
                              <td>{book.judul_buku}</td>
                              <td>{book.pengarang}</td>
                              <td>{book.author.nama_penerbit}</td>
                              <td>{book.buku_baik}</td>
                              <td>{book.buku_rusak}</td>
    
                              <td><div class="btn-group">
                                <button type="button" class="btn btn-info">Action</button>
                                <button type="button" class="btn btn-info dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                  <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu" role="menu">
                                  <Link className="dropdown-item" to={`/book/EditBook/${book.id}`}>
                                    Edit
                                  </Link>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => deleteBook(book.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div></td>
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
export default ListBook;