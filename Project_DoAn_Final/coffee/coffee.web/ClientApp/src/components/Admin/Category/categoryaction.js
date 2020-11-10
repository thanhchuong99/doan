import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "./../../../utils/apiCaller";

function CategoryAction(props) {
  const [state, setState] = useState({
    txtCategoryId: 0,
    txtCategoryName: ""
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
      callApi('Category/get-all-categorys', 'POST', {
        "page": 1,
         "size": 1,
        "id": 0,
        "type": "string",
        "keyword": id
      }).then(res =>{ setState({ txtCategoryId: res.data.data.data[0].categoryId,
      txtCategoryName:  res.data.data.data[0].categoryName,} ); });
    }
  }, [formErrors]);

  const submitForm = () => {
  
    if (match) {
        var id = match.params.id;
        callApi("Category/update-category", "POST", {
            categoryId: state.txtCategoryId,
            categoryName: state.txtCategoryName,
          }).then((res) => {
            if (res.data.title == "Error") {
              setFormErrors({...formErrors,"message":res.data.message });
            }
          });
    }
    else{
      callApi("Category/create-category", "POST", {
        categoryId: state.txtCategoryId,
        categoryName: state.txtCategoryName,
      }).then((res) => {
       
        setState({ txtCategoryId: res.data.data.categoryId,
          txtCategoryName:  res.data.data.categoryName,}  );
          id = false;
      });
     
    }
  };
  const validate = (values) => {
    let errors = {};

    if (!values.txtCategoryName) {
      errors.txtCategoryName = "Cannot be blank";
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
   txtCategoryId,
   txtCategoryName
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
          <label>CategoryName: </label>
          <input
            className={
              (formErrors.txtCategoryName && "border border-danger form-control") ||
              "form-control"
            }
            name="txtCategoryName"
            value={txtCategoryName}
            onChange={onChange}
          />
          {formErrors.txtCategoryName && (
            <div className="mt-1 alert-danger">{formErrors.txtCategoryName}</div>
          )}
        </div>
        
        <Link  exact to="/admin/category"  className="btn btn-danger mr-2">
          Trở Lại
        </Link>
        <button type="submit" className="btn btn-primary">
          Lưu Lại
        </button>
      </form>
    </div>
  );
}

export default CategoryAction;
