import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import callApi from "./../../../../utils/apiCaller";

function PaymentItem(props) {
  var history = useHistory();
  const [Pros, setPros] = useState([]);
  const [ProsId, setProsId] = useState([]);
  var ele =[];
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  useEffect(() => {
    if(cart){
    cart.map((cart,index)=>{
      ele.push(cart[0].id.toString())
    })
    if (cart == null) {
      return history.push("order");
    }
    callApi("Product/get-list-product", "POST", {
      id: ele ,
    }).then((res) => {
      setPros(res.data.data);
    });   
  }
  }, []);
  
  function showProduct(Pros) {
    var result = null;
    if (Pros.length > 0) {
      result = Pros.map((pro, index) => {
        var quantity
        cart.map((cart, index)=>{
          if(cart[0].id = pro.productId){
            quantity= cart[0].quantity;
          }
        })
        return (
          <div className="mb-3">
            <label className="label-item d-inline-block">
           {quantity}
            </label>
            <div className="product-content pl-3 ">
              <dl>
                <dd>
                  <b>{pro.productName}</b>
                </dd>
              </dl>
            </div>
          </div>
        );
      });
    }
    return result;
  }

  return (
    <div className="payment-item">
      <div className="payment-header">
        <p>2. Xác nhận thông tin đơn hàng</p>
      </div>
      <div className="cart-item">
        {showProduct(Pros)}
      </div>
    </div>
  );
}

export default PaymentItem;
