import React, { Fragment } from 'react';
import './App.css';
import AddProductForm from '../src/components/gestion/addProductForm'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from './components/login/loginScreen'
import { useSelector } from 'react-redux';
import Home from '../src/components/home/home'
import SelectStore from '../src/components/home/selectStore'
import AddDetailsOrden from './components/ventas/AddDetailsOrden'
import NavBar from '../src/components/navBar'
import Movimientos from '../src/components/gestion/seeMovimientos'
import AddStoreForm from '../src/components/gestion/addStoreForm';
import AddPurchaseForm from '../src/components/gestion/addPurchaseForm'

function App() {
  const user = useSelector(store => store.user)
  const userLogged = useSelector(store => store.userLogged)
  const idStore = localStorage.getItem('idStore')
  const renderLoginScreen = () => {
    let title = 'Hola! Tanto tiempo.', description = 'naslkdjna'
    return (<LoginScreen title={title} description={description} />)

  }

  return (
    <BrowserRouter>
      {userLogged.loged ? (
        <Fragment>
          {idStore && <NavBar />}
          <div className='bodyContainer'>
            <Switch>
              <Redirect exact from='/login' to='/' />
              <Route exact path="/" component={SelectStore} />
              <Route exact path="/crear-tienda" component={AddStoreForm} />
              <Route exact path="/:idStore/dashboard" component={Home} />
              <Route exact path='/:idStore/finalizar-venta' component={AddDetailsOrden} />
              <Route exact path='/:idStore/movimientos' component={Movimientos} />
              <Route exact path='/:idStore/cargacompra' component={AddPurchaseForm} />
              <Route exact path='/:idStore/cargaitems' component={AddProductForm} />
            </Switch>
          </div>
        </Fragment>
      ) : (
          <Switch>
            <Route exact path="/" component={renderLoginScreen} />
            <Route exact path="/registro">
              {user.registered ? <Redirect to='/' /> : <LoginScreen register title={'Hola! Bienvenido a MyStore.'} description={'soy el formulario de registro xD'} />}
            </Route>
          </Switch>
        )}
    </BrowserRouter>
  );
}

export default App;
