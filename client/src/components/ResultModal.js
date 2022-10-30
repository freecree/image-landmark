import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import filesStore from '../store/filesStore.js';

const ResultModal = ({active, setActive}) => {
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
        <div className={active ? 'modal active' : 'modal'} onClick={()=> setActive(false)}>
            <div className='modal-content modal__result-content'
            onClick={e=>e.stopPropagation()}>
                <h1 className='modal__title'>Розмітка жестів рук у форматі JSON</h1>
                <p className='modal__result-txt'>
                  {resultMarkings}
                </p>
            </div>
            
        </div>
    );
};

export default observer(ResultModal);
