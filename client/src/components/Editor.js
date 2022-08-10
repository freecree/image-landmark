import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageMarking from './ImageMarking';
import { Link } from 'react-router-dom';

import {observer} from 'mobx-react-lite';

const Editor = () => {
    const location = useLocation();
    console.log("In Editor: ", location);
    return (
        <div className='editop-page'>
            <div className='editor__heading'>
               <Link to='/' className='editor-page__back'>Назад</Link>
               <h1 className='main__title'>Редактор розмітки</h1>
            </div>
            <ImageMarking
            imageId={location.state.imageId}/> 
        </div>
    );
};

export default Editor;
