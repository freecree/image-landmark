import React, { useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import { Context } from '../index';
import '../App.css';

import UserService from '../services/UserService';
import FileService from '../services/FileService';
import {fetchFiles, uploadFiles} from '../actions/filesActions.js';
import filesStore from '../store/filesStore.js';

import Catalog from './Catalog';
import Modal from './Modal';

function Main() {
    const {store} = useContext(Context);
    const [images, setImages] = useState();
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className="main__content">
            <h1 className="main__title">Вітаємо у системі HandMarking!</h1>
            <div className='main__buttons'>
                <div className='btn btn_blue'>
                    <label htmlFor='btn__upload-input' className='btn__upload-label'>Завантажити зображення</label>
                    <input multiple={true} onChange={(event)=>uploadFiles(event)} type='file' id='btn__upload-input'className='btn__upload-input' ></input>
                </div>
                <button className='btn btn_pink btn_markings' onClick={() => setModalActive(true)}>Отримати розмітку</button>
            </div>
            <Catalog />
            <Modal images={images} active={modalActive} setActive={setModalActive}/>
        </div>
    );

}
export default Main;
