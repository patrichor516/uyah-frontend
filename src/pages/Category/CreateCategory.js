import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {
  const [Category, setCategory] = useState({
    name_category: "",
  });

  const navigate = useNavigate();

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const saveResponse = await axios.post('http://localhost:8000/api/category/create', {
        name_category: Category.name_category,
      });

      const savedData = saveResponse.data.data;
      setCategory(savedData);
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
                <h3 className="card-title">Create Category</h3>
                {/* ... */}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <form>
                      <div className="form-group">
                        <label htmlFor="name_author">Category Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Category Name"
                          name="name_category"
                          value={Category.name_category}
                          onChange={(e) => setCategory({ ...Category, [e.target.name]: e.target.value })}
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

export default CreateCategory;
