import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';


function App() {
  const {store} = useContext(Context);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    console.log("In useEffect");
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch(e) {
      console.log(e);
    }
  }
  
  

  if (store.isLoading) {
    return <div></div>
  }

  if (!store.isAuth) {
    console.log("in if (!isAuth)");
    return(
      <div className="App">
        <LoginForm/>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      

    );
  } 

  return (
    <div className="App">
      {/* <h1>{`Пользователь авторизован ${store.user.email}`}</h1> */}
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h1>{store.user.isActivated ? `Аккаунт подтвержден ${store.user.email}` : 'ПОДТВЕРДИТЕ АККАНТ!!'}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <button onClick={getUsers}>Получить пользователей</button>
        
        {users.map(user =>
           <div key={user.email}>{user.email}</div>
        )}
    </div>
  );
}

export default observer(App);
