import React from 'react';
import './header.css';
import Images from '../../constants/images';
import { BrowserRouter,Route , Link} from 'react-router-dom';
import AuthService from "../auth/helper"
import { useState } from 'react';

Header.propTypes = {

};

function Header(props) {
	const [currentUser,setCurrentUser] =   useState(AuthService.getCurrentUser());
	return (
			<nav className="navbar navbar-expand-md navbar-light  " style={{display: "block"}}>
			<div className="container-fluid sticky-top">
			<Link className="navbar-brand" to="/">
				<img src={Images.LOGO} style={{width: '100px'}} />
			</Link>
			
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon">
				</span>
			</button>
		{ !currentUser ?	<div className="collapse navbar-collapse " id="navbarSupportedContent">
		      <div className="btn-sign">
		      		<Link  className="btn btn-outline-danger my-2 my-sm-0" to="login">Đăng Nhập</Link>
		      </div>
		      <div className="btn-sign">
		      	<a  className="btn btn-outline-success my-2 my-sm-0" href="register">Đăng Kí</a>
		      </div>
		    
	</div> : <div className="d-flex flex-row"><Link className="btn btn-outline-danger my-2 my-sm-0 mr-2" to="/profile">{currentUser.userDetails.userName}</Link>  
	<a  onClick={AuthService.logout} className="btn btn-outline-success my-2 my-sm-0" >LogOut</a>

			  </div>
		}
		</div>	
	</nav> 
	)
    ;
}

export default Header;