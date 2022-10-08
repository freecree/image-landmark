import React, { useEffect, useState } from 'react';
import {observer} from 'mobx-react-lite';

import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem';
import {deleteFile} from '../actions/filesActions.js';

import files from '../store/filesStore.js';
import Checkbox from './Checkbox.js';
import deleteIcon from '../assets/icon-remove.png';

const Catalog = () => {
    // console.log("In Catalog: ", files.files);
    const [isCheckedList, setIsCheckedList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);

    const handleClick = (e) => {
        const {id, checked} = e.target;
        console.log("handleClick: ", id, checked, isCheckedList);
        setIsCheckedList([...isCheckedList, id]);
        if (!checked) {
            setIsCheckedList(isCheckedList.filter(l => l != id));
            console.log("if: ", isCheckedList);
        }
        // console.log("CatalogItem::onChange: ", checked);
    }

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        if (!isCheckAll) {
            setIsCheckedList(files.files.map(f => f.id));
        } else {
            setIsCheckedList([]);
        }
    }

    const deleteImages = () => {
        console.log("delete images...");
        isCheckedList.forEach(item => deleteFile(item));
        setIsCheckAll(false);
        setIsCheckedList([]);
    }

    return (
        <div className='catalog-wrapper'>
            <h2>
                Каталог завантажених зображень
            </h2>
            <div className='catalog-caption'>
                <img src="./images/icon-warning.svg" alt="Warning"/>
                <div className="catalog-caption__txt">
                Жовтим  кольором помічені зображення, на яких не вдалось розпізнати жест
                </div>
            </div>
            <div className='catalog-heading'>
                <div className='catalog-heading__item'>
                    <Checkbox
                    handleClick = {handleSelectAll}
                    isChecked = {isCheckAll}
                    name='Виділити всі'/>
                </div>
                <div onClick={deleteImages} className='catalog-heading__item'>
                    <div className='catalog-heading__text'>
                    Видалити
                    </div>
                    <img className='catalog-heading__img' src={deleteIcon} alt="Delete"/>
                </div>
            </div>
            <div className='catalog'>
                {files.files ? files.files.map(img =>
                <CatalogItem key={img.id}
                img = {img}
                handleClick = {handleClick}
                isCheckedList = {isCheckedList}/>)
                : 'Будь-ласка, завантажте зображення'
                }
            </div>
        </div>
        
    );
};

export default observer(Catalog);
