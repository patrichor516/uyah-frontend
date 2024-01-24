
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import Swal from 'sweetalert2';
function ListUser() {
  const { userId } = useParams();
  const [User, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/anggota`);
        const userData = response.data.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/anggota/delete/${id}`);
      if (response.data.status) {
        // Remove the deleted user from the state
        setUser(User.filter((user) => user.id !== id));
        Swal.fire({
          title: 'Success',
          text: 'User deleted successfully',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete user',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete user',
        icon: 'error',
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
                          <Link to="/Category/CreateCategory" className="btn btn-block btn-primary">
                            CREATE
                          </Link>
                        </td>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {User.length > 0 ? (
                      <table id="example1" className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Kode Anggota</th>
                            <th>NIS</th>
                            <th>Nama Lengkap</th>
                            <th>Kelas</th>
                            <th>Alamat</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {User.map((User) => (
                            <tr key={User.id}>
                              <td>{User.id}</td>
                              <td>{User.kode_user}</td>
                              <td>{User.nis}</td>
                              <td>{User.fullname}</td>
                              <td>{User.kelas}</td>
                              <td>{User.alamat}</td>
                              <td><div class="btn-group">
                                <button type="button" class="btn btn-info">Action</button>
                                <button type="button" class="btn btn-info dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                  <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu" role="menu">
                                  <Link className="dropdown-item" to={`/anggota/EditAnggota/${User.id}`}>Edit</Link>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleDelete(User.id)}
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
export default ListUser;