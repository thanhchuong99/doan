import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFormat  from 'dateformat';

function OrderDetailItem (props) {
   function onDelete(uid,pid){
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            props.onDelete(uid,pid);
        }
    }
 
        var { OrderDetail, index } = props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{OrderDetail.orderId}</td>
                <td>{OrderDetail.productId}</td>
                <td>{OrderDetail.quantity}</td>
                <td>
                    <Link
                        to={`/admin/orderdetail/edit/${OrderDetail.orderId}/${OrderDetail.productId}`}
                        className="btn btn-success mr-1"
                    >
                        Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(OrderDetail.orderId,OrderDetail.productId)}
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
}

export default OrderDetailItem;
