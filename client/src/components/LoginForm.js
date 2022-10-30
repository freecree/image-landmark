import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import user from "../store/userStore";
import {observer} from 'mobx-react-lite';
import useInput from '../hooks/useInput.js';

const LoginForm = () => {
    const [authorization, setAuthorization] = useState(true);
    const email = useInput('', {isEmpty: true, isEmail: true});
    const password = useInput('', {minLength: 3});

    const clean = () => {
        user.cleanEntryError();
    }

    const title = authorization ?
    'Авторизація у системі'
    : 'Реєстрація у системі'

    const actionButton = authorization ?
    <button disabled={email.isValid() || password.isValid()}
    type="submit" className='btn login-btn'
    onClick={() => user.login(email.value, password.value)}>
        Авторизуватися
    </button>
    :
    <button disabled={email.isValid() || password.isValid()}
    type="submit" className='btn login-btn'
    onClick={() => user.registration(email.value, password.value)}>
        Зареєструватися
    </button>

    const caption = authorization ?
    <div className='login-caption'>
        <p className='login-caption__txt'>
            Не маєте акаунту?
        </p>
        <p className='login-caption__txt'
        onClick = {e=> {clean(); setAuthorization(false)}}>
            Зареєструватися
        </p>
    </div>
    :
    <div className='login-caption'>
        <p className='login-caption__txt'>
            Маєте акаунт?
        </p>
        <p className='login-caption__txt'
        onClick = {e=> {clean(); setAuthorization(true)}}>
            Авторизуватися
        </p>
    </div>

    return (
        <div className="form">
            <h1 className="form__main-title">Handmarking</h1>
            <h2 className="form__title">
                {title}
            </h2>
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
                placeholder="Введіть email"
                name="email"
                required/>
                <div className='input-error'>
                    {password.isDirty ? 
                    password.valid.filter(v => v.isError)
                    .map((v, i) => <p key={i}>{v.mess}</p>)
                    : ''}
                </div>
                <label htmlFor="psw">Пароль</label>
                <input className="form-input" type="password"
                onBlur={password.onBlur}
                onChange={password.onChange}
                value={password.value}
                placeholder="Введіть пароль"
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
