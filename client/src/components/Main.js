import React, { useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import '../App.css';

import UserService from '../services/UserService';
import FileService from '../services/FileService';
import {fetchFiles, uploadFiles} from '../actions/filesActions.js';
import filesStore from '../store/filesStore.js';

import Catalog from './Catalog';
import Modal from './modals/Modal';

import loadingStates from '../enums/LoadingStates.js';
import user from '../store/userStore';

function Main() {

    const [isLoading, setIsLoading] = useState(loadingStates.NORMAL);
    const [resultModalActive, setResultModalActive] = useState(false);

    useEffect(() => {
        filesStore.fetchFiles();
    },[])

    const showFreeSpace = () => {
        const space = user.user.freeSpace;
        if (space / Math.pow(1024, 3) > 1)
            return `${(space / Math.pow(1024, 3)).toFixed(2)} ГБ`;
        if (space / Math.pow(1024, 2) > 1)
            return `${(space / Math.pow(1024, 2)).toFixed(1)} МБ`;
        if (space / 1024 > 1)
            return `${(space / 1024).toFixed(1)} КБ`;
        return `${space} Б`;
    }

    return (
        <div className="main-block">
            {isLoading === loadingStates.LOADING 
            ? <div className = 'loading-overlay'>
                <div className="overlay__text">
                Почекайте, будь-ласка, виконуються обчислення...
                </div>
            </div> : ''}
            <div className='main__content'>
                <h1 className="main__title">Вітаємо у системі HandMarking!</h1>
                <div className='main__buttons main-buttons'>
                    <div className='btn main-buttons__btn btn_blue'>
                        <label htmlFor='btn__upload-input' className='btn__upload-label'>
                            Завантажити зображення
                        </label>
                        <input multiple={true} onChange={event => uploadFiles(event, setIsLoading)}
                         type='file' id='btn__upload-input'className='btn__upload-input'/>
                    </div>
                    <button className='btn main-buttons__btn btn_pink' onClick={() => {setResultModalActive(true)}}>
                        Отримати розмітку
                    </button>
                </div>
                <div>
                    <p className='freespace-block'>
                        Залишилось місця: <span>{showFreeSpace()}</span>
                    </p>
                </div>
                <Catalog/>
                <Modal modalData={{
                    name: 'result',
                    active: resultModalActive,
                    setActive: setResultModalActive
                }}/>
                <Modal modalData={{
                    name: 'error',
                }}/>
            </div>
        </div>
    );

}
export default observer(Main);
