import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Switch, NavLink, Link, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer/footer";
import OrderDetailPage from "./components/Admin/OrderDetail/orderdetailpage";
import OrderDetailAction from "./components/Admin/OrderDetail/orderdetailaction";
import OrderAction from "./components/Admin/Order/orderaction";
import OrderListPage from "./components/Admin/Order/orderpage";
import ProductAction from "./components/Admin/Product/productaction";
import ProductListPage from "./components/Admin/Product/productpage";
import CategoryAction from "./components/Admin/Category/categoryaction";
import CategoryListPage from "./components/Admin/Category/categorypage";
import UserAction from "./components/Admin/Users/useraction";
import UserListPage from "./components/Admin/Users/userpage";
import AuthService from "./components/auth/helper";
import Payment from "./components/Order/components/payment/payment";
import UserDetail from "./components/Profile/userdetail";
import Images from "./constants/images";
import CartDetail from "./components/Profile/cartdetail";
import OrderDetail from './components/Profile/orderdetail';
import Register from './components/Register/index';

const Header = React.lazy(() => import("./components/Header"));
const Base = React.lazy(() => import("./components/Base"));
const Order = React.lazy(() => import("./components/Order"));
const Login = React.lazy(() => import("./components/Login"));
const Admin = React.lazy(() => import("./components/Admin/index"));

