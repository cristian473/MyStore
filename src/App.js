import React from 'react';
import './App.css';
import ListaProductos from '../src/components/catalogo/listaProductos'
import AddProductForm from '../src/components/gestion/addProductForm'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginForm from './components/login/loginForm'
import RegisterForm from './components/login/registerForm'
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(store => store.user)
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm}/>
          <Route exact path="/registro">
            {user.registered ? <Redirect to='/login'/> : <RegisterForm/>}
          </Route>
          <Route path="/tienda/:store" component={ListaProductos}/>
          <Route path="/tienda/:store" component={AddProductForm}/>
        </Switch>
      </BrowserRouter>
  </div>  

  );
}

export default App;
