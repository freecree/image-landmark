import React, { useEffect, useState } from 'react';
import {observer} from 'mobx-react-lite';

import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem';
import FileService from '../services/FileService';

import files from '../store/filesStore.js';

const Catalog = () => {
    // console.log("In Catalog: ", files.files);
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
            <div className='catalog'>
                {files.files ? files.files.map(img =>
                <CatalogItem key={img.id}
                img = {img}/>)
                : 'Будь-ласка, завантажте зображення'
                }
            </div>
        </div>
        
    );
};

export default observer(Catalog);
