import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CatalogItem from './CatalogItem';
import FileService from '../services/FileService';


const Catalog = () => {
    const [images, setImages] = useState();

    async function getImages() {
        console.log("In catalog getImages: ");
        const data = FileService.fetchImages();
        // setImages(data);
        return data;
    }

    useEffect(() => {
        console.log("In catalog useEffect");
        let imagesPromise = getImages();
        imagesPromise.then(function(result) {
            setImages(result.data);
            console.log("Result: ", result);
        })
        console.log("Env: ", process.env.REACT_APP_FILE_DIRECTORY);
        console.log("Catalog images: ", images);
        // setImages(getImages());
    }, [])
    
    return (
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
    );
};


Catalog.propTypes = {

};


export default Catalog;
