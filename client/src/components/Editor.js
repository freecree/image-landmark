import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageMarking from './ImageMarking';

import {observer} from 'mobx-react-lite';

const Editor = () => {
    const location = useLocation();
    return (
        <div className='editop-page'>
            <div className='editor__heading'>
               <h2 className='page-title'>Редактор розмітки</h2>
            </div>
            <ImageMarking
            imageId={location.state.imageId}/> 
        </div>
    );
};

export default Editor;
