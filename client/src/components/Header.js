import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Context } from '../index';
import user from '../store/userStore';
import {observer} from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <Link to='/' className='logo header__logo'>
                        <img className="logo__img" src={logo} alt="Handmarking"/>
                        <p className="logo__text">HandMarking</p>
                    </Link>
                    <div className='header__logout' onClick={() => user.logout()}>
                    Вийти
                    </div>
                </div>
            </div>
        </header>
    );
};

export default observer(Header);
