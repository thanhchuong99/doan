import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function UserItem (props) {

 
        var { user, index } = props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.password}</td>
                <td>{user.fullname}</td>
                <td>{user.phone}</td>
                <td>{user.Location}</td>
                <td>
                    <Link
                        to={`/admin/users/edit/${user.userName}`}
                        className="btn btn-success mr-2"
                    >
                        Sửa
                    </Link>
                 
                </td>
            </tr>
        );
}

export default UserItem;
