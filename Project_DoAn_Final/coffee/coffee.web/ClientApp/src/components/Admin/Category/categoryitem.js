import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function CategoryItem (props) {
   function onDelete(id){
        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            props.onDelete(id);
        }
    }
 
        var { cate, index } = props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{cate.categoryId}</td>
                <td>{cate.categoryName}</td>
                <td>
                    <Link
                        to={`/admin/category/edit/${cate.categoryId}`}
                        className="btn btn-success mr-2"
                    >
                        Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(cate.categoryId)}
                    >
                        Xóa
                    </button>
                </td>
            </tr>
        );
}

export default CategoryItem;
