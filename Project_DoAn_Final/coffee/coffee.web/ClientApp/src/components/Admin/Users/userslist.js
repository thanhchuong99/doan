import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../admin.css";
import callApi from "./../../../utils/apiCaller";
import UserItem from "./useritem";
import { Paginator } from "primereact/paginator";


function UserList(props) {
  const [users, setUsers] = useState([]);
  const [first, setFirst] = useState({first :0});
  const [rows, setRows] = useState();
  useEffect(() => {
      console.log(first);
   var page = parseInt((first.first/5)) +1;
    callApi("User/get-all-User", "POST", {
      page: page,
      size: 5,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
     setUsers(res.data.data.data);
    });
  }, [first]);
  function onPageChange(event) {
    setFirst({
      first: event.first,
    });
    setRows({
      rows: event.rows,
    });
  }
  function showProducts(users) {
    var result = null;
    if (users.length > 0) {
      result = users.map((users, index) => {
        return <UserItem key={index} user={users} index={index} />;
      });
    }
    return result;
  }
  return (
    <div>
      <Link exact to="/admin/users/add" className="btn btn-info mb-2">
        Thêm Tài Khoản  </Link>
      <div className="card card-primary">
        <div>
          <h3 className="card-title">Danh Sách Tài Khoản</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Fullname</th>
                <th>Phone</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showProducts(users)}</tbody>
          </table>
        </div>
      </div>
      <div className="paginator">
      <Paginator first={first.first} rows={5} totalRecords={10} onPageChange={onPageChange}></Paginator>
      </div>
    </div>
  );
}

export default UserList;
