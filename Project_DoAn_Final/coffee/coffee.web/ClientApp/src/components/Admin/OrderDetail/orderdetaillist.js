import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { Paginator } from "primereact/paginator";
import OrderDetailItem from "./orderdetailitem";
OrderDetailList.propTypes = {};

function OrderDetailList(props) {
  const [OrderDetail, setOrderDetail] = useState([]);
  const [first, setFirst] = useState({ first: 0 });
  const [rows, setRows] = useState();
  const [totalRecords, setTotal] = useState();
  var { id } = props;
  const [on, setOn] = useState(false);
  function notfound(on) {
    if (on) {
      return (
        <h1 className="badge badge-danger ml-5" style={{fontSize : "xx-large" }}>
            Order chưa có orderdetail nào!!!
        </h1>
      );
    }
  }
  useEffect(() => {
    var page = parseInt(first.first / 5) + 1;
    if (id) {
      callApi("OrderDetail/get-all-orderdetail", "POST", {
        page: page,
        size: 5,
        id1: id.params.id.toString(),
        id2: "",
      }).then((res) => {
          setOrderDetail(res.data.data.data);
          setTotal(res.data.data.totalRecord);
      }).catch((err)=>{
        setOn(true)
      });
    }
    else{
    callApi("OrderDetail/get-all-orderdetail", "POST", {
      page: page,
        size: 5,
        id1: "",
        id2: "",
    }).then((res) => {
      setOrderDetail(res.data.data.data);
      setTotal(res.data.data.totalRecord);
    }).catch((err)=>{
      setOn(true)
    });
  }
  }, [first,id]);
  function onPageChange(event) {
    setFirst({
      first: event.first,
    });
    setRows({
      rows: event.rows,
    });
  }
  function showOrderDetails(OrderDetail) {
    var result = null;
    if (OrderDetail.length > 0) {
      result = OrderDetail.map((OrderDetail, index) => {
        return (
          <OrderDetailItem
            key={index}
            OrderDetail={OrderDetail}
            index={index}
            onDelete={onDelete}
          />
        );
      });
    }
    return result;
  }
  function onDelete(uid, pid) {
    callApi("OrderDetail/delete-OrderDetail", "POST", {
      orderId: uid,
      productId: pid,
    }).then((res) => {
      setFirst({ first: 0 });
    });
  }
  return (
    <div>
      <Link exact to="/admin/OrderDetail/add" className="btn btn-info mb-2">
        Thêm OrderDetail
      </Link>
      {notfound(on)}
      <div className="card card-primary">
        <div>
          <h3 className="card-title">Danh Sách OrderDetail</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>Order Id</th>
                <th>Product Id</th>
                <th>Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showOrderDetails(OrderDetail)}</tbody>
          </table>
        </div>
      </div>
      <div className="paginator">
        <Paginator
          first={first.first}
          rows={5}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
        ></Paginator>
      </div>
    </div>
  );
}

export default OrderDetailList;
