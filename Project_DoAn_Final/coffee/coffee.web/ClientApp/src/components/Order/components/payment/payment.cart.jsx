import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { CardText } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

PaymentCart.propTypes = {
    
};

function PaymentCart(props) {
  var element = {};
  const [quantity, setQuantity] = useState(JSON.parse(localStorage.getItem('quantity')));
  const [unitPrice, setunitPrice] = useState(JSON.parse(localStorage.getItem('unitPrice')));

    
  
    return (
        <div className="  col-xl-4 d-none   d-xl-block p-0 ">
        <div className="cart-sticky">
          <div
            className="cart-item"
            style={{
              zIndex: "999",
              position: "sticky",
              top: "0px",
              background: "white",
            }}
          >
          </div>
          <div className="cart-item " style={{ fontSize: "17px" }}>
            <div className="d-inline-block" style={{ width: "100%" }}>
              <div className="float-left">
                <dl>
                  <dd>Cộng({quantity} món)</dd>
                  <dd>Vận chuyển</dd>
                </dl>
              </div>
              <div className="float-right pr-2">
                <dl>
          <dd>{unitPrice}₫</dd>
                  <dd>0đ</dd>
                </dl>
              </div>
            </div>
           
          </div>
          <div className="cart-item">
            <div className="mb-3">
              <div className="d-inline-block" style={{ fontSize: "20px" }}>
                <b>Tổng cộng</b>
              </div>
              <div className="float-right">
          <span style={{ fontSize: "26px" }}>{unitPrice}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PaymentCart;