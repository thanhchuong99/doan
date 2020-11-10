import React from 'react';
import PropTypes from 'prop-types';
import './base.css';
import Images from '../../constants/images';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer/footer';
import NotFound from '../NotFound';
import Order from '../Order';

Base.propTypes = {

};
function Base(props) {
    return (
        
               
                    <div>
                        <section className="banner">
                            <div className="container">
                                <div className="col-sm-6">
                                   
                                    <Link to='/order' type="button" className="uk-button uk-button-primary">
                                        Xem Menu
                                   </Link>
                                </div>
                            </div>
                        </section>
                    </div>
              

    );
}

export default Base;