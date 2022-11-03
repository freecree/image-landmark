import React from 'react'
import crossIcon from '../assets/icon-cross.svg';

export default function ConfirmModal({active, closeModal, message, onConfirm}) {
    return (
        <div className={active ? 'modal active'
        : 'modal'} onClick={closeModal}>
            <div className='modal-content regular-modal-content' onClick={e=>e.stopPropagation()}>
                <img className='modal__cross-img' src={crossIcon} alt="Close" onClick={closeModal}/>
                <p className='modal__text'>{message}</p>
                <div className='modal__btns confirm-buttons'>
                    <div onClick={e=>{onConfirm(); closeModal()}}
                    className='btn btn_pink btn_confirm'>Так</div>
                    <div onClick={closeModal}
                    className='btn btn_grey btn_confirm'>Ні</div>
                </div>
            </div>
        </div>
    )
}