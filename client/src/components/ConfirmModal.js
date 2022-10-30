import React from 'react'

export default function ConfirmModal({active, message, onConfirm, onCancel}) {
    return (
        <div className={active ? 'modal active'
        : 'modal'} onClick={()=> onCancel()}>
            <div className='modal-content regular-modal-content' onClick={e=>e.stopPropagation()}>
                <p className='modal__text'>{message}</p>
                <div className='modal__btns confirm-buttons'>
                    <div onClick={e=>{onConfirm()}}
                    className='btn btn_pink btn_confirm'>Так</div>
                    <div onClick={e=>onCancel()}
                    className='btn btn_grey btn_confirm'>Ні</div>
                </div>
            </div>
        </div>
    )
}