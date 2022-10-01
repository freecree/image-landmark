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
                Ваш каталог завантажених зображень:
            </h2>
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
