import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import ImageMarking from './ImageMarking';


const Editor = () => {

    const location = useLocation();

    
    useEffect(()=> {
        console.log("Location: ", location);
        console.log("Location img: ", location.state.img);
    }, [])

    return (
        <div>
            <h2>
                {location.state.img.name}
            </h2>
            
            <ImageMarking
            markings={location.state.img.markings}
            path={location.state.img.path}
            name={location.state.img.name}
            id={location.state.img.id}/> 
        </div>
    );
};


Editor.propTypes = {

};


export default Editor;
