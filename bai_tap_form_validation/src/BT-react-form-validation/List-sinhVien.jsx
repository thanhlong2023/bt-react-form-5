import { connect } from "react-redux";

import React, { Component } from "react";
import {
  deleteCreator,
  editCreator,
  searchCreator,
} from "../redux/reducers/action";

class ListSinhVien extends Component {
  state = {
    name: "",
  };
  handleChange = async (event) => {
    const { target } = event;
    const { value } = target;
    await this.setState({
      name: value,
    });
    this.props.dispatch(searchCreator(this.state.name));
  };

  render() {
    // console.log("list", this.state);
    return (
      <div className="container mt-3">
        <div className="row">
          <h3 className="bg-dark text-light">Search Sinh viên</h3>
          <div className="col-3">
            <label htmlFor="search" className="mx-5">
              Tiềm kiếm sinh viên
            </label>
            <input type="text" id="search" onChange={this.handleChange} placeholder="Tên tiếng việt có dấu"/>
            <button
              className="btn btn-primary mx-3"
              onClick={() =>
                this.props.dispatch(searchCreator(this.state.name))
              }
            >
              Find
            </button>
          </div>
          <div className="col-9">
            <table className="table">
            <thead>
              <tr className="">
                <th scope="col">Mã SV</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
              <tbody>
                {this.props.mangTK.map((sv, index) => {
                  return (
                    <tr key={index}>
                      <td>{sv.maSV}</td>
                      <td>{sv.name}</td>
                      <td>{sv.phone}</td>
                      <td>{sv.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-3">
          <table className="table">
            <thead>
              <tr className="bg-dark text-light">
                <th scope="col">Mã SV</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.listProduct.map((sv, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{sv.maSV}</th>
                    <td>{sv.name}</td>
                    <td>{sv.phone}</td>
                    <td>{sv.email}</td>
                    <td>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() =>
                          this.props.dispatch(deleteCreator(sv.maSV))
                        }
                      >
                        Xóa
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.props.dispatch(editCreator(sv))}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    listProduct: rootReducer.reactFormReducer.listProduct,
    mangTK: rootReducer.reactFormReducer.mangTK,
  };
};
export default connect(mapStateToProps)(ListSinhVien);
