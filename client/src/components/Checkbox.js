import React, {useState} from 'react';

export default function Checkbox({id, handleClick, isChecked, name}) {

    return (
        <label className='checkbox-label'>
            <span className='label-text'>{name}</span>
            <input type="checkbox" id={id} checked={isChecked} onChange={handleClick}/>
            <span className='checkmark'></span>
        </label>
    )
}
