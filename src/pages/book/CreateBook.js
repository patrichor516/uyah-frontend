import axios from 'axios';
import Header from '../../element/Headers';
import Sidebar from '../../element/Sidebar';
import Footer from '../../element/Footer';
import React, { useEffect, useState } from 'react';


function CreateBook() {
  const [CreateBooks, setCreateBooks] = useState([])
  useEffect(()=>{
  const fetchData = async()=>{
    try{
      const response = await
      axios.get('http://localhost:8000/api/books/create')
        const data = response.data.data;
        setCreateBooks(data);
      }catch(error) {
          console.error('bjir eror cok')
        };
      };
        fetchData();
    }, []);
  
 

  return (

    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-header">
                <h3 class="card-title">Select2 (Default Theme)</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email"></input>
                  </div>
                    <div class="form-group">
                      <label>Minimal</label>
                      <select class="form-control select2" style={{ width: '100%' }}>
                        <option selected="selected">Alabama</option>
                
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Disabled</label>
                      <select class="form-control select2" disabled="disabled" style={{ width: '100%' }}>
                        <option selected="selected">Alabama</option>
                      
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Multiple</label>
                      <select class="select2" multiple="multiple" data-placeholder="Select a State" style={{ width: '100%' }}>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>California</option>
                        <option>Delaware</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Washington</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Disabled Result</label>
                      <select class="form-control select2" style={{ width: '100%' }}>
                        <option selected="selected">Alabama</option>
                        <option>Alaska</option>
                        <option disabled="disabled">California (disabled)</option>
                        <option>Delaware</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Washington</option>
                      </select>
                    </div>
                  </div>
                </div>

                <h5>Custom Color Variants</h5>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label>Minimal (.select2-danger)</label>
                      <select class="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" style={{ width: '100%' }}>
                        <option selected="selected">Alabama</option>
                        <option>Alaska</option>
                        <option>California</option>
                        <option>Delaware</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Washington</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="form-group">
                      <label>Multiple (.select2-purple)</label>
                      <div class="select2-purple">
                        <select class="select2" multiple="multiple" data-placeholder="Select a State" data-dropdown-css-class="select2-purple" style={{ width: '100%' }}>
                          <option>Alabama</option>
                          <option>Alaska</option>
                          <option>California</option>
                          <option>Delaware</option>
                          <option>Tennessee</option>
                          <option>Texas</option>
                          <option>Washington</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
                the plugin.
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