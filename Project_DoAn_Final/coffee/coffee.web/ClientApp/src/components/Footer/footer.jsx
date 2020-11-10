import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import Images from '../../constants/images';

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <div className="footer">
	<div className="container-fluid padding">
		<div className="row  text-center">
			<div className="col-md-4">
				<img src={Images.LOGO} style={{width: '100px'}}/>
				<hr className="light"/>
				<p>0937463024</p>
				<p>1751012007chuong@ou.edu.vn</p>
				<p>371 Nguyễn Kiệm</p>
				<p>Phường 3 Quận Gò Vấp</p>
			</div>
			<div className="col-md-4">
				<hr className="light"/>
				<h5>Giờ Hoạt Động</h5>
				<hr className="light"/>
				<p>Từ thứ 2 đến chủ nhật</p>
				<p>7AM - 10PM</p>
			</div>
			<div className="col-md-4">
				<hr className="light"/>
				<h5>Các cửa hàng</h5>
				<hr className="light"/>
				<p>97 Võ Văn Tần P. 6, Q. 3 TP. Hồ Chí Minh</p>
				<p>35-37 Hồ Hảo Hớn P. Cô Giang, Q. 1 TP. Hồ Chí Minh</p>
				<p>371 Nguyễn Kiệm, P. 3, Q. Gò Vấp, TP. Hồ Chí Minh</p>
			</div>
			<div className="col-12">
				<hr className="light-100"/>
				<h5 style={{paddingBottom: "1rem"}}>&copy; ou.edu.vn</h5>
			</div>
		</div>
	</div>
</div>
    );
}

export default Footer;