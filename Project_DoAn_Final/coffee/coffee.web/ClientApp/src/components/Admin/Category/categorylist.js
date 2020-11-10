import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import callApi from "./../../../utils/apiCaller";
import { Paginator } from "primereact/paginator";
import CategoryItem from './categoryitem';
 CategoryList.propTypes = {};

function CategoryList(props) {
  const [Cate, setCate] = useState([]);
  const [first, setFirst] = useState({first :0});
  const [rows, setRows] = useState();
  const [totalRecords, setTotal] = useState();

  useEffect(() => {
   var page = parseInt((first.first/5)) +1;
    callApi("Category/get-all-categorys", "POST", {
      page: page,
      size: 5,
      id: 0,
      type: "string",
      keyword: "",
    }).then((res) => {
     setCate(res.data.data.data);
     setTotal(res.data.data.totalRecord);
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
  function showProducts(Cate) {
    var result = null;
    if (Cate.length > 0) {
      result = Cate.map((Cate, index) => {
        return <CategoryItem key={index} cate={Cate} index={index} onDelete={onDelete} />;
      });
    }
    return result;
  }
  function onDelete(id){
    callApi("Category/delete-category", "POST", {
        id:id
      }).then((res) => {setFirst({first :0})
      });
}
  return (
    <div>
      <Link exact to="/admin/Category/add" className="btn btn-info mb-2">
        Thêm Category
      </Link>
      <div className="card card-primary">
        <div>
          <h3 className="card-title">Danh Sách Category</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
              <th>STT</th>

                <th>Category Name</th>

                <th></th>
              </tr>
            </thead>
            <tbody>{showProducts(Cate)}</tbody>
          </table>
        </div>
      </div>
      <div className="paginator">
      <Paginator first={first.first} rows={5} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>
      </div>
    </div>
  );
}

export default CategoryList;
