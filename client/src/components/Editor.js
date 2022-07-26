import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ImageMarking from './ImageMarking';
import { Link } from 'react-router-dom';


const Editor = () => {
    const location = useLocation();

    return (
        <div className='editop-page'>
            <div className='editor__heading'>
               <Link to='/' className='editor-page__back'>Назад</Link>
               <h1 className='main__title'>Редактор розмітки</h1>
            </div>
            <ImageMarking
            markings={location.state.img.markings}
            path={location.state.img.path}
            name={location.state.img.name}
            id={location.state.img.id}/> 
        </div>
    );
};

export default Editor;
