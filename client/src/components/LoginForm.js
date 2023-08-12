import React, {useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Context} from "../index";
import user from "../store/userStore";
import {observer} from 'mobx-react-lite';
import useInput from '../hooks/useInput.js';
import logo from '../assets/logo_circle.svg';

const LoginForm = () => {
    const [authorization, setAuthorization] = useState(true);
    const email = useInput('', {isEmpty: true, isEmail: true});
    const password = useInput('', {minLength: 3});
    const [t, i18n] = useTranslation();

    const clean = () => {
        user.cleanEntryError();
    }

    const title = authorization ?
    t('login-form.authorization_title')
    :
    t('login-form.registration_title')

    const actionButton = authorization ?
    <button disabled={email.isValid() || password.isValid()}
    type="submit" className='btn login-btn'
    onClick={() => user.login(email.value, password.value)}>
        {t('login-form.log-in')}
    </button>
    :
    <button disabled={email.isValid() || password.isValid()}
    type="submit" className='btn login-btn'
    onClick={() => user.registration(email.value, password.value)}>
        {t('login-form.register')}
    </button>

    const caption = authorization ?
    <div className='login-caption'>
        <p className='login-caption__txt'>
            {t('login-form.not-have-account')}
        </p>
        <p className='login-caption__txt'
        onClick = {e=> {clean(); setAuthorization(false)}}>
            {t('login-form.register')}
        </p>
    </div>
    :
    <div className='login-caption'>
        <p className='login-caption__txt'>
            {t('login-form.have-account')}
        </p>
        <p className='login-caption__txt'
        onClick = {e=> {clean(); setAuthorization(true)}}>
            {t('login-form.log-in')}
        </p>
    </div>

    return (
        <div className="form">
            <div>
                <div className='logo form-logo'>
                    <img className="logo__img form-logo__img" src={logo} alt="Handmarking"/>
                    <h1 className="logo__text">HandMarking</h1>
                </div>
            </div>
            <h2 className="form__title">
                {title}
            </h2>
            <p className="form__caption">
                <span style={{fontWeight: "bold"}}>*</span>{t('login-form.prevention')}
            </p>
            <div className="form-container">
                <div className='input-error'>
                    {email.isDirty ? 
                    email.valid.filter(v => v.isError)
                    .map((v, i) => <p key={i}>{v.mess}</p>)
                    : ''}
                </div>
                <label htmlFor="uname">Email</label>
                <input className="form-input" type="email"
                    onBlur={email.onBlur}
                    onChange={email.onChange}
                    value={email.value}
                    placeholder={t('login-form.email-placeholder')}
                    name="email"
                    required/>
                <div className='input-error'>
                    {password.isDirty ? 
                    password.valid.filter(v => v.isError)
                    .map((v, i) => <p key={i}>{v.mess}</p>)
                    : ''}
                </div>
                <label htmlFor="psw">{t('login-form.password')}</label>
                <input className="form-input" type="password"
                    onBlur={password.onBlur}
                    onChange={password.onChange}
                    value={password.value}
                    placeholder={t('login-form.password-placeholder')}
                    name="password"
                    required/>
            </div>
            {actionButton}
            {caption}
            <div className='login-errors'>
                {user.entryError}
            </div>
        </div>
    );
}

export default observer(LoginForm);
