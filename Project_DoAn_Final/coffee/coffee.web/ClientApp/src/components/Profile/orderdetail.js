import React, { useEffect, useState } from "react";
import {  useRouteMatch } from "react-router-dom";
import { Paginator } from "primereact/paginator";
import callApi from "../../utils/apiCaller";
import OrderDetailItem from './orderdetailitem';

function OrderDetail(props) {
  const [OrderDetail, setOrderDetail] = useState([]);
  const [first, setFirst] = useState({ first: 0 });
  const [totalRecords, setTotal] = useState();
  var  id  = useRouteMatch();
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
      });
    }
  }, [first,id]);
  function onPageChange(event) {
    setFirst({
      first: event.first,
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
          />
        );
      });
    }
    return result;
  }

  return (
    <div>
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

export default OrderDetail;
