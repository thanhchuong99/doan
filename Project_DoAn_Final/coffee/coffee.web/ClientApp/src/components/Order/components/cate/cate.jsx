import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import callApi from "./../../../../utils/apiCaller";
import { useState } from "react";
import { NavLink } from "react-router-dom";

Cate.propTypes = {};

function Cate(props) {
  const [Cate, setCate] = useState([]);
  const [style, setStyle] = useState([]);
  useEffect(() => {
    callApi("Category/get-all-categorys", "POST", {
      page: 1,
      size: 500,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
      setCate(res.data.data.data);
    });
    
  }, []);
  function setCateId(id){
    props.get(id);
  }
 
  function showProducts(Cate) {
    var result = null;
    if (Cate.length > 0) {
      result = Cate.map((Cate, index) => {
        return (
          <NavLink
             exact
            key={index}
            to={`/order/${Cate.categoryId}`}
            className="list-group-item list-group-item-action"
            activeClassName="l-active"
            onClick={()=>setCateId(Cate.categoryId)}
          >
            {Cate.categoryName}
          </NavLink>
        );
      });
    }
    return result;
  }
  return (
    <div className=" col-lg-4 col-xl-3 	d-none  d-lg-block d-xl-block  ">
      <div className="list-group list-col1">
        <NavLink
             exact
            to="/order" 
            className="list-group-item list-group-item-action"
            activeClassName="l-active"
            onClick={()=> setCateId(false)}
          >
            Tất cả
          </NavLink>
        {showProducts(Cate)}
        </div>
    </div>
  );
}

export default Cate;
