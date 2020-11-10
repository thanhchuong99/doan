import React, { useEffect, useState } from "react";
import callApi from "../../utils/apiCaller";
function OrderDetailItem(props) {
  var { OrderDetail, index } = props;
  const [Pros, setPros] = useState([]);

  useEffect(() => {
    callApi("Product/get-all-products", "POST", {
      page: 1,
      size: 5,
      id: 0,
      type: "string",
      keyword: OrderDetail.productId.toString(),
    }).then((res) => {
      setPros(res.data.data.data);
    });
  }, []);
  function showOrderDetails(Pros) {
    var result = null;
    if (Pros.length > 0) {
      result = Pros.map((Pros, index) => {
        return <td key={index}>{Pros.productName}</td>;
      });
    }
    return result;
  }

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{OrderDetail.orderId}</td>
      {showOrderDetails(Pros)}
      <td>{OrderDetail.quantity}</td>
    </tr>
  );
}

export default OrderDetailItem;
