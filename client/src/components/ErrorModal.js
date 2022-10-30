import React, {useEffect, useState} from 'react';
import errorsStore from '../store/errorsStore.js';
import {observer} from 'mobx-react-lite';

const ErrorModal = () => {

    const message = !errorsStore.isGeneralErrorEmpty() ?
    errorsStore.generalError.message : errorsStore.fileExistError.message;
    return (
        <div className={errorsStore.errorExist ? 'modal active'
        : 'modal'} onClick={()=> errorsStore.clean()}>
            <div className='modal-content regular-modal-content'
            onClick={e=>e.stopPropagation()}>
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