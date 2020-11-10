import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function ProductItem (props) {
   function onDelete(id){
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            props.onDelete(id);
        }
    }
 
        var { pros, index } = props;
        var statusName = pros.hot ? 'active' : '';
        var statusClass = pros.hot ? 'warning' : 'default';
        return (
            <tr>
                <td>{index+1}</td>
                <td>{pros.productId}</td>
                <td>{pros.categoryId}</td>
                <td>{pros.productName}</td>
                <td>{pros.unitprice}</td>
                <td>{pros.description}</td>
                <td>
                    <span className={`badge badge-${statusClass}`}>
                        {statusName}
                    </span>
                </td>
                <td>
                    <Link
                        to={`/admin/product/edit/${pros.productId}`}
                        className="btn btn-success "
                    >
                        Sửa
                    </Link>
                  
                </td>
                <td>  <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(pros.productId)}
                    >
                        Xóa
                    </button></td>
            </tr>
        );
}

export default ProductItem;
