import React from 'react';
import { Paginator } from 'primereact/paginator';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import callApi from '../../utils/apiCaller';
import AuthService from "../auth/helper";
import CartItem from './cartitem';


function CartDetail(props) {
    const [Order, setOrder] = useState([]);
    const [first, setFirst] = useState({first :0});
    const [totalRecords, setTotal] = useState();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    useEffect(() => {
        var id = currentUser;
        if(id){
            var id = id.userDetails.userName;
        var page = parseInt((first.first/5)) +1;
         callApi("Order/get-all-orders-by-user  ", "POST", {
           page: page,
           size: 5,
           id: 0,
           type: "string",
           keyword: id,
         }).then((res) => {
          setOrder(res.data.data.data);
          setTotal(res.data.data.totalRecord);
         });
        }
       }, [first]);
    function onPageChange(event) {
        setFirst({
          first: event.first,
        });
      }
      function showOrders(Order) {
        var result = null;
        if (Order.length > 0) {
          result = Order.map((Order, index) => {
            return <CartItem key={index} Order={Order} index={index}  />;
          });
        }
        return result;
      }
    return (
        <div>
        <div className="card card-primary">
          <div>
            <h3 className="card-title">Danh Sách Order</h3>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                <th>STT</th>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Ship Address</th>
              
                <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{showOrders(Order)}</tbody>
            </table>
          </div>
        </div>
        <div className="paginator">
        <Paginator first={first.first} rows={5} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>
        </div>
      </div>
    );
}

export default CartDetail;