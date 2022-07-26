import React from 'react';
import { Link } from 'react-router-dom';
import FileService from '../services/FileService';

const CatalogItem = (props) => {

    async function removeImage() {
        const response = await FileService.deleteFile(props.id);
        console.log("Delete resp: ", response); 
    }
    return (
        <div className='catalog__item'>
            <img onClick={removeImage} className='catalog-item__remove-icon' src='icon-remove.png'/>
            <Link className='catalog__item-link' state={{img: props}} to={`edit/${props.name}`}>
                <img className='catalog-item__img' src={props.path + `/${props.name}`} alt={props.name}></img>
            </Link>

        </div>
    );
};

export default CatalogItem;
