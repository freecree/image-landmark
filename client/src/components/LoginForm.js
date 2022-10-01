import React, { useContext, useState } from 'react';
import {Context} from "../index";
import user from "../store/userStore";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const {user} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Пароль"
            />
            <button onClick={() => user.login(email, password)}>
                Логин
            </button>
            <button onClick={() => user.registration(email, password)}>
                Регистрация
            </button>
        </div>
    );
}

export default LoginForm;
