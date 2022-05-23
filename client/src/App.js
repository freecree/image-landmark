import './App.css';
import LoginForm from './components/LoginForm';
import React, { useContext, useEffect, useState} from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import ImageMarking from './components/ImageMarking';

function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState([]);
  
   useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  },[]);


  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      console.log("resp: ", response.data);
      setUsers(response.data);
    } catch(e) {
      console.log(e);
    }
  }

  if (!store.isAuth) {
    console.log("auth");
    return(<LoginForm/>);
  } 
  
  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <div className="container">
      {/* <button onClick={getUsers}>Получить пользователей</button>
      {users.map(u => <div key={u.email}>{u.email}</div>)} */}
      <ImageMarking/>
      
      </div>
    </div>
  );
}
export default observer(App);