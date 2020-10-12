import React, { Fragment, useState } from 'react';
import './App.css';
import AddProductForm from '../src/components/gestion/addProductForm'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from './components/login/loginScreen'
import { useSelector, useDispatch } from 'react-redux';
import Home from '../src/components/home/home'
import SelectStore from '../src/components/home/selectStore'
import AddDetailsOrden from './components/ventas/AddDetailsOrden'
import NavBar from '../src/components/navBar'
import NavMobile from '../src/components/navBarMobile'
import Movimientos from '../src/components/gestion/seeMovimientos'
import AddStoreForm from '../src/components/gestion/addStoreForm';
import AddPurchaseForm from '../src/components/gestion/addPurchaseForm'


function App() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const userLogged = useSelector(store => store.userLogged)
  const idStore = localStorage.getItem('idStore')
  const idStoreRedux = useSelector((store) => store.user.storeSelected)

  const renderLoginScreen = () => {
    let title = 'Hola! Tanto tiempo.', description = 'Siéntete como en casa.'
    return (<LoginScreen title={title} description={description} />)
  }
  if (idStore && !idStoreRedux) {
    dispatch({ type: 'SET_STORE', payload: idStore })
  }


  return (
    <BrowserRouter>
      {userLogged.loged ? (
        <Fragment>
          {idStore && (
            <>
              {window.innerWidth > 450
                ? <NavBar />
                :
                <NavMobile />
              }
            </>
          )}
          <div className='bodyContainer'>

            <Switch>
              <Redirect exact from='/login' to='/tiendas' />
              {!idStore && <Redirect exact from='/' to='/tiendas' />}
              {idStore && <Redirect exact from='/' to='/dashboard' />}
              <Route exact path="/tiendas" component={SelectStore} />
              <Route exact path="/crear-tienda" component={AddStoreForm} />
              <Route exact path="/dashboard" component={Home} />
              <Route exact path='/finalizar-venta' component={AddDetailsOrden} />
              <Route exact path='/movimientos' component={Movimientos} />
              <Route exact path='/cargacompra' component={AddPurchaseForm} />
              <Route exact path='/cargaitems' component={AddProductForm} />
            </Switch>
          </div>
        </Fragment>
      ) : (
          <Switch>
            <Route exact path="/" component={renderLoginScreen} />
            <Route exact path="/registro">
              {user.registered ? <Redirect to='/' /> : <LoginScreen register title={'Hola! Bienvenido a MyStore.'} description={'Bienvenido a la manera simplificada de llevar las cuentas.'} />}
            </Route>
          </Switch>
        )}
    </BrowserRouter>
  );
}

export default App;
