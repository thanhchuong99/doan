import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import "./../admin.css";

function ProductAction(props) {
  const [state, setState] = useState({
    txtProductId: 0,
    txtCategoryId: 0,
    txtProductName: "",
    txtunitPrice: 0,
    txtDes: "",
    txtHot: 0,
  });
  const [Cate, setCate] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  var { match } = props;
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
    else if(Object.keys(formErrors).length === 0 ){
    callApi("Category/get-all-categorys", "POST", {
      page: 1,
      size: 500,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
      setCate(res.data.data.data);
      setState({
        ...state,
        txtCategoryId: res.data.data.data[0].categoryId,       
      });
    });
  }
    if (match) {
      var id = match.params.id;
      callApi("Product/get-all-products", "POST", {
        page: 1,
        size: 1,
        id: 0,
        type: "string",
        keyword: id,
      }).then((res) => {
        setState({
          txtProductId: res.data.data.data[0].productId,
          txtCategoryId: res.data.data.data[0].categoryId,
          txtProductName: res.data.data.data[0].productName,
          txtunitPrice: res.data.data.data[0].unitPrice,
          txtDes: res.data.data.data[0].description,
          txtHot: res.data.data.data[0].hot,
        });
      });
  }
  }, [formErrors]);

  const submitForm = () => {
    if (match) {
      var id = match.params.id;
      callApi("Product/update-product", "POST", {
        productId: state.txtProductId,
        categoryId: state.txtCategoryId,
        productName: state.txtProductName,
        unitPrice: parseInt(state.txtunitPrice),
        description: state.txtDes,
        hot: state.txtHot,
      }).then((res) => {
        if (res.data.title == "Error") {
          setFormErrors({ ...formErrors, message: res.data.message });
        }
      });
    } else {
      callApi("Product/create-product", "POST", {
        productId: state.txtProductId,
        categoryId: parseInt(state.txtCategoryId),
        productName: state.txtProductName,
        unitPrice: parseInt(state.txtunitPrice),
        description: state.txtDes,
        hot: state.txtHot,
      }).then((res) => {
        console.log(res);
        id = false;
      });
    }
  };
  const validate = (values) => {
    let errors = {};
    var regex = /^[1-9]\d*$/;
    if (!values.txtProductName) {
      errors.txtProductName = "Cannot be blank";
    }
    if (!values.txtunitPrice) {
      errors.txtunitPrice = "Cannot be blank";
    }else if(!regex.test(values.txtunitPrice)){
      errors.txtunitPrice = "Unit Price phải là số nguyên và không được bắt đầu bằng 0";
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
    txtProductId,
    txtCategoryId,
    txtProductName,
    txtunitPrice,
    txtDes,
    txtHot,
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
  function showCates(Cate) {
    var result = null;
    if (Cate.length > 0) {
      result = Cate.map((Cate, index) => {
        return (
          <option key={index}  value={Cate.categoryId}>
            {Cate.categoryName}
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
          <label>ProductName: </label>
          <input
            className={
              (formErrors.txtProductName &&
                "border border-danger form-control") ||
              "form-control"
            }
            name="txtProductName"
            value={txtProductName}
            onChange={onChange}
          />
          {formErrors.txtProductName && (
            <div className="mt-1 alert-danger">{formErrors.txtProductName}</div>
          )}
        </div>
        <div className="form-group">
          <label>Category Id: </label>
          <select className="form-control" onChange={onChange}name="txtCategoryId">{showCates(Cate)}</select>
        </div>
        <div className="form-group">
          <label>Unit Price: </label>
          <input
            className={
              (formErrors.txtunitPrice &&
                "border border-danger form-control") ||
              "form-control"
            }
            name="txtunitPrice"
            value={txtunitPrice}
            onChange={onChange}
          />
          {formErrors.txtunitPrice && (
            <div className="mt-1 alert-danger">{formErrors.txtunitPrice}</div>
          )}
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            className={
              (formErrors.txtDes && "border border-danger form-control") ||
              "form-control"
            }
            name="txtDes"
            value={txtDes}
            onChange={onChange}
          />
        </div>
        <div className="form-group ">
          <label>Món Ưa Thích: </label>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                name="txtHot"
                value={txtHot}
                onChange={onChange}
                className="form-check-input "
                checked={txtHot}
              />
              Active
            </label>
          </div>
        </div>

        <Link exact to="/admin/Product" className="btn btn-danger mr-2">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
}

export default ProductAction;
