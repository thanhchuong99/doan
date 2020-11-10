import React from "react";
import "./index.css";
import AuthService from "../auth/helper"
import Images from "../../constants/images";
import {  Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import callApi from "../../utils/apiCaller";


function Register(props) {
  const [state, setState] = useState({
    txtUserName: "",
    txtPassword: "",
    txtFullName: "",
    txtPhone: "",
    txtLocation: "",
    txtRoleId: 2,
  });

  const [formErrors, setFormErrors] = useState({});
  const [currentUser,setCurrentUser] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);
  useEffect(() =>{
    setCurrentUser(localStorage.getItem('user'))
    if(currentUser){
      return props.history.push('/');
    }
  },[currentUser]);
  const submitForm = () => {
    callApi("User/create-user", "POST", {
      UserName: state.txtUserName,
      Password: state.txtPassword,
      Fullname: state.txtFullName,
      Phone: state.txtPhone,
      location: state.txtLocation,
      roleId: parseInt(state.txtRoleId, 10),
    }).then((res) => {
      if (res.data.title == "Error") {
        setFormErrors({...formErrors,"message":res.data.message });
      }
    });
  };
  const validate = (values) => {
    let errors = {};
    var regex = /^[0-9]\d*$/;
    if (!values.txtUserName) {
      errors.txtUserName = "Cannot be blank";
    } else if (values.txtUserName.length < 6) {
      errors.txtUserName = "UserName must be more than 6 characters";
    }
    if (!values.txtPassword) {
      errors.txtPassword = "Cannot be blank";
    } else if (values.txtPassword.length < 6) {
      errors.txtPassword = "Password must be more than 6 characters";
    }
  
      if (!values.txtLocation) {
        errors.txtLocation = "Cannot be blank";
      }
    if (!values.txtPhone) {
      errors.txtPhone = "Cannot be blank";
    } else if (!regex.test(values.txtPhone)) {
      errors.txtPhone = "Invalid phone format";
    }
    return errors;
  };
  function onChange(e) {
    var target = e.target;
    var name = target.name;
    var value =
      target.type === "checkbox" ? (target.checked ? 1 : 0) : target.value;
    setState({
      ...state,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(state));
    setIsSubmitting(true);
  }
  var { txtUserName, txtPassword } = state;
  const message = (formErrors) => {
  
    if (Object.keys(formErrors).length === 0) {
      return <h1 className="alert alert-success">Đăng kí thành công</h1>;
    } else if(formErrors.message ) {
      return <h1 className="alert alert-danger">{formErrors.message}</h1>;
    }else{
        return "";
    }
  };
  var { txtUserName, txtPassword , txtFullName, txtPhone, txtLocation } = state;
  return (
    <div className="login">
      <section className="Form my-4 mx-5">
        <div className="container">
          <div className="rowlogin row no-gutters">
            <div className="col-lclassNameg-5">
              <img
                src={Images.LOGIN}
                className="img-fluid"
                style={{ maxHeight: "660px" }}
                alt=""
              />
            </div>
            <div className="col-lg-7 px-5 pt-5 ">
              <h4>Đăng kí vào tài khoản của bạn</h4>
              {isSubmitting && message(formErrors)}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Tên Đăng Nhập *"
                      className={
                        (formErrors.txtUserName &&
                          "border border-danger form-control m-1 p-3") ||
                        "form-control m-1 p-3"
                      }
                      name="txtUserName"
                      onChange={onChange}
                    />
                    {formErrors.txtUserName && (
                      <div className="mt-1 alert-danger">
                        {formErrors.txtUserName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="password"
                      placeholder="Password*"
                      className={
                        (formErrors.txtPassword &&
                          "border border-danger form-control m-1 p-3") ||
                        "form-control m-1 p-3"
                      }
                      onChange={onChange}
                      name="txtPassword"
                    />
                    {formErrors.txtPassword && (
                      <div className="mt-1 alert-danger">
                        {formErrors.txtPassword}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="FullName"
                      className={
                        (formErrors.txtFullName &&
                          "border border-danger form-control m-1 p-3") ||
                        "form-control m-1 p-3"
                      }
                      onChange={onChange}
                      name="txtFullName"
                    />
                    {formErrors.txtFullName && (
                      <div className="mt-1 alert-danger">
                        {formErrors.txtFullName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Phone*"
                      className={
                        (formErrors.txtPhone &&
                          "border border-danger form-control m-1 p-3") ||
                        "form-control m-1 p-3"
                      }
                      onChange={onChange}
                      name="txtPhone"
                    />
                    {formErrors.txtPhone && (
                      <div className="mt-1 alert-danger">
                        {formErrors.txtPhone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Địa chỉ*"
                      className={
                        (formErrors.txtLocation &&
                          "border border-danger form-control m-1 p-3") ||
                        "form-control m-1 p-3"
                      }
                      onChange={onChange}
                      name="txtLocation"
                    />
                    {formErrors.txtLocation && (
                      <div className="mt-1 alert-danger">
                        {formErrors.txtLocation}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <button type="submit" className="btn1 mt-3 mb-5">
                      Đăng Kí
                    </button>
                  </div>
                </div>
              </form>
              <form>
                <Link to="/">
                  <input type="button" value="Go back HomePage!" />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
