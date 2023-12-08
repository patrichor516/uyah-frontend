import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function EditAuthor() {
  const { authorId } = useParams();
  const [Author, setAuthor] = useState({
    name_author: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/author/${authorId}`);
      const data = response.data.data;
      setAuthor({
        name_author: data.name_author,
        address: data.address,
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(`http://localhost:8000/api/author/update/${authorId}`, {
        name_author: Author.name_author,
        address: Author.address,
      });
  
      console.log(updateResponse.data.data); // Log the response
  
      const updatedData = updateResponse.data.data;
      setAuthor(updatedData);
      navigate('/Author/ListAuthor');
      Swal.fire({
        title: 'Data Updated',
        icon: 'success'
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
  
      // Log the entire error object for more information
      console.error('Error Object:', error);
  
      // Log the response status and any error message provided by the server
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
      }
  
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
                <h3 className="card-title">Update Author</h3>
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
                    <form>
                      <div className="form-group">
                        <label htmlFor="name_author">Author Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Author Name"
                          name="name_author"
                          value={Author.name_author}
                          onChange={(e) => setAuthor({ ...Author, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Address"
                          name="address"
                          value={Author.address}
                          onChange={(e) => setAuthor({ ...Author, [e.target.name]: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={e => onSubmitUpdate(e)}
                        >
                          Update
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

export default EditAuthor;
