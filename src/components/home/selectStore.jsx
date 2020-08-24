import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import AddProductForm from '../gestion/addProductForm'
import AddStoreForm from '../gestion/addStoreForm'
import { useSelector, useDispatch } from 'react-redux'
import {getStores} from '../../actions/userActions'
import { Link } from 'react-router-dom'
import '../../styles/storeSelector.scss'

const SelectStore = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged.user)
    const stores = useSelector(store => store.user.stores)
    console.log(userLogged)
    useEffect(() => {
        dispatch(getStores(userLogged.id));
    }, [])

    return (
        <div className='storeSelectorScreen'>

        
        <div className='storeSelectorContainer'>
            {stores ? (
                <div className='storeTitle'>
                    {stores.map(store => (
                        <div>
                            <Link to={'/'+store.id+'/dashboard'}>{store.name}</Link>
                        </div>
                    )
                    )}

                    <Link to={'/crear-tienda'} ><button>Crear Tienda</button></Link>
                </div>
                
            ):(
                <div className='withoutStoresWarning'>
                    <h3>aún no tiene tiendas cargadas! por favor seleccione una!</h3>
                    <AddStoreForm/>
                </div>
                
            )}
            
        </div>
        </div>
    )
}

export default SelectStore