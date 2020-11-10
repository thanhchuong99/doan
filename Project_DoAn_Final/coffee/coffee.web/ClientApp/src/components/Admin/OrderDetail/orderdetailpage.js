import React from "react";
import OrderDetailList from "./orderdetaillist";

function OrderDetailPage(props) {
    var id ="";
    var {match} = props;
    if(match){    id = match};
 
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <OrderDetailList id={id}></OrderDetailList>
    </div>
  );
}

export default OrderDetailPage;
