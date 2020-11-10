import React from 'react';
import PropTypes from 'prop-types';
import Images from '../../../../constants/images';
import { useState } from 'react';
import callApi from '../../../../utils/apiCaller';
import { useEffect } from 'react';
import ProductItem from './productitem';



function ProductList(props) {
  const [ProsId, setProsId] = useState();
    const [Pros, setPros] = useState([]);
    const [style, setStyle] = useState([]);
    var id = props.cateId;
    useEffect(() => {
      if(id){
      callApi("Product/get-all-products-by-cate", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: id.toString() ,
      }).then((res) => {
        setPros(res.data.data.data);
      });
    }
    else{ 
      callApi("Product/get-all-products", "POST", {
        page: 1,
        size: 500,
        id: 0,
        type: "string",
        keyword: "" ,
      }).then((res) => {
        setPros(res.data.data.data);
      });
  }
    }, [id]);
    async function AddProductId(id,price){
      await props.AddProduct(id,price);
    }
    async function DecreasePro(id,price){
      await props.DecreasePro(id,price);
    }
    function showProducts(Pros) {
      var result = null;
      if (Pros.length > 0) {
        result = Pros.map((Pros, index) => {
          return (
            <ProductItem key={index} pros={Pros} AddProduct={AddProductId}  DecreasePro={DecreasePro} index={index}/>
          )
        });
      }
      return result;
    }

    return (
        <div className=" col-lg-8 col-xl-5">
     
        <div id="Pros0" className="menu">
            <div className="list-menu" id="1">
               
                <ul className="list-group">
                    <li>
                       {showProducts(Pros)}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
}

export default ProductList;