function App(props) {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div className="coffe-app">
      <Suspense
        fallback={
          <svg
            className="tea"
            width="37"
            height="48"
            viewBox="0 0 37 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
              stroke="var(--secondary)"
              strokeWidth="2"
            ></path>
            <path
              d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
              stroke="var(--secondary)"
              strokeWidth="2"
            ></path>
            <path
              id="teabag"
              fill="var(--secondary)"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"
            ></path>
            <path
              id="steamL"
              d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="var(--secondary)"
            ></path>
            <path
              id="steamR"
              d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13"
              stroke="var(--secondary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        }
      >
        <Switch>
          <Route exact path="/">
            <Header active={false} />
            <Base />
            <Footer />
          </Route>
          <Route path="/login">
            {({ history }) => <Login history={history} />}
          </Route>

          {/* -----------------admin      ------------    */}
          <Route path="/admin">
            {currentUser ? (
              currentUser.userDetails.roleId == 1 ? (
                <div
                  className="d-flex align-items-stretch"
                  style={{ width: "100%" }}
                >
                  <nav id="sidebar">
                    <h1>
                      <Link to="/admin" className="logo">
                        Ou coffee
                      </Link>
                    </h1>
                    <ul className="list-unstyled components mb-5">
                      <li>
                        <NavLink
                          exact
                          to="/admin"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-home mr-3"></span> Homepage
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/users"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-user mr-3"></span>Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/category"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-coffee mr-3"></span>Category
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/product"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-coffee mr-3"></span>Product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/order"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-coffee mr-3"></span>Order
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/admin/orderdetail"
                          activeStyle={{
                            background: "transparent",
                            color: "#fff",
                          }}
                        >
                          <span className="fa fa-coffee mr-3"></span>Order
                          Detail
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          style={{ cursor: "pointer" }}
                          onClick={AuthService.logout}
                        >
                          <span className="fa fa-coffee mr-3"></span>LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                  <div id="content" className="p-4 p-md-5 pt-5">
                    <Switch>
                      <Route exact path="/admin">
                        <h1 className="ml-5 mt-5"> Welcome to Admin page</h1>
                      </Route>

                      {/* users */}
                      <Route exact path="/admin/users">
                        <UserListPage></UserListPage>
                      </Route>
                      <Route exact path="/admin/users/add">
                        <UserAction></UserAction>
                      </Route>
                      <Route path="/admin/users/edit/:id">
                        {({ match, history }) => (
                          <UserAction match={match} history={history} />
                        )}
                      </Route>

                      {/* category */}
                      <Route exact path="/admin/category">
                        <CategoryListPage></CategoryListPage>
                      </Route>
                      <Route exact path="/admin/category/add">
                        <CategoryAction></CategoryAction>
                      </Route>
                      <Route path="/admin/category/edit/:id">
                        {({ match, history }) => (
                          <CategoryAction match={match} history={history} />
                        )}
                      </Route>

                      {/* product */}
                      <Route exact path="/admin/product">
                        <ProductListPage></ProductListPage>
                      </Route>
                      <Route exact path="/admin/product/add">
                        <ProductAction></ProductAction>
                      </Route>
                      <Route path="/admin/product/edit/:id">
                        {({ match, history }) => (
                          <ProductAction match={match} history={history} />
                        )}
                      </Route>
                      {/* order */}
                      <Route exact path="/admin/order">
                        <OrderListPage></OrderListPage>
                      </Route>
                      <Route exact path="/admin/order/add">
                        <OrderAction></OrderAction>
                      </Route>
                      <Route path="/admin/order/edit/:id">
                        {({ match, history }) => (
                          <OrderAction match={match} history={history} />
                        )}
                      </Route>
                      {/* orderdetail */}
                      <Route exact path="/admin/orderdetail">
                        <OrderDetailPage></OrderDetailPage>
                      </Route>
                      <Route exact path="/admin/orderdetail/add">
                        <OrderDetailAction></OrderDetailAction>
                      </Route>
                      <Route exact path="/admin/orderdetail/edit/:id1/:id2">
                        {({ match, history }) => (
                          <OrderDetailAction match={match} history={history} />
                        )}
                      </Route>
                      <Route exact path="/admin/orderdetail/:id">
                        {({ match, history }) => (
                          <OrderDetailPage match={match} history={history} />
                        )}
                      </Route>
                      {/* Auth */}
                    </Switch>
                  </div>
                </div>
              ) : (
                <Redirect to="/"></Redirect>
              )
            ) : (
              <Redirect to="/"></Redirect>
            )}{" "}
          </Route>

          {/*-------------- order--------------*/}
          <Route path="/order">
            <Header active={true} />
            <Order />
            <Footer />
          </Route>
          {/*-------------- order--------------*/}
          {/*--------------- Payment----------- */}
          <Route path="/payment">
            {currentUser ? (
              <div>
                <Header />
                <Payment></Payment>
                <Footer />
              </div>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          {/* ------------Payment---------- */}
          {/*---------- Profile ---------------*/}
          <Route path="/profile">
            {currentUser ? (
              <div>
                <Header />
                <div className="container uk-container ct-container content">
                  <div className="row">
                    <div className="carousel slide" id="carouselSlide">
                      <div className="carousel-inner carousel-fix">
                        <div className="carousel-item active">
                          <a href="#" target="blank">
                            <img
                              src={Images.LOGO}
                              className="d-lg-none d-xl-none w-100 mb-2"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row " style={{ margin: "0" }}>
                    <div className=" col-lg-4 col-xl-3 ">
                      <div className="list-group list-col1">
                        <NavLink
                          to="/profile/user"
                          className="list-group-item list-group-item-action"
                          activeClassName="l-active"
                        >
                          Thông tin tài khoản
                        </NavLink>
                        <NavLink
                          exact
                          to="/profile/cart"
                          className="list-group-item list-group-item-action"
                          activeClassName="l-active"
                        >
                          Thông tin đơn hàng
                        </NavLink>
                      </div>
                    </div>
                    <div className=" col-lg-8 col-xl-9 ">
                      <Switch>
                        <Route exact path="/profile/cart">
                          <CartDetail></CartDetail>
                        </Route>
                        <Route exact path="/profile/orderdetail/:id">
                          <OrderDetail></OrderDetail>
                        </Route>
                        <Route>
                          <UserDetail></UserDetail>
                        </Route>
                      </Switch>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>
          {/*---------- Profile ---------------*/}
          {/*---------- Register ---------------*/}
          <Route path="/register">
            {({ history }) => <Register history={history} />}
          </Route>
          {/*---------- Register ---------------*/}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
