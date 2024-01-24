import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

function CreatePeminjaman() {
  const [peminjaman, setPeminjaman] = useState({
    judul_buku_id: "",
    nama_anggota: "",
    tanggal_peminjaman:"",
    tanggal_pengembalian:"",
    kondisi_buku_saat_dipinjam:"",
    kondisi_buku_saat_dikembalikan:"",
    denda:""
  });

  const [books, setBooks] = useState({
    judul_buku: ""
  })

  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataBooks();
  }, []);

  const fetchDataBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/books');
      const data = response.data.data;
      setAllBooks(data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const saveResponse = await axios.post('http://localhost:8000/api/peminjaman/create', {
        judul_buku_id: books.judul_buku,
        nama_anggota: peminjaman.nama_anggota,
        tanggal_peminjaman: peminjaman.tanggal_peminjaman,
        tanggal_pengembalian: peminjaman. tanggal_peminjaman,
        kondisi_buku_saat_dipinjam:peminjaman. kondisi_buku_saat_dipinjam,
        kondisi_buku_saat_dikembalikan: peminjaman.kondisi_buku_saat_dikembalikan,
        denda: peminjaman.denda
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
                <h3 className="card-title">Create Peminjaman</h3>
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
                      <label htmlFor="categorySelect">Pilih Buku</label>
                      <select
                        id="categorySelect"
                        className="form-control"
                        name="judul_buku"
                        value={books.judul_buku}
                        onChange={(e) => setBooks({ ...books, [e.target.name]: e.target.value })}
                      >
                        <option value="">Select a Category</option>
                        {allBooks.map((books) => (
                          <option key={books.id} value={books.id}>
                            {books.judul_buku}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Anggota"
                        name="nama_anggota"
                        value={peminjaman.nama_anggota}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tanggal Peminjaman"
                        name="tanggal_peminjaman"
                        value={peminjaman.tanggal_peminjaman}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tanggal Pengembalian"
                        name="tanggal_pengembalian"
                        value={peminjaman.tanggal_pengembalian}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="kondisi buku saat dipinjam"
                        name="kondisi_buku_saat_dipinjam"
                        value={peminjaman.kondisi_buku_saat_dipinjam}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="kondisi buku saat dipinjam"
                        name="kondisi_buku_saat_dikembalikan"
                        value={peminjaman.kondisi_buku_saat_dikembalikan}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="denda"
                        name="denda"
                        value={peminjaman.denda}
                        onChange={(e) => setPeminjaman({ ...peminjaman, [e.target.name]: e.target.value })}
                      />
                    </div>
                    {/* Repeat similar form groups for other fields */}

                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => onSubmitChange(e)}
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

export default CreatePeminjaman;