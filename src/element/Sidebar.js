import React from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

function Sidebar() {

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link href="../../index3.html" className="brand-link">
        <img src={logo} className="brand-image img-circle elevation-3" alt="AdminLTE Logo" />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={logo} className="img-circle elevation-2" alt="User Image" myStyles="opacity: .8" />
          </div>
          <div className="info">
            <Link href="#" className="d-block">U.Y.A.H</Link>
          </div>
        </div>

        <div className="form-inline">

        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-book"></i>
                <p>
                    Master Data
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/book/ListBook" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Buku
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Author/ListAuthor" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Penerbit
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Category/ListCategory" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Kategori
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/anggota/ListAnggota" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Anggota
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/peminjaman/ListPeminjaman" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>
                      Peminjaman
                    </p>
                  </Link>
                </li>
              </ul>
            </li>
            <li class="nav-header">ACTION</li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fa-sign-out"></i>
                <p>
                  Logout
                </p>
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar; 