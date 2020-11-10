import React from "react";
import PropTypes from "prop-types";
import Images from "../../../../constants/images";
import { useState, useEffect } from 'react';

ProductItem.propTypes = {};

function ProductItem(props) {
  const [idd,setId] = useState();
  const [loading,setLoad] = useState();
  async  function AddProduct(id,price){
    await props.AddProduct(id,price);
    if(!idd){
      setId(1)
    }else{
      setId(idd+1)
    }
    setLoad(true);
  }
  async  function DecreasePro(id,price){
    await props.DecreasePro(id,price);
    if(idd){
      setId(idd-1)
    }
  }
  useEffect(()=>{
    if(idd ==0 ){
      setLoad(false);
    }
  },[idd])
  var { pros, index } = props;
  return (
    <div id="cate0" className="menu">
      <div className="list-menu" id="1">
        <ul className="list-group">
          <li className="li-pro">
        
              <div className="product-menu ">
                <img
                  src={Images.PD1}
                  className="img-product d-inline-block"
                  alt="product1"
                />
                <div className="product-content ">
                  <b style={{ fontWeight: "bolder" }}>{pros.productName}</b>
                  <p className="product-text">{pros.description}</p>
                  <span>{pros.unitPrice}₫</span>
                </div>
                <div className="flex-container">
               
                <button onClick={()=> DecreasePro(pros.productId,pros.unitPrice)} className="button-add ml-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <rect x="1" y="9" width="17" height="1"></rect>
                    </svg>
                  </button>
                  <button onClick={()=> AddProduct(pros.productId,pros.unitPrice)}className="button-add">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <rect x="9" y="1" width="1" height="17"></rect>{" "}
                      <rect x="1" y="9" width="17" height="1"></rect>
                    </svg>
                  </button>
  { loading &&   <label className="label-item mr-1">{idd}</label>}
                </div>
              </div>
              
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default ProductItem;
