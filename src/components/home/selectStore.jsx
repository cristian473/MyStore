import React, { useEffect } from 'react'
import ListaProductos from '../catalogo/listaProductos'
import AddProductForm from '../gestion/addProductForm'
import AddStoreForm from '../gestion/addStoreForm'
import { useSelector, useDispatch } from 'react-redux'
import {getStores} from '../../actions/userActions'
import { Link } from 'react-router-dom'

const SelectStore = () => {
    const dispatch = useDispatch();
    const userLogged = useSelector(store => store.userLogged)
    const stores = useSelector(store => store.user.stores)

    useEffect(() => {
        dispatch(getStores(userLogged.id));
    }, [])

    return (
        <div>
            {stores ? (
                <div>
                    {stores.map(store => (
                        <div>
                            <Link to={'/'+store.id+'/dashboard'}>{store.name}</Link>
                        </div>
                    )
                    )}
                </div>
                
            ):(
                <div>
                    <h3>aún no tiene tiendas cargadas! por favor seleccione una!</h3>
                    <AddStoreForm/>
                </div>
                
            )}
            
        </div>
    )
}

export default SelectStore