import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { Paginator } from "primereact/paginator";
import ProductItem from './productitem';
 ProductList.propTypes = {};

function ProductList(props) {
  const [Pros, setPros] = useState([]);
  const [first, setFirst] = useState({first :0});
  const [rows, setRows] = useState();
  const [totalRecords, setTotal] = useState();

  useEffect(() => {
   var page = parseInt((first.first/5)) +1;
    callApi("Product/get-all-products", "POST", {
      page: page,
      size: 5,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
     setPros(res.data.data.data);
     setTotal(res.data.data.totalRecord)
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
  function showProducts(Pros) {
    var result = null;
    if (Pros.length > 0) {
      result = Pros.map((Pros, index) => {
        return <ProductItem key={index} pros={Pros} index={index} onDelete={onDelete} />;
      });
    }
    return result;
  }
  function onDelete(id){
    callApi("Product/delete-Product", "POST", {
        id:id
      }).then((res) => {setFirst({first :0})
      });
}
  return (
    <div>
      <Link exact to="/admin/product/add" className="btn btn-info mb-2">
        Thêm Product
      </Link>
      <div className="card card-primary">
        <div>
          <h3 className="card-title">Danh Sách Product</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
              <th>STT</th>
              <th>Product Id</th>
              <th>Category Id</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Description</th>
              <th>Món ưa thích</th>
              <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showProducts(Pros)}</tbody>
          </table>
        </div>
      </div>
      <div className="paginator">
      <Paginator first={first.first} rows={5} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>
      </div>
    </div>
  );
}

export default ProductList;
