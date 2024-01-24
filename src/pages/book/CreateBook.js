import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CreateBook() {
  const [Books, setBooks] = useState({
    category_id : "",
    penerbit_buku_id : "",
    judul_buku : "",
    pengarang : "",
    tahun_terbit : "",
    isbn : "",
    buku_baik : "",
    buku_rusak : ""
  });

  const [Categories, setCategories] = useState({
    name_category: ""
  })

  const [Authors, setAuthors] = useState({
    nama_penerbit :""
  });

  const [allAuthors, setAllAuthors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataCategories();
    fetchDataAuthors();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      const data = response.data.data;
      console.log('Data berhasil diambil:', data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }

  const fetchDataAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/author');
      const data = response.data.data;
      setAllAuthors(data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }

  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/category');
      const data = response.data.data;
      setAllCategories(data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }


  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await fetchData();
      await fetchDataCategories();
      const saveResponse = await axios.post('http://localhost:8000/api/books/create', {
        category_id: Books.category_id,
        penerbit_buku_id: Authors.nama_penerbit,
        judul_buku: Books.judul_buku,
        pengarang: Books.pengarang,
        tahun_terbit: Books.tahun_terbit,
        isbn: Books.isbn,
        buku_baik:Books.buku_baik,
        buku_rusak : Books.buku_rusak

      });

      const savedData = saveResponse.data.data;
      setBooks(savedData);
      navigate('/book/ListBook')
      Swal.fire({
        title: 'success',
        icon: 'success'
      })
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      })
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">Create Book</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Judul Buku"
                        name="judul_buku"
                        value={Books.judul_buku}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pengarang"
                        name="pengarang"
                        value={Books.pengarang}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <select
                        id="PenerbitSelect"
                        className="form-control"
                        name="nama_penerbit"
                        value={Authors.nama_penerbit}
                        onChange={(e) => setAuthors({ ...Authors, [e.target.name]: e.target.value })}
                      >
                        <option value="">Pilih Penerbit</option>
                        {allAuthors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.nama_penerbit}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pengarang"
                        name="category_id"
                        value={Books.category_id}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pengarang"
                        name="tahun_terbit"
                        value={Books.tahun_terbit}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="buku baik"
                        name="buku_baik"
                        value={Books.buku_baik}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="buku rusak"
                        name="buku_rusak"
                        value={Books.buku_rusak}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    
  

                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={e => onSubmitChange(e)}
                      >
                        Submit
                      </button>
                    </div>

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

export default CreateBook;