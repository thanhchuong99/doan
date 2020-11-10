import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { CardText } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

Cart.propTypes = {
    
};

function Cart(props) {
  var id = props.getId;
  var de = props.decre;
  var element = {};
  const [pros,setPros] = useState([]);
  const [quantity,setQuantity]= useState(0);
  const [unitPrice,setunitPrice]= useState(0);
  useEffect(()=>{
    if(id){
      if(pros.length>0){
    
      if (pros.find((element) => element[0].id == id.id))
      {
        const newIds = pros.slice();
       
        newIds.map((newIds, index) => {
          if (newIds[0].id == id.id) {
            newIds[0].quantity += 1;
          }
        });
        setPros(newIds);
        setQuantity(quantity+1)
        setunitPrice(unitPrice+id.price)
      }
      else{ element.id = id.id;
        element.quantity = 1;
        let floors = [];
        floors.push(element);
        setPros((state) => [...pros, floors]);
        setQuantity(quantity+1)
        setunitPrice(unitPrice+id.price)
       }
    }
     else{ element.id = id.id;
      element.quantity = 1;
      let floors = [];
      floors.push(element);
      setPros((state) => [...pros, floors]);
      setQuantity(quantity+1)
      setunitPrice(unitPrice+id.price)
     }
    }
   
  },[id])
  useEffect(()=>{
   
    if(de){
      if(pros.length>0){
     if (pros.find((element) => element[0].id == de.id))
      {
        const newIds = pros.slice();
        newIds.map((newIds, index) => {
          if (newIds[0].id == de.id) {
            if( newIds[0].quantity == 0) {
              newIds[0].quantity = 0;
            }
            else {
              newIds[0].quantity -= 1;
              setQuantity(quantity-1)
              setunitPrice(unitPrice-de.price)
            }
          }
        });
        setPros(newIds);
        
      } 
      else{
        
      }
    }
    
   }
  },[de])
  useEffect(()=>{
    if(unitPrice < 0){
      setunitPrice(0)
    }
  },[unitPrice])
    function handelClick(pros){
      localStorage.setItem("cart", JSON.stringify(pros));
      localStorage.setItem("quantity", JSON.stringify(quantity));
      localStorage.setItem("unitPrice", JSON.stringify(unitPrice));
    }
  
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
         {unitPrice > 0 ? <Link to="/payment"onClick={()=>handelClick(pros)} type="button" className="cart-button text-center" >
              Xem giỏ hàng
            </Link>: ""}
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

export default Cart;