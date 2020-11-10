import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import "./../admin.css";
import Order from "./../../Order/index";

function OrderDetailAction(props) {
  const [state, setState] = useState({
    txtOrderId: 1,
    txtProductId: 1,
    txtQuantity: 0,
  });
  const [pros, setPros] = useState([]);
  const [Order, setOrder] = useState([]);
  const [OrderDetail, setOrderDetail] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  var { match } = props;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    } else if (Object.keys(formErrors).length === 0) {
      callApi("Order/get-all-orders", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: "",
      }).then((res) => {
        setOrder(res.data.data.data);
      });
      callApi("Product/get-all-products", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: "",
      }).then((res) => {
        setPros(res.data.data.data);
      });
      if (match) {
        var id1 = match.params.id1;
        var id2 = match.params.id2;
        callApi("OrderDetail/get-all-orderdetail", "POST", {
          page: 1,
          size: 1,
          id: 0,
          type: "string",
          id1: id1,
          id2: id2,
        }).then((res) => {
          setState({
            txtOrderId: res.data.data.data[0].orderId,
            txtProductId: res.data.data.data[0].productId,
            txtQuantity: res.data.data.data[0].quantity,
          });
        });
      }
    }
  }, [formErrors]);

  const submitForm = () => {
    if (match) {
      console.log(match);
      var id = match.params.id;
      callApi("OrderDetail/update-orderdetail", "POST", {
        orderId: parseInt(state.txtOrderId),
        productId: parseInt(state.txtProductId),
        quantity: parseInt(state.txtQuantity),
      }).then((res) => {
        if (res.data.title == "Error") {
          setFormErrors({ ...formErrors, message: res.data.message });
        }
      });
    } else {
      callApi("OrderDetail/create-orderdetail", "POST", {
        orderId: parseInt(state.txtOrderId),
        productId: parseInt(state.txtProductId),
        quantity: parseInt(state.txtQuantity),
      }).then((res) => {
        if (res.data.title == "Error") {
          setFormErrors({ ...formErrors, message: "Đơn hàng đã tồn tại" });
        }
        id = false;
      });
    }
  };
  const validate = (values) => {
    let errors = {};
    if (!values.txtQuantity) {
      errors.txtQuantity = "Cannot be blank";
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
  var { txtOrderId, txtProductId, txtQuantity } = state;
  const message = (formErrors) => {
    if (Object.keys(formErrors).length === 0) {
      return <h1 className="alert alert-success">SuccesFully</h1>;
    } else if (formErrors.message) {
      return <h1 className="alert alert-success">{formErrors.message}</h1>;
    } else {
      return "";
    }
  };
  function showOrder(Order) {
    var result = null;
    if (Order.length > 0) {
      result = Order.map((Order, index) => {
        return (
          <option key={index} value={Order.orderId}>
            {Order.orderId}
          </option>
        );
      });
    }
    return result;
  }
  function showPros(pros) {
    var result = null;
    if (pros.length > 0) {
      result = pros.map((pros, index) => {
        return (
          <option key={index} value={pros.productId}>
            {pros.productName}
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
          <label>Order Id: </label>
          <select
            className="form-control"
            onChange={onChange}
            name="txtOrderId"
          >
            {showOrder(Order)}
          </select>
        </div>
        <div className="form-group">
          <label>Product Id: </label>
          <select
            className="form-control"
            onChange={onChange}
            name="txtProductId"
          >
            {showPros(pros)}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity: </label>
          <input
            className={
              (formErrors.txtQuantity && "border border-danger form-control") ||
              "form-control"
            }
            name="txtQuantity"
            value={txtQuantity}
            onChange={onChange}
          />
          {formErrors.txtQuantity && (
            <div className="mt-1 alert-danger">{formErrors.txtQuantity}</div>
          )}
        </div>

        <Link exact to="/admin/orderdetail" className="btn btn-danger mr-2">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
}
export default OrderDetailAction;
