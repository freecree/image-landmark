import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import FileService from '../services/FileService';
import {deleteFile} from '../actions/filesActions';
import Checkbox from './Checkbox.js';
import Modal from './modals/Modal';

import deleteIcon from '../assets/icon-remove.png';

const CatalogItem = ({img, handleClick, isCheckedList}) => {

    const imgPath = process.env.REACT_APP_FILE_DIRECTORY+`/${img.path}/${img.name}`;
    const [confirmModalActive, setConfirmModalActive] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [imageToDelete, setImageToDelete] = useState({});
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        if (img.name.length > 12) {
            setImageName(img.name.slice(0, 5)+"..."+img.name.slice(-7));
        } else {
            setImageName(img.name);
        }
    }, [])

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
                <img className='catalog-item__img' src={imgPath} alt={img.name}/>
            </Link>
            <div className='catalog-item__caption'>
                <div data-tooltip={img.name} className='catalog-item__name'>
                    {imageName}
                </div>
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
