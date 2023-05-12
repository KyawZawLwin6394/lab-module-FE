/* eslint-disable */

import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CatRegister() {
  const [reagent, setReagent] = useState([]);

  const handleDelete = (event) => {
    console.log(event, "event")
    axios.delete('http://centralclinicbackend.kwintechnologykw11.com:3000/api/reagent/' + event).then(response => {
      Swal.fire({
        title: "Success",
        text: "Successfully Deleted!",
        icon: "success",
        confirmButtonText: "OK"
      })
      const result = reagent.filter(item => item._id !== event)
      setReagent(result);
    }).catch(error => {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "CANCEL",
      })
    })
  }

  useEffect(() => {
    const getReagent = async () => {
      try {
        const res = await axios.get(
          "http://centralclinicbackend.kwintechnologykw11.com:3000/api/reagents?limit=30"
        );

        setReagent(res.data.data);
      } catch (err) { }
    };
    getReagent();
  }, []);
  return (
    <div classNameName="App">
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className="wrapper">
        <SideBar />
        {/* <!-- Content Wrapper. Contains page content --> */}

        <div className="content-wrapper">
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/lab-test">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Reagent List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div class="row">
                  <div class="col-md-12 py-3 card">
                    <div class="card-header">
                      <div class="row justify-content-between">
                        <label class="">
                          <span class="float-right">
                            <Link to="/reagent-reg" class="btn btn-primary">
                              <i class="fas fa-plus"></i> &nbsp;Reagent Register
                            </Link>
                            &nbsp;
                            {/* <a href="/expense_type" class="btn btn-primary">
                              Expense Type
                            </a> */}
                            <button
                              type="button"
                              className="btn btn-primary"
                              // onClick={excelExport}
                            >
                              Export Excel
                            </button>
                          </span>
                        </label>
                      </div>
                      <div class="row" id="trial_balance"></div>
                    </div>
                    <div class="table-responsive text-black" id="slimtest2">
                      <table class="table table-hover" id="filter_date">
                        <thead class="bg-info text-white">
                          <tr>
                            <th>No.</th>
                            <th>Code</th>

                            <th>Name</th>

                            {/* <th>Stock Unit</th> */}

                            <th>Supplier</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        {reagent.map((reag, i) => (
                          <tbody className="">
                            <tr>
                              <td>{++i}</td>
                              <td>{reag.code}</td>
                              <td>{reag.name}</td>
                              {/* 
                              <td>{reag.stockUnit[0].unitName}</td> */}

                              <td>{reag.supplier.name}</td>

                              <td className="text-center">
                                <a
                                  className="btn btn-sm btn-danger text-white"
                                  role="button"
                                  onClick={() => handleDelete(reag._id)}>
                                  Delete
                                </a>
                                {/* &nbsp;
                                <a href="" className="btn btn-sm btn-danger">
                                  Delete
                                </a> */}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <div className="card px-3 py-3">
                      <h5 className="card-header mb-4 text-secondary">
                        Create Reagent
                      </h5>

                      <div class="form-group">
                        <label for="code" className="text-secondary">
                          Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          class="form-control border-info"
                          name="code"
                          //   ref={(el) => (this.name = el)}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control border-info"
                          name="name"
                          id="name"
                          //   ref={(el) => (this.name = el)}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="desc"
                          //   ref={(el) => (this.description = el)}
                          onChange={(e) =>
                            setDescription(e.target.value)
                          }></textarea>
                      </div>
                      <div class="form-group">
                        <label for="name" className="text-secondary">
                          Flag
                        </label>
                        <select
                          class="custom-select border-info"
                          name="account_type_id"
                          id="flag"
                          onChange={(e) => setFlag(e.target.value)}>
                          <option></option>
                          <option value="Service">Service</option>
                          <option value="Reagent">Reagent</option>
                        </select>
                      </div>
                      <button
                        className="btn btn-primary form-control text-center fw-5"
                        type="submit"
                        onClick={CategoryCreate}>
                        Save
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* <ExpenseDialog
                open={open}
                close={() => setOpen(false)}
                expenseLists={expenseLists}
                setExpenseLists={setExpenseLists}
              /> */}
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className="main-footer">
        <strong>
          Copyright &copy; 2017-2020{" "}
          <a href="http://www.kwintechnologies.com">K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside classNameName="control-sidebar control-sidebar-dark">
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  );
}
export default CatRegister;
