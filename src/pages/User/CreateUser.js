import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [User, setUser] = useState({
    kode_user : "",
    nis :"",
    fullname :"",
    username :"",
    kelas : "",
    alamat : "",
    verif : "",
    join_date :"", 
    terakhir_login: ""

  });

  const navigate = useNavigate();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const saveResponse = await axios.post('http://localhost:8000/api/anggota/create', {
        kode_user :  User.kode_user,
        nis : User.nis,
        fullname : User.fullname,
        username : User.username ,
        kelas : User.kelas,
        alamat : User.alamat,
        verif : User.verif,
        join_date : User.join_date, 
        terakhir_login: User.terakhir_login 
      });

      const savedData = saveResponse.data.data;
      setUser(savedData);
      navigate('/Category/ListCategory');
      Swal.fire({
        title: 'success',
        icon: 'success'
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
                <h3 className="card-title">Membuat Anggota</h3>
                {/* ... */}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <form>
                      <div className="form-group">
                        <label htmlFor="kode_user">Kode Anggota</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kode Anggota"
                          name="kode_user"
                          value={User.kode_user}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nis">NIS</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="NIS"
                          name="nis"
                          value={User.nis}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="fullname"
                          value={User.fullname}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          value={User.username}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                     
                      <div className="form-group">
                        <label htmlFor="kelas">Kelas</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kelas"
                          name="kelas"
                          value={User.kelas}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Alamat"
                          name="alamat"
                          value={User.alamat}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="verif">Verifikasi</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Verifikasi"
                          name="verif"
                          value={User.verif}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="join_date">Join Date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Join Date"
                          name="join_date"
                          value={User.join_date}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="terakhir_login">Terakhir Login</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Terakhir Login"
                          name="terakhir_login"
                          value={User.terakhir_login}
                          onChange={(e) => setUser({ ...User, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => onSubmitChange(e)}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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

export default CreateUser;
