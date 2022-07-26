import React, { useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import '../App.css';

import UserService from '../services/UserService';
import FileService from '../services/FileService';

import Catalog from './Catalog';
import Modal from './Modal';

function Main() {
  const {store} = useContext(Context);
  const [images, setImages] = useState();
  const [modalActive, setModalActive] = useState(false);

  async function getImages() {
    console.log("Main: Fetch images");
    const data = FileService.fetchImages();
    return data;
  }

  useEffect(() => {
    const imagesPromise = getImages();
    imagesPromise.then(function(result) {
        setImages(result.data);
    })
  }, [])

  async function fileUploaderHandler(event) {
    const files = [...event.target.files];
    files.forEach(file => {
      let data = FileService.uploadFile(file);
      data.then(function(res) {
        console.log('In promise: ', res);
      })
    });
  }

  return (
    <div className="main__content">
      <h1 className="main__title">Вітаємо у системі HandMarking!</h1>
      <div className='main__buttons'>
        <div className='btn btn_blue'>
          <label htmlFor='btn__upload-input' className='btn__upload-label'>Завантажити зображення</label>
          <input multiple={true} onChange={(event)=>fileUploaderHandler(event)} type='file' id='btn__upload-input'className='btn__upload-input' ></input>
        </div>
        <button className='btn btn_pink btn_markings' onClick={() => setModalActive(true)}>Отримати розмітку</button>
      </div>
      {images ? <Catalog images={images}/> : ''}
      <Modal images={images} active={modalActive} setActive={setModalActive}/>
    </div>
  );

}
export default Main;
