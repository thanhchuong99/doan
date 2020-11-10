import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { Paginator } from "primereact/paginator";
import OrderItem from './orderitem';
 OrderList.propTypes = {};

function OrderList(props) {
  const [Order, setOrder] = useState([]);
  const [first, setFirst] = useState({first :0});
  const [totalRecords, setTotal] = useState();

  useEffect(() => {
   var page = parseInt((first.first/5)) +1;
    callApi("Order/get-all-orders", "POST", {
      page: page,
      size: 5,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
     setOrder(res.data.data.data);
     setTotal(res.data.data.totalRecord);
    });
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
        return <OrderItem key={index} Order={Order} index={index} onDelete={onDelete} />;
      });
    }
    return result;
  }
  function onDelete(id){
    callApi("Order/delete-order", "POST", {
        id:id
      }).then((res) => {setFirst({first :0})
      });
}
  return (
    <div>
      <Link exact to="/admin/order/add" className="btn btn-info mb-2">
        Thêm Order
      </Link>
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
              <th>User Name</th>
              <th>Order Date</th>
              <th>Discount Id</th>
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

export default OrderList;
 