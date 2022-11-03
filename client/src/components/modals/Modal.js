import React, {useEffect, useState} from 'react';
import ResultModal from '../ResultModal.js';
import ErrorModal from '../ErrorModal.js';
import ConfirmModal from '../ConfirmModal.js';

export default function Modal({modalData}) {

    const bodyLock = () => {
        const lockPadding = window.innerWidth - document.body.offsetWidth + 'px';
        document.body.style.paddingRight = lockPadding;
        document.body.classList.add('lock');
    }

    const bodyUnlock = () => {
        document.body.classList.remove('lock');
        document.body.style.paddingRight = 0;
    }

    const closeModal = () => {
        bodyUnlock();
        modalData?.setActive(false);
    }

    if (modalData.active) {
        bodyLock();
    }
    return (
        <div>
            {modalData.name == 'result' ? 
            <ResultModal active={modalData.active} closeModal={closeModal}/>
            : ''}

            {modalData.name == 'error' ? 
            <ErrorModal bodyLock={bodyLock} bodyUnlock={bodyUnlock}/>
            : ''}

            {modalData.name == 'confirm' ? 
            <ConfirmModal active={modalData.active} closeModal={closeModal}
            message={modalData.message} onConfirm={modalData.onConfirm}/>
            : ''}
        </div>
    )
}