import React, {useEffect, useState} from 'react';
import errorsStore from '../store/errorsStore.js';
import {observer} from 'mobx-react-lite';
import crossIcon from '../assets/icon-cross.svg';

const ErrorModal = ({bodyLock, bodyUnlock}) => {

    const message = !errorsStore.isGeneralErrorEmpty() ?
    errorsStore.generalError.message : errorsStore.fileExistError.message;

    if (errorsStore.errorExist) bodyLock();

    const closeModal = () => {
        errorsStore.clean();
        bodyUnlock();
    }

    return (
        <div className={errorsStore.errorExist ? 'modal active': 'modal'}
        onClick={closeModal}>
            <div className='modal-content regular-modal-content' onClick={e=>e.stopPropagation()}>
                <img className='modal__cross-img' src={crossIcon} alt="Close" onClick={closeModal}/>
                <p className='modal__text'>{message}</p>
                {errorsStore.isFileExistErrorEmpty() ? '' :
                <div className='modal__list'>
                    {errorsStore.fileExistError.files.map((fileName, idx) =>
                    <div key={idx}>{fileName}</div>)}
                </div>
                }
            </div>
        </div>
    )
}

export default observer(ErrorModal);