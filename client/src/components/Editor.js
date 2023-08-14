import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ImageMarking from './ImageMarking';
import {observer} from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

const Editor = () => {
    const location = useLocation();
    const {t, i18n} = useTranslation();
    return (
        <div className='editop-page'>
            <div className='editor__heading'>
               <h2 className='page-title'>{t('editor.title')}</h2>
            </div>
            <ImageMarking
            imageId={location.state.imageId}/> 
        </div>
    );
};

export default Editor;
