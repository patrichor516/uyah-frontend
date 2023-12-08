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
    name_book: "",
    category_id: "",
  });

  const [Categories, setCategories] = useState({
    name_category: ""
  })

  const [Authors, setAuthors] = useState([]);

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

  const handleAuthorSelectChange = (selectedOptions) => {
    const selectedAuthorIds = selectedOptions.map(option => option.value);
    setAuthors(selectedAuthorIds);
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await fetchData();
      await fetchDataCategories();
      const saveResponse = await axios.post('http://localhost:8000/api/books/create', {
        name_book: Books.name_book,
        category_id: Categories.name_category,
        author_id: Authors,
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
                        placeholder="Enter Name Book"
                        name="name_book"
                        value={Books.name_book}
                        onChange={(e) => setBooks({ ...Books, [e.target.name]: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="categorySelect">Select Category</label>
                      <select
                        id="categorySelect"
                        className="form-control"
                        name="name_category"
                        value={Categories.name_category}
                        onChange={(e) => setCategories({ ...Categories, [e.target.name]: e.target.value })}
                      >
                        <option value="">Select a Category</option>
                        {allCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name_category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Select Authors</label>
                      <Select
                        isMulti
                        options={allAuthors.map(author => ({ value: author.id, label: author.name_author }))}
                        value={allAuthors.filter(author => Authors.includes(author.id)).map(author => ({ value: author.id, label: author.name_author }))}
                        onChange={handleAuthorSelectChange}
                      />
                    </div>
                    {/* Repeat similar form groups for other fields */}

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