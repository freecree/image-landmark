import React from 'react';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import FileService from '../services/FileService';
import {deleteFile} from '../actions/filesActions';

const CatalogItem = (props) => {

    const path = process.env.REACT_APP_FILE_DIRECTORY+`/${props.img.user}/${props.img.name}`;
    // console.log("In CatalogItem: ", props);
    return (
        <div className='catalog__item'>
            <img onClick={() => {deleteFile(props.img.id)}} className='catalog-item__remove-icon' src='icon-remove.png'/>
            <Link className='catalog__item-link' state={{imageId: props.img.id}} to={`edit/${props.img.name}`}>
                <img className='catalog-item__img' src={path} alt={props.img.name}></img>
            </Link>
        </div>
    );
};

export default CatalogItem;
