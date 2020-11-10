import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFormat  from 'dateformat';

function OrderItem (props) {
   function onDelete(id){
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            props.onDelete(id);
        }
    }
 
        var { Order, index } = props;
        var date = dateFormat(Order.orderDate,'dd/mm/yy : HH:MM:ss');
        return (
            <tr>
                <td>{index+1}</td>
                <td><Link to={`/admin/orderdetail/${Order.orderId}`}>{Order.orderId}</Link></td>
                <td>{Order.userName}</td>
                <td>{date}</td>
                <td>{Order.discountId}</td>
                <td>{Order.shipAddress}</td>
                <td>
                    <Link
                        to={`/admin/order/edit/${Order.orderId}`}
                        className="btn btn-success "
                    >
                        Sửa
                    </Link>
                  
                </td>
                <td>  <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(Order.orderId)}
                    >
                        Xóa
                    </button></td>
            </tr>
        );
}

export default OrderItem;
