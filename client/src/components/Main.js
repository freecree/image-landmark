import React, { useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import '../App.css';

import UserService from '../services/UserService';
import FileService from '../services/FileService';
import {fetchFiles, uploadFiles} from '../actions/filesActions.js';
import filesStore from '../store/filesStore.js';

import Catalog from './Catalog';
import ResultModal from './ResultModal';
import ErrorModal from './ErrorModal';
import loadingStates from '../enums/LoadingStates.js';


function Main() {

    const [modalActive, setModalActive] = useState(false);

    // loadingStates.NORMAL = 10;
    const [isLoading, setIsLoading] = useState(loadingStates.NORMAL);

    useEffect(() => {
        console.log("Main::fetching files: ", filesStore.files);
        filesStore.fetchFiles();
        // console.log("isLoading: ", isLoading);
    },[])

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
                <div className='main__buttons'>
                    <div className='btn btn_blue'>
                        <label htmlFor='btn__upload-input' className='btn__upload-label'>
                            Завантажити зображення
                        </label>
                        <input multiple={true} onChange={event => uploadFiles(event, setIsLoading)}
                         type='file' id='btn__upload-input'className='btn__upload-input'/>
                    </div>
                    <button className='btn btn_pink btn_markings' onClick={() => setModalActive(true)}>
                        Отримати розмітку
                    </button>
                </div>
                <Catalog />
                <ResultModal active={modalActive} setActive={setModalActive}/>
                <ErrorModal/>
            </div>
        </div>
    );

}
export default Main;
