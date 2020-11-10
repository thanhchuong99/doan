import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFormat  from 'dateformat';

function CartItem (props) {
  
        var { Order, index } = props;
        var date = dateFormat(Order.orderDate,'dd/mm/yy : HH:MM:ss');
        return (
            <tr>
                <td>{index+1}</td>
                <td><Link to={`/profile/orderdetail/${Order.orderId}`}>{Order.orderId}</Link></td>
                <td>{date}</td>
                <td>{Order.shipAddress}</td>                
            </tr>
        );
}

export default CartItem;
