import { useContext, useEffect } from 'react'
import './App.css'
import LoginForm from '@components/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite'

function App() {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])
  return (
    <div>
      <h1>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      <LoginForm />
    </div>
  )
}

export default observer(App);
