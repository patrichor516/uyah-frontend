import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateAuthor() {
  const [Author, setAuthor] = useState({
    kode_penerbit: "",
    nama_penerbit: "",
    verf_penerbit: ""
  });

  const navigate = useNavigate();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const saveResponse = await axios.post('http://localhost:8000/api/author/create', {
        kode_penerbit: Author.kode_penerbit,
        nama_penerbit: Author.nama_penerbit,
        verf_penerbit: Author.verf_penerbit
      });

      const savedData = saveResponse.data.data;
      setAuthor(savedData);
      navigate('/Author/ListAuthor');
      Swal.fire({
        title: 'success',
        icon: 'success'
      });
    } catch (error) {
      console.error('error', error);
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
                <h3 className="card-title">Create Author</h3>
                {/* ... */}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kode Penerbit"
                          name="kode_penerbit"  
                          value={Author.kode_penerbit}
                          onChange={(e) => setAuthor({ ...Author, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nama Penerbit"
                          name="nama_penerbit" 
                          value={Author.nama_penerbit}
                          onChange={(e) => setAuthor({ ...Author, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Verf Penerbit"
                          name="verf_penerbit"  
                          value={Author.verf_penerbit}
                          onChange={(e) => setAuthor({ ...Author, [e.target.name]: e.target.value })}
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

export default CreateAuthor;
