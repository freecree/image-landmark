import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import filesStore from '../../store/filesStore.js';

export default function ResultModalContent() {
    const images = filesStore.files;

    const resultMarkings = images ? JSON.stringify(images.map(img => {
        const res = {
            image: img.name,
            markings: img.markings
        }
        return res;
    }))
    : '';
}