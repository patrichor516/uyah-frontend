import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useState, useEffect } from 'react';

function CreateBook() {
  const [Books, setBooks] = useState({
    name_book: "",
    category_id: "",
  });

  const [Categories, setCategories] = useState({
    name_category: ""
  })

  const [Authors, setAuthors] = useState({
    name_author: ""
  })
  
  const [allAuthors, setAllAuthors] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

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

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      await fetchData();
      await fetchDataCategories();
      const saveResponse = await axios.post('http://localhost:8000/api/books/create', {
        name_book: Books.name_book,
        category_id: Categories.name_category,
        author_id: Authors.name_author // Sesuaikan dengan kunci yang benar
      });
    
      const savedData = saveResponse.data.data;
      setBooks(savedData);
      console.log('Data berhasil disimpan:', savedData);
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
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
                <h3 className="card-title">Select2 (Default Theme)</h3>
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
                      <label htmlFor="authorSelect">Select Author</label>
                      <select
                        id="authorSelect"
                        className="form-control"
                        name="name_author"
                        value={Authors.name_author}
                        onChange={(e) => setAuthors({ ...Authors, [e.target.name]: [e.target.value] })}
                      >
                        <option value="">Select Author</option>
                        {allAuthors.map((author) => (
                          <option key={author.id} value={author.id}>
                            {author.name_author}
                          </option>
                        ))}
                      </select>
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
