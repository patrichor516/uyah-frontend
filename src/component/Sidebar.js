import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link href="../../index3.html" className="brand-link">
          {/* <img src={logo} className="brand-image img-circle elevation-3" alt="AdminLTE Logo" myStyles="opacity: .8" /> */}
          {/* <span className="brand-text font-weight-light">AdminLTE 3</span> */}
        </Link>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {/* <img src={logo} className="img-circle elevation-2" alt="User Image" myStyles="opacity: .8" /> */}
            </div>
            <div className="info">
              <Link href="#" className="d-block">U.Y.A.H</Link>
            </div>
          </div>

          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              {/* <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"> */}
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
              {/* </input> */}
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link href="../../index.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v1</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="../../index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="../../index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v3</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="../widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Widgets
                    <span className="right badge badge-danger">New</span>
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