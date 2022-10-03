import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Context } from '../index';
import user from '../store/userStore';
import {observer} from 'mobx-react-lite';


const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__logo'>
                    HandMarking
                    </div>
                    <div className='header__text'>
                    space: {user.user.freeSpace}
                    </div>
                    <div className='header__logout' onClick={() => user.logout()}>
                    Вийти
                    </div>
                </div>
            </div>
        </header>
    );
};


export default observer(Header);
