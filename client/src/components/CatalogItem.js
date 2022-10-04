import React from 'react';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import FileService from '../services/FileService';
import {deleteFile} from '../actions/filesActions';

// import deleteIcon from '../assets/icon-remove.png';
const CatalogItem = ({img}) => {

    const path = process.env.REACT_APP_FILE_DIRECTORY+`/${img.user}/${img.name}`;
    // console.log("CatalogItem:: ", img.name, JSON.stringify(img.markings));
    return (
        <div className={img.markings.length > 0 ?
        'catalog-item catalog__item'
        : 'catalog-item catalog__item warning'}>
            <Link className='catalog-item__link' state={{imageId: img.id}} to={`edit/${img.name}`}>
                <img className='catalog-item__img' src={path} alt={img.name}/>
            </Link>
            <div className='catalog-item__caption'>
                <div className='catalog-item__name'>{img.name}</div>
                <img onClick={() => {deleteFile(img.id)}}
                 className='catalog-item__remove-icon' src="./images/icon-remove.png"/>
            </div>
            <div className='catalog-item__under'></div>
        </div>
    );
};

export default CatalogItem;
