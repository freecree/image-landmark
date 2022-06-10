import React, { useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import '../App.css';

import UserService from '../services/UserService';
import FileService from '../services/FileService';

import LoginForm from './LoginForm';
import ImageMarking from './ImageMarking';
import Catalog from './Catalog';

function Main() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState([]);
  
  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      console.log("resp: ", response.data);
      setUsers(response.data);
    } catch(e) {
      console.log(e);
    }
  }

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
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
        <div className='btn'>
          <label htmlFor='btn__upload-input' className='btn__upload-label'>Завантажити файл</label>
          <input multiple={true} onChange={(event)=>fileUploaderHandler(event)} type='file' id='btn__upload-input'className='btn__upload-input' ></input>
        </div>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map(u => <div key={u.email}>{u.email}</div>)}

        <Catalog/>
        {/* <ImageMarking/> */}
      
    </div>
  );


  // return (
  //   <div className="App">
  //     <h1>Вітаємо у системі HandMarking</h1>
  //     <div className="container">
  //       <button onClick={downloadImage} className="button button_blue" >Завантажити зображення</button>
  //       <button onClick={getMarkings} className="button button_red" >Завантажити зображення</button>
  //       <h2>Ваш каталог завантажених зображень</h2>
  //       <Catalog images={images}/>
  //     </div>
  //   </div>
  // );

  
  
}
//export default Main;
export default Main;
