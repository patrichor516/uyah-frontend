
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import Swal from 'sweetalert2';

function ListPeminjaman() {
  const [peminjaman, setPeminjaman] = useState([]);

  useEffect(() => {
    fetchData();
  },);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/peminjaman`);
      const Data = response.data.data;
      setPeminjaman(Data);
    } catch (error) {
      console.error('Error fetching book data:', error);
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
                  <li className="breadcrumb-item active">Peminjaman</li>
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
                    <h3 className="card-title">List Peminjaman</h3>
                    <div class="card-tools">
                      <div class="input-group input-group-sm" style={{ width: '100px' }}>
                        <td>
                          <Link to="/peminjaman/CreatePeminjaman" className="btn btn-block btn-primary">
                            CREATE
                          </Link>
                        </td>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {peminjaman.length > 0 ? (
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nama Anggota</th>
                            <th>Judul Buku</th>
                            <th>tanggal_peminjaman</th>
                            <th>tanggal_pengembalian</th>
                            <th>Kondisi buku saat dipinjam</th>
                            <th>kondisi buku_saat dikembalikan</th>
                            <th>Denda</th>
                          </tr>
                        </thead>
                        <tbody>
                          {peminjaman.map((peminjaman) => (
                            <tr key={peminjaman.id}>
                              <td>{peminjaman.id}</td>
                              <td>{peminjaman.nama_anggota}</td>
                              <td>{peminjaman.books ? peminjaman.books.judul_buku : 'tidak ada'}</td>
                              <td>{peminjaman.tanggal_peminjaman}</td>
                              <td>{peminjaman.tanggal_pengembalian}</td>
                              <td>{peminjaman.kondisi_buku_saat_dipinjam}</td>
                              <td>{peminjaman.kondisi_buku_saat_dikembalikan}</td>
                              <td>{peminjaman.denda}</td>
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
export default ListPeminjaman;