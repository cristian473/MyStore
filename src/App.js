import React from 'react';
import './App.css';
import ListaProductos from '../src/components/catalogo/listaProductos'
import AddProductForm from '../src/components/gestion/addProductForm'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginForm from './components/login/loginForm'
import RegisterForm from './components/login/registerForm'
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './firebase';
import Home from '../src/components/home/home'
import SelectStore from '../src/components/home/selectStore'

function App() {
  const user = useSelector(store => store.user)
  const userLogged = useSelector(store => store.userLogged)
  const dispatch = useDispatch();
  return (
    <div>
      <BrowserRouter>
      {userLogged ? (
          <Switch>
            <Route exact path="/" component={SelectStore} />
            
            <Route path="/:idStore/dashboard" component={Home} />

          </Switch>
      ):(
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/registro">
              {user.registered ? <Redirect to='/login' /> : <RegisterForm />}
            </Route>
            
          </Switch>
      )}
        
      </BrowserRouter>
  </div>  

  );
}

export default App;
