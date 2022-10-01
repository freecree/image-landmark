import React, {useEffect, useState} from 'react';
import errorsStore from '../store/errorsStore.js';
import {observer} from 'mobx-react-lite';

const ErrorModal = () => {

    const message = !errorsStore.isGeneralErrorEmpty() ?
    errorsStore.generalError.message : errorsStore.fileExistError.message;
    return (
        <div className={errorsStore.errorExist ? 'modal active'
        : 'modal'} onClick={()=> errorsStore.clean()}>
            <div className='modal__content' onClick={e=>e.stopPropagation()}>
                    <h1 className='modal__title'>{message}</h1>
                    {errorsStore.isFileExistErrorEmpty() ? '' :
                    errorsStore.fileExistError.files.map((fileName, idx) =>
                        <div key={idx}>{fileName}</div>
                    )
                }
            </div>
        </div>
    )
}

export default observer(ErrorModal);