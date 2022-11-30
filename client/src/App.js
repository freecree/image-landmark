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
	console.log("App::Local strorage: ", localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            user.checkAuth();
        } else {
            user.setIsLoaded(true);
        }
    },[]);

    if (!user.isAuth) {
        if (user.isLoaded) {
            return(
                <section>
                    <div className="container">
                        <LoginForm/>
                    </div>
                </section>
                );
        } else {
            return(<div></div>)
        }
    }
    console.log("App::user after check", user);
    return(
        <section>
            <BrowserRouter>
                <Header/>
                <div className='container'>
                    <Routes>
                        <Route exact path='/' element={<Main/>}/>
                        <Route path='/edit/:image' element={<Editor/>}/>
                        <Route path="*" element={<Navigate to ="/" />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </section>
    )
}
export default observer(App);
