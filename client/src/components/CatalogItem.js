import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const CatalogItem = (props) => {
    return (
        <div className='catalog-item'>
            {/* <div>{props.name}</div> */}
            <Link state={{img: props}} to={`edit/${props.name}`}>
                <img  className='catalog-item__img' src={props.path + `/${props.name}`} alt={props.name}></img>
            </Link>

        </div>
    );
};


CatalogItem.propTypes = {

};


export default CatalogItem;
