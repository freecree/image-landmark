import React, {useEffect, useState} from 'react';

const Modal = ({images, active, setActive}) => {
    const [resultMarkings, setResultMarkings] = useState();

    useEffect(()=> {
        if (images) {
            setResultMarkings(JSON.stringify(images.map(img => {
                const res = {
                    image: img.name,
                    markings: img.markings
                }
                return res;
            })))
        }
        
    },[images])

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={()=> setActive(false)}>
            
            <div className='modal__content' onClick={e=>e.stopPropagation()}>
            <h1 className='modal__title'>Розмітка жестів рук у форматі JSON</h1>
                <div className='modal__result'>
                  {resultMarkings}  
                </div>
                
            </div>
            
        </div>
    );
};

export default Modal;
