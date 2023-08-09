import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import filesStore from '../store/filesStore.js';
import { useTranslation } from 'react-i18next';

import crossIcon from '../assets/icon-cross.svg';

const ResultModal = ({active, closeModal}) => {
    const {t, i18n} = useTranslation();
    const images = filesStore.files;

    const resultMarkings = images ?
    JSON.stringify(images.map(img => {
        const res = {
            image: img.name,
            markings: img.markings
        }
        return res;
    }))
    : '';

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={closeModal}>
            <div className='modal-content modal__result-content'
            onClick={e=>e.stopPropagation()}>
                <img className='modal__cross-img' src={crossIcon} alt="Close" onClick={closeModal}/>
                <h1 className='modal__title'>{t('modal.result-markup-title')}</h1>
                <p className='modal__result-txt'>
                  {resultMarkings}
                </p>
            </div>
        </div>
    );
};

export default observer(ResultModal);
