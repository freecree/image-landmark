import './App.css';
import React, { useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Main from './components/Main';
import Editor from './components/Editor';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import user from "./store/userStore.js";

function App() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            user.checkAuth();
        } else {
            user.setIsLoaded(true);
        }
    },[]);

    return (
        <section>
            <BrowserRouter>
                <Header/>
                <div className='container'>
                    {user.isAuth ?
                        <Routes>
                            <Route exact path='/' element={<Main/>}/>
                            <Route path='/edit/:image' element={<Editor/>}/>
                            <Route path="*" element={<Navigate to ="/" />}/>
                        </Routes>
                    :
                    <div>
                        {user.isLoaded && <LoginForm/>}
                    </div>
                    }
                </div>
            </BrowserRouter>
        </section>
    )
}
export default observer(App);
