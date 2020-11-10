import React from 'react';
import Images from './../../../../constants/images';
import callApi from './../../../../utils/apiCaller';
import { useState, useEffect } from 'react';
import AuthService from "../../../auth/helper";
import PaymentCart from './payment.cart';
import PaymentItem from './paymentitem';
import dateFormat from 'dateformat';
import { useHistory } from 'react-router';

Payment.propTypes = {
    
};

function Payment(props) {
  const history = useHistory();
  useEffect(() =>{
    if(!cart){
      console.log(1)
      return history.push('/order');
    }
  },[cart]);
  var tempDate = new Date();
  var date = dateFormat(tempDate,"yyyy-mm-dd'T'HH:MM:ss'Z'");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const[orderId,setOrderId] = useState();
      const [orderstate, setOrderState] = useState({
        txtOrderId: 0,
        txtUserName: 0,
        txtOrderDate: date ,
        txtDiscountId: 0,
        txtShipAdress: "",
      });
      const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [formErrors]);
  useEffect(() => {
    
    if (currentUser) {
       var id = currentUser.userDetails.userName;
       callApi('User/get-all-User', 'POST', {
        "page": 1,
         "size": 1,
        "id": 0,
        "type": "string",
        "keyword": id
      }).then(res =>{ setOrderState({ 
        txtOrderId: 0,
        txtUserName: res.data.data.data[0].userName,
        txtOrderDate: date ,
      txtShipAdress:  res.data.data.data[0].location,
     } ); });
    }
  }, []);

  const submitForm = () => {
    callApi("Order/create-order", "POST", {
      orderId: orderstate.txtOrderId,
      userName: currentUser.userDetails.userName,
      orderDate: date,
      discountId: parseInt(orderstate.discountId),
      shipAddress: orderstate.txtShipAdress,
    }).then((res) => {
      setOrderId(res.data.data.orderId)
    });
  };
  useEffect(()=>{
    if(orderId){
    cart.map((cart, index)=>{
      callApi("OrderDetail/create-orderdetail", "POST", {
      orderId: parseInt(orderId),
      productId: parseInt(cart[0].id),
      quantity: parseInt(cart[0].quantity),
    }).then((res) => {
    });
    })
    localStorage.removeItem("cart");
    return history.push('/profile/cart');
  }
  },[orderId])
  const validate = (values) => {
    let errors = {};
    if (!values.txtShipAdress) {
      errors.txtShipAdress = "Cannot be blank";
    }
    return errors;
  };
  function onChange(e) {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    setOrderState({
      ...orderstate,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(validate(orderstate));
    setIsSubmitting(true);
  }
  var {
    txtShipAdress
  } = orderstate;
  const message = (formErrors) => {
  
    if (Object.keys(formErrors).length === 0) {
      return <h1 className="alert alert-success">SuccesFully</h1>;
    } else if(formErrors.message ) {
      return <h1 className="alert alert-success">{formErrors.message}</h1>;
    }else{
        return "";
    }
  };
  
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
                 <div className="col-xl-8 d-none  d-lg-block d-xl-block  ">
                 <div className="payment ">
                     <div className="payment-header">
                        <p>1. Xác nhận địa chỉ đặt hàng</p>
                     </div>
                     <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      {isSubmitting && message(formErrors)}

      <form onSubmit={(e) => { if (window.confirm('Bạn có chắc chắn muốn đặt sản phẩm chứ?')) handleSubmit(e) } }>
        
     
        
        <div className="form-group">
          <label>ShipAddress: </label>
          <input
            type="text"
            name="txtShipAdress"
            value={txtShipAdress}
            onChange={onChange}
            className={
              (formErrors.txtShipAdress && "border border-danger form-control") ||
              "form-control"
            }
          />
          {formErrors.txtShipAdress && (
            <div className="mt-1 alert-danger">{formErrors.txtShipAdress}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Lưu Lại
        </button>
      </form>
    </div>
   
                     </div>
                    
                    <PaymentItem  ></PaymentItem>
                 </div>         
                <PaymentCart />
            </div>
        </div>
    );
}

export default Payment;