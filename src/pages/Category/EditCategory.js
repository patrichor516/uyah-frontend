import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory() {
  const { categoryId } = useParams();
  const [Category, setCategory] = useState({
    name_category: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/category/${categoryId}`);
      const data = response.data.data;
      setCategory({
        name_category: data.name_category,
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  }

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(`http://localhost:8000/api/category/update/${categoryId}`, {
        name_category: Category.name_category,
      });
  
      console.log(updateResponse.data); 
  
      const updatedData = updateResponse.data.data;
      setCategory(updatedData);
      navigate('/Category/ListCategory');
      Swal.fire({
        title: 'Data Berhasil Diperbarui',
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
                <h3 className="card-title">Update Category</h3>
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
                        <label htmlFor="name_category">Category Name</label>
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

export default EditCategory;
