import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem';
import FileService from '../services/FileService';


const Catalog = ({images}) => {
        
    return (
        <div className='catalog-wrapper'>
            <h2>
		    	Ваш каталог завантажених зображень:
		    </h2>
            <div className='catalog'>
                {images ? images.map(img =>
                <CatalogItem key={img._id}
                name = {img.name}
                id = {img._id}
                markings = {img.markings}
                path={process.env.REACT_APP_FILE_DIRECTORY+`/${img.user}`}/>)
                : 'Будь-ласка, завантажте зображення'
                }
            </div>
        </div>
        
    );
};


Catalog.propTypes = {

};


export default Catalog;
