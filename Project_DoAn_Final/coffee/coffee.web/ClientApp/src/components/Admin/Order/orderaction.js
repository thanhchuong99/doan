import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import "./../admin.css";
import dateFormat from 'dateformat';
import { useStore } from "react-redux";


function OrderAction(props) {
  var tempDate = new Date();
  var date = dateFormat(tempDate,"yyyy-mm-dd'T'HH:MM:ss'Z'");
  const [state, setState] = useState({
    txtOrderId: 0,
    txtUserName: 0,
    txtOrderDate: date ,
    txtDiscountId: 0,
    txtShipAdress: "",
  });
  const [users, setUsers] = useState([]);
  const [dis, setDis] = useState([]);
  const [Order, setOrder] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  var { match } = props;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
    else if(Object.keys(formErrors).length === 0 ){
      callApi("User/get-all-User", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: "",
      }).then((res) => {
       
       setUsers(res.data.data.data);
      });
      callApi("Discount/get-all-discounts", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: "",
      }).then((res) => {
       
       setDis(res.data.data.data);   
      });
       
    if (match) {
      var id = match.params.id;
      callApi("Order/get-all-orders", "POST", {
        page: 1,
        size: 1,
        id: 0,
        type: "string",
        keyword: id,
      }).then((res) => {
        setState({
          txtOrderId: res.data.data.data[0].orderId,
          txtUserName: res.data.data.data[0].userName,
          txtOrderDate: res.data.data.data[0].orderDate,
          txtDiscountId: res.data.data.data[0].discountId,
          txtShipAdress: res.data.data.data[0].shipAddress,
        });
      });
    }
  }
  }, [formErrors]);

  const submitForm = () => {
   
   
    if (match) {
      var id = match.params.id;
      callApi("Order/update-order", "POST", {
        orderId: state.txtOrderId,
        userName: state.txtUserName,
        orderDate: date,
        discountId: parseInt(state.txtDiscountId),
        shipAddress: state.txtShipAdress,
      }).then((res) => {
        if (res.data.title == "Error") {
          setFormErrors({ ...formErrors, message: res.data.message });
        }
      });
    } else { if(state.txtUserName == 0 && state.txtDiscountId != 0){
      callApi("Order/create-order", "POST", {
        orderId: state.txtOrderId,
        userName: users[0].userName,
        orderDate: date,
        discountId: parseInt(state.discountId),
        shipAddress: state.txtShipAdress,
      }).then((res) => {
        id = false;
      });
    }
    else if (state.txtDiscountId == 0 && state.txtUserName != 0){
      callApi("Order/create-order", "POST", {
        orderId: state.txtOrderId,
        userName: state.txtUserName,
        orderDate: date,
        discountId: parseInt(dis[0].discountId),
        shipAddress: state.txtShipAdress,
      }).then((res) => {
        id = false;
      });
    }else{
      callApi("Order/create-order", "POST", {
        orderId: state.txtOrderId,
        userName: users[0].userName,
        orderDate: date,
        discountId: parseInt(dis[0].discountId),
        shipAddress: state.txtShipAdress,
      }).then((res) => {
        id = false;
      });
    }
    
     
    }
  }
  const validate = (values) => {
    let errors = {};
    var regex = /^[1-9]\d*$/;
    if (!values.txtShipAdress) {
      errors.txtShipAdress = "Cannot be blank";
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
  var {
    txtOrderId,
    txtUserName,
    txtOrderDate,
    txtDiscountId,
    txtShipAdress,
  } = state;
  const message = (formErrors) => {
    if (Object.keys(formErrors).length === 0) {
      return <h1 className="alert alert-success">SuccesFully</h1>;
    } else if (formErrors.message) {
      return <h1 className="alert alert-success">{formErrors.message}</h1>;
    } else {
      return "";
    }
  };
  function showUsers(users) {
    var result = null;
  
    if (users.length > 0) {
      result = users.map((users, index) => {
      
        return (
          <option key={index}  value={users.userName}>
            {users.userName}
          </option>
        );
      });
    }
    return result;
  }
  function showDis(dis) {
    var result = null;
    if (dis.length > 0) {
      result = dis.map((dis, index) => {
        return (
          <option key={index}  value={dis.discountId}>
            {dis.discountName}
          </option>
        );
      });
    }
    return result;
  }
  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      {isSubmitting && message(formErrors)}

      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>UserName: </label>
          <select className="form-control" onChange={onChange} name="txtUserName">{showUsers(users)}</select>
        </div>
        <div className="form-group">
          <label>Discount Id: </label>
          <select className="form-control" onChange={onChange} name="txtDiscountId">{showDis(dis)}</select>
        </div>
        <div className="form-group">
          <label>ShipAdress: </label>
          <input
            className={
              (formErrors.txtShipAdress && "border border-danger form-control") ||
              "form-control"
            }
            name="txtShipAdress"
            value={txtShipAdress}
            onChange={onChange}
          />
           {formErrors.txtShipAdress && (
            <div className="mt-1 alert-danger">{formErrors.txtShipAdress}</div>
          )}
        </div>
      
        

        <Link exact to="/admin/order" className="btn btn-danger mr-2">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
}
export default OrderAction;
