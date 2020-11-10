import React from 'react';
import PropTypes from 'prop-types';
import './order.css';
import Images from '../../constants/images';
import Cate from './components/cate/cate'
import ProductList from './components/product-list/productlist';
import Payment from './components/cart/cart';
import { useHistory, useRouteMatch } from 'react-router';
import { useState } from 'react';
import Cart from './components/cart/cart';
Order.propTypes = {

};

function Order(props) {
    const [cate,setCate]=useState();
    const [Index, setIndex] = useState();
    const [De, setDe] = useState();

    function getCateId(value){
        setCate(value);
      
    }
    async function AddProduct(id,price){
        setIndex({id,price})
    }
    async function Decre(id,price){
        setDe({id,price})
    }
    return (
        <div className="container uk-container ct-container content">
            <div className="row">
                <div className="carousel slide" id="carouselSlide">
                    <div className="carousel-inner carousel-fix">
                        <div className="carousel-item active">
                            <a href="#" target="blank" >
                                <img src={Images.LOGO} className="d-lg-none d-xl-none w-100 mb-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row " style={{ margin: "0" }} >
                <Cate get={getCateId}/>
                <ProductList  AddProduct={AddProduct} DecreasePro={Decre} cateId={cate}  />           
                <Cart getId={Index} decre={De}/>
            </div>
        </div>
    );
}

export default Order;