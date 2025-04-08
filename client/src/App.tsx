import { useContext, useEffect, useState } from 'react'
import './App.css'
import LoginForm from '@components/shared/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import { IUser } from './models/IUser'
import UserService from './services/UserService'
import './assets/styles/index.scss';

function App() {
  const { store } = useContext(Context);
  const[users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (store.isLoading) {
    return <div>Завантаження</div>
  }
  
  if (!store.isAuth) {
    return (
      <LoginForm />
    )
  }

  return (
    <div>
      <h1>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <h1>{store.user.isActivated ? 'Акаунт підтверджений по пошті' : 'ПІДТВЕРДІТЬ АКАУНТ!!'}</h1>
      <button onClick={() => store.logout()}>Вийти</button>
      <div>
        <button onClick={getUsers}>Отримати користувачів</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  )
}

export default observer(App);
