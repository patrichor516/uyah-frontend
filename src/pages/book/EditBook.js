import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

function EditBook() {
  const { bookId } = useParams();
  const [Book, setBook] = useState({
    name_book: "",
    category_id: "",
    authors: []
  });

  const [Categories, setCategories] = useState({
    name_category: ""
  });

  const [Authors, setAuthors] = useState([]);

  const [allAuthors, setAllAuthors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataCategories();
    fetchDataAuthors();
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/books/${bookId}`);
      const data = response.data.data;
      setBook({
        name_book: data.name_book,
        category_id: data.category_id,
        authors: data.authors
      });
      setCategories({
        name_category: data.category.name_category
      });
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
      console.error('Terjadi kesalahan saat mengambil data penulis:', error);
    }
  }

  const fetchDataCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/category');
      const data = response.data.data;
      setAllCategories(data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data kategori:', error);
    }
  }

  const handleAuthorSelectChange = (selectedOptions) => {
    const selectedAuthorIds = selectedOptions.map(option => option.value);
    setAuthors(selectedAuthorIds);
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(`http://localhost:8000/api/books/update/${bookId}`, {
        name_book: Book.name_book,
        category_id: Categories.name_category,
        author_id: Authors,
      });
  
      console.log(updateResponse.data.data); // Log the response
  
      const updatedData = updateResponse.data.data;
      setBook(updatedData);
      navigate('/book/ListBook');
      Swal.fire({
        title: 'Data Updated',
        icon: 'success'
      });
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
  
      console.error('Error Object:', error);
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
                <h3 className="card-title">Update Book</h3>
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
                        placeholder="Enter Book Name"
                        name="name_book"
                        value={Book.name_book}
                        onChange={(e) => setBook({ ...Book, [e.target.name]: e.target.value })}
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


                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={e => onSubmitUpdate(e)}
                      >
                        Update
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

export default EditBook;
