import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import FileService from '../services/FileService';
import {deleteFile} from '../actions/filesActions';
import Checkbox from './Checkbox.js';
import Modal from './modals/Modal';

import deleteIcon from '../assets/icon-remove.png';

const CatalogItem = ({img, handleClick, isCheckedList}) => {

    const path = process.env.REACT_APP_FILE_DIRECTORY+`/${img.user}/${img.name}`;
    const [confirmModalActive, setConfirmModalActive] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [imageToDelete, setImageToDelete] = useState({});

    const deleteHandler = (img) => {
        setImageToDelete(img);
        setConfirmModalActive(true);
    }

    const onConfirm = () => {
        deleteFile(imageToDelete.id);
    }

    return (
        <div className={img.markings.length > 0 ?
        `catalog-item catalog__item`
        : `catalog-item catalog__item warning`}>
            <Checkbox
            id = {img.id}
            handleClick = {handleClick}
            isChecked = {isCheckedList.includes(img.id)}
            />
            <Link className='catalog-item__link' state={{imageId: img.id}} to={`edit/${img.name}`}>
                <img className='catalog-item__img' src={path} alt={img.name}/>
            </Link>
            <div className='catalog-item__caption'>
                <div className='catalog-item__name'>{img.name}</div>
                <img onClick={() => {deleteHandler(img)}}
                 className='catalog-item__remove-icon' src={deleteIcon}/>
            </div>
            <div className='catalog-item__under'></div>
            <Modal modalData={{
                name: 'confirm',
                active: confirmModalActive,
                setActive: setConfirmModalActive,
                message: `Підтвердити видалення зображення ${imageToDelete.name}`,
                onConfirm: onConfirm
            }}/> 
        </div>
    );
};

export default CatalogItem;
