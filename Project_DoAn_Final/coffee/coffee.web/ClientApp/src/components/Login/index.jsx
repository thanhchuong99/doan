import React from "react";
import "./index.css";
import AuthService from "../auth/helper"
import Images from "../../constants/images";
import {  Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


Login.propTypes = {};
function Login(props) {
  const [state, setState] = useState({
    txtUserName: "",
    txtPassword: "",
  });
  const [token, setToken] = useState();
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
    AuthService.login(state.txtUserName,state.txtPassword).then(
      () => {
        props.history.push("/");
        window.location.reload();
        setCurrentUser(true)
      }).catch((err)=>{
        setFormErrors({invalid:true})
      });
  };
  const validate = (values) => {
    let errors = {};
    var regex = /^[1-9]\d*$/;
    if (!values.txtPassword) {
      errors.txtPassword = "Cannot be blank";
    }
    if (!values.txtUserName) {
      errors.txtUserName = "Cannot be blank";
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
      return <span className=" alert-success">Đăng nhập thành công</span>;
    } else if (formErrors.invalid) {
      return <span className=" alert-danger">Đăng nhập thất bại!!</span>;
    } else {
      return "";
    }
  };
  var { txtUserName, txtPassword } = state;
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
              <h1 className="font-weight-bold  py-3">The Ou Coffee</h1>
              <h4>Đăng nhập vào tài khoản của bạn</h4>
              {isSubmitting && message(formErrors)}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Tên Đăng Nhập"
                      className={
                        (formErrors.txtUserName &&
                          "border border-danger form-control my-3 p-4") ||
                        "form-control my-3 p-4"
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
                      placeholder="Password"
                      className={
                        (formErrors.txtPassword &&
                          "border border-danger form-control my-3 p-4") ||
                        "form-control my-3 p-4"
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
                    <button type="submit" className="btn1 mt-3 mb-5">
                      Đăng Nhập
                    </button>
                  </div>
                </div>
                
                <p className="mb-2">
                  Bạn chưa có tài khoản?<Link to="/register"> Đăng kí tại đây</Link>
                </p>
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

export default Login;
