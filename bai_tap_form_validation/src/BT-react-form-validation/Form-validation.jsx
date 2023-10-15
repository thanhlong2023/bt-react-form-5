import React, { Component } from "react";
import { connect } from "react-redux";

import { submitCreator, updateCreator } from "../redux/reducers/action";
import { flushSync } from "react-dom";

class FormValidation extends Component {
  state = {
    value: {
      maSV: "",
      phone: "",
      name: "",
      email: "",
    },
    error: {
      maSV: "",
      phone: "",
      name: "",
      email: "",
    },
    touch: {
      maSV: false,
      phone: false,
      name: false,
      email: false,
    },
  };
  handleValidate = () => {
    const newError = { ...this.state.error };
    const { value } = this.state;
    for (let prop in this.state.value) {
      // console.log("prop",{ prop });
      switch (prop) {
        case "maSV": {
          newError[prop] = "";
          const isExist = this.props.listProduct.find(
            (sv) => +sv.maSV === Number(value[prop])
          );
          const isNotEdit = !this.props.productEdit;

          if (isExist && isNotEdit) {
            newError[prop] = "Mã SV đã tồn tại.";
          }

          //2 phải là số
          const REGEX_NUMBER = /^\d+$/;
          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Phải là số";
          }
          //1 không được bỏ trống
          if (value[prop].length === 0) {
            newError[prop] = "Không được bỏ trống";
          }

          break;
        }
        case "phone": {
          newError[prop] = "";

          const REGEX_NUMBER = /^\d+$/;

          if (!(value[prop].length >= 10 && value[prop].length <= 11)) {
            newError[prop] = "Từ 10 tới 11 ký tự";
          }

          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Phải là số";
          }

          if (value[prop].length === 0) {
            //1 không được bỏ trống
            newError[prop] = "Không được bỏ trống";
          }
          break;
        }
        case "name": {
          newError[prop] = "";

          const REGEX_ABC =
            /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;

          if (!REGEX_ABC.test(value[prop])) {
            newError[prop] = "Phải là chữ A-Z";
          }

          if (value[prop].length === 0) {
            //1 không được bỏ trống
            newError[prop] = "Không được bỏ trống";
          }
          break;
        }
        case "email": {
          newError[prop] = "";

          const REGEX_ABC =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          if (!REGEX_ABC.test(value[prop])) {
            newError[prop] = "Email chưa hợp lệ";
          }

          if (value[prop].length === 0) {
            //1 không được bỏ trống
            newError[prop] = "Không được bỏ trống";
          }
          break;
        }
        default:
          break;
      }
    }
    this.setState({
      error: newError,
    });

    return newError;
  };
  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    // console.log(value, name);
    flushSync(() => {
      this.setState({
        value: {
          ...this.state.value,
          [name]: value,
        },
        touch: {
          ...this.state.touch,
          [name]: true,
        },
      });
    });
    this.handleValidate();
  };
  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true,
      },
    });
    this.handleValidate();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      touch: {
        maSV: true,
        phone: true,
        name: true,
        email: true,
      },
    });

    const newError = this.handleValidate();

    const ready = Object.values(newError).every((i) => i.length === 0);
    if (ready === false) return;

    const action = this.props.productEdit
      ? updateCreator(this.state.value)
      : submitCreator(this.state.value);

    this.props.dispatch(action);

    this.setState({
      value: {
        maSV: "",
        phone: "",
        name: "",
        email: "",
      },
      touch: {
        maSV: false,
        phone: false,
        name: false,
        email: false,
      },
    });
  };
  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.productEdit !== null) {
      if (newProps.productEdit.maSV !== currentState.value.maSV)
        return {
          value: newProps.productEdit,
        };
    }
    return null;
  }
  render() {
    // console.log(this.state.value);
    // console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <h2 className="text-center mb-5">
            Bài tập React Form Validation Lifecycle
          </h2>
          <h3 className="bg-dark text-light p-2">Thông tin sinh viên</h3>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="maSV" className="form-label">
                  Mã SV
                </label>
                <input
                  disabled={this.props.productEdit}
                  value={this.state.value.maSV}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="maSV"
                  type="text"
                  className="form-control"
                  id="maSV"
                  placeholder="Number: 1, 2, 3..."
                />
                {this.state.touch.maSV && this.state.error.maSV && (
                  <p className="text-danger">{this.state.error.maSV}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Số điện thoại
                </label>
                <input
                  value={this.state.value.phone}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="phone"
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="0123456789"
                />
                {this.state.touch.phone && this.state.error.phone && (
                  <p className="text-danger">{this.state.error.phone}</p>
                )}
              </div>

              <button type="submit" className="btn btn-success">
                {this.props.productEdit ? "Update" : "Thêm sinh viên"}
              </button>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Họ tên
                </label>
                <input
                  value={this.state.value.name}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nguyễn ABC"
                />
                {this.state.touch.name && this.state.error.name && (
                  <p className="text-danger">{this.state.error.name}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  value={this.state.value.email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="email"
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="abc@gmail.com"
                />
                {this.state.touch.email && this.state.error.email && (
                  <p className="text-danger">{this.state.error.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    listProduct: rootReducer.reactFormReducer.listProduct,
    productEdit: rootReducer.reactFormReducer.productEdit,
  };
};
export default connect(mapStateToProps)(FormValidation);
