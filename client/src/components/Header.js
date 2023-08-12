import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';

import PropTypes from 'prop-types';
import { Context } from '../index';
import user from '../store/userStore';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import LangSwitcher from './LangSwitcher';

const Header = () => {
    const [t, i18n] = useTranslation();

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <Link to='/' className='logo header__logo'>
                        <img className="logo__img" src={logo} alt="Handmarking"/>
                        <p className="logo__text">HandMarking</p>
                    </Link>
                    <div className='header__right'>
                        <LangSwitcher className='header__lang-switcher'/>
                        {user.isAuth ?
                            <div className='header__logout' onClick={() => user.logout()}>
                                {t('header.exit', 'exit')}
                            </div>
                            : ''
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};

export default observer(Header);
