import React, { useEffect, useState } from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';

import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem';
import {deleteFile} from '../actions/filesActions.js';

import files from '../store/filesStore.js';
import Checkbox from './Checkbox.js';
import ConfirmModal from './ConfirmModal.js';
import deleteIcon from '../assets/icon-remove.png';
import user from '../store/userStore';

import Modal from './modals/Modal';

const Catalog = () => {
    const [isCheckedList, setIsCheckedList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [confirmModalActive, setConfirmModalActive] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [catalogItemsNumberInRow, setCatalogItemsNumberInRow] = useState();
    const [showMore, setShowMore] = useState(false);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        calcCatalogItemsInRow();
        window.addEventListener('resize', calcCatalogItemsInRow);
    }, [])

    const calcCatalogItemsInRow = () => {
        const containerW = document.getElementsByClassName("container")[0].clientWidth;
        if (containerW > 950) {
            setCatalogItemsNumberInRow(8)
            return;
        }
        switch(containerW) {
            case 950:
                setCatalogItemsNumberInRow(6);
                break
            case 710:
                setCatalogItemsNumberInRow(5);
                break;
            case 530:
                setCatalogItemsNumberInRow(3);
                break;
            default:
                setCatalogItemsNumberInRow(2);
                break;
        }
    }

    const handleClick = (e) => {
        const {id, checked} = e.target;
        setIsCheckedList([...isCheckedList, id]);
        if (!checked) {
            setIsCheckedList(isCheckedList.filter(l => l != id));
        }
    }

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        if (!isCheckAll) {
            setIsCheckedList(files.files.map(f => f.id));
        } else {
            setIsCheckedList([]);
        }
    }

    const deleteHandler = () => {
        if (isCheckedList.length) {
            setConfirmModalActive(true);
        }
    }

    const onConfirm = () => {
        isCheckedList.forEach(item => deleteFile(item));
        setIsCheckAll(false);
        setIsCheckedList([]);
    }

    return (
        <div className='catalog-wrapper'>
            <div className='catalog-top'>
                <h2>
                    {t('catalog.title')}
                </h2>
                
            </div>
            <div className='catalog-caption'>
                <img src="./images/icon-warning.svg" alt="Warning"/>
                <div className="catalog-caption__txt">
                    {t('catalog.caption')}
                </div>
            </div>
            <div className='catalog-heading'>
                <div className='catalog-heading__item'>
                    <Checkbox
                    handleClick = {handleSelectAll}
                    isChecked = {isCheckAll}
                    name={t('catalog.select-all')}/>
                </div>
                <div onClick={deleteHandler} className='catalog-heading__item'>
                    <div className='catalog-heading__text'>
                        {t('catalog.delete-btn')}
                    </div>
                    <img className='catalog-heading__img' src={deleteIcon} alt="Delete"/>
                </div>
            </div>
            {files.files ?
            <div className='catalog'>
                <div className='catalog-block catalog-block_first'>
                    {files.files.slice(0, catalogItemsNumberInRow*2).map((img, i) =>
                    <CatalogItem key={img.id} img = {img}
                    handleClick = {handleClick}
                    isCheckedList = {isCheckedList}/>)
                    }
                </div>

                {showMore ?
                <div className='catalog-block catalog-block_show-more'>
                    {files.files.slice(catalogItemsNumberInRow*2).map((img, i) =>
                    <CatalogItem key={img.id} img = {img}
                    handleClick = {handleClick}
                    isCheckedList = {isCheckedList}/>)
                    }
                </div>
                : ''}
                {catalogItemsNumberInRow*2 < files.files.length ?
                <p className='catalog__show-more show-more'
                onClick = {() => setShowMore(!showMore)}>
                    {!showMore ?
                    t('catalog.collapse-items')
                    :
                    t('catalog.expand-items')
                    }
                </p>
                : ''}
            </div>
            : ''
            }

            <Modal modalData={{
                name: 'confirm',
                active: confirmModalActive,
                setActive: setConfirmModalActive,
                message: `${t('modal.confirm-message')} (${isCheckedList.length})`,
                onConfirm: onConfirm
            }}/> 
        </div>
    );
};

export default observer(Catalog);
