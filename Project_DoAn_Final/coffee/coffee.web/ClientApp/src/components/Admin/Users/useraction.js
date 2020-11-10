import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "./../../../utils/apiCaller";

function UserAction(props) {
  const [state, setState] = useState({
    txtUserName: "",
    txtPassword: "",
    txtfullName: "",
    txtPhone: "",
    txtLocation: "",
    txtRoleId: 1,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  var {match} = props;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
   
    if (match) {
       var id = match.params.id;
      callApi('User/get-all-User', 'POST', {
        "page": 1,
         "size": 1,
        "id": 0,
        "type": "string",
        "keyword": id
      }).then(res =>{ setState({ txtUserName: res.data.data.data[0].userName,
      txtPassword: "",
      txtfullName:  res.data.data.data[0].fullName,
      txtPhone:  res.data.data.data[0].phone,
      txtLocation:  res.data.data.data[0].location,
      txtRoleId:  res.data.data.data[0].roleId,} ); });
    }
  }, [formErrors]);

  const submitForm = () => {
  
    if (match) {
      var id = match.params.id;
      callApi("User/update-user", "POST", {
        UserName: state.txtUserName,
        Password: state.txtPassword,
        fullName: state.txtfullName,
        Phone: state.txtPhone,
        location: state.txtLocation,
        roleId: parseInt(state.txtRoleId, 10),
      }).then((res) => {
       
        setState({ txtUserName: res.data.data.userName,
          txtPassword: "",
          txtfullName:  res.data.data.fullName,
          txtPhone:  res.data.data.phone,
          txtLocation:  res.data.data.location,
          txtRoleId:  res.data.data.roleId,}  );
          id = false;
      });
    }
    else{
      callApi("User/create-admin", "POST", {
        UserName: state.txtUserName,
        Password: state.txtPassword,
        fullName: state.txtfullName,
        Phone: state.txtPhone,
        location: state.txtLocation,
        roleId: parseInt(state.txtRoleId, 10),
      }).then((res) => {
        if (res.data.title == "Error") {
          setFormErrors({...formErrors,"message":res.data.message });
        }
      });
    }
  };
  const validate = (values) => {
    let errors = {};
    const regex = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
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
    var value = target.type === "checkbox" ? target.checked : target.value;
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
  var {
    txtUserName,
    txtPassword,
    txtfullName,
    txtPhone,
    txtLocation,
    txtRoleId,
  } = state;
  const message = (formErrors) => {
  
    if (Object.keys(formErrors).length === 0) {
      return <h1 className="alert alert-success">SuccesFully</h1>;
    } else if(formErrors.message ) {
      return <h1 className="alert alert-success">{formErrors.message}</h1>;
    }else{
        return "";
    }
  };
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      {isSubmitting && message(formErrors)}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>UserName: </label>
          <input
            type="text"
            name="txtUserName"
            value={txtUserName}
            onChange={onChange}
            className={
              (formErrors.txtUserName && "border border-danger form-control") ||
              "form-control"
            }
          />
          {formErrors.txtUserName && (
            <div className="mt-1 alert-danger">{formErrors.txtUserName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className={
              (formErrors.txtPassword && "border border-danger form-control") ||
              "form-control"
            }
            name="txtPassword"
            value={txtPassword}
            onChange={onChange}
          />
          {formErrors.txtPassword && (
            <div className="mt-1 alert-danger">{formErrors.txtPassword}</div>
          )}
        </div>
        <div className="form-group">
          <label>fullName: </label>
          <input
            type="text"
            className="form-control"
            name="txtfullName"
            value={txtfullName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Phone: </label>
          <input
            type="text"
            className={
              (formErrors.txtPhone && "border border-danger form-control") ||
              "form-control"
            }
            name="txtPhone"
            value={txtPhone}
            onChange={onChange}
          />
          {formErrors.txtPhone && (
            <div className="mt-1 alert-danger">{formErrors.txtPhone}</div>
          )}
        </div>
        <div className="form-group">
          <label>Location: </label>
          <input
            type="text"
            className="form-control"
            name="txtLocation"
            value={txtLocation}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>RoleId: </label>
          <select
            name="txtRoleId"
            value={txtRoleId}
            onChange={onChange}
            className="form-control"
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
        <Link  exact to="/admin/users"  className="btn btn-danger mr-2">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
}

export default UserAction;